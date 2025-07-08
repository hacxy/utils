import { assert, expect, it } from 'vitest';
import { deepClone } from '../src/index.ts';

it('deepClone', () => {
  const input = { a: 'aa', b: 'bb', c: { foo: [1, 2, 3] } };
  const result = deepClone(input);
  expect(result).toEqual(input);
  assert.isFalse(result === input);
  assert.isFalse(result.c.foo === input.c.foo);

  const mapInput = new Map<string, { name: string, friend: string[] }>();
  mapInput.set('foo', { name: 'hacxy', friend: ['aaa', 'bbb', 'ccc'] });
  const newMapResult = deepClone(mapInput);
  assert.isFalse(newMapResult === mapInput);

  const setInput = new Set([1, 2, 3]);
  const newSetResult = deepClone(setInput);
  assert.isFalse(newSetResult === setInput);

  const obj1: { ref: any } = { ref: null };
  const obj2: { ref: any } = { ref: null };
  obj1.ref = obj2;
  obj2.ref = obj1;
  const objResult = deepClone(obj1);
  assert.isFalse(obj1 === objResult);
});
