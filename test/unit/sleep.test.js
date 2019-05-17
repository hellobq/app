const sleep = require('../../src/util/sleep');

module.exports = expect => () => {
  it('it should return a promise object when the parameter is 1.', done => {
    expect(sleep(1)).to.be.a('promise')
    done();
  })

  it('it should return message: arg: errMsg is not number when the parameter is "1".', done => {
    expect(sleep('1')).to.be.a('error')
    done();
  })
};
