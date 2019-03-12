const routers = require('koa-router')()
const getList = require('../controllers/getList')
const connect = require('../db/connect')

const connectRouter = async () => {
  await connect()
  routers.get('/api/list', getList)
}

connectRouter()

module.exports = routers
