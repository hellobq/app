const chai = require('chai');
const timeFormatTest = require('./timeFormat.test');
const getTypeTest = require('./getType.test.js');
const handleErrorTest = require('./handleError.test.js');
const sleepTest = require('./sleep.test');
const expect = chai.expect;

describe('Unit test: ', () => {
  describe('timeFormat function: ', timeFormatTest(expect));
  describe('getTypeTest function: ', getTypeTest(expect));
  describe('handleErrorTest function: ', handleErrorTest(expect));
  describe('sleepTest function: ', sleepTest(expect));
});
