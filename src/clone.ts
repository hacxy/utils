import { isArray, isDate, isMap, isNull, isObject, isRegExp, isSet } from './is';

/**
 * 深克隆函数
 * @param source 需要克隆的数据
 * @category 实用函数
 */
export function deepClone<T>(source: T): T {
  // 使用WeakMap解决循环引用
  const visited = new WeakMap<object, unknown>();

  function _clone<T>(value: T): T {
    // 1. 处理基本类型和函数
    if (!isObject(value) || isNull(value)) {
      return value;
    }

    // 2. 处理特殊对象类型
    if (isDate(value)) return new Date(value) as T;
    if (isRegExp(value)) return new RegExp(value) as T;

    // 3. 检查循环引用
    if (visited.has(value)) {
      return visited.get(value) as T;
    }

    // 4. 处理数组
    if (isArray(value)) {
      const result: unknown[] = [];
      visited.set(value, result);
      for (const item of value) {
        result.push(_clone(item));
      }
      return result as T;
    }

    // 5. 处理Map
    if (isMap(value)) {
      const result = new Map();
      visited.set(value, result);
      value.forEach((val, key) => {
        result.set(_clone(key), _clone(val));
      });
      return result as T;
    }

    // 6. 处理Set
    if (isSet(value)) {
      const result = new Set();
      visited.set(value, result);
      value.forEach(val => {
        result.add(_clone(val));
      });
      return result as T;
    }

    // 7. 处理普通对象
    const result: Record<string, unknown> = Object.create(
      Object.getPrototypeOf(value)
    );
    visited.set(value, result);

    // 获取对象自身所有属性（包括Symbol）
    const keys = [
      ...Object.getOwnPropertyNames(value),
      ...Object.getOwnPropertySymbols(value)
    ] as Array<keyof T>;

    for (const key of keys) {
      // 递归克隆每个属性
      result[key as string] = _clone(value[key]);
    }

    return result as T;
  }

  return _clone(source);
}
