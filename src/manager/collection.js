const { User, Collection } = require('../db/Schema');

const getCollectionList = async (ctx, next) => {
  const { name_id, page, num } = ctx.query;
  const arr = await Collection.find({
    collector: name_id
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

// toogleCollection
const toogleCollection = async (ctx, next) => {
  const { name_id, report_id } = ctx.request.body;

  if (!name_id || !report_id) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: '缺少必要字段：name_id 或 report_id'
    };
    return;
  }

  const currentCollection = await Collection.findOne({
    collector: name_id,
    report: report_id
  });

  if (currentCollection) {
    // 该用户已对该文章收藏了
    const { _id } = currentCollection;
    await Collection.deleteOne({
      collector: name_id,
      report: report_id
    });
    await User.updateOne({
      _id: name_id
    }, {
      $pull: {
        collections: _id
      }
    })
  } else {
    // 用户未收藏该文章
    const { _id } = await Collection.create({
      collector: name_id,
      report: report_id,
      date: new Date()
    });
    await User.updateOne({
      _id: name_id
    }, {
      $push: {
        collections: _id
      }
    });
  }

  ctx.body = {
    success: true
  };
}

module.exports = { 
  toogleCollection,
  getCollectionList
};
