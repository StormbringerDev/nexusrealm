import Link from 'next/link'
import { headers } from 'next/headers'

import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="flex flex-col h-full items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome to NexusRealm</h1>
      {session ? (
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/character">Characters</Link>
          </Button>
          <Button asChild>
            <Link href="/party">Party</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
