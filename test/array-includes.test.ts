import { expect, it } from 'vitest';
import { arrayIncludes } from '../src/array-includes.ts';

it('arrayIncludes', () => {
  const input = [1, 2, 3];
  const value = arrayIncludes(input, 1);
  expect(value).toEqual(true);
});

