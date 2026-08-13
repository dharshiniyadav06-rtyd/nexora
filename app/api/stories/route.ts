import { NextResponse } from 'next/server';
import { getStories } from '@/lib/db/queries';

export async function GET() {
  try {
    const stories = getStories();
    return NextResponse.json(stories);
  } catch (error: any) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch stories' }, { status: 500 });
  }
}
