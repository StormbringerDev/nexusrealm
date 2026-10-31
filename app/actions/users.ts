"use server";

import type { User } from "@/lib/auth";

export async function getUsersAction(): Promise<User[]> {
  return [
    {
      id: "StormbringerDev",
      createdAt: new Date("2026-10-29T12:00:00Z"),
      updatedAt: new Date("2026-10-29T12:00:00Z"),
      email: "stormbringerdev@example.com",
      emailVerified: true,
      name: "StormbringerDev",
    },
  ];
}
