import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getCharactersByUserAction } from "@/app/actions/character";
import { CharacterCard } from "@/components/character/character-card";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const characters = await getCharactersByUserAction(session.user.id);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
      {characters.map((c) => (
        <CharacterCard key={c.id} character={c} />
      ))}
    </div>
  );
}
