const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const routers = require('./controller');
const { connect } = require('./db/dis-connect');
const path = require('path');
const static = require('koa-static');
const port = 4321;

const staticPath = './static'

app.use(static(
  path.join( __dirname, staticPath)
))

app.use(bodyParser());

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
  await next();
});

app.use(routers.routes(), routers.allowedMethods());

app.listen(port, async () => {
  await connect();
  console.log(`server start at localhost:${ port }`);
});

module.exports = app;
