import { Button } from "@nexusrealm/ui/components/button";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-4xl font-bold">NexusRealm</h1>
      <div className="flex gap-1">
        <Button>Log In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
}
