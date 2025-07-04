import type { Finite } from './types';

/**
 * 用于判断是否为null
 * @category 类型守卫
 */
export function isNull(value: unknown): value is null {
  return value === null;
}
/**
 * 用于判断是否为布尔值类型
 * @category 类型守卫
 */
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false;
}

/**
 * 用于判断是否为字符串类型
 * @category 类型守卫
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * 用于判断是否为数组类型
 * @param value 任意值
 * @param assertion 断言方法
 * @category 类型守卫
 */
export function isArray<T = unknown>(value: unknown, assertion?: (value: T) => value is T): value is T[] {
  if (!Array.isArray(value)) {
    return false;
  }

  if (!isFunction(assertion)) {
    return true;
  }

  if (isEmptyArray(value)) {
    return false;
  }

  return value.every(element => assertion(element));
}

/**
 * @category 类型守卫
 */
export function isEmptyArray(array: unknown[]): array is never[] {
  return array.length === 0;
}

/**
 * @category 类型守卫
 */
// eslint-disable-next-line ts/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 *
 * Check whether a value is defined, meaning it is not `undefined`.
 * This can be useful as a type guard, as for example, `[1, undefined].filter(Boolean)` does not always type-guard correctly.
 * @example
 *
 *```
 * import {isDefined} from 'ts-extras';
 * [1, undefined, 2].filter(isDefined);
 * //=> [1, 2]
 * ```
 * @category 类型守卫
 *
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * 是否为对象
 * @category 类型守卫
 */
export function isObject(value: unknown): value is object {
  return !isNull(value) && (typeof value === 'object' || isFunction(value));
}

/**
 * 是否为NaN
 * @category 类型守卫
 */
export function isNan(value: unknown) {
  return Number.isNaN(value);
}

/**
 * 是否为undefined
 * @category 类型守卫
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * 是否为数字类型
 * @category 类型守卫
 */
export function isNil(value: unknown) {
  return isUndefined(value) || isNull(value);
}

/**
 * 是否为数字类型
 * @category 类型守卫
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * 是否为普通的对象
 * @category 类型守卫
 */
export function isPlainObject<Value = unknown>(value: unknown): value is Record<PropertyKey, Value> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}

/**
 * 用于判断传入的值是否为有限数
 * 也就是说，它检查给定的值是否为数字，并且该数字既不是无穷大 Infinity ，也不是无穷小 Infinity ，更不是NaN
 * 另外这是一个作为类型守卫正确工作的 `Number.isFinite()` 的替代方案
 * @category 类型守卫
 */
export const isFinite = <T>(value: T) => Number.isFinite(value) as unknown as <T extends number>(value: T) => value is Finite<T>;

