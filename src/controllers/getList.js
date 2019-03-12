const Report = require('../db/Report')

const getList = async (ctx, next) => {
  const {query: {type, page, num}} = ctx
  let data = null

  try {
    data = await Report.find({
      type
    })
      .skip((page - 1) * num)
      .limit(Number(num))
    data = Object.assign({ data, success: true })
  } catch (e) {
    data = {
      success: false
    }
  }
  
  ctx.body = data
}

module.exports = getList
