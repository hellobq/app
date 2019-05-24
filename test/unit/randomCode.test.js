const randomCode = require('../../src/util/randomCode');

module.exports = expect => () => {
  it('it should return a string.', done => {
    expect(randomCode()).to.be.a('string')
    done();
  })
};
