const { Report, ThumbsUp, Collection } = require('../db/Schema');

const handleContent = contentStr => {
  let img_urls = [], content = [];

  // 左负断言在 RN 中不能使用
  contentStr.replace(/((?<=src=")[^"]+)|(?<=<p>).*?(?=<\/p>)|(?<=<h\d>).+?(?=<\/h\d>)/g, str => {
    if (str && !/鹰眼舆情观察室|更多舆情热点请关注|蚁坊软件|\(|（|<\/?br>|\d+年\d+月\d+日/.test(str)) {
      // p>img
      if (/img/.test(str)) {
        str = str.match(/(?<=src=")[^"]+/g)[0];
        img_urls.push({url: 'https://www.eefung.com' + str});
      }

      // p>a
      if (/<\/a>/.test(str)) {
        str = str.replace(/<a.+?>|<\/a>/g, '');
      }
  
      content.push(/\/image/.test(str) ? 'https://www.eefung.com' + str : str);
    }
  })

  return content;
};

const list = async (ctx, next) => {
  const {query: {type, page, num}} = ctx;
  console.log(type, page, num);
  let data = await Report.find({
    type
  })
    .skip((page - 1) * num)
    .limit(Number(num));

  data = data.map(({_id, title, image, description, viewNum, type}) => ({
    _id, title, image, description, viewNum, type
  }));
  
  ctx.body = {
    success: true,
    data
  };
}

const getThumbsupAndStar = async (report_id, user_id) => {
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

  return {
    thumbsUps: thumbsUps.length,
    collections: collections.length,
    thumbsUped,
    collected
  };
};

const getDetail = async (ctx, next) => {
  const { report_id, user_id } = ctx.query;
  console.log('获取详情数据', report_id, user_id);
  const { title, content: contentStr, date } = await Report.findById(report_id);
  const { thumbsUps, collections, thumbsUped, collected } = await getThumbsupAndStar(report_id, user_id);
  const content = handleContent(contentStr);
  ctx.body = {
    success: true,
    data: {
      id: report_id,
      title, content, date,
      thumbsUps, collections, thumbsUped, collected
    }
  };
}

module.exports = {
  list,
  getDetail
};
