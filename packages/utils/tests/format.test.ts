import { describe, expect, it } from 'vitest';
import { formatModifier, iconize } from '../src/format.ts';

// ==========
// Numbers
// ==========
describe('Format modifier', () => {
  it('should return "+2" with modifier of 2', () => {
    expect(formatModifier(2)).toBe('+2');
  });

  it('should return "-2" with modifier of -2', () => {
    expect(formatModifier(-2)).toBe('-2');
  });

  it('should return "+0" with modifier of 0', () => {
    expect(formatModifier(0)).toBe('+0');
  });
});

// ==========
// Strings
// ==========
describe('Iconize function', () => {
  it('should return "J" with 1 word', () => {
    expect(iconize('JohnDoe')).toBe('J');
  });

  it('should return "JD" with 2 words', () => {
    expect(iconize('John Doe')).toBe('JD');
  });

  it('should return "JD" with more than 2 words', () => {
    expect(iconize('Johnathan Matthew Doe')).toBe('JD');
  });

  it('should return "JD" with 2 words separated by an underscore', () => {
    expect(iconize('John_Doe')).toBe('JD');
  });

  it('should return "JD" with 2 words separated by a hyphen', () => {
    expect(iconize('John-Doe')).toBe('JD');
  });
});
