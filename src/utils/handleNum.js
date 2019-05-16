// 处理大于1000的数字
const handleNum = num => num >= 1000 ? ~~(num / 100) / 10 + 'k' : num;

export default handleNum;
