const Report = require('../db/Report')

const getList = async (ctx, next) => {
  const {query: {type, page, num}} = ctx
  console.log(type, page, num)
  const data = await Report.find({
    type
  })
    .skip((page - 1) * num)
    .limit(Number(num))

  ctx.body = data
}

module.exports = getList
