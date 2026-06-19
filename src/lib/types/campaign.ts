export type CampaignId = string; // UUID

export interface Campaign {
  id: CampaignId;
  name: string;
  description?: string;
  dmId?: string;
  createdAt: Date;
  updatedAt: Date;

  // Core setting
  worldId?: string;

  // Metadata
  status: 'planning' | 'active' | 'paused' | 'completed' | 'abandoned';
  genreTags?: string[];
  system: string;
  levelRange?: { min: number; max: number };

  // Relations
  playerCharacters: CharacterReference[];
  npcs?: NpcReference[];
  locations?: LocationReference[];
  factions?: FactionReference[];

  // Timeline
  sessions: SessionSummary[];
  majorEvents?: TimelineEvent[];

  customFields: Record<string, any>;
}

export interface CharacterReference {
  characterId: string;
  name: string;
  level?: number;
  race?: string;
  class?: string;
  playerName?: string;
  status: 'active' | 'retired' | 'dead' | 'missing';
  joinedAt?: Date;
  leftAt?: Date;
}

// TODO: define reference types
export interface NpcReference {}
export interface LocationReference {}
export interface FactionReference {}

export interface SessionSummary {
  id: string;
  sessionNumber: number;
  title: string;
  date: Date;
  summary?: string;
  durationHours?: number;
  charactersPresent: string[]; // characterIds
  notableEvents?: string[];
  xpAwarded?: number;
}

export interface TimelineEvent {
  id: string;
  dateInWorld: string;
  title: string;
  description: string;
  importance: 'minor' | 'major' | 'world-shaking';
  involvedEntities?: string[];
}

export interface CampaignFormData {
  name: string;
  description: string;
  system: string;
  worldId?: string;
  initialPlayerCharacters: string[];
  customFields: Record<string, any>;
}
