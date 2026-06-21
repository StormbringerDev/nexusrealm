import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { fetchCharactersAction } from '@/app/actions/characters';
import { CharacterCard } from '@/components/character-card';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const characters = await fetchCharactersAction();

  if (!session) {
    redirect('/login');
  } else {
    return (
      <div className="grid grid-cols-3 gap-4 w-full">
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );
  }
}
