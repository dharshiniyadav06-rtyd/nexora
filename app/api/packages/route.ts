import { NextResponse } from 'next/server';
import { getPackages } from '@/lib/db/queries';

export async function GET() {
  try {
    const packages = getPackages();
    return NextResponse.json(packages);
  } catch (error: any) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch packages' }, { status: 500 });
  }
}
