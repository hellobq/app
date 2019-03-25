const { User, ThumbsUp } = require('../db/Schema');

// 点赞 --- thumbs_up
const thumbsUp = async (ctx, next) => {
  const { name_id, report_id } = ctx.request.body;

  const { thumbs_ups } = await User.findOne({
    _id: name_id
  });

  // toggle thumbs_up
  if (thumbs_ups.findIndex(item => item + '' === report_id) !== -1) {
    await ThumbsUp.deleteOne({
      report: report_id
    });
    
    await User.updateOne({
      _id: name_id
    }, {
      $pull: {
        thumbs_ups: report_id
      }
    });
  } else {
    await User.updateOne({
      _id: name_id
    }, {
      $push: {
        thumbs_ups: report_id
      }
    });

    await ThumbsUp.create({
      date: new Date(),
      report: report_id,
      thumbsUper: name_id
    });
  }

  ctx.body = {
    success: true
  };
};

module.exports = thumbsUp;
