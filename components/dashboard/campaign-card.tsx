"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CampaignFormData } from "@/lib/types/campaign";
import type { WorldFormData } from "@/lib/types/wiki";
import { User } from "@/lib/auth";

export function CampaignCard({
  campaigns,
  users,
  worlds,
}: {
  campaigns: CampaignFormData[];
  users: User[];
  worlds: WorldFormData[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="/nexus/campaigns">Campaigns</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {campaigns.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Dungeon Master</TableHead>
                <TableHead>World</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => {
                const dungeonMaster = users.find((u) => u.id === c.userId)!;
                const world = worlds.find((w) => w.id === c.worldId)!;

                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <Link href="/nexus/campaigns">{c.name}</Link>
                    </TableCell>
                    <TableCell>{dungeonMaster.name}</TableCell>
                    <TableCell>
                      <Link href="/nexus/wiki">{world.name}</Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p>No active campaigns yet</p>
        )}
      </CardContent>
    </Card>
  );
}
