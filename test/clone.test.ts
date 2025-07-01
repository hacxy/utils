import { assert, expect, it } from 'vitest';
import { deepClone } from '../src/clone.ts';

it('deepClone', () => {
  const input = { a: 'aa', b: 'bb', c: { foo: [1, 2, 3] } };
  const result = deepClone(input);
  expect(result).toEqual(input);
  assert.isFalse(result === input);
  assert.isFalse(result.c.foo === input.c.foo);
});
