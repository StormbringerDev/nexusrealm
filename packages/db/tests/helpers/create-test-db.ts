import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { pushSchema } from 'drizzle-kit/api';
import * as sampleSchema from '../../src/schema/sample.ts';

const schema = { ...sampleSchema };

export async function createTestDb() {
  const client = new PGlite();
  const db = drizzle(client, { schema });

  const { apply } = await pushSchema(schema, db as any);
  await apply();

  return { db, client };
}
