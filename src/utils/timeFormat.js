/**
 * 转成 年-月-日 时：分：秒格式的字符串
 * @param {string} timeStr 
 */  

const timeFormat = timeStr => {
  let date = new Date(timeStr);
  let [year, month, day, hour, minute, second] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ]
  return `${year}-${judge(month)}-${judge(day)} ${judge(hour)}:${judge(minute)}:${judge(second)}`;
};

const judge = n => {
  return n > 10 ? n : '0' + n;
};

export default timeFormat;
