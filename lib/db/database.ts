import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { initDb } from './init';

const dbPath = process.env.DATABASE_URL || path.join(process.cwd(), 'data', 'nexora.sqlite');

// Ensure data directory exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// In Next.js dev server hot reload, prevent database locking from duplicate connections
let dbConnection: Database.Database;

const globalWithDb = global as typeof globalThis & {
  db?: Database.Database;
  dbInitialized?: boolean;
};

if (process.env.NODE_ENV === 'production') {
  dbConnection = new Database(dbPath);
} else {
  // Use global cache in dev
  if (!globalWithDb.db) {
    globalWithDb.db = new Database(dbPath);
  }
  dbConnection = globalWithDb.db;
}

// Enable foreign key support
dbConnection.pragma('foreign_keys = ON');

// Initialize database schema and default records
if (!globalWithDb.dbInitialized) {
  try {
    initDb(dbConnection);
    globalWithDb.dbInitialized = true;
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

export const db = dbConnection;
export default db;
