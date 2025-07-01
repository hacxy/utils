import { assert, expect, it } from 'vitest';
import { objectKeys } from '../src/object-keys.ts';

it('objectKeys', () => {
  const input = { a: 1, b: 2 };
  const expected = ['a', 'b'];
  const value = objectKeys(input);

  expect(value).toEqual(expected);

  assert.isArray(value);
});
