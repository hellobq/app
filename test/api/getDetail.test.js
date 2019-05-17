module.exports = (request, expect) => () => {
  /**
   * 查询某类个舆情事件的详情
   * request: '/api/detail?report_id=5cc994dff2bb7b3e18e4874c'
   * response: {
   *  success: true,
   *  data: {
   *   id: report_id,
   *   title,
   *   content,
   *   date
   * }
   */
  it('it should return specific info of report with report_id.', done => {
    request
      .get('/api/detail?report_id=5cc994dff2bb7b3e18e4874c')
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
