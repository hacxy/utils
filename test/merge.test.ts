import { expect, it } from 'vitest';
import { mergeObject } from '../src/index.ts';

it('mergeObject', () => {
  const input1 = { a: 'a', b: 'b', d: [1, 2] };
  const input2 = { c: 'c', d: [3] };
  const result1 = { a: 'a', b: 'b', c: 'c', d: [3] };
  const result2 = { a: 'a', b: 'b', c: 'c', d: [1, 2, 3] };
  const value1 = mergeObject(input1, input2, { arrayMerge: 'replace' });
  expect(value1).toEqual(result1);
  const value2 = mergeObject(input1, input2, { arrayMerge: 'merge' });
  expect(value2).toEqual(result2);
});
