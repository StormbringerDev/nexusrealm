export function getAbilityModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2);
}

export function getProficiencyBonus(level: number): number {
  return Math.floor(2 + level / 4);
}
