import path from 'node:path';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import * as schema from '../src/db/schema';

export function createTestDb() {
  const sqlite = new Database(':memory:');
  const db = drizzle(sqlite, { schema });

  const migrationsFolder = path.join(process.cwd(), 'drizzle');
  migrate(db, { migrationsFolder });

  return { db, sqlite };
}
