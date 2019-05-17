const { Comment, User, Report } = require('../db/Schema');

// 用户评论
const comment = async (ctx, next) => {
  const { content, name_id, report_id } = ctx.request.body;

  const { _id } = await Comment.create({
    content,
    date: new Date(),
    commenter: name_id,
    report: report_id
  });

  await User.updateOne({
    _id: name_id
  }, {
    $push: {
      comments: _id
    }
  });

  ctx.body = {
    success: true,
    message: 'ok'
  };
}

// 获取评论列表
const getComments = async (ctx, next) => {
  const { name_id } = ctx.query, arr = [];

  const { comments } = await User.findById(name_id).populate({
    path: 'comments',
    select: '_id date report content',
    match: {
      isDeleted: false
    }
  });

  let i = 0;
  for (; i < comments.length; ++i) {
    const { _id, date, report } = comments[i];
    const { type, image, href, title, description } = await Report.findById(report);
    arr.push({
      _id,
      date,
      report: {
        type,
        image,
        href,
        title,
        description
      }
    })
  }

  ctx.body = {
    success: true,
    data: arr
  };
};

module.exports = {
  comment,
  getComments
};
