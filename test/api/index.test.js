const supertest = require('supertest');
const chai = require('chai');
const app = require('../../src/index');
const { connect, disconnect } = require('../../src/db/dis-connect');
const resetPwdTest = require('./reset-pwd.test');
const loginTest = require('./login.test');
const viewCollectionThumbUpsTest = require('./viewCollectionThumbUps.test');
const listTest = require('./list.test');
const getDetailTest = require('./getDetail.test');
const viewTest = require('./updateView.test');
const getViewsListTest = require('./getViewsList.test');
const toogleThumbsUpTest = require('./toogleThumbsUp.test');
const getThumbsUpListTest = require('./getThumbsUpList.test');
const toogleCollectionTest = require('./toogleCollection.test');
const getCollectionListTest = require('./getCollectionList.test');
const getThumbsupAndStarTest = require('./getThumbsupAndStar.test');
const searchTest = require('./search.test');

const expect = chai.expect;
const request = supertest(app.listen());

describe('API test: ', () => {
  before((done) => {
    connect()
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(`Error Found! ${err}`);
      })
  })

  describe('POST /api/login: ', loginTest(request, expect));
  describe('POST /api/reset-pwd: ', resetPwdTest(request, expect));
  describe('GET /api/viewCollectionThumbUps', viewCollectionThumbUpsTest(request, expect));
  describe('GET /api/list', listTest(request, expect));
  describe('GET /api/getDetail', getDetailTest(request, expect));
  describe('POST /api/view', viewTest(request, expect));
  describe('GET /api/getViewsList', getViewsListTest(request, expect));
  describe('POST /api/toogleThumbsUp', toogleThumbsUpTest(request, expect));
  describe('GET /api/getThumbsUpList', getThumbsUpListTest(request, expect));
  describe('POST /api/toogleCollection', toogleCollectionTest(request, expect));
  describe('POST /api/getCollectionList', getCollectionListTest(request, expect));
  describe('GET /api/getThumbsupAndStar', getThumbsupAndStarTest(request, expect));
  describe('GET /api/search', searchTest(request, expect));

  after(done => {
    disconnect()
      .then(() => {
        done();

        // 解决因为使用nodejs异步方法导致进程无法退出的问题
        process.exit();
      })
      .catch(err => {
        console.log(`Error Found! ${err}`);
      })
  });
});
