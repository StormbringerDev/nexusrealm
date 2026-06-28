'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAbilityModifier } from '@/lib/utils/calculations';
import { formatModifier } from '@/lib/utils/format';
import type { AbilityKey, Character } from '@/lib/types/character';

interface SavesAndSkillsProps {
  character: Character;
  isEditMode: boolean;
  proficiencyBonus: number;
  onToggleSave: (ability: AbilityKey, proficient: boolean) => void;
  onToggleSkill: (skillName: string, field: 'proficient' | 'expert', value: boolean) => void;
}

export function SavesAndSkills({
  character,
  isEditMode,
  proficiencyBonus,
  onToggleSave,
  onToggleSkill,
}: SavesAndSkillsProps) {
  return (
    <Card className="row-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Saves &amp; Skills</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Saving Throws */}
        <Card>
          <CardHeader>
            <CardTitle>Saving Throws</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ability</TableHead>
                  <TableHead>Mod</TableHead>
                  <TableHead>Proficient</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(character.abilityScores).map(save => {
                  const key = save as AbilityKey;
                  const proficient = character.savingThrows?.[key] ?? false;
                  const mod = getAbilityModifier(character.abilityScores[key]);
                  const total = proficient ? mod + proficiencyBonus : mod;

                  return (
                    <TableRow key={`${save}-save`}>
                      <TableCell>{save.toUpperCase()}</TableCell>
                      <TableCell className="font-mono">{formatModifier(total)}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={proficient}
                          disabled={!isEditMode}
                          onCheckedChange={checked => {
                            if (isEditMode) {
                              onToggleSave(key, !!checked);
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill</TableHead>
                  <TableHead>Ability</TableHead>
                  <TableHead>Proficient</TableHead>
                  <TableHead>Expert</TableHead>
                  <TableHead>Mod</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {character.skills.map(skill => {
                  const mod = getAbilityModifier(
                    character.abilityScores[skill.ability as AbilityKey],
                  );
                  const bonus = skill.expert
                    ? 2 * proficiencyBonus
                    : skill.proficient
                      ? proficiencyBonus
                      : 0;
                  const total = mod + bonus;

                  return (
                    <TableRow key={skill.name}>
                      <TableCell>{skill.name}</TableCell>
                      <TableCell>{skill.ability.toUpperCase()}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={skill.proficient}
                          disabled={!isEditMode}
                          onCheckedChange={checked => {
                            if (isEditMode) {
                              onToggleSkill(skill.name, 'proficient', !!checked);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={skill.expert}
                          disabled={!isEditMode}
                          onCheckedChange={checked => {
                            if (isEditMode) {
                              onToggleSkill(skill.name, 'expert', !!checked);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-mono">{formatModifier(total)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
