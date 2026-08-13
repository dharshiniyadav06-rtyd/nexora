import { NextRequest, NextResponse } from 'next/server';
import { getStoryById, updateStory, deleteStory } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const story = getStoryById(id);
    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }
    return NextResponse.json(story);
  } catch (error: any) {
    console.error(`Error fetching story ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to fetch story' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const existingStory = getStoryById(id);
    if (!existingStory) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    if (body.title !== undefined) {
      if (body.title === null || body.title.trim() === '') {
        return NextResponse.json({ error: 'title cannot be empty' }, { status: 400 });
      }
      updates.title = body.title;
    }

    if (body.description !== undefined) {
      if (body.description === null || body.description.trim() === '') {
        return NextResponse.json({ error: 'description cannot be empty' }, { status: 400 });
      }
      updates.description = body.description;
    }

    if (body.cover_image !== undefined) {
      if (body.cover_image === null || body.cover_image.trim() === '') {
        return NextResponse.json({ error: 'cover_image cannot be empty' }, { status: 400 });
      }
      updates.cover_image = body.cover_image;
    }

    if (body.category !== undefined) {
      updates.category = body.category;
    }

    if (body.event_date !== undefined) {
      updates.event_date = body.event_date;
    }

    if (body.location !== undefined) {
      updates.location = body.location;
    }

    if (body.content !== undefined) {
      if (body.content === null) {
        updates.content = null;
      } else if (typeof body.content === 'object') {
        updates.content = JSON.stringify(body.content);
      } else if (typeof body.content === 'string') {
        try {
          JSON.parse(body.content);
          updates.content = body.content;
        } catch {
          return NextResponse.json({ error: 'content must be a valid JSON string or object' }, { status: 400 });
        }
      } else {
        return NextResponse.json({ error: 'content must be a valid JSON string or object' }, { status: 400 });
      }
    }

    if (body.status !== undefined) {
      if (body.status === null || body.status.trim() === '') {
        return NextResponse.json({ error: 'status cannot be empty' }, { status: 400 });
      }
      updates.status = body.status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
    }

    const updated = updateStory(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Failed to update story' }, { status: 500 });
    }

    const updatedStory = getStoryById(id);
    return NextResponse.json(updatedStory);
  } catch (error: any) {
    console.error(`Error updating story ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to update story' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const deleted = deleteStory(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Story deleted successfully' });
  } catch (error: any) {
    console.error(`Error deleting story ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to delete story' }, { status: 500 });
  }
}
