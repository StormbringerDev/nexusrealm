import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { signOutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-medium">Welcome to NexusRealm!</h1>
      <p>UI is currently a work in progress.</p>
      <form action={signOutAction}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
