/**
 * 生成随机码，生成的依据是：0-9、A-Z、a-z
 * @param {number} n 
 */

const randomCode = (n = 4) => {
  let
    str  = '',
    startNum = 'A'.charCodeAt(0),
    endNum = 'Z'.charCodeAt(0),
    randomCode = '';

  for (let i = startNum; i <= endNum; ++i)
    str += (i - startNum) + String.fromCharCode(i) + String.fromCharCode(i + 32);

  for (let i = 1; i <= n; ++i) {
    randomCode += str.charAt(Math.random() * str.length | 0);
  }
  
  return randomCode;
};

module.exports = randomCode;
