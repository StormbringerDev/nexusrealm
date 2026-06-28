'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { AbilityKey, AbilityScores } from '@/lib/types/character';
import { getAbilityModifier } from '@/lib/utils/calculations';
import { formatModifier } from '@/lib/utils/format';

interface AbilityScoresGridProps {
  scores: AbilityScores;
  isEditMode: boolean;
  onScoreChange: (ability: AbilityKey, value: number) => void;
}

export function AbilityScoresGrid({ scores, isEditMode, onScoreChange }: AbilityScoresGridProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Abilities</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Object.keys(scores).map(ability => {
          const key = ability as AbilityKey;
          const score = scores[key];
          const mod = getAbilityModifier(score);

          return (
            <Card key={ability}>
              <CardContent className="text-center">
                <div className="text-4xl">{formatModifier(mod)}</div>

                {isEditMode ? (
                  <Input
                    type="number"
                    value={score}
                    min={1}
                    max={30}
                    className="mt-2 text-center text-xl"
                    onChange={e => onScoreChange(key, parseInt(e.target.value) || 10)}
                  />
                ) : (
                  <div className="mt-2 text-xl">{score}</div>
                )}
              </CardContent>
              <CardFooter>
                <div className="w-full text-xl text-center">{ability.toUpperCase()}</div>
              </CardFooter>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
