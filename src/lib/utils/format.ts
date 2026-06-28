// =========
// Numbers
// =========
export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// =========
// Strings
// =========
type Separator = ' ' | '-' | '_';

export function toTitleCase(
  str: string,
  oldSeparator: Separator = ' ',
  newSeparator: Separator = ' ',
): string {
  const exceptions = new Set([
    'a',
    'an',
    'the',
    'and',
    'but',
    'or',
    'nor',
    'for',
    'at',
    'by',
    'from',
    'in',
    'into',
    'of',
    'off',
    'on',
    'onto',
    'out',
    'over',
    'to',
    'up',
    'with',
    'as',
    'per',
    'via',
  ]);

  const words = str.toLowerCase().split(oldSeparator);

  return words
    .map((word, index) => {
      if (index === 0 || index === words.length - 1) {
        return word.charAt(0).toUpperCase().concat(word.slice(1));
      }

      if (exceptions.has(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase().concat(word.slice(1));
    })
    .join(newSeparator);
}

export function shorten(input: string, charLimit: number): string {
  return input.slice(0, charLimit - 1).concat('...');
}

export function valuize(input: string): string {
  return input.toLowerCase().split(' ').join('-');
}
