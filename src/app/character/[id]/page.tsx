import { getCharacterById } from '@/app/actions/characters';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AbilityKey } from '@/lib/types/character';
import { getAbilityModifier, getProficiencyBonus } from '@/lib/utils/calculations';
import { toTitleCase } from '@/lib/utils/strings';

function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = await getCharacterById(id);

  if (!character) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <h1 className="text-6xl text-red-500">Error 500: Internal Server Error</h1>
      </div>
    );
  }

  const proficiencyBonus = getProficiencyBonus(character.level);

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">{character.name}</CardTitle>
          <CardDescription className="flex justify-between text-xl">
            <span>
              {toTitleCase(character.race, '-', '-')}&nbsp;
              {character.subrace && `(${toTitleCase(character.subrace, '-')})`}&nbsp;
              {toTitleCase(character.class, '-')}&nbsp;
              {character.subclass && `(${toTitleCase(character.subclass, '-')})`}&nbsp; | Level{' '}
              {character.level}
            </span>
            <span>
              {toTitleCase(character.background, '-')}&nbsp;|&nbsp;
              {character.alignment}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          {/* Abilities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Abilities</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {Object.keys(character.abilityScores).map(ability => {
                const score = character.abilityScores[ability as AbilityKey];
                const mod = getAbilityModifier(score);

                return (
                  <Card key={ability}>
                    <CardContent className="text-center">
                      <div className="text-4xl">{formatModifier(mod)}</div>
                      <div className="mt-2 text-xl">{score}</div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full text-xl text-center">{ability.toUpperCase()}</div>
                    </CardFooter>
                  </Card>
                );
              })}
            </CardContent>
          </Card>

          {/* Saves & Skills */}
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
                <CardContent className="flex flex-col gap-2">
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
                        const proficient = character.savingThrows?.[save as AbilityKey] ?? false;
                        const mod = getAbilityModifier(character.abilityScores[save as AbilityKey]);
                        const total = proficient ? mod + proficiencyBonus : mod;

                        return (
                          <TableRow key={`${save}-save`}>
                            <TableCell>{save.toUpperCase()}</TableCell>
                            <TableCell className="font-mono">{formatModifier(total)}</TableCell>
                            <TableCell>
                              <Checkbox checked={proficient} />
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
                              <Checkbox checked={skill.proficient} />
                            </TableCell>
                            <TableCell>
                              <Checkbox checked={skill.expert} />
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

          {/* Combat Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Combat Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Proficiency Bonus</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto text-center text-4xl">
                  +{proficiencyBonus}
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Hit Points</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto text-center text-4xl">
                  {character.hitPoints.current} / {character.hitPoints.maximum}
                  {character.hitPoints.temporary && ` + ${character.hitPoints.temporary}`}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Initiative</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto text-center text-4xl">
                  {formatModifier(getAbilityModifier(character.abilityScores.dex))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Speed</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto text-center text-4xl">
                  {character.speed} ft.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Armor Class</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto text-center text-4xl">
                  {character.armorClass}
                </CardContent>
              </Card>

              {/* Extra Proficiencies */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Extra Proficiencies</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  {Object.keys(character.proficiencies).map(category => (
                    <div key={category} className="border-b p-1 last:border-none">
                      <strong>{toTitleCase(category)}:</strong>&nbsp;
                      {character.proficiencies[category as keyof typeof character.proficiencies]
                        .length === 0
                        ? 'None'
                        : character.proficiencies[category as keyof typeof character.proficiencies]
                            .map(item => toTitleCase(item, '-'))
                            .join(', ')}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
