export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export type AbilityKey = keyof AbilityScores;

export interface Skill {
  name: string;
  ability: AbilityKey;
  proficient?: boolean;
  expert?: boolean;
}

export interface Character {
  id: string; // uuid
  userId: string;
  name: string;
  race: string;
  subrace?: string;
  class: string;
  subclass?: string;
  background: string;
  alignment:
    | 'Lawful Good'
    | 'Neutral Good'
    | 'Chaotic Good'
    | 'Lawful Neutral'
    | 'True Neutral'
    | 'Chaotic Neutral'
    | 'Lawful Evil'
    | 'Neutral Evil'
    | 'Chaotic Evil';
  level: number;
  xp?: number;
  abilityScores: AbilityScores;
  savingThrows: Partial<Record<AbilityKey, boolean>>;
  skills: Skill[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
  };
  speed: number;
  armorClass: number;
  hitPoints: {
    current: number;
    maximum: number;
    temporary?: number;
  };
}

export interface CharacterFormData {
  id: string;
  name: string;
  race: string;
  subrace?: string;
  class: string;
  subclass?: string;
  level: number;
}
