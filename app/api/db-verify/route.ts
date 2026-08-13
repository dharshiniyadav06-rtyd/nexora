import { NextResponse } from 'next/server';
import { db } from '@/lib/db/database';

export async function GET() {
  try {
    // Verify connection & tables existence
    const tablesToCheck = ['admins', 'packages', 'portfolio', 'stories', 'bookings'];
    const results: Record<string, { exists: boolean; count: number; error?: string }> = {};

    for (const table of tablesToCheck) {
      try {
        const row = db.prepare(`SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name=?`).get(table) as { count: number } | undefined;
        const exists = row ? row.count > 0 : false;
        
        let count = 0;
        if (exists) {
          const countRow = db.prepare(`SELECT count(*) as count FROM ${table}`).get() as { count: number };
          count = countRow.count;
        }

        results[table] = { exists, count };
      } catch (err: any) {
        results[table] = { exists: false, count: 0, error: err.message };
      }
    }

    // Check foreign key status
    const fkEnforced = db.pragma('foreign_keys', { simple: true }) === 1;

    return NextResponse.json({
      status: 'success',
      database: 'SQLite (better-sqlite3)',
      foreignKeysEnforced: fkEnforced,
      tables: results,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Database verification error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Internal server error verifying database connection'
    }, { status: 500 });
  }
}
