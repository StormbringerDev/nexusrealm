// ==========
// Numbers
// ==========
export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// ==========
// Strings
// ==========
export function iconize(name: string): string {
  const words = name.split(/[ _-]+/);
  if (words.length === 1) return words.at(0)?.charAt(0).toUpperCase() || '';
  const icon =
    words
      .at(0)
      ?.charAt(0)
      .toUpperCase()
      .concat(words.at(-1)?.charAt(0).toUpperCase() || '') || '';

  return icon;
}
