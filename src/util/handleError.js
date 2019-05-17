/**
 * 返回错误信息
 * 
 * @param {string} errMsg 
 */
const getType = require('./getType');

module.exports = ({ errMsg }) => {
  if (getType(errMsg) !== 'string') {
    return new Error('arg: errMsg is not string')
  }

  const map = new Map([
    [/duplicate/, '已存在，不能重复'],
    [/./, '其他错误']
  ]);

  for (let [regExp, msg] of map) {
    if (regExp.test(errMsg)) {
      return msg;
    }
  }
};
