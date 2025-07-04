/**
 * 判断字符串中是否包含汉字
 * @category 实用函数
 */
export function hasChinese(str: string): boolean {
  // 匹配扩展汉字范围（包括罕见字和繁体字）
  return /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(str);
}

/**
 * 判断字符串是否为中国电话号码（手机号或固定电话）
 * @param phoneNumber 待验证的电话号码字符串
 * @returns 如果是有效的中国电话号码返回 true，否则返回 false
 * @category 实用函数
 */
export function isChinesePhoneNumber(phoneNumber: string): boolean {
  // 清理输入：移除非数字字符（空格、横线等）
  const cleaned = phoneNumber.replace(/\D/g, '');

  // 手机号正则（11位，以1开头，第二位为3-9）
  const mobileRegex = /^1[3-9]\d{9}$/;

  // 固定电话正则（区号+号码，总长度10-12位）
  const landlineRegex = /^0\d{9,11}$/; // 简单版
  // 加强版（更精确）：/^0[1-9]\d{1,2}\d{7,8}$/;

  return mobileRegex.test(cleaned) || landlineRegex.test(cleaned);
}
