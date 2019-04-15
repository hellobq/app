const 
  ip_goal = '172.17.110.136',
  port = '4321',
  baseURL = `http://${ip_goal}:${port}/api`;

const list = {
  method: 'get',
  url: baseURL + '/list',
  desc: '获取内容列表'
}

const login = {
  method: 'post',
  url: baseURL + '/login',
  desc: '登陆'
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
  list,
  toogleThumbsUp,
  toogleCollection,
  thumbsupAndStar,
  user,
  comment
}

