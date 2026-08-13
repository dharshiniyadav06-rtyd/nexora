import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/database';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Determine which fields to update
    const updates: string[] = [];
    const values: any[] = [];
    
    if (body.status !== undefined || body.booking_status !== undefined) {
      updates.push('booking_status = ?');
      values.push(body.status !== undefined ? body.status : body.booking_status);
    }
    
    if (body.paymentStatus !== undefined || body.payment_status !== undefined) {
      updates.push('payment_status = ?');
      values.push(body.paymentStatus !== undefined ? body.paymentStatus : body.payment_status);
    }

    if (body.notes !== undefined) {
      updates.push('notes = ?');
      values.push(body.notes);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    values.push(id); // for the WHERE id = ? clause

    const sql = `UPDATE bookings SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const stmt = db.prepare(sql);
    const result = stmt.run(...values);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
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
