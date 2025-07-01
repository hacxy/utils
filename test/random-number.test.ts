import { assert, it } from 'vitest';
import { randomNumber } from '../src/random-number.ts';

it('randomNumber', () => {
  assert.isNumber(randomNumber());
});
