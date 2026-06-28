'use client';

import { AlignmentSelect } from '@/components/alignment-select';
import { Button } from '@/components/ui/button';
import { CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toTitleCase, valuize } from '@/lib/utils/format';
import type { Alignment, Character } from '@/lib/types/character';

interface CharacterHeaderProps {
  character: Character;
  isEditMode: boolean;
  onStartEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onNameChange: (name: string) => void;
  onRaceChange: (race: string) => void;
  onSubraceChange: (subrace: string | undefined) => void;
  onClassChange: (charClass: string) => void;
  onSubclassChange: (subclass: string | undefined) => void;
  onLevelChange: (level: number) => void;
  onBackgroundChange: (background: string) => void;
  onAlignmentChange: (alignment: Alignment) => void;
}

export function CharacterHeader({
  character,
  isEditMode,
  onStartEdit,
  onSave,
  onCancel,
  onNameChange,
  onRaceChange,
  onSubraceChange,
  onClassChange,
  onSubclassChange,
  onLevelChange,
  onBackgroundChange,
  onAlignmentChange,
}: CharacterHeaderProps) {
  return (
    <CardHeader>
      {isEditMode ? (
        <>
          <CardTitle>
            <Input
              placeholder="Character Name"
              value={character.name}
              className="w-40"
              onChange={e => onNameChange(e.target.value)}
            />
          </CardTitle>
          <CardDescription className="flex flex-col gap-1">
            <div className="flex gap-1">
              <Input
                placeholder="Character Race"
                value={toTitleCase(character.race, '-', '-')}
                className="w-40"
                onChange={e => onRaceChange(valuize(e.target.value))}
              />
              <Input
                placeholder="Character Subrace"
                value={character.subrace !== undefined ? toTitleCase(character.subrace, '-') : ''}
                className="w-48"
                onChange={e =>
                  onSubraceChange(e.target.value.length !== 0 ? valuize(e.target.value) : undefined)
                }
              />
            </div>
            <div className="flex gap-1">
              <Input
                placeholder="Character Class"
                value={toTitleCase(character.class, '-')}
                className="w-40"
                onChange={e => onClassChange(e.target.value)}
              />
              <Input
                placeholder="Character Subclass"
                value={character.subclass !== undefined ? toTitleCase(character.subclass, '-') : ''}
                className="w-48"
                onChange={e =>
                  onSubclassChange(
                    e.target.value.length !== 0 ? valuize(e.target.value) : undefined,
                  )
                }
              />
              <Input
                type="number"
                value={character.level}
                min={1}
                max={20}
                className="w-16"
                onChange={e => onLevelChange(parseInt(e.target.value))}
              />
            </div>
            <div className="flex gap-1">
              <Input
                placeholder="Character Background"
                value={toTitleCase(character.background, '-')}
                className="w-40"
                onChange={e => onBackgroundChange(e.target.value)}
              />
              <AlignmentSelect value={character.alignment} onAlignmentChange={onAlignmentChange} />
            </div>
          </CardDescription>
        </>
      ) : (
        <>
          <CardTitle className="text-4xl">{character.name}</CardTitle>
          <CardDescription className="text-xl">
            {toTitleCase(character.race, '-', '-')}&nbsp;
            {character.subrace && `(${toTitleCase(character.subrace, '-')})`}
            <br />
            {toTitleCase(character.class, '-')}&nbsp;
            {character.subclass && `(${toTitleCase(character.subclass, '-')})`} | Level{' '}
            {character.level}
            <br />
            {toTitleCase(character.background, '-')}&nbsp;|&nbsp;
            {character.alignment}
          </CardDescription>
        </>
      )}
      <CardAction>
        {isEditMode ? (
          <>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="ml-1" onClick={onSave}>
              Save Changes
            </Button>
          </>
        ) : (
          <Button onClick={onStartEdit}>Edit</Button>
        )}
      </CardAction>
    </CardHeader>
  );
}
