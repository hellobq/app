const { Collection, ThumbsUp } = require('../db/Schema');

const getThumbsupAndStar = async (ctx, next) => {
  const { report_id, user_id } = ctx.query;
  let thumbsUped = false, collected = false;

  const thumbsUps = await ThumbsUp.find({
    report: report_id
  });

  const collections = await Collection.find({
    report: report_id
  });

  // 与当前用户相关的点赞
  if (user_id && thumbsUps.length) {
    const hasThumbsUped = await ThumbsUp.findOne({
      report: report_id,
      thumbsUper: user_id
    });
    if (hasThumbsUped) {
      thumbsUped = true;
    }
  }

  // 与当前用户相关的收藏
  if (user_id && collections.length) {
    const hasCollected = await Collection.findOne({
      collector: user_id,
      report: report_id
    });
    if (hasCollected) {
      collected = true;
    }
  }

  ctx.body = {
    success: true,
    thumbsUps: thumbsUps.length,
    collections: collections.length,
    thumbsUped,
    collected
  };
};

module.exports = getThumbsupAndStar;
