import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
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
        <div className="grid grid-cols-3 grid-rows-1 w-full">
          <CharacterCard />
        </div>
      </div>
    );
  }
}
