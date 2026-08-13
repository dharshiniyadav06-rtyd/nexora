import { db } from '../database';
import { Admin, Package, PortfolioItem, Story, Booking } from '../types';

// Admin Queries
export function getAdminByEmail(email: string): Admin | null {
  const stmt = db.prepare('SELECT * FROM admins WHERE email = ?');
  return (stmt.get(email) as Admin) || null;
}

export function createAdmin(admin: Omit<Admin, 'created_at' | 'updated_at'>): void {
  const stmt = db.prepare(`
    INSERT INTO admins (id, name, email, password_hash, role)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(admin.id, admin.name, admin.email, admin.password_hash, admin.role);
}

// Package Queries
export function getPackages(): Package[] {
  const stmt = db.prepare('SELECT * FROM packages');
  return stmt.all() as Package[];
}

export function getPackageById(id: string): Package | null {
  const stmt = db.prepare('SELECT * FROM packages WHERE id = ?');
  return (stmt.get(id) as Package) || null;
}

export function createPackage(pkg: Omit<Package, 'created_at' | 'updated_at'>): void {
  const stmt = db.prepare(`
    INSERT INTO packages (id, name, description, price, duration, photographer_count, included_services, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    pkg.id,
    pkg.name,
    pkg.description,
    pkg.price,
    pkg.duration,
    pkg.photographer_count,
    pkg.included_services,
    pkg.status
  );
}

// Portfolio Queries
export function getPortfolioItems(): PortfolioItem[] {
  const stmt = db.prepare('SELECT * FROM portfolio ORDER BY display_order ASC, created_at DESC');
  return stmt.all() as PortfolioItem[];
}

export function getPortfolioItemsByCategory(category: string): PortfolioItem[] {
  const stmt = db.prepare('SELECT * FROM portfolio WHERE category = ? ORDER BY display_order ASC');
  return stmt.all(category) as PortfolioItem[];
}

export function createPortfolioItem(item: Omit<PortfolioItem, 'created_at' | 'updated_at'>): void {
  const stmt = db.prepare(`
    INSERT INTO portfolio (id, title, category, description, image_url, event_type, location, display_order, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    item.id,
    item.title,
    item.category,
    item.description,
    item.image_url,
    item.event_type,
    item.location,
    item.display_order,
    item.status
  );
}

// Story Queries
export function getStories(): Story[] {
  const stmt = db.prepare('SELECT * FROM stories ORDER BY event_date DESC, created_at DESC');
  return stmt.all() as Story[];
}

export function getStoryById(id: string): Story | null {
  const stmt = db.prepare('SELECT * FROM stories WHERE id = ?');
  return (stmt.get(id) as Story) || null;
}

export function createStory(story: Omit<Story, 'created_at' | 'updated_at'>): void {
  const stmt = db.prepare(`
    INSERT INTO stories (id, title, description, cover_image, category, event_date, location, content, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    story.id,
    story.title,
    story.description,
    story.cover_image,
    story.category,
    story.event_date,
    story.location,
    story.content,
    story.status
  );
}

// Booking Queries
export function getBookings(): Booking[] {
  const stmt = db.prepare('SELECT * FROM bookings ORDER BY booking_date DESC');
  return stmt.all() as Booking[];
}

export function getBookingById(id: string): Booking | null {
  const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
  return (stmt.get(id) as Booking) || null;
}

export function getBookingsByCustomerEmail(email: string): Booking[] {
  const stmt = db.prepare('SELECT * FROM bookings WHERE customer_email = ? ORDER BY booking_date DESC');
  return stmt.all(email) as Booking[];
}

export function createBooking(booking: Omit<Booking, 'created_at' | 'updated_at'>): void {
  const stmt = db.prepare(`
    INSERT INTO bookings (
      id, customer_name, customer_email, customer_phone, package_id,
      booking_date, booking_time, event_type, location, total_amount,
      payment_status, booking_status, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    booking.id,
    booking.customer_name,
    booking.customer_email,
    booking.customer_phone,
    booking.package_id,
    booking.booking_date,
    booking.booking_time,
    booking.event_type,
    booking.location,
    booking.total_amount,
    booking.payment_status,
    booking.booking_status,
    booking.notes
  );
}
