import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioItemById, updatePortfolioItem, deletePortfolioItem } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const item = getPortfolioItemById(id);
    if (!item) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error: any) {
    console.error(`Error fetching portfolio item ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to fetch portfolio item' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const existingItem = getPortfolioItemById(id);
    if (!existingItem) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    if (body.title !== undefined) {
      if (body.title === null || body.title.trim() === '') {
        return NextResponse.json({ error: 'title cannot be empty' }, { status: 400 });
      }
      updates.title = body.title;
    }

    if (body.category !== undefined) {
      if (body.category === null || body.category.trim() === '') {
        return NextResponse.json({ error: 'category cannot be empty' }, { status: 400 });
      }
      updates.category = body.category;
    }

    if (body.image_url !== undefined) {
      if (body.image_url === null || body.image_url.trim() === '') {
        return NextResponse.json({ error: 'image_url cannot be empty' }, { status: 400 });
      }
      updates.image_url = body.image_url;
    }

    if (body.description !== undefined) {
      updates.description = body.description;
    }

    if (body.event_type !== undefined) {
      updates.event_type = body.event_type;
    }

    if (body.location !== undefined) {
      updates.location = body.location;
    }

    if (body.display_order !== undefined) {
      if (typeof body.display_order !== 'number') {
        return NextResponse.json({ error: 'display_order must be a number' }, { status: 400 });
      }
      updates.display_order = body.display_order;
    }

    if (body.status !== undefined) {
      if (body.status !== 'active' && body.status !== 'inactive') {
        return NextResponse.json({ error: 'status must be active or inactive' }, { status: 400 });
      }
      updates.status = body.status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
    }

    const updated = updatePortfolioItem(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
    }

    const updatedItem = getPortfolioItemById(id);
    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error(`Error updating portfolio item ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to update portfolio item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const deleted = deletePortfolioItem(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Portfolio item deleted successfully' });
  } catch (error: any) {
    console.error(`Error deleting portfolio item ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to delete portfolio item' }, { status: 500 });
  }
}
