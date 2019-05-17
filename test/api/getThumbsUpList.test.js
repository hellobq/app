module.exports = (request, expect) => () => {
  /**
   * 分页获取点赞列表
   * request: '/api/getThumbsUpList?name_id=5ccbd6921539e54048690310&page=1&num=10',
   * response: {
   *    success: true,
   *    data: [{
   *        _id: '5ccbfd9c9c11721d94566427',
   *        date: "2019-05-03T08:36:44.834Z",
   *        report: {...},
   *        thumbsUper: "5ccbd6921539e54048690310"
   *    }]
   * }
   */
  it('it should return thumbsUpList successfully with name_id、page and num.', done => {
    request
      .get('/api/getThumbsUpList?name_id=5ccbd6921539e54048690310&page=1&num=10')
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
