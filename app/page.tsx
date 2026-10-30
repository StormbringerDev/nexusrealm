import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/nexus");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-center text-4xl font-bold">NexusRealm</h1>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
