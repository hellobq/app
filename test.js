const { User } = require('./src/db/Schema')
const connect = require('./src/db/connect')

const selectDemo = async () => {
  await connect()

  User.find({}).exec((err, data) => {
    console.log(err, data)
  })
}

selectDemo()
