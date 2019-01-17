// 处理大于1000的数字
export const handleNum = num => num >= 1000 ? ~~(num / 100) / 10 + 'k' : num