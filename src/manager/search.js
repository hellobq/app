const { Report } = require('../db/Schema');

const search = async (ctx, next) => {
  const { q } = ctx.query;

  const data = await Report.find({
    title: new RegExp(q, 'ig')
  }, null, {
    limit: 10,
    sort: {
      date: -1
    }
  });

  ctx.body = {
    success: true,
    data: data.map(({_id, title}) => ({_id, title}))
  };
};

module.exports = search;
