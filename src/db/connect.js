const mongoose = require('mongoose')
const {dbName, user, pwd, dbPort} = require('./config.js')

module.exports = () => {
  mongoose.connect(`mongodb://${user}${pwd}@localhost:${dbPort}/${dbName}`, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
    .then(() => {
      console.log('数据库连接成功!')
    }, () => {
      console.log('连接数据库失败!')
    })
}
