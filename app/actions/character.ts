"use server";

import { allCharacters } from "@/lib/sample/characters";
import type { Character, CharacterFormData } from "@/lib/types/character";
import { characterToFormData } from "@/lib/validate";

export async function getCharactersByUserAction(
  userId: string
): Promise<CharacterFormData[]> {
  return allCharacters.map(characterToFormData);
}

export async function getCharacterAction(charId: string): Promise<Character> {
  return allCharacters.find((char) => char.id === charId)!;
}

export async function getCharacterFormDataAction(
  charId: string
): Promise<CharacterFormData> {
  return characterToFormData(allCharacters.find((c) => c.id === charId)!);
}
