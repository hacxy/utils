/**
 * 获取当前时间戳
 * @param unit 时间单位: 'seconds' (秒) 或 'milliseconds' (毫秒)
 * @returns 当前UNIX时间戳 (默认返回毫秒)
 */
export function getTimestamp(unit: 'seconds' | 'milliseconds' = 'milliseconds'): number {
  return unit === 'seconds'
    ? Math.floor(Date.now() / 1000)
    : Date.now();
}

