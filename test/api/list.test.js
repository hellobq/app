module.exports = (request, expect) => () => {
  /**
   * 查询某类型的舆情列表
   * request: '/api/list?type=yanjiu&page=1&num=5'
   * response: {
   *  data: [{_id: "5cc9a7baf8357d2c10aafbca", title: "蚁坊指数女星榜TOP10 （第18期）",…},…],
   *  success: true
   * }
   */
  it('it should return list with type、page and num.', done => {
    request
      .get('/api/list?type=yanjiu&page=1&num=5')
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