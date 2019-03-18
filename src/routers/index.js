const routers = require('koa-router')()

const list = require('../controllers/list')
const { registry, login, resetPwd, user } = require('../controllers/user')
const view = require('../controllers/view')
const comment = require('../controllers/comment')
const collection = require('../controllers/collection')
const demoHtml = require('../controllers/demoHtml')
const connect = require('../db/connect')

const connectRouter = async () => {
  await connect()
  routers.get('/', demoHtml)
  routers.get('/api/user', user)
  routers.get('/api/list', list)
  routers.post('/api/registry', registry)
  routers.post('/api/login', login)
  routers.post('/api/reset-pwd', resetPwd)
  routers.post('/api/view', view)
  routers.post('/api/comment', comment)
  routers.post('/api/collection', collection)
}

connectRouter()

module.exports = routers
