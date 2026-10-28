import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-center text-4xl font-bold">NexusRealm</h1>
      <div className="flex gap-2">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
