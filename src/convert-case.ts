/**
 * 字符串转换格式选项
 * - 'pascal': 大驼峰 (PascalCase)
 * - 'camel': 小驼峰 (camelCase)
 * - 'snake': 小写蛇形 (snake_case)
 * - 'screaming_snake': 大写蛇形 (SCREAMING_SNAKE_CASE)
 * - 'kebab': 小写连字符 (kebab-case)
 * - 'screaming_kebab': 大写连字符 (SCREAMING-KEBAB-CASE)
 * - 'title': 标题格式 (Title Case)
 * - 'lower': 全小写空格分隔 (lower case)
 * - 'upper': 全大写空格分隔 (UPPER CASE)
 */
export type CaseFormat
  = | 'pascal'
    | 'camel'
    | 'snake'
    | 'screaming_snake'
    | 'kebab'
    | 'screaming_kebab'
    | 'title'
    | 'lower'
    | 'upper';

export function convertCase(input: string, format: CaseFormat = 'pascal'): string {
  if (!input.trim()) return '';
  const words = input
    // 处理连续大写字母后跟小写字母的情况 (如 "HTTPRequest")
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    // 在驼峰转换点插入空格 (小写字母/数字后跟大写字母)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    // 保留数字与字母的组合，只替换非字母数字字符
    .replace(/[^a-z0-9]+/gi, ' ')
    // 分割并过滤空单词
    .split(' ')
    .filter(word => word.length > 0);

  if (words.length === 0) return input;

  switch (format) {
    case 'pascal': // 大驼峰: HelloWorldExample123
      return words.map(w =>
        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      ).join('');

    case 'camel': // 小驼峰: helloWorldExample123
      return words.map((w, i) =>
        i === 0
          ? w.toLowerCase()
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      ).join('');

    case 'snake': // 小写蛇形: hello_world_example123
      return words.map(w => w.toLowerCase()).join('_');

    case 'screaming_snake': // 大写蛇形: HELLO_WORLD_EXAMPLE123
      return words.map(w => w.toUpperCase()).join('_');

    case 'kebab': // 小写连字符: hello-world-example123
      return words.map(w => w.toLowerCase()).join('-');

    case 'screaming_kebab': // 大写连字符: HELLO-WORLD-EXAMPLE123
      return words.map(w => w.toUpperCase()).join('-');

    case 'title': // 标题格式: Hello World Example123
      return words.map(w =>
        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      ).join(' ');

    case 'lower': // 全小写: hello world example123
      return words.map(w => w.toLowerCase()).join(' ');

    case 'upper': // 全大写: HELLO WORLD EXAMPLE123
      return words.map(w => w.toUpperCase()).join(' ');

    default:
      return input;
  }
}
