import { Database } from 'better-sqlite3';
import crypto from 'crypto';
import {
  CREATE_ADMINS_TABLE,
  CREATE_PACKAGES_TABLE,
  CREATE_PORTFOLIO_TABLE,
  CREATE_STORIES_TABLE,
  CREATE_BOOKINGS_TABLE,
  CREATE_INDEXES
} from './schema';
import { galleryImages, weddingStoriesData } from '../../services/mockData';

export function initDb(db: Database) {
  // Use a transaction for schema creation
  db.transaction(() => {
    // 1. Create tables
    db.prepare(CREATE_ADMINS_TABLE).run();
    db.prepare(CREATE_PACKAGES_TABLE).run();
    db.prepare(CREATE_PORTFOLIO_TABLE).run();
    db.prepare(CREATE_STORIES_TABLE).run();
    db.prepare(CREATE_BOOKINGS_TABLE).run();

    // 2. Create indexes
    for (const createIndexSql of CREATE_INDEXES) {
      db.prepare(createIndexSql).run();
    }
  })();

  // 3. Seed default packages if table is empty
  const pkgTableCheck = db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='packages'").get() as { count: number };
  if (pkgTableCheck && pkgTableCheck.count > 0) {
    const pkgCountRow = db.prepare('SELECT count(*) as count FROM packages').get() as { count: number };
    if (pkgCountRow.count === 0) {
      try {
        const defaultPackages = [
          {
            id: 'pkg-silver',
            name: 'Silver',
            description: 'Perfect for intimate celebrations and micro weddings.',
            price: '₹1,20,000',
            duration: '6 Hours',
            photographer_count: 2,
            included_services: JSON.stringify([
              'High-Resolution Edited Digital Images (200+)',
              'Premium Leatherette Album (30 Pages)',
              'Standard Color Grading',
              'Next-Day Highlight Previews (5 Images)',
              'Personalized Web Gallery (1 Year Active)',
              'Online Planning Consultation'
            ]),
            status: 'active'
          },
          {
            id: 'pkg-gold',
            name: 'Gold',
            description: 'The standard coverage package for traditional wedding events.',
            price: '₹2,20,000',
            duration: '12 Hours / Full Day',
            photographer_count: 4,
            included_services: JSON.stringify([
              'High-Resolution Edited Digital Images (400+)',
              'Luxury Handcrafted Linen Album (40 Pages)',
              'Cinematic Highlights Video (3-5 mins)',
              'Live Streaming (1 YouTube Private Link)',
              'Drone Aerial Coverage (Venue Shoot)',
              'Next-Day Highlight Previews (15 Images)',
              'Personalized Web Gallery (3 Years Active)',
              'In-person Styling & Flow Planning Session'
            ]),
            status: 'active'
          },
          {
            id: 'pkg-platinum',
            name: 'Platinum',
            description: 'Highly recommended. Comprehensive luxury coverage with rich cinematic video.',
            price: '₹3,50,000',
            duration: 'Multi-Day Coverage (Up to 18 Hours)',
            photographer_count: 6,
            included_services: JSON.stringify([
              'Unlimited High-Resolution Edited Images (600+)',
              'Two Premium Handcrafted Glass Albums (40 Pages each)',
              'Luxury Parent Mini-Albums (2 Copies)',
              'Cinematic Wedding Film (10-15 mins)',
              'Full Video Documentaries (Traditional Cut)',
              'Drone Coverage (Photos + Cinematic Reels)',
              'Pre-Wedding Couple Shoot (3-4 Hours)',
              'Live Streaming (Multi-camera setup)',
              'Same-Day Edit Teaser Video (60 secs)',
              'Lifetime Personalized Web Gallery Access',
              'VIP Dedicated Support & Pre-Production Crew'
            ]),
            status: 'active'
          },
          {
            id: 'pkg-signature',
            name: 'Signature',
            description: 'An exclusive, bespoke visual narrative curated personally by our chief photographer.',
            price: '₹5,00,000',
            duration: 'Full Wedding Week Coverage',
            photographer_count: 9,
            included_services: JSON.stringify([
              'Custom Editorial Fine-Art Album Collection',
              'Bespoke Glass Box Packaging & USB Kit',
              'Cinematic Feature Film (25-30 mins)',
              '4K Ultra HD Drone Aerial Cinematography',
              'Pre-Wedding & Post-Wedding Shoots (Any South Indian location)',
              'Live Multi-Channel High Definition Broadcast',
              'Same-Day Edit Reel played at the Reception',
              'Canvas Prints of Signature Portraits (3 Large Frames)',
              'Priority Handpicked Retouching & Album Layout Design',
              'Dedicated Client Coordinator & Unlimited Consultation Hours',
              'Complimentary Anniversary Photo Session'
            ]),
            status: 'active'
          }
        ];

        const insertPkg = db.prepare(`
          INSERT INTO packages (id, name, description, price, duration, photographer_count, included_services, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        db.transaction(() => {
          for (const pkg of defaultPackages) {
            insertPkg.run(
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
        })();
        console.log('Seeded default photography packages successfully.');
      } catch (err) {
        console.error('Error seeding default packages:', err);
      }
    }
  }

  // 4. Seed default admin if table is empty
  const adminTableCheck = db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='admins'").get() as { count: number };
  if (adminTableCheck && adminTableCheck.count > 0) {
    const adminCount = db.prepare('SELECT count(*) as count FROM admins').get() as { count: number };
    if (adminCount.count === 0) {
      try {
        const hashedPassword = crypto.createHash('sha256').update('admin123').digest('hex');
        db.prepare(`
          INSERT INTO admins (id, name, email, password_hash, role)
          VALUES (?, ?, ?, ?, ?)
        `).run('admin-1', 'Administrator', 'admin@nexora.com', hashedPassword, 'admin');
        console.log('Seeded default admin successfully.');
      } catch (err) {
        console.error('Error seeding default admin:', err);
      }
    }
  }

  // 5. Seed default portfolio if table is empty
  const portfolioTableCheck = db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='portfolio'").get() as { count: number };
  if (portfolioTableCheck && portfolioTableCheck.count > 0) {
    const portfolioCount = db.prepare('SELECT count(*) as count FROM portfolio').get() as { count: number };
    if (portfolioCount.count === 0) {
      try {
        const insertPortfolio = db.prepare(`
          INSERT INTO portfolio (id, title, category, description, image_url, event_type, location, display_order, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        db.transaction(() => {
          galleryImages.forEach((img, idx) => {
            insertPortfolio.run(
              img.id,
              `${img.category} in ${img.location}`,
              img.category,
              `${img.lens} with ${img.lighting}`,
              img.url,
              img.style,
              img.location,
              idx,
              'active'
            );
          });
        })();
        console.log('Seeded default portfolio items successfully.');
      } catch (err) {
        console.error('Error seeding portfolio items:', err);
      }
    }
  }

  // 6. Seed default stories if table is empty
  const storiesTableCheck = db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='stories'").get() as { count: number };
  if (storiesTableCheck && storiesTableCheck.count > 0) {
    const storiesCount = db.prepare('SELECT count(*) as count FROM stories').get() as { count: number };
    if (storiesCount.count === 0) {
      try {
        const insertStory = db.prepare(`
          INSERT INTO stories (id, title, description, cover_image, category, event_date, location, content, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        db.transaction(() => {
          weddingStoriesData.forEach((story) => {
            insertStory.run(
              story.id,
              story.title,
              story.coupleIntroduction,
              story.heroImage,
              story.style,
              story.weddingDate,
              story.location,
              JSON.stringify(story),
              'published'
            );
          });
        })();
        console.log('Seeded default wedding stories successfully.');
      } catch (err) {
        console.error('Error seeding wedding stories:', err);
      }
    }
  }
}
