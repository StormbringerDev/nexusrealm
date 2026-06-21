'use server';

import { allCharacters } from '@/lib/sample/data/character';

export async function fetchCharactersAction() {
  const characters = allCharacters.map(character => ({
    id: character.id,
    name: character.name,
    race: character.race,
    subrace: character.subrace,
    class: character.class,
    subclass: character.subclass,
    level: character.level,
  }));

  return characters;
}
