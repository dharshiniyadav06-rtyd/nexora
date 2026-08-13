export interface Admin {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  photographer_count: number;
  included_services: string; // JSON array of features (string[])
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  event_type: string | null;
  location: string | null;
  display_order: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  category: string | null;
  event_date: string | null;
  location: string | null;
  content: string | null; // JSON string representing story details (e.g. timeline, highlights, vendors, etc.)
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  package_id: string | null;
  booking_date: string;
  booking_time: string | null;
  event_type: string;
  location: string;
  total_amount: string;
  payment_status: string;
  booking_status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
