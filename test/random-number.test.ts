import { assert, it } from 'vitest';
import { randomNumber } from '../src/index.ts';

it('randomNumber', () => {
  assert.isNumber(randomNumber());
});
