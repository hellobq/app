/**
 * 转成 年-月-日 时：分：秒格式的字符串
 * @param {string} timeStr 
 */ 
const getType = require('./getType');

const timeFormat = timeStr => {
  if (getType(timeStr) !== 'string') {
    return new Error('arg: errMsg is not string')
  }

  let date = new Date(timeStr);
  if (date === 'Invalid Date') {
    return new Error('the parameter is not a string of Date...');
  }

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

module.exports = timeFormat;
