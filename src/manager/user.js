const { User } = require('../db/Schema');
const handleError = require('../util/handleError');

// 登陆（密码输入错误/新用户）
const login = async (ctx, next) => {
  const { name, pwd } = ctx.request.body;
  if (!name || !pwd) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: '缺少必要的字段，用户未填写用户名或者密码'
    }
    return;
  }

  const data = await User.findOne({ name });

  if (data) {
    const isRight = data.pwd === pwd;
    ctx.body = {
      success: isRight,
      message: isRight ? 'ok' : '密码输入错误',
      user_id: isRight ? data._id : ''
    };
  } else {
    const { _id } = await User.create({name, pwd, regDate: new Date()});
    ctx.body = {
      success: true,
      message: 'ok',
      user_id: _id
    }
  }
};

// 重设密码
const resetPwd = async (ctx, next) => {
  const { name, pwd } = ctx.request.body;
  if (!name || !pwd) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: '缺少必要的字段，用户未填写用户名或者密码'
    }
    return;
  }
  const data = await User.findOne({ name });

  if (data) {
    await User.updateOne({ name }, { pwd }, (err) => {
      ctx.body = {
        success: true,
        message: err ? handleError(err) : 'ok'
      }
    });
  } else {
    ctx.body = {
      success: false,
      message: '用户未注册'
    };
  }
};

// 查询用户 观看数、收藏数、点赞
const viewCollectionThumbUps = async (ctx, next) => {
  const { name } = ctx.query;
  if (!name) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: '缺少用户名这个必要的字段'
    }
    return;
  }

  const res = await User.findOne({ name });
  if (res) {
    const { _id, views, collections, thumbs_ups } = res;
    ctx.body = {
      success: true,
      data: {
        id: _id,
        name,
        views: views.length,
        collections: collections.length,
        thumbs_ups: thumbs_ups.length
      }
    };
  } else {
    ctx.body = {
      success: false,
      message: '用户未注册'
    };
  }
}

module.exports = {
  login,
  resetPwd,
  viewCollectionThumbUps
};
