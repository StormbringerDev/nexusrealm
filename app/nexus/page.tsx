import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getCampaignsByUserAction } from "@/app/actions/campaign";
import { getCharactersByUserAction } from "@/app/actions/character";
import { getUsersAction } from "@/app/actions/users";
import { getWorldsByUserAction } from "@/app/actions/wiki";
import { CharacterCard } from "@/components/dashboard/character-card";
import { auth } from "@/lib/auth";
import { CampaignCard } from "@/components/dashboard/campaign-card";
import { WorldCard } from "@/components/dashboard/world-card";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const characters = (await getCharactersByUserAction(session.user.id))
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  const campaigns = (await getCampaignsByUserAction("StormbringerDev"))
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);
  const users = await getUsersAction();

  const worlds = await getWorldsByUserAction(session.user.id);
  const sortedWorlds = worlds
    .slice()
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
      <CharacterCard characters={characters} />
      <CampaignCard campaigns={campaigns} users={users} worlds={worlds} />
      <WorldCard worlds={sortedWorlds} />
    </div>
  );
}
