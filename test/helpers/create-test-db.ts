import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { pushSchema } from 'drizzle-kit/api';
import * as schema from '../../src/db/schema';

export async function createTestDb() {
  const client = new PGlite();
  const db = drizzle(client, { schema });

  const { apply } = await pushSchema(schema, db as any);
  await apply();

  return { db, client };
}
