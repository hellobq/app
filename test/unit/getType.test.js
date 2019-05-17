const getType = require('../../src/util/getType');

module.exports = expect => () => {
  it('it should return "number" when the parameter is 0.', done => {
    expect(getType(0)).to.eql('number')
    done();
  })

  it('it should return "string" when the parameter is "0".', done => {
    expect(getType('0')).to.eql('string')
    done();
  })

  it('it should return "undefined" when the parameter is undefined.', done => {
    expect(getType(undefined)).to.eql('undefined')
    done();
  })

  it('it should return "null" when the parameter is null.', done => {
    expect(getType(null)).to.eql('null')
    done();
  })

  it('it should return "regexp" when the parameter is /\d+/g.', done => {
    expect(getType(/\d+/g)).to.eql('regExp')
    done();
  })

  it('it should return "object" when the parameter is {}.', done => {
    expect(getType({})).to.eql('object')
    done();
  })
};
