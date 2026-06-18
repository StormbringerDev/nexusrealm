import { describe, it, expect, beforeEach } from 'vitest'
import { createTestDb } from '../test-utils/db'
import { character } from '../src/db/schema'
import { eq } from 'drizzle-orm'

describe('Character repository', () => {
  let db: ReturnType<typeof createTestDb>['db']

  beforeEach(async () => {
    const { db: testDb } = createTestDb()
    db = testDb
  })

  it('should create and retrieve a character', async () => {
    await db.insert(character).values({
      userId: 'StormbringerDev',
      name: 'Reyek',
      race: 'half-elf',
      class: 'wizard',
      subclass: 'school-of-transmutation',
      background: 'sage',
      alignment: 'True Neutral',
      level: 3,
      xp: 900,
      dex: 14,
      con: 14,
      int: 16,
      wis: 12,
      cha: 12,
    })

    const result = await db.select().from(character).where(eq(character.name, 'Reyek'))

    expect(result).toHaveLength(1)
    expect(result[0].id).not.toBeNull()
    expect(result[0].userId).toEqual('StormbringerDev')
    expect(result[0].name).toEqual('Reyek')
    expect(result[0].race).toEqual('half-elf')
    expect(result[0].subrace).toBeNull()
    expect(result[0].class).toEqual('wizard')
    expect(result[0].subclass).toEqual('school-of-transmutation')
    expect(result[0].background).toEqual('sage')
    expect(result[0].alignment).toEqual('True Neutral')
    expect(result[0].level).toEqual(3)
    expect(result[0].xp).toEqual(900)
    expect(result[0].str).toEqual(8)
    expect(result[0].dex).toEqual(14)
    expect(result[0].con).toEqual(14)
    expect(result[0].int).toEqual(16)
    expect(result[0].wis).toEqual(12)
    expect(result[0].cha).toEqual(12)
  })
})
