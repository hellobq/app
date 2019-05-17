const timeFormat = require('../../src/util/timeFormat');

module.exports = expect => () => {
  // 正常情况
  it('it should return formated time.', done => {
    expect(timeFormat('2019-05-06T08:48:08.013Z')).to.eql('2019-05-06 16:48:08')
    done();
  })

  // 如果参数不是字符串类型，该函数将会抛出错误
  it('it should return message: arg: errMsg is not string when the parameter type is not a string.', done => {
    expect(timeFormat(0)).to.be.a('Error')
    done();
  })

  // 如果参数是字符串类型，但不是 Date 要求的字符串形式，该函数将会抛出错误
  it('it should throw Error when the parameter is not a string of Date. (参数是字符串类型，但不是 Date 要求的字符串形式)', done => {
    expect(timeFormat(0)).to.be.a('Error')
    done();
  })
};
