const { User } = require('../db/Schema')
const handleErr = require('./handleErr')

// 注册
const registry = async (ctx, next) => {
  const { name, pwd } = ctx.request.body

  await User.create({name, pwd, regDate: new Date()})
    .then(() => {
      ctx.body = {
        success: true
      }
    })
    .catch(err => {
      ctx.body = {
        success: false,
        message: handleErr(err)
      }
    })
}

// 登陆
const login = async (ctx, next) => {
  const { name, pwd } = ctx.request.body
  const data = await User.findOne({ name })

  if (data) {
    const isRight = data.pwd === pwd
    ctx.body = {
      success: isRight,
      message: isRight ? null : '密码输入错误'
    }
  } else {
    ctx.body = {
      success: false,
      message: '用户未注册'
    }
  }
}

// 忘记密码
const resetPwd = async (ctx, next) => {
  const { name, pwd } = ctx.request.body
  const data = await User.findOne({ name })

  if (data) {
    await User.updateOne({ name }, { pwd }, (err) => {
      ctx.body = {
        success: true,
        message: err ? handleErr(err) : null
      }
    })
  } else {
    ctx.body = {
      success: false,
      message: '用户未注册'
    }
  }
}

module.exports = {
  registry,
  login,
  resetPwd
}
