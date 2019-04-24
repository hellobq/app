const 
  ip_goal = '172.17.112.34', // 192.168.43.19
  port = '4321',
  baseURL = `http://${ip_goal}:${port}/api`;

const list = {
  method: 'get',
  url: baseURL + '/list',
  desc: '获取内容列表'
}

const detail = {
  method: 'get',
  url: baseURL + '/detail',
  desc: '获取详情页信息'
}

const login = {
  method: 'post',
  url: baseURL + '/login',
  desc: '登陆'
}

const resetPwd = {
  method: 'post',
  url: baseURL + '/reset-pwd',
  desc: '重设密码'
}

const toogleThumbsUp = {
  method: 'post',
  url: baseURL + '/toogleThumbsUp',
  desc: '详情页点赞'
}

const toogleCollection = {
  method: 'post',
  url: baseURL + '/toogleCollection',
  desc: '详情页收藏'
}

const thumbsupAndStar = {
  method: 'get',
  url: baseURL + '/getThumbsupAndStar',
  desc: '详情页获取点赞和收藏数'
}

const user = {
  method: 'get',
  url: baseURL + '/user',
  desc: '获取我的页面相关用户信息'
}
const comment = {
  method: 'post',
  url: baseURL + '/comment',
  desc: '用户评论'
}

export {
  login,
  resetPwd,
  list,
  detail,
  toogleThumbsUp,
  toogleCollection,
  thumbsupAndStar,
  user,
  comment
}

