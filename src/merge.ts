import { deepClone } from './clone';
import { isArray, isPlainObject } from './is';

/**
 * 深度合并对象
 * @param {arrayMergeStrategy} options  数组合并策略 ('concat' | 'replace' | 'merge')
 * @param sources 要合并的对象列表
 * @returns 合并后的新对象
 */
export function mergeObject<T extends Record<string, any>>(
  options: { arrayMergeStrategy?: 'concat' | 'replace' | 'merge' } = {},
  ...sources: Partial<T>[]): T {
  // 默认选项
  const { arrayMergeStrategy = 'replace' } = options;

  // 如果没有源对象，返回空对象
  if (sources.length === 0) return {} as T;

  // 只有一个源对象时，直接深拷贝返回
  if (sources.length === 1) return deepClone(sources[0]) as T;

  // 初始目标对象
  const target = deepClone(sources[0]) as T;

  // 遍历所有源对象
  for (let i = 1; i < sources.length; i++) {
    const source = sources[i];
    if (source === null || typeof source !== 'object') continue;

    // 遍历源对象的所有属性
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

      const targetValue = target[key];
      const sourceValue = source[key];

      // 1. 源值是数组
      if (isArray(sourceValue)) {
        // 目标值也是数组 - 根据策略合并
        if (isArray(targetValue)) {
          switch (arrayMergeStrategy) {
            case 'concat':
              target[key] = [...targetValue, ...sourceValue] as any;
              break;
            case 'merge': {
              // 递归合并数组元素
              const minLength = Math.min(targetValue.length, sourceValue.length);
              const mergedArray: T[] = [];
              for (let j = 0; j < minLength; j++) {
                mergedArray.push(mergeObject(options, targetValue[j], sourceValue[j])
                );
              }
              // 处理剩余元素
              if (targetValue.length > minLength) {
                mergedArray.push(...targetValue.slice(minLength));
              }
              else if (sourceValue.length > minLength) {
                mergedArray.push(...sourceValue.slice(minLength));
              }
              target[key] = mergedArray as any;
              break;
            }
            case 'replace':
            default:
              target[key] = [...sourceValue] as any; // 创建新数组
          }
        }
        // 目标值不是数组 - 直接覆盖
        else {
          target[key] = [...sourceValue] as any;
        }
      }
      // 2. 源值是普通对象
      else if (isPlainObject(sourceValue)) {
        // 目标值也是普通对象 - 递归合并
        if (isPlainObject(targetValue)) {
          target[key] = mergeObject(options, targetValue, sourceValue) as any;
        }
        // 目标值不是对象 - 直接覆盖
        else {
          target[key] = deepClone(sourceValue) as any;
        }
      }

      // 3. 其他类型（基本类型、函数等）
      else {
        target[key] = deepClone(sourceValue) as any;
      }
    }
  }

  return target;
}

