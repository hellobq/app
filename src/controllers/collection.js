const { User } = require('../db/Schema')
const handleErr = require('./handleErr')

const collection = async (ctx, next) => {
  const { name_id, report_id } = ctx.request.body

  await User.updateOne({
    _id: name_id
  }, {
    $addToSet: {
      collections: report_id
    }
  })

  ctx.body = {
    success: true,
    message: 'ok'
  }
}

module.exports = collection
