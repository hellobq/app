const handleError = require('../../src/util/handleError');

module.exports = expect => () => {
  it(
    'it should return the message: "已存在，不能重复" when errMsg is "[Mongoose E11000 duplicate key error index]"',
    done => {
      expect(handleError({errMsg: '[Mongoose E11000 duplicate key error index]'})).to.eql('已存在，不能重复')
      done();
    }
  )

  it(
    'it should return the message: "其他错误" when errMsg is "VM128:6 Uncaught TypeError: type[0].toLoswerCase is not a function".',
    done => {
      expect(handleError({errMsg: 'VM128:6 Uncaught TypeError: type[0].toLoswerCase is not a function'})).to.eql('其他错误')
      done();
    }
  )

  it(
    'it should return message: arg: errMsg is not string when the parameter is not string',
    done => {
      expect(handleError({errMsg: 0})).to.be.a('error')
      done()
    }
  )
};
