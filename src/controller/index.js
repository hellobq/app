const router = require('koa-router')();
const { list, getDetail } = require('../manager/list');
const { login, resetPwd, viewCollectionThumbUps } = require('../manager/user');
const { updateView, getViewsList } = require('../manager/view');
const { comment, getComments } = require('../manager/comment');
const { toogleCollection, getCollectionList} = require('../manager/collection');
const { getThumbsUpList, toogleThumbsUp } = require('../manager/thumbsUp');
const getThumbsupAndStar = require('../manager/getThumbsupAndStar');
const search = require('../manager/search');
const recommend = require('../manager/recommend');

const routers = router
  .prefix('/api')
  .get('/viewCollectionThumbUps', viewCollectionThumbUps)
  .get('/list', list)
  .get('/detail', getDetail)
  .post('/login', login)
  .post('/reset-pwd', resetPwd)
  .post('/updateView', updateView)
  .get('/getViewsList', getViewsList)
  .post('/toogleThumbsUp', toogleThumbsUp)
  .get('/getThumbsUpList', getThumbsUpList)
  .post('/toogleCollection', toogleCollection)
  .get('/getCollectionList', getCollectionList)
  .get('/getThumbsupAndStar', getThumbsupAndStar)
  .get('/search', search)
  .post('/comment', comment)
  .get('/getComments', getComments)
  .get('/recommend', recommend)

module.exports = routers;
