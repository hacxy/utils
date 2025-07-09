import { expect, it } from 'vitest';
import { objectHasOwn } from '../src';

it('objectHasOwn', () => {
  const foo = { a: 'a' };
  expect(objectHasOwn(foo, 'a')).toEqual(true);
});
