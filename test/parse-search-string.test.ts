import { expect, it } from 'vitest';
import { parseSearchString } from '../src';

it('parseSearchString', () => {
  const input1 = 'a=a&b=1&b=2&b=3';
  const input2 = 'a=a&b=%7B%22foo%22%3A%22foo%22%7D&b=%7B%22bar%22%3A%22bar%22%7D';
  const expected1 = { a: 'a', b: ['1', '2', '3'] };
  const expected2 = { a: 'a', b: [{ foo: 'foo' }, { bar: 'bar' }] };
  expect(parseSearchString(input1)).toEqual(expected1);
  expect(parseSearchString(input2)).toEqual(expected2);
});
