import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/pglite';
import { beforeEach, describe, expect, it } from 'vitest';
import { createTestDb } from './helpers/create-test-db.ts';
import { users } from '../src/schema/sample.ts';

describe('Sample queries', () => {
  let db: ReturnType<typeof drizzle>;

  const insertUsers = [
    { email: 'johndoe@example.com', name: 'John Doe' },
    { email: 'janedoe@example.com', name: 'Jane Doe' },
  ];

  beforeEach(async () => {
    const testDb = await createTestDb();
    db = testDb.db;
  });

  it('should insert a user and return the same user', async () => {
    const user = { email: 'johndoe@example.com', name: 'John Doe' };

    const result = await db.insert(users).values(user).returning();

    expect(result).toHaveLength(1);
  });

  it('should retrieve all users', async () => {
    await db.insert(users).values(insertUsers);

    const result = await db.select().from(users);

    expect(result).toHaveLength(2);
  });

  it('should retrieve a user by id', async () => {
    await db.insert(users).values(insertUsers);

    const result = await db.select().from(users).where(eq(users.id, 1));

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe(insertUsers[0]?.name);
  });

  it('should retrieve a user by email', async () => {
    await db.insert(users).values(insertUsers);

    const result = await db.select().from(users).where(eq(users.email, 'janedoe@example.com'));

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe(insertUsers[1]?.name);
  });
});
