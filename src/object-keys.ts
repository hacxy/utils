import type { ObjectKeys } from './types';

/**
 * 将对象中所有的key转为数组
 * @category 改进内置函数
 */
export const objectKeys = <T extends object>(value: T) => Object.keys(value) as unknown as <Type extends object>(value: Type) => Array<ObjectKeys<Type>>;
