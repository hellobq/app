const mongoose = require('mongoose');
const {dbName, user, pwd, dbPort} = require('./config.js');

// 连接数据库
const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${user}${pwd}@localhost:${dbPort}/${dbName}`, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
      .then(() => {
        console.log('Connect to the database successfully!');
        resolve();
      }, (err) => {
        console.log('Connect to the database fail!');
        reject('Connect to the database fail!', err);
      });
  });
};

// 断开数据库的连接
const disconnect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${user}${pwd}@localhost:${dbPort}/${dbName}`, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
      .then(() => {
        console.log('Disconnect to the database successfully!');
        resolve();
      }, (err) => {
        console.log('Disconnect to the database fail!');
        reject('Disconnect to the database fail!', err);
      });
  });
};

module.exports = {
  connect,
  disconnect
};
