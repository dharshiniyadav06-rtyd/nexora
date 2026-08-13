import { NextRequest, NextResponse } from 'next/server';
import { getBookings, getBookingsByCustomerEmail, createBooking } from '@/lib/db/queries';
import { Booking } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    let bookingsList;
    if (email) {
      bookingsList = getBookingsByCustomerEmail(email);
    } else {
      bookingsList = getBookings();
    }
    return NextResponse.json(bookingsList);
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Map camelCase fields to snake_case database columns
    const bookingData: Omit<Booking, 'created_at' | 'updated_at'> = {
      id: body.id || `b-${Math.random().toString(36).substring(2, 11)}`,
      customer_name: body.customer_name || body.coupleName || '',
      customer_email: body.customer_email || body.email || '',
      customer_phone: body.customer_phone || body.phone || '',
      package_id: body.package_id || (body.packageName ? `pkg-${body.packageName.toLowerCase()}` : null),
      booking_date: body.booking_date || body.date || '',
      booking_time: body.booking_time || null,
      event_type: body.event_type || body.eventType || '',
      location: body.location || body.venue || '',
      total_amount: body.total_amount || body.price || '0',
      payment_status: body.payment_status || body.paymentStatus || 'pending',
      booking_status: body.booking_status || body.status || 'pending',
      notes: body.notes || JSON.stringify({
        guestCount: body.guestCount || 0,
        coverageHours: body.coverageHours || 0,
        addOns: body.addOns || [],
        creditsEarned: body.creditsEarned || 0,
        creditsRedeemed: body.creditsRedeemed || 0,
        totalPaid: body.totalPaid || 0,
        transactionId: body.transactionId || '',
        paymentMethod: body.paymentMethod || '',
        paymentReference: body.paymentReference || ''
      })
    };

    createBooking(bookingData);
    return NextResponse.json({ success: true, booking: bookingData });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: error.message || 'Failed to create booking' }, { status: 500 });
  }
}
