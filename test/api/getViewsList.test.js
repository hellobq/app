module.exports = (request, expect) => () => {
   /**
   * 分页获取某个用户查看过的舆情列表
   * request: '/api/getViewsList?name_id=5ccbd6921539e54048690310&page=1&num=10'
   * response: {
   *  success: true,
   *  data: [{
   *    _id: "5ccbf39c6c86192f688bd6c4"
   *    date: "2019-05-03T07:55:10.539Z",
   *    report: {...},
   *    viewer: "5ccbd6921539e54048690310"
   *  }]
   * }
   */
  it('it should return 200 with name_id、page and num', done => {
    request
      .get('/api/getViewsList?name_id=5ccbd6921539e54048690310&page=1&num=10')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'data']);
        done();
      })
  })
};
