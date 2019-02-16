const routers = require('koa-router')()
const getList = require('../controllers/getList')
const connect = require('../db/connect')

connect()
routers.get('/api/list', getList)

module.exports = routers
