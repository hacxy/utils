import { isArray } from './is';

/**
 * 尝试解析 JSON 字符串
 * @param value - 要解析的字符串
 * @returns 解析后的值或原字符串
 */
function tryParseJson(value: string): any {
  if (value === '') return null;

  try {
    // 只尝试解析可能是 JSON 的字符串
    if ((value.startsWith('{') && value.endsWith('}'))
      || (value.startsWith('[') && value.endsWith(']'))) {
      return JSON.parse(value);
    }
    return value;
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (_) {
    return value;
  }
}
/**
 * 将 URL 查询字符串解析为对象
 * @category 实用函数
 * @param searchStr - 查询字符串（可带或不带问号）
 * @returns 解析后的对象
 */
export function parseSearchString(searchStr: string): Record<string, any> {
  // 移除开头的问号（如果存在）
  const cleanStr = searchStr.startsWith('?')
    ? searchStr.slice(1)
    : searchStr;

  const params = new URLSearchParams(cleanStr);
  const result: Record<string, any> = {};

  for (const [key, value] of params.entries()) {
    // 尝试解析 JSON 字符串
    const parsedValue = tryParseJson(value);

    // eslint-disable-next-line no-prototype-builtins
    if (result.hasOwnProperty(key)) {
      // 键已存在：转换为数组或追加到数组
      if (isArray(result[key])) {
        result[key].push(parsedValue);
      }
      else {
        result[key] = [result[key], parsedValue];
      }
    }
    else {
      // 新键：直接赋值
      result[key] = parsedValue;
    }
  }

  return result;
}
