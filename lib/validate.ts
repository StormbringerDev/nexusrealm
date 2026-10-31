import * as z from "zod";

import type { Campaign, CampaignFormData } from "@/lib/types/campaign";
import type { Character, CharacterFormData } from "@/lib/types/character";
import type { World, WorldFormData } from "@/lib/types/wiki";

// --- Schemas -----------------------------------------------------------------

const CampaignSchema = z.object({
  id: z.uuidv4(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  userId: z.string(),
  players: z.array(z.string()),
  playerCharacters: z.array(z.uuidv4()),
  worldId: z.uuidv4(),
});

const CharacterSchema = z.object({
  id: z.uuidv4(),
  playerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  race: z.string(),
  subrace: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined),
  class: z.string(),
  subclass: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined),
  level: z.int().min(1).max(20),
  xp: z
    .int()
    .min(0)
    .max(355_000)
    .nullable()
    .transform((val) => val ?? undefined),
  alignment: z.enum([
    "Lawful Good",
    "Neutral Good",
    "Chaotic Good",
    "Lawful Neutral",
    "Neutral",
    "Chaotic Neutral",
    "Lawful Evil",
    "Neutral Evil",
    "Chaotic Evil",
  ]),
  background: z.string(),
  abilityScores: z.object({
    str: z.int().min(8).max(30),
    dex: z.int().min(8).max(30),
    con: z.int().min(8).max(30),
    int: z.int().min(8).max(30),
    wis: z.int().min(8).max(30),
    cha: z.int().min(8).max(30),
  }),
  savingThrows: z.object({
    str: z
      .boolean()
      .nullable()
      .transform((val) => val ?? undefined),
    dex: z
      .boolean()
      .nullable()
      .transform((val) => val ?? undefined),
    con: z
      .boolean()
      .nullable()
      .transform((val) => val ?? undefined),
    int: z
      .boolean()
      .nullable()
      .transform((val) => val ?? undefined),
    wis: z
      .boolean()
      .nullable()
      .transform((val) => val ?? undefined),
    cha: z
      .boolean()
      .nullable()
      .transform((val) => val ?? undefined),
  }),
  skills: z.array(
    z.object({
      name: z.string(),
      ability: z.enum(["str", "dex", "con", "int", "wis", "cha"]),
      proficient: z
        .boolean()
        .nullable()
        .transform((val) => val ?? undefined),
      expert: z
        .boolean()
        .nullable()
        .transform((val) => val ?? undefined),
    })
  ),
  proficiencies: z.object({
    armor: z.array(z.string()),
    weapons: z.array(z.string()),
    tools: z.array(z.string()),
    languages: z.array(z.string()),
  }),
  armorClass: z.int(),
  speed: z.int(),
  hitPoints: z.object({
    current: z.int().min(0),
    maximum: z.int().min(0),
    temporary: z
      .int()
      .min(0)
      .nullable()
      .transform((val) => val ?? undefined),
  }),
});

const WorldSchema = z.object({
  id: z.uuidv4(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
});

// --- Validation helpers ------------------------------------------------------

export function validateCampaign(data: unknown): Campaign {
  return CampaignSchema.parse(data);
}

export function validateCharacter(data: unknown): Character {
  return CharacterSchema.parse(data);
}

export function validateWorld(data: unknown): World {
  return WorldSchema.parse(data);
}

// --- Form data conversions ---------------------------------------------------

export function campaignToFormData(campaign: Campaign): CampaignFormData {
  return {
    id: campaign.id,
    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt,
    name: campaign.name,
    userId: campaign.userId,
    players: campaign.players,
    playerCharacters: campaign.playerCharacters,
    worldId: campaign.worldId,
  };
}

export function characterToFormData(character: Character): CharacterFormData {
  return {
    id: character.id,
    playerId: character.playerId,
    createdAt: character.createdAt,
    updatedAt: character.updatedAt,
    name: character.name,
    race: character.race,
    subrace: character.subrace,
    class: character.class,
    subclass: character.subclass,
    level: character.level,
  };
}

export function worldToFormData(world: World): WorldFormData {
  return {
    id: world.id,
    createdAt: world.createdAt,
    updatedAt: world.updatedAt,
    userId: world.userId,
    name: world.name,
  };
}
