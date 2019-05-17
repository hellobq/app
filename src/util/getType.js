/**
 * 返回变量 arg 的数据类型
 * @param {any} arg 
 */

const getType = arg => {
  let type = ({}).toString.call(arg)
    .match(/(?<=\s)[^\]]+/g)
    .pop();

  // 首字母小写
  return type[0].toLowerCase() + type.slice(1);
};

module.exports = getType;
