const { Collection, ThumbsUp } = require('../db/Schema');

const getThumbsupAndStar = async (ctx, next) => {
  const { report_id } = ctx.query;
  console.log(report_id);

  const thumbsUps = await ThumbsUp.find({
    report: report_id
  });

  const collections = await Collection.find({
    report: report_id
  })

  ctx.body = {
    success: true,
    thumbsUps: thumbsUps.length,
    collections: collections.length
  };
};

module.exports = getThumbsupAndStar;
