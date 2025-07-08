import type { Finite, NonEmptyString } from './types';

const NODE_TYPE_ELEMENT = 1;
const DOM_PROPERTIES_TO_CHECK: Array<(keyof HTMLElement)> = [
  'innerHTML',
  'ownerDocument',
  'style',
  'attributes',
  'nodeValue',
];
const typedArrayTypeNames = [
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Uint16Array',
  'Int32Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'BigInt64Array',
  'BigUint64Array',
] as const;

const objectTypeNames = [
  'Function',
  'Generator',
  'AsyncGenerator',
  'GeneratorFunction',
  'AsyncGeneratorFunction',
  'AsyncFunction',
  'Observable',
  'Array',
  'Buffer',
  'Blob',
  'Object',
  'RegExp',
  'Date',
  'Error',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'WeakRef',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'DataView',
  'Promise',
  'URL',
  'FormData',
  'URLSearchParams',
  'HTMLElement',
  'NaN',
  ...typedArrayTypeNames,
] as const;

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
