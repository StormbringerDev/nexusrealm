import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getCharacterAction } from "@/app/actions/character";
import { auth } from "@/lib/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const { id } = await params;
  const character = await getCharacterAction(id);

  return (
    <div>
      <h1>{character.name}</h1>
    </div>
  );
}
