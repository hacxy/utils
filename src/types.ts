/**
 * Matches the hidden `Infinity` type.
 * Please upvote [this issue](https://github.com/microsoft/TypeScript/issues/32277) if you want to have this type as a built-in in TypeScript.
 * See https://github.com/microsoft/TypeScript/issues/31752
 * @see NegativeInfinity
 * @category 类型定义
 *
 */
// eslint-disable-next-line no-loss-of-precision
export type PositiveInfinity = 1e999;

/**
 * Matches the hidden `-Infinity` type.
 * Please upvote [this issue](https://github.com/microsoft/TypeScript/issues/32277) if you want to have this type as a built-in in TypeScript.
 * See https://github.com/microsoft/TypeScript/issues/31752
 * @see PositiveInfinity
 * @category 类型定义
 */
// eslint-disable-next-line no-loss-of-precision
export type NegativeInfinity = -1e999;

/**
 * @category 类型定义
 */
export type Finite<T extends number> = T extends PositiveInfinity | NegativeInfinity ? never : T;

/**
 * @category 类型定义
 */
export interface DeepMergeOptions {
  arrayMerge?: 'replace' | 'merge'
}

/**
 * @category 类型定义
 */
export type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;

/**
 * 非空字符串
 * @category 类型定义
 */
export type NonEmptyString = string & { 0: string };

/**
 * Matches a [`class` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
 * @category 类型定义
 */
export type Constructor<T, Arguments extends unknown[] = any[]> = new (...arguments_: Arguments) => T;
/**
 * Matches a [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
 * @category 类型定义
 */
export type Class<T, Arguments extends unknown[] = any[]> = Constructor<T, Arguments> & { prototype: T };

/**
 * @category 类型定义
 */
export type ExtractFromGlobalConstructors<Name extends string>
  = Name extends string ? typeof globalThis extends Record<Name, new (...arguments_: any[]) => infer T> ? T : never : never;

/**
 * @category 类型定义
 */
export type NodeBuffer = ExtractFromGlobalConstructors<'Buffer'>;

/**
 * @category 类型定义
 */
export interface WeakRef<T extends object> {
  readonly [Symbol.toStringTag]: 'WeakRef'
  deref: () => T | undefined
}
