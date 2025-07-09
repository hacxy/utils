import { assert, it } from 'vitest';
import { getTimestamp } from '../src';

it('getTimestamp', () => {
  const timestamp = getTimestamp();
  const timestampSeconds = getTimestamp('seconds');
  assert.isNumber(timestamp);
  assert.isNumber(timestampSeconds);
});
