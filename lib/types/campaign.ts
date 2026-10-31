export interface Campaign {
  id: string; // UUIDv4
  createdAt: Date;
  updatedAt: Date;
  name: string;
  userId: string;
  players: string[]; // players by user ID
  playerCharacters: string[]; // characters by ID
  worldId: string;
}

export interface CampaignFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  userId: string;
  players: string[];
  playerCharacters: string[];
  worldId: string;
}
