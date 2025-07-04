/**
 * 判断某个数组是否存在一个值
 * @category 改进内置函数
 */
export function arrayIncludes<Type extends SuperType, SuperType = unknown>(
  array: Type[] | readonly Type[],
  item: SuperType,
  fromIndex?: number,
): item is Type {
  return array.includes(item as Type, fromIndex);
}
