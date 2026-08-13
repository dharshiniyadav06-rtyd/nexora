import { NextRequest, NextResponse } from 'next/server';
import { getStories, createStory, getStoryById } from '@/lib/db/queries';

export async function GET() {
  try {
    const stories = getStories();
    return NextResponse.json(stories);
  } catch (error: any) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch stories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Required fields validation
    if (!body.title || body.title.trim() === '') {
      return NextResponse.json({ error: 'Missing required field: title' }, { status: 400 });
    }
    if (!body.description || body.description.trim() === '') {
      return NextResponse.json({ error: 'Missing required field: description' }, { status: 400 });
    }
    if (!body.cover_image || body.cover_image.trim() === '') {
      return NextResponse.json({ error: 'Missing required field: cover_image' }, { status: 400 });
    }

    let contentStr = null;
    if (body.content) {
      if (typeof body.content === 'object') {
        contentStr = JSON.stringify(body.content);
      } else if (typeof body.content === 'string') {
        try {
          JSON.parse(body.content);
          contentStr = body.content;
        } catch {
          return NextResponse.json({ error: 'content must be a valid JSON string or object' }, { status: 400 });
        }
      } else {
        return NextResponse.json({ error: 'content must be a valid JSON string or object' }, { status: 400 });
      }
    }

    const id = body.id || `story-${Math.random().toString(36).substring(2, 11)}`;

    // Check duplicate ID
    const existing = getStoryById(id);
    if (existing) {
      return NextResponse.json({ error: `Story with ID ${id} already exists` }, { status: 409 });
    }

    const newStory = {
      id,
      title: body.title,
      description: body.description,
      cover_image: body.cover_image,
      category: body.category || null,
      event_date: body.event_date || null,
      location: body.location || null,
      content: contentStr,
      status: body.status || 'published'
    };

    createStory(newStory);

    const createdStory = getStoryById(id);
    return NextResponse.json(createdStory, { status: 201 });
  } catch (error: any) {
    console.error('Error creating story:', error);
    return NextResponse.json({ error: error.message || 'Failed to create story' }, { status: 500 });
  }
}
