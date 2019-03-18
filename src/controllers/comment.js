const { Comment, User } = require('../db/Schema')
const handleErr = require('./handleErr')

const comment = async (ctx, next) => {
  const { content, name_id, report_id } = ctx.request.body

  await Comment.create({
    content,
    date: new Date(),
    commenter: name_id,
    report: report_id
  })

  const { _id } = await Comment.findOne({
    commenter: name_id,
    content,
    report: report_id
  })

  await User.updateOne({
    _id: name_id
  }, {
    $push: {
      comments: _id
    }
  })

  ctx.body = {
    success: true,
    message: 'ok'
  }
}

module.exports = comment
