import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioItems, createPortfolioItem } from '@/lib/db/queries';

export async function GET() {
  try {
    const items = getPortfolioItems();
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch portfolio items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.image_url || body.image_url.trim() === '') {
      return NextResponse.json({ error: 'Missing required field: image_url' }, { status: 400 });
    }
    if (!body.category || body.category.trim() === '') {
      return NextResponse.json({ error: 'Missing required field: category' }, { status: 400 });
    }
    if (!body.title || body.title.trim() === '') {
      return NextResponse.json({ error: 'Missing required field: title' }, { status: 400 });
    }

    const id = body.id || `port-${Math.random().toString(36).substring(2, 11)}`;
    const displayOrder = typeof body.display_order === 'number' ? body.display_order : 0;

    const newItem = {
      id,
      title: body.title,
      category: body.category,
      description: body.description || null,
      image_url: body.image_url,
      event_type: body.event_type || body.style || 'Candid',
      location: body.location || 'Chennai',
      display_order: displayOrder,
      status: body.status || 'active'
    };

    createPortfolioItem(newItem);

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({ error: error.message || 'Failed to create portfolio item' }, { status: 500 });
  }
}
