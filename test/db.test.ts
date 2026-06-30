import { drizzle } from 'drizzle-orm/pglite';
import { describe, it, beforeEach, expect } from 'vitest';
import { createTestDb } from './helpers/create-test-db';
import { character } from '../src/db/schema';
import { allCharacters } from './helpers/samples/characters';
import { eq } from 'drizzle-orm';

describe('Character queries', () => {
  let db: ReturnType<typeof drizzle>;

  beforeEach(async () => {
    const testDb = await createTestDb();
    db = testDb.db;

    await db.insert(character).values(allCharacters);
  });

  it('should find character by id', async () => {
    const result = await db
      .select()
      .from(character)
      .where(eq(character.id, '229e0c67-d928-4109-843c-235790cc0e58'));

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Reyek');
  });

  it('should find characters by userId', async () => {
    const result1 = await db
      .select()
      .from(character)
      .where(eq(character.userId, 'StormbringerDev'));
    const result2 = await db.select().from(character).where(eq(character.userId, 'Rockestaur'));

    expect(result1).toHaveLength(3);
    expect(result1[0].name).toBe('Reyek');
    expect(result1[1].name).toBe('Shade');
    expect(result1[2].name).toBe('Tevaan');
    expect(result2).toHaveLength(1);
    expect(result2[0].name).toBe('Karastevi "Kara" Luret');
  });
});
