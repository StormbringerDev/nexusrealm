import { Button } from "@nexusrealm/ui/components/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center gap-2">
      <h1 className="text-4xl font-bold">NexusRealm</h1>
      <div className="flex gap-1">
        <Button>Log In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
}
