import randomstring from 'randomstring';

export function generateAlphanumericString(length: number) {
  return randomstring.generate({ length, charset: 'alphanumeric' });
}

export function generateNumericString(length: number) {
  return randomstring.generate({ length, charset: 'numeric' });
}

export function generateAlphabeticString(length: number) {
  return randomstring.generate({ length, charset: 'alphabetic' });
}

export function generateAlphanumericWithSymbolsString(length: number) {
  const symbolsArray = [
    'alphanumeric',
    '[',
    '`',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '_',
    '+',
    '-',
    '=',
    '[',
    ']',
    '{',
    '}',
    ';',
    "'",
    ':',
    '"',
    '\\',
    '|',
    ',',
    '.',
    '<',
    '>',
    '/',
    '?',
    '~',
    ']',
    '/',
    ' ',
  ];
  return randomstring.generate({
    length,
    charset: symbolsArray,
  });
}

export function stringComparison(stringOne: string, stringTwo: string): number {
  let result: number = 0;
  if (stringOne > stringTwo) result = 1;
  if (stringOne < stringTwo) result = -1;
  return result;
}
