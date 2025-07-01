export function hasChinese(str: string) {
  // 匹配扩展汉字范围（包括罕见字和繁体字）
  return /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(str);
}
