/**
 * err：错误对象
 */

module.exports = (err) => {
  const { errmsg } = err

  return /duplicate/.test(errmsg) ? '名字已存在': '数据存储错误'
}
