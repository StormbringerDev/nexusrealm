'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAbilityModifier } from '@/lib/utils/calculations';
import { formatModifier, toTitleCase } from '@/lib/utils/format';
import type { Character } from '@/lib/types/character';
import { X } from 'lucide-react';

interface CombatStatsProps {
  character: Character;
  isEditMode: boolean;
  proficiencyBonus: number;
  onHitPointsChange: (hitPoints: Character['hitPoints']) => void;
  onSpeedChange: (speed: number) => void;
  onArmorClassChange: (armorClass: number) => void;
  onProficienciesChange: (proficiencies: Character['proficiencies']) => void;
}

export function CombatStats({
  character,
  isEditMode,
  proficiencyBonus,
  onHitPointsChange,
  onSpeedChange,
  onArmorClassChange,
  onProficienciesChange,
}: CombatStatsProps) {
  const [newProficiency, setNewProficiency] = useState<Record<string, string>>({});

  const handleAddProficiency = (category: string) => {
    const value = newProficiency[category]?.trim();
    if (!value) return;

    const currentItems =
      character.proficiencies?.[category as keyof typeof character.proficiencies] || [];

    if (currentItems.includes(value)) return;

    const updated = {
      ...character.proficiencies,
      [category]: [...currentItems, value],
    };

    onProficienciesChange(updated);
    setNewProficiency(prev => ({ ...prev, [category]: '' }));
  };

  const handleRemoveProficiency = (category: string, item: string) => {
    const currentItems =
      character.proficiencies?.[category as keyof typeof character.proficiencies] || [];

    const updatedItems = currentItems.filter(i => i !== item);

    const updated = {
      ...character.proficiencies,
      [category]: updatedItems,
    };

    onProficienciesChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Combat Stats</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        {/* Proficiency Bonus */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Proficiency Bonus</CardTitle>
          </CardHeader>
          <CardContent className="mt-auto text-center text-4xl">+{proficiencyBonus}</CardContent>
        </Card>

        {/* Hit Points */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-center">Hit Points</CardTitle>
          </CardHeader>
          <CardContent className="mt-auto flex flex-col items-center justify-center gap-2">
            {isEditMode ? (
              <div className="flex items-center gap-3 text-4xl">
                <Input
                  type="number"
                  value={character.hitPoints.current}
                  min={0}
                  className="w-20 text-center text-4xl"
                  onChange={e =>
                    onHitPointsChange({
                      ...character.hitPoints,
                      current: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <span>/</span>
                <Input
                  type="number"
                  value={character.hitPoints.maximum}
                  min={0}
                  className="w-20 text-center text-4xl"
                  onChange={e =>
                    onHitPointsChange({
                      ...character.hitPoints,
                      maximum: parseInt(e.target.value) || 0,
                    })
                  }
                />
                {character.hitPoints.temporary !== undefined && (
                  <>
                    <span>+</span>
                    <Input
                      type="number"
                      value={character.hitPoints.temporary}
                      min={0}
                      className="w-16 text-center text-4xl"
                      onChange={e =>
                        onHitPointsChange({
                          ...character.hitPoints,
                          temporary: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="text-center text-4xl">
                {character.hitPoints.current} / {character.hitPoints.maximum}
                {character.hitPoints.temporary && ` + ${character.hitPoints.temporary}`}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Initiative */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Initiative</CardTitle>
          </CardHeader>
          <CardContent className="mt-auto text-center text-4xl">
            {formatModifier(getAbilityModifier(character.abilityScores.dex))}
          </CardContent>
        </Card>

        {/* Speed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Speed</CardTitle>
          </CardHeader>
          <CardContent className="mt-auto text-center text-4xl">
            {isEditMode ? (
              <div className="flex items-center justify-center gap-2">
                <Input
                  type="number"
                  value={character.speed}
                  min={0}
                  max={120}
                  className="w-24 text-center text-4xl"
                  onChange={e => onSpeedChange(parseInt(e.target.value) || 0)}
                />
                <span className="text-xl">ft.</span>
              </div>
            ) : (
              `${character.speed} ft.`
            )}
          </CardContent>
        </Card>

        {/* Armor Class */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Armor Class</CardTitle>
          </CardHeader>
          <CardContent className="mt-auto text-center text-4xl">
            {isEditMode ? (
              <Input
                type="number"
                value={character.armorClass}
                min={1}
                max={30}
                className="w-24 text-center text-4xl"
                onChange={e => onArmorClassChange(parseInt(e.target.value) || 1)}
              />
            ) : (
              character.armorClass
            )}
          </CardContent>
        </Card>

        {/* Extra Proficiencies */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Extra Proficiencies</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {Object.keys(character.proficiencies || {}).map(category => {
              const items =
                character.proficiencies[category as keyof typeof character.proficiencies] || [];

              return (
                <div key={category} className="border-b pb-3 last:border-none">
                  <div className="mb-1.5 font-semibold">{toTitleCase(category)}:</div>

                  {items.length === 0 && !isEditMode && (
                    <div className="text-muted-foreground">None</div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-sm"
                      >
                        {toTitleCase(item, '-')}
                        {isEditMode && (
                          <button
                            onClick={() => handleRemoveProficiency(category, item)}
                            className="ml-1 text-muted-foreground hover:text-destructive"
                          >
                            <X />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {isEditMode && (
                    <div className="mt-2 flex gap-2">
                      <Input
                        placeholder={`Add ${category}...`}
                        value={newProficiency[category] || ''}
                        onChange={e =>
                          setNewProficiency(prev => ({
                            ...prev,
                            [category]: e.target.value,
                          }))
                        }
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            handleAddProficiency(category);
                          }
                        }}
                        className="h-8"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleAddProficiency(category)}
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
