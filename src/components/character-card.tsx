'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CharacterFormData } from '@/lib/types/character';
import { shorten, toTitleCase } from '@/lib/utils/strings';

export function CharacterCard({ character }: { character: CharacterFormData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/character/${character.id}`}>{character.name}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {character?.subrace
          ? toTitleCase(character.subrace, '-')
          : toTitleCase(character.race, '-', '-')}
        <br />
        {toTitleCase(character.class)}{' '}
        {character.subclass && `(${toTitleCase(character.subclass, '-')})`}
        <br />
        Level {character.level}
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full justify-between">
          <Button>View</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export function DashboardCharacterCard({ characters }: { characters: CharacterFormData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="/character">Recent Characters</Link>
        </CardTitle>
        <CardAction>
          <Button size="icon-xs">
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
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
            {characters.map(character => (
              <TableRow key={character.id}>
                <TableCell className="underline-offset-4 hover:underline">
                  <Link href={`/character/${character.id}`}>
                    {character.name.length <= 6 ? character.name : shorten(character.name, 6)}
                  </Link>
                </TableCell>
                <TableCell>{toTitleCase(character.race, '-', '-')}</TableCell>
                <TableCell>{toTitleCase(character.class)}</TableCell>
                <TableCell>{character.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
