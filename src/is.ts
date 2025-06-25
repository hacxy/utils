export function isNull(value: unknown): value is null {
  return value === null;
}
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

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

export function isEmptyArray(array: unknown[]): array is never[] {
  return array.length === 0;
}

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
 * @category Type guard
 *
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function isObject(value: unknown): value is object {
  return !isNull(value) && (typeof value === 'object' || isFunction(value));
}

export function isNan(value: unknown) {
  return Number.isNaN(value);
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNil(value: unknown) {
  return isUndefined(value) || isNull(value);
}
