import { NextResponse } from 'next/server';
import { clearSession } from '@/lib/session';

export async function POST() {
  try {
    await clearSession();
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    console.error('Admin logout API error:', error);
    return NextResponse.json({ error: 'Internal server error during logout' }, { status: 500 });
  }
}
