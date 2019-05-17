const { User, View, Report } = require('../db/Schema');

// 查看文章 user_id report_id
const updateView = async (ctx, next) => {
  const { user_id, report_id } = ctx.request.body;

  if (!user_id || !report_id) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: '缺少必要字段：user_id或者report_id'
    };
    return;
  }

  const currentView = await View.findOne({
    viewer: user_id,
    report: report_id
  });

  if (!currentView) {
    // 用户之前未看过该文章

    const { _id: newViewId } = await View.create({
      viewer: user_id,
      report: report_id,
      date: new Date()
    });
    await User.updateOne({
      _id: user_id
    }, {
      $push: {
        views: newViewId
      }
    });
    await Report.updateOne({
      _id: report_id
    }, {
      $inc: {
        viewNum: 1
      }
    });
  } else {
    // 用户之前看过该文章

    await View.updateOne({
      viewer: user_id,
      report: report_id
    }, {
      date: new Date()
    });
  }

  ctx.body = {
    success: true
  };
};

// 查询用户查看文章的列表
const getViewsList = async (ctx, next) => {
  const { name_id, page, num } = ctx.query;
  const data = await View.find({
    viewer: name_id
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
    data: data
  };
};

module.exports = {
  updateView,
  getViewsList
};
