import { NextResponse } from 'next/server';
import { getPortfolioItems } from '@/lib/db/queries';

export async function GET() {
  try {
    const items = getPortfolioItems();
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch portfolio items' }, { status: 500 });
  }
}
