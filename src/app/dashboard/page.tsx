import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { allCharacters } from '@/lib/sample/data/character';
import { CharacterCard } from '@/components/character-card';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  } else {
    return (
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-3 grid-rows-1 w-full max-h-68">
          <CharacterCard characters={allCharacters} />
        </div>
      </div>
    );
  }
}
