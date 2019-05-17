const { User, ThumbsUp, Report } = require('../db/Schema');
const { timeFormat } = require('../util/index');

// toogleThumbsUp
const toogleThumbsUp = async (ctx, next) => {
  const { name_id, report_id } = ctx.request.body;

  const currentThumbUp = await ThumbsUp.findOne({
    thumbsUper: name_id,
    report: report_id
  });

  if (currentThumbUp) {
    // 已经对该内容点赞了

    const { _id: thumbs_up_id } = currentThumbUp;
    await ThumbsUp.deleteOne({
      _id: thumbs_up_id
    });
    await User.updateOne({
      _id: name_id
    }, {
      $pull: {
        thumbs_ups: thumbs_up_id
      }
    });
  } else {
    // 还未对该内容点赞

    const { _id } = await ThumbsUp.create({
      date: new Date(),
      report: report_id,
      thumbsUper: name_id
    });
    await User.updateOne({
      _id: name_id
    }, {
      $push: {
        thumbs_ups: _id
      }
    });
  }

  ctx.body = {
    success: true
  };
};

// 获取点赞列表
const getThumbsUpList = async (ctx, next) => {
  const { name_id, page, num } = ctx.query;
  let arr = await ThumbsUp.find({
      thumbsUper: name_id
  }, null, {
    sort: { date: -1 },
    skip: (page - 1) * num,
    limit: Number(num)
  })
    .populate({
      path: 'report',
      select: 'type image href title description'
    })

  ctx.body = {
    success: true,
    data: arr
  };
}

module.exports = {
  toogleThumbsUp,
  getThumbsUpList
};
