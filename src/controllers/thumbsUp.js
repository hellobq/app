const { User, ThumbsUp, Report } = require('../db/Schema');

// toogleThumbsUp
const toogleThumbsUp = async (ctx, next) => {
  const { name_id, report_id } = ctx.request.body;

  const { thumbs_ups } = await User.findOne({
    _id: name_id
  });

  if (!thumbs_ups.length) {
    // 该用户没对任何文章点赞过

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
  } else {
    // 已经对某些内容点赞了

    let i = 0;
    for (; i < thumbs_ups.length; ++i) {
      const hasThumbsUped = await ThumbsUp.findOne({ _id: thumbs_ups[i], report: report_id });
      if (hasThumbsUped) {
        // 已对该内容点赞

        const { _id: thumbs_up_id } = hasThumbsUped;
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
        break;
      }
    }

    if (i === thumbs_ups.length) {
      // 未对该内容点赞

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
  }

  ctx.body = {
    success: true
  };
};

// 获取点赞列表
const getThumbsUpList = async (ctx, next) => {
  const { name_id } = ctx.query, arr = []
  const { thumbs_ups } = await User.findOne({ _id: name_id }).populate('thumbs_ups', '_id date report thumbsUper');

  for (let i = 0; i < thumbs_ups.length; ++i) {
    const { _id, date, report } = thumbs_ups[i];
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
    });
  };

  ctx.body = {
    success: true,
    data: arr
  };
}

module.exports = {
  toogleThumbsUp,
  getThumbsUpList
};
