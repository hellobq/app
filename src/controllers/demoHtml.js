const fs = require('fs')
const { resolve } = require('path')

module.exports = async (ctx, next) => {
  const html = fs.readFileSync(resolve(__dirname, '../template.html'), { encoding: 'utf8' })
  ctx.body = html
}
