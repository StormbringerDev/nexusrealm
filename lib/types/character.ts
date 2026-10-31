export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export type AbilityKey = keyof AbilityScores;

export type Alignment =
  | "Lawful Good"
  | "Neutral Good"
  | "Chaotic Good"
  | "Lawful Neutral"
  | "Neutral"
  | "Chaotic Neutral"
  | "Lawful Evil"
  | "Neutral Evil"
  | "Chaotic Evil";

export interface Skill {
  name: string;
  ability: AbilityKey;
  proficient?: boolean;
  expert?: boolean;
}

export interface Character {
  id: string; // UUIDv4
  playerId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  race: string;
  subrace?: string;
  class: string;
  subclass?: string;
  level: number;
  xp?: number;
  alignment: Alignment;
  background: string;
  abilityScores: AbilityScores;
  savingThrows: Partial<Record<AbilityKey, boolean>>;
  skills: Skill[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
  };
  armorClass: number;
  speed: number;
  hitPoints: {
    current: number;
    maximum: number;
    temporary?: number;
  };
}

export interface CharacterFormData {
  id: string;
  playerId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  race: string;
  subrace?: string;
  class: string;
  subclass?: string;
  level: number;
  alignment: Alignment;
  background: string;
}
