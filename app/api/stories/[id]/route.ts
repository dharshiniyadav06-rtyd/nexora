import { NextRequest, NextResponse } from 'next/server';
import { getStoryById } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const story = getStoryById(id);
    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }
    return NextResponse.json(story);
  } catch (error: any) {
    console.error('Error fetching story by ID:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch story' }, { status: 500 });
  }
}
