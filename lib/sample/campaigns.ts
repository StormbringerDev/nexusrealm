import type { Campaign } from "../types/campaign";

export const avernum: Campaign = {
  id: "9dbed9ec-3f5a-458e-9e39-35235c42a216",
  createdAt: new Date("2026-10-30T00:00:00Z"),
  updatedAt: new Date("2026-10-30T00:00:00Z"),
  name: "Warlord of Avernum",
  userId: "StormbringerDev",
  players: ["StormbringerDev"],
  playerCharacters: [
    "b3f64666-19aa-4951-8c47-3f4d661dc51f",
    "fc18b350-d101-45c7-9b55-48394786790c",
    "b9dc318d-fb85-4eed-a3f2-d6be3932553e",
    "11e83044-a59d-40d0-8045-22df6371e039",
  ],
  worldId: "f694dd28-ce78-4b45-b02a-8db384e52cda",
};

export const allCampaigns = [avernum];
