const { Report, View } = require('../db/Schema');

const recommend = async (ctx, next) => {
  const { report_id } = ctx.query, data = [];
  let { keywords } = await Report.findOne({
    _id: report_id
  });

  keywords = keywords.split(/\s+/);

  for (let one_keywords of keywords) {
    let res = await Report.find({
      keywords: new RegExp(one_keywords, 'ig'),
      _id: {
        $ne: report_id
      }
    }, '_id title date keywords image', {
      sort: {
        date: -1
      }
    });
    res = res.filter(({ title }) => data.every(({ title: itemTitle }) => itemTitle !== title));
    if (data.length <= 10) {
      data.push(...res.slice(0, 10 - data.length))
    }
  }

  if (data.length < 10) {
    const reports = await Report.find({
      viewNum: {
        $gte: 0
      }
    }, '_id title date keywords image', {
      sort: {
        viewNum: -1,
        date: -1
      },
      limit: 10 - data.length
    });
    data.push(...reports);
  }


  ctx.body = {
    success: true,
    data
  };
};

module.exports = recommend;
