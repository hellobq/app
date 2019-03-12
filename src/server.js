const Koa = require('koa')
const app = new Koa()
const routers = require('./routers')
const port = 4321

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
  await next()
})

app.use(routers.routes(), routers.allowedMethods())

app.listen(port, () => {
  console.log(`server start at localhost:${ port }`)
})
