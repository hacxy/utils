/* eslint-disable max-lines */
import type { Class, Finite, NodeBuffer, NonEmptyString, WeakRef } from './types';
import { DOM_PROPERTIES_TO_CHECK, NODE_TYPE_ELEMENT, objectTypeNames } from './constants';

type ObjectTypeName = typeof objectTypeNames[number];

function isObjectTypeName(name: unknown): name is ObjectTypeName {
  return objectTypeNames.includes(name as ObjectTypeName);
}

function getObjectType(value: unknown): ObjectTypeName | undefined {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);

  if (/HTML\w+Element/.test(objectTypeName) && isHtmlElement(value)) {
    return 'HTMLElement';
  }

  if (isObjectTypeName(objectTypeName)) {
    return objectTypeName;
  }

  return undefined;
}

/**
 * 用于判断是否为Date类型
 * @category 类型守卫
 */
export function isDate(value: unknown): value is Date {
  return getObjectType(value) === 'Date';
}

/**
 * 用于判断是否为RegExp类型
 * @category 类型守卫
 */
export function isRegExp(value: unknown): value is RegExp {
  return getObjectType(value) === 'RegExp';
}

/**
 * 用于判断是否为非空字符串
 * @category 类型守卫
 */
export function isNonEmptyString(value: unknown): value is NonEmptyString {
  return isString(value) && value.length > 0;
}

/**
 * 用于判读是否为HtmlElement
 * @category 类型守卫
 */
export function isHtmlElement(value: unknown): value is HTMLElement {
  return isObject(value)
    && (value as HTMLElement).nodeType === NODE_TYPE_ELEMENT
    && isString((value as HTMLElement).nodeName)
    && !isPlainObject(value)
    && DOM_PROPERTIES_TO_CHECK.every(property => property in value);
}

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

/**
 * 用于判断是否为Map类型
 * @category 类型守卫
 */
export function isMap<Key = unknown, Value = unknown>(value: unknown): value is Map<Key, Value> {
  return getObjectType(value) === 'Map';
}

/**
 * 用于判断是否为Set类型
 * @category 类型守卫
 */
export function isSet<T = unknown>(value: unknown): value is Set<T> {
  return getObjectType(value) === 'Set';
}

/**
 * 用于判断是否为Symbol类型
 * @category 类型守卫
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

/**
 * 用于判断是否为Blob类型
 * @category 类型守卫
 */
export function isBlob(value: unknown): value is Blob {
  return getObjectType(value) === 'Blob';
}
/**
 * 用于判断是否为Buffer类型
 * @category 类型守卫
 */
export function isBuffer(value: unknown): value is NodeBuffer {
  return (value as any)?.constructor?.isBuffer?.(value) ?? false;
}
/**
 * 用于判断是否为Url字符串
 * @category 类型守卫
 */
export function isUrlString(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }
  try {
    new URL(value); // eslint-disable-line no-new
    return true;
  }
  catch {
    return false;
  }
}

/**
 * 用于判断是否为ArrayBuffer类型
 * @category 类型守卫
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return getObjectType(value) === 'ArrayBuffer';
}

/**
 * 用于判断是否为FormData类型
 * @category 类型守卫
 */
export function isFormData(value: unknown): value is FormData {
  return getObjectType(value) === 'FormData';
}
/**
 * 用于判断是否为空对象
 * @category 类型守卫
 */
export function isEmptyObject<Key extends keyof any = string>(value: unknown): value is Record<Key, never> {
  return isObject(value) && !isMap(value) && !isSet(value) && Object.keys(value).length === 0;
}
/**
 * 用于判断是否为空的Map类型
 * @category 类型守卫
 */
export function isEmptyMap(value: unknown): value is Map<never, never> {
  return isMap(value) && value.size === 0;
}
/**
 * 用于判断是否为空的Set类型
 * @category 类型守卫
 */
export function isEmptySet(value: unknown): value is Set<never> {
  return isSet(value) && value.size === 0;
}
/**
 * 用于判断是否为空的Array类型
 * @category 类型守卫
 */
export function isEmptyArray(array: unknown[]): array is never[] {
  return array.length === 0;
}

/**
 * 用于判断是否为Class类型
 * @category 类型守卫
 */
export function isClass<T = unknown>(value: unknown): value is Class<T> {
  return isFunction(value) && value.toString().startsWith('class ');
}
/**
 * 用于判断是否为WeakMap类型
 * @category 类型守卫
 */
export function isWeakMap<Key extends object = object, Value = unknown>(value: unknown): value is WeakMap<Key, Value> {
  return getObjectType(value) === 'WeakMap';
}
/**
 * 用于判断是否为WeakRef类型
 * @category 类型守卫
 */
export function isWeakRef(value: unknown): value is WeakRef<object> {
  return getObjectType(value) === 'WeakRef';
}

/**
 * 用于判断是否为WeakSet类型
 * @category 类型守卫
 */
export function isWeakSet(value: unknown): value is WeakSet<object> {
  return getObjectType(value) === 'WeakSet';
}
/**
 * 用于判断是否为Error类型
 * @category 类型守卫
 */
export function isError(value: unknown): value is Error {
  return getObjectType(value) === 'Error';
}
/**
 * 用于判断是否为正数
 * @category 类型守卫
 */
export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}
