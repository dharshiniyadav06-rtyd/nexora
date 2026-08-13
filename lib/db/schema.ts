export const CREATE_ADMINS_TABLE = `
  CREATE TABLE IF NOT EXISTS admins (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

export const CREATE_PACKAGES_TABLE = `
  CREATE TABLE IF NOT EXISTS packages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    duration TEXT NOT NULL,
    photographer_count INTEGER NOT NULL,
    included_services TEXT, -- JSON array of features
    status TEXT NOT NULL DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

export const CREATE_PORTFOLIO_TABLE = `
  CREATE TABLE IF NOT EXISTS portfolio (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    event_type TEXT,
    location TEXT,
    display_order INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

export const CREATE_STORIES_TABLE = `
  CREATE TABLE IF NOT EXISTS stories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    category TEXT,
    event_date TEXT,
    location TEXT,
    content TEXT, -- JSON string representing the full story structure
    status TEXT NOT NULL DEFAULT 'published',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

export const CREATE_BOOKINGS_TABLE = `
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    package_id TEXT,
    booking_date TEXT NOT NULL,
    booking_time TEXT,
    event_type TEXT NOT NULL,
    location TEXT NOT NULL,
    total_amount TEXT NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'pending',
    booking_status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL
  );
`;

export const CREATE_INDEXES = [
  "CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);",
  "CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);",
  "CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio(category);",
  "CREATE INDEX IF NOT EXISTS idx_portfolio_status ON portfolio(status);",
  "CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);",
  "CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);",
  "CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);",
  "CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);",
  "CREATE INDEX IF NOT EXISTS idx_bookings_package_id ON bookings(package_id);"
];
