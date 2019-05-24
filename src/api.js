const 
  ip_goal = '192.168.43.19', // 192.168.199.166
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

const recommend = {
  method: 'recommend',
  url: baseURL + '/recommend',
  desc: '获取推荐文章列表'
}

const updateView = {
  method: 'post',
  url: baseURL + '/updateView',
  desc: '更新用户查看该文章的时间'
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

const getCollectionList = {
  method: 'get',
  url: baseURL + '/getCollectionList',
  desc: '获取收藏列表'
}

const getThumbsUpList = {
  method: 'get',
  url: baseURL + '/getThumbsUpList',
  desc: '获取用户的点赞列表'
}

const getViewsList = {
  method: 'get',
  url: baseURL + '/getViewsList',
  desc: '获取阅读历史'
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

const viewCollectionThumbUps = {
  method: 'get',
  url: baseURL + '/viewCollectionThumbUps',
  desc: '获取我的页面相关用户信息'
}
const comment = {
  method: 'post',
  url: baseURL + '/comment',
  desc: '用户评论'
}

const search = {
  method: 'get',
  url: baseURL + '/search',
  desc: '实时搜索'
}

export {
  login,
  resetPwd,
  list,
  detail,
  toogleThumbsUp,
  toogleCollection,
  thumbsupAndStar,
  viewCollectionThumbUps,
  comment,
  getThumbsUpList,
  getCollectionList,
  getViewsList,
  search,
  updateView,
  recommend
}
