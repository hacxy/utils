import { assert, describe, it } from 'vitest';
import { hasChinese } from '../src/chinese.ts';

describe('chinese', () => {
  it('字符串包含中文', () => {
    assert.isTrue(hasChinese('你好, hello'));
  });

  it('不包含中文字符', () => {
    assert.isFalse(hasChinese('hello'));
  });
});

