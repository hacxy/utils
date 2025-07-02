import { expect, it } from 'vitest';
import { arrayIncludes } from '../src/array-includes.ts';

it('arrayIncludes', () => {
  const input = [1, 2, 3];
  const value1 = arrayIncludes(input, 1);
  expect(value1).toEqual(true);
  const value2 = arrayIncludes(input, 4);
  expect(value2).toEqual(false);
});

