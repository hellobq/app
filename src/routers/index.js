const routers = require('koa-router')();

const list = require('../controllers/list');
const { registry, login, resetPwd, user } = require('../controllers/user');
const view = require('../controllers/view');
const { comment, getComments } = require('../controllers/comment');
const { toogleCollection, getCollectionList} = require('../controllers/collection');
const demoHtml = require('../controllers/demoHtml');
const connect = require('../db/connect');
const { getThumbsUpList, toogleThumbsUp } = require('../controllers/thumbsUp');
const getThumbsupAndStar = require('../controllers/getThumbsupAndStar');

const connectRouter = async () => {
  await connect();
  routers.get('/', demoHtml);
  routers.get('/api/user', user);
  routers.get('/api/list', list);
  routers.post('/api/registry', registry);
  routers.post('/api/login', login);
  routers.post('/api/reset-pwd', resetPwd);
  routers.post('/api/view', view);
  routers.post('/api/comment', comment);
  routers.get('/api/getComments', getComments)
  routers.post('/api/toogleCollection', toogleCollection);
  routers.get('/api/getCollectionList', getCollectionList);
  routers.post('/api/toogleThumbsUp', toogleThumbsUp);
  routers.get('/api/getThumbsUpList', getThumbsUpList);
  routers.get('/api/getThumbsupAndStar', getThumbsupAndStar);
}

connectRouter();

module.exports = routers;
