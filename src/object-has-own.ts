const has = Object.prototype.hasOwnProperty;

/**
 * A strongly-typed version of `Object.hasOwn()`.
 * Returns a boolean indicating whether the given object has the given property as its own property.
 * @category 改进内置函数
 * @example
 *```ts
 * import {objectHasOwn} from '@hacxy/utils';
 * objectHasOwn({}, 'hello'); //=> false
 * objectHasOwn([1, 2, 3], 0); //=> true
 *```
 */
export function objectHasOwn<ObjectType, Key extends PropertyKey>(
  object: ObjectType,
  key: Key,
): object is (ObjectType & Record<Key, unknown>) {
  return has.call(object, key);
}
