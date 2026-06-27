'use client';

import { useState } from 'react';

import { AbilityScoresGrid } from '@/components/character-sheet/ability-scores-grid';
import { CombatStats } from '@/components/character-sheet/combat-stats';
import { SavesAndSkills } from '@/components/character-sheet/saves-and-skills';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getProficiencyBonus } from '@/lib/utils/calculations';
import { toTitleCase } from '@/lib/utils/strings';
import type { Character } from '@/lib/types/character';

interface CharacterSheetProps {
  character: Character;
  onSave?: (updated: Character) => void;
}

export function CharacterSheet({ character, onSave }: CharacterSheetProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [draft, setDraft] = useState<Character | null>(null);

  const current = isEditMode && draft ? draft : character;
  const proficiencyBonus = getProficiencyBonus(current.level);

  const startEditing = () => {
    setDraft(structuredClone(character));
    setIsEditMode(true);
  };

  const cancelEditing = () => {
    setDraft(null);
    setIsEditMode(false);
  };

  const saveChanges = () => {
    if (draft && onSave) {
      onSave(draft);
    }
    setDraft(null);
    setIsEditMode(false);
  };

  const updateDraft = (updater: (prev: Character) => Character) => {
    setDraft(prev => (prev ? updater(prev) : prev));
  };

  return (
    <Card>
      <CardHeader>
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
        <CardAction>
          {isEditMode ? (
            <>
              <Button variant="outline" onClick={cancelEditing}>
                Cancel
              </Button>
              <Button className="ml-1" onClick={saveChanges}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={startEditing}>Edit</Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-2">
        <AbilityScoresGrid
          scores={current.abilityScores}
          isEditMode={isEditMode}
          onScoreChange={(ability, value) =>
            updateDraft(prev => ({
              ...prev,
              abilityScores: { ...prev.abilityScores, [ability]: value },
            }))
          }
        />

        <SavesAndSkills
          character={current}
          isEditMode={isEditMode}
          proficiencyBonus={proficiencyBonus}
          onToggleSave={(ability, proficient) =>
            updateDraft(prev => ({
              ...prev,
              savingThrows: { ...prev.savingThrows, [ability]: proficient },
            }))
          }
          onToggleSkill={(skillName, field, value) =>
            updateDraft(prev => ({
              ...prev,
              skills: prev.skills.map(s => (s.name === skillName ? { ...s, [field]: value } : s)),
            }))
          }
        />

        <CombatStats
          character={current}
          isEditMode={isEditMode}
          proficiencyBonus={proficiencyBonus}
          onHitPointsChange={hitPoints => updateDraft(prev => ({ ...prev, hitPoints }))}
          onSpeedChange={speed => updateDraft(prev => ({ ...prev, speed }))}
          onArmorClassChange={armorClass => updateDraft(prev => ({ ...prev, armorClass }))}
          onProficienciesChange={proficiencies => updateDraft(prev => ({ ...prev, proficiencies }))}
        />
      </CardContent>
    </Card>
  );
}
