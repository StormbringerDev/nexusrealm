"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CharacterFormData } from "@/lib/types/character";

export function CharacterCard({ character }: { character: CharacterFormData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/nexus/character/${character.id}`}>
            {character.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="lg:text-lg">
        Race: {character.race} {character.subrace && `(${character.subrace})`}
        <br />
        Class: {character.class}{" "}
        {character.subclass && `(${character.subclass})`} | Level{" "}
        {character.level}
        <br />
        {character.alignment} | {character.background}
      </CardContent>
      <CardFooter>
        <Button size="lg" asChild>
          <Link href={`/nexus/character/${character.id}`}>View</Link>
        </Button>
        <Button variant="destructive" size="lg" className="ml-auto">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
