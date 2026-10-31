"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CharacterFormData } from "@/lib/types/character";

export function CharacterCard({
  characters,
}: {
  characters: CharacterFormData[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="/nexus/character">Characters</Link>
        </CardTitle>
        <CardAction>
          <Button>New Character</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {characters.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Race</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {characters.map((char) => (
                <TableRow key={char.id}>
                  <TableCell>
                    <Link href={`/nexus/character/${char.id}`}>
                      {char.name}
                    </Link>
                  </TableCell>
                  <TableCell>{char.subrace ?? char.race}</TableCell>
                  <TableCell>{char.subclass ?? char.class}</TableCell>
                  <TableCell>{char.level}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No characters yet</p>
        )}
      </CardContent>
    </Card>
  );
}
