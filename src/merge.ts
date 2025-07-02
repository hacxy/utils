import { isArray, isPlainObject } from './is';

interface DeepMergeOptions {
  arrayMerge?: 'replace' | 'merge'
}

function mergeObject<TSource extends Record<string, any>, TTarget extends Record<string, any>>(
  source: TSource,
  target: TTarget,
  options: DeepMergeOptions = {}
): TSource & TTarget {
  // 创建合并后的对象（使用 source 的原型）
  const merged = Object.create(Object.getPrototypeOf(source)) as TSource & TTarget;

  // 先复制 source 的所有属性
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      merged[key] = source[key] as any;
    }
  }

  // 合并 target 的属性
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const sourceValue = source[key];
      const targetValue = target[key as keyof TTarget];

      // 处理数组
      if (isArray(sourceValue) && isArray(targetValue)) {
        merged[key as keyof (TSource & TTarget)] = handleArrayMerge(
          sourceValue,
          targetValue,
          options
        ) as any;
      }
      // 递归合并对象
      else if (
        isPlainObject(sourceValue)
        && isPlainObject(targetValue)
      ) {
        (merged as any)[key as keyof (TSource & TTarget)] = mergeObject(
          sourceValue,
          targetValue,
          options
        );
      }
      // 其他情况直接覆盖
      else {
        merged[key as keyof (TSource & TTarget)] = targetValue as any;
      }
    }
  }

  return merged;
}

// 处理数组合并
function handleArrayMerge(
  source: any[],
  target: any[],
  options: DeepMergeOptions
): any[] {
  const strategy = options.arrayMerge || 'replace';

  return strategy === 'merge' ? [...source, ...target] : [...target];
}

export { mergeObject };
export type { DeepMergeOptions };
