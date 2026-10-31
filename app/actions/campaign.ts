"use server";

import { allCampaigns } from "@/lib/sample/campaigns";
import type { CampaignFormData } from "@/lib/types/campaign";
import { campaignToFormData } from "@/lib/validate";

export async function getCampaignsByUserAction(
  userId: string
): Promise<CampaignFormData[]> {
  const campaigns = allCampaigns.map(campaignToFormData);
  const running = campaigns.filter((c) => c.userId === userId);
  const playing = campaigns.filter((c) => c.players.includes(userId));
  return [...new Set([...running, ...playing])];
}
