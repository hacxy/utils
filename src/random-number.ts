/**
 * 获取一个随机数
 * @category 实用函数
 * @param [min] 最小值
 * @param [max] 最大值
 * @example
 * ```ts
 * randomNumber() // => 1 - 100 之间的随机数
 * randomNumber(1,6) // => 1 - 6 之间的随机数
 * ```
 */
export function randomNumber(min: number = 1, max: number = 100) {
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
}
