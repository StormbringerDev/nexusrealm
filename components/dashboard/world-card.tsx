"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WorldFormData } from "@/lib/types/wiki";

export function WorldCard({ worlds }: { worlds: WorldFormData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="nexus/wiki">Worlds</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {worlds.length ? (
          <div className="grid grid-cols-2 gap-2 text-center">
            {worlds.map((w) => (
              <Link key={w.id} href="/nexus/wiki" className="text-xl font-bold">
                {w.name}
              </Link>
            ))}
          </div>
        ) : (
          <p>No worlds yet</p>
        )}
      </CardContent>
    </Card>
  );
}
