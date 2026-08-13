import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, updateBooking, deleteBooking } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const booking = getBookingById(id);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json(booking);
  } catch (error: any) {
    console.error(`Error fetching booking ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to fetch booking' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const existingBooking = getBookingById(id);
    if (!existingBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const body = await request.json();
    
    // Determine which fields to update
    const updates: any = {};
    
    if (body.status !== undefined || body.booking_status !== undefined) {
      updates.booking_status = body.status !== undefined ? body.status : body.booking_status;
    }
    
    if (body.paymentStatus !== undefined || body.payment_status !== undefined) {
      updates.payment_status = body.paymentStatus !== undefined ? body.paymentStatus : body.payment_status;
    }

    if (body.notes !== undefined) {
      updates.notes = body.notes;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const result = updateBooking(id, updates);
    if (!result) {
      return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Booking updated successfully' });
  } catch (error: any) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: error.message || 'Failed to update booking' }, { status: 500 });
  }
}

// Support PUT as well for maximum compatibility
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return PATCH(request, { params });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const deleted = deleteBooking(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error: any) {
    console.error(`Error deleting booking ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to delete booking' }, { status: 500 });
  }
}
