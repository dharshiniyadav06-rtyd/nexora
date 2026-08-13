import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminByEmail } from '@/lib/db/queries';
import { setSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    
    const admin = getAdminByEmail(email);
    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    // Hash incoming password and compare with database hash
    const incomingHash = crypto.createHash('sha256').update(password).digest('hex');
    if (incomingHash !== admin.password_hash) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    const user = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    };
    
    // Persist authenticated session
    await setSession(user);
    
    return NextResponse.json({
      success: true,
      user
    });
  } catch (error: any) {
    console.error('Admin login API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error during login' }, { status: 500 });
  }
}
