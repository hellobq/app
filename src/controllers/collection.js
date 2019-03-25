const { User, Collection } = require('../db/Schema');
const handleErr = require('./handleErr');

// 收藏 --- collection
const collection = async (ctx, next) => {
  const { name_id, report_id } = ctx.request.body;

  const { collections } = await User.findOne({
    _id: name_id
  });

  // toggle collection
  if (collections.findIndex(item => item + '' === report_id) !== -1) {
    await User.updateOne({
      _id: name_id
    }, {
      $pull: {
        collections: report_id
      }
    });

    await Collection.deleteOne({
      collector: name_id,
      report: report_id
    });
  } else {
    await User.updateOne({
      _id: name_id
    }, {
      $push: {
        collections: report_id
      }
    });

    await Collection.create({
      date: new Date(),
      collector: name_id,
      report: report_id
    });
  }

  ctx.body = {
    success: true,
    message: 'ok'
  };
};

module.exports = collection;
