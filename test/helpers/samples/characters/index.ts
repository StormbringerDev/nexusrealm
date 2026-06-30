import * as z from 'zod';

import { default as rawReyek } from './reyek.json';
import { default as rawShade } from './shade.json';
import { default as rawKara } from './kara.json';
import { default as rawTevaan } from './tevaan.json';
import { Character } from '@/lib/types/character';

const CharacterSchema = z.object({
  id: z.uuidv4(),
  userId: z.string(),
  name: z.string(),
  race: z.string(),
  subrace: z.string().optional(),
  class: z.string(),
  subclass: z.string().optional(),
  background: z.string(),
  alignment: z.literal([
    'Lawful Good',
    'Neutral Good',
    'Chaotic Good',
    'Lawful Neutral',
    'True Neutral',
    'Chaotic Neutral',
    'Lawful Evil',
    'Neutral Evil',
    'Chaotic Evil',
  ]),
  level: z.number().min(1).max(20),
  xp: z.number().optional(),
  abilityScores: z.object({
    str: z.number().min(3).max(20),
    dex: z.number().min(3).max(20),
    con: z.number().min(3).max(20),
    int: z.number().min(3).max(20),
    wis: z.number().min(3).max(20),
    cha: z.number().min(3).max(20),
  }),
  savingThrows: z.object({
    str: z.boolean(),
    dex: z.boolean(),
    con: z.boolean(),
    int: z.boolean(),
    wis: z.boolean(),
    cha: z.boolean(),
  }),
  skills: z.array(
    z.object({
      name: z.string(),
      ability: z.literal(['str', 'dex', 'con', 'int', 'wis', 'cha']),
      proficient: z.boolean().optional(),
      expert: z.boolean().optional(),
    }),
  ),
  proficiencies: z.object({
    armor: z.array(z.string()),
    weapons: z.array(z.string()),
    tools: z.array(z.string()),
    languages: z.array(z.string()),
  }),
  speed: z.number(),
  armorClass: z.number(),
  hitPoints: z.object({
    current: z.number(),
    maximum: z.number(),
    temporary: z.number().optional(),
  }),
});

export const reyek: Character = CharacterSchema.parse(rawReyek);
export const shade: Character = CharacterSchema.parse(rawShade);
export const kara: Character = CharacterSchema.parse(rawKara);
export const tevaan: Character = CharacterSchema.parse(rawTevaan);

export const allCharacters: Character[] = [reyek, shade, kara, tevaan];
