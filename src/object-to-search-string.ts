import { isArray, isNull, isObject, isUndefined } from './is';

/**
 * 将对象转换为URL查询字符串
 * @category 实用函数
 * @param obj - 要转换的对象
 * @returns 生成的查询字符串（不带问号）
 */
export function objectToSearchString(obj: Record<string, any>): string {
  const params = new URLSearchParams();

  const processValue = (key: string, value: any): void => {
    // 处理数组
    if (isArray(value)) {
      value.forEach(item => processValue(key, item));
    }
    // 处理对象（非数组、非null）
    else if (isObject(value)) {
      params.append(key, JSON.stringify(value));
    }
    // 处理基础类型（包括null和undefined）
    else {
      // 显式转换所有值为字符串（处理boolean/number等类型）
      const stringValue = isNull(value) || isUndefined(value)
        ? ''
        : String(value);
      params.append(key, stringValue);
    }
  };

  // 遍历对象的所有键
  Object.entries(obj).forEach(([key, value]) => {
    // 跳过undefined值的属性
    if (isUndefined(value)) return;
    processValue(key, value);
  });

  return params.toString();
}
