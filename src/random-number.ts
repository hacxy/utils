export function randomNumber(min: number = 1, max: number = 100) {
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
}
