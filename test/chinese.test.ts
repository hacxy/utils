import { assert, describe, it } from 'vitest';
import { hasChinese, isChinesePhoneNumber } from '../src/index.ts';

describe('chinese', () => {
  it('字符串包含中文', () => {
    assert.isTrue(hasChinese('你好, hello'));
  });
  it('不包含中文字符', () => {
    assert.isFalse(hasChinese('hello'));
  });

  it('是中国电话号码', () => {
    assert.isTrue(isChinesePhoneNumber('15612341234'));
  });
  it('不是中国电话号码', () => {
    assert.isFalse(isChinesePhoneNumber('12312341234'));
  });
});

