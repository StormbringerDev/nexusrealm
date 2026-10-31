import { allWorlds } from "@/lib/sample/worlds";
import type { WorldFormData } from "@/lib/types/wiki";
import { worldToFormData } from "@/lib/validate";

export async function getWorldsByUserAction(
  userId: string
): Promise<WorldFormData[]> {
  return allWorlds.map(worldToFormData);
}

export async function getWorldFormDataAction(
  worldId: string
): Promise<WorldFormData> {
  return worldToFormData(allWorlds.find((w) => w.id === worldId)!);
}
