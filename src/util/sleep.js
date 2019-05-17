/**
 * 让 js 执行线程等待 seconds 秒
 * 
 * @param {number} seconds 
 */
const getType = require('./getType');

const sleep = (seconds) => {
  if (getType(seconds) !== 'number') {
    return new Error('arg: errMsg is not number')
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

module.exports = sleep;
