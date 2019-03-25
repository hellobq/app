const { User } = require('../db/Schema');
const handleErr = require('./handleErr');

// 已经看过文章 --- view
const view = async (ctx, next) => {
  const { name, _id } = ctx.request.body;

  await User.updateMany({
    name
  }, {
    $pull: {
      views: {
        report_id: _id
      }
    }
  });

  await User.updateOne({
    name
  }, {
    $push: {
      views: {
        report_id: _id,
        view_date: new Date()
      }
    }
  });

  ctx.body = {
    success: true
  };
}

module.exports = view;
