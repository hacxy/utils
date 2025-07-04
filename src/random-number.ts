/**
 * 获取一个随机数
 * @category 实用函数
 */
export function randomNumber(min: number = 1, max: number = 100) {
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
}
