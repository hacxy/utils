import { expect, it } from 'vitest';
import { objectToSearchString } from '../src';

it('objectToSearchString', () => {
  const input1 = { a: 'a', b: [1, 2, 3] };
  const input2 = { a: 'a', b: [{ foo: 'foo' }, { bar: 'bar' }] };
  const expected1 = 'a=a&b=1&b=2&b=3';
  const expected2 = 'a=a&b=%7B%22foo%22%3A%22foo%22%7D&b=%7B%22bar%22%3A%22bar%22%7D';
  expect(objectToSearchString(input1)).toEqual(expected1);
  expect(objectToSearchString(input2)).toEqual(expected2);
});
