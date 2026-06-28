'use client';

import { useState } from 'react';

import { AbilityScoresGrid } from '@/components/character-sheet/ability-scores-grid';
import { CharacterHeader } from '@/components/character-sheet/character-header';
import { CombatStats } from '@/components/character-sheet/combat-stats';
import { SavesAndSkills } from '@/components/character-sheet/saves-and-skills';
import { Card, CardContent } from '@/components/ui/card';
import { getProficiencyBonus } from '@/lib/utils/calculations';
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
      <CharacterHeader
        character={current}
        isEditMode={isEditMode}
        onStartEdit={startEditing}
        onSave={saveChanges}
        onCancel={cancelEditing}
        onNameChange={name =>
          updateDraft(prev => ({
            ...prev,
            name,
          }))
        }
        onRaceChange={race =>
          updateDraft(prev => ({
            ...prev,
            race,
          }))
        }
        onSubraceChange={subrace =>
          updateDraft(prev => ({
            ...prev,
            subrace,
          }))
        }
        onClassChange={charClass =>
          updateDraft(prev => ({
            ...prev,
            class: charClass,
          }))
        }
        onSubclassChange={subclass =>
          updateDraft(prev => ({
            ...prev,
            subclass,
          }))
        }
        onLevelChange={level =>
          updateDraft(prev => ({
            ...prev,
            level,
          }))
        }
        onBackgroundChange={background =>
          updateDraft(prev => ({
            ...prev,
            background,
          }))
        }
        onAlignmentChange={alignment =>
          updateDraft(prev => ({
            ...prev,
            alignment,
          }))
        }
      />
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
