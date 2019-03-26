const { User } = require('../db/Schema');
const handleErr = require('./handleErr');

// 注册
const registry = async (ctx, next) => {
  const { name, pwd } = ctx.request.body;

  await User.create({name, pwd, regDate: new Date()})
    .then(() => {
      ctx.body = {
        success: true,
        message: 'ok'
      }
    })
    .catch(err => {
      ctx.body = {
        success: false,
        message: handleErr(err)
      }
    });
};

// 登陆
const login = async (ctx, next) => {
  const { name, pwd } = ctx.request.body;
  const data = await User.findOne({ name });

  if (data) {
    const isRight = data.pwd === pwd;
    ctx.body = {
      success: isRight,
      message: isRight ? 'ok' : '密码输入错误',
      user_id: data._id
    };
  } else {
    ctx.body = {
      success: false,
      message: '用户未注册'
    };
  }
};

// 忘记密码
const resetPwd = async (ctx, next) => {
  const { name, pwd } = ctx.request.body;
  const data = await User.findOne({ name });

  if (data) {
    await User.updateOne({ name }, { pwd }, (err) => {
      ctx.body = {
        success: true,
        message: err ? handleErr(err) : 'ok'
      }
    });
  } else {
    ctx.body = {
      success: false,
      message: '用户未注册'
    };
  }
};

// 查看 观看数、评论数、收藏数
const user = async (ctx, next) => {
  const { name } = ctx.query;

  const data = await User.findOne({ name }).populate('views.report_id', 'type image href title description');
  const { comments } = await User.findOne({ name }).populate('comments', 'date content');
  const { collections } = await User.findOne({ name }).populate('collections', 'type image href title description');


  ctx.body = {
    success: true,
    data: Object.assign(data, { comments, collections })
  };
}

module.exports = {
  registry,
  login,
  resetPwd,
  user
};
