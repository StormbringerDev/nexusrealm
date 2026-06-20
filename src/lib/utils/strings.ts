type Separator = ' ' | '-' | '_';

export function toTitleCase(
  input: string,
  oldSeparator: Separator = ' ',
  newSeparator: Separator = ' ',
): string {
  return input
    .toLowerCase()
    .split(oldSeparator)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(newSeparator);
}

export function shorten(input: string, charLimit: number): string {
  return input.slice(0, charLimit - 1).concat('...');
}
