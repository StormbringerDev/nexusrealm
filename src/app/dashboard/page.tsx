import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  } else {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <h1 className="text-5xl font-bold">Welcome {session.user.name}</h1>
      </div>
    );
  }
}
