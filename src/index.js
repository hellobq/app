const spider = require('./spider')
const connect = require('./db/connect')
const Report = require('./db/Report')

spider()

// const find = async () => {
//   await connect()

//   const data = await Report.find({
//     type: 'hot-comment'
//   })  

//   console.log(data.length)
// }

// find()

