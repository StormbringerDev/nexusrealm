'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table } from '@/components/ui/table';

export function CharacterCard() {
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
      <CardContent></CardContent>
    </Card>
  );
}
