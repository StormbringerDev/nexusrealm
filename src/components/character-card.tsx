'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Character } from '@/lib/types/character';
import { shorten, toTitleCase } from '@/lib/utils/strings';

export function CharacterCard({ characters }: { characters: Character[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Characters</CardTitle>
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
              <TableRow>
                <TableCell>
                  {character.name.length <= 6 ? character.name : shorten(character.name, 6)}
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
