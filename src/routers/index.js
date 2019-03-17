const routers = require('koa-router')()

const list = require('../controllers/list')
const { registry, login, resetPwd } = require('../controllers/user')
const demoHtml = require('../controllers/demoHtml')
const connect = require('../db/connect')

const connectRouter = async () => {
  await connect()
  routers.get('/', demoHtml)
  routers.get('/api/list', list)
  routers.post('/api/registry', registry)
  routers.post('/api/login', login)
  routers.post('/api/reset-pwd', resetPwd)
}

connectRouter()

module.exports = routers
