module.exports = (request, expect) => () => {
  /**
   * 对某篇文章点赞(第二次点赞表示取消点赞)
   * request: {
   *    name_id: '5ccbd6921539e54048690310',
   *    report_id: '5cc994dff2bb7b3e18e4874c'
   * }
   * response: {
   *    success: true
   * }
   */
  it('it should toogleThumbsUp successfully with name_id and report_id.', done => {
    request
      .post('/api/toogleThumbsUp')
      .send({
        name_id: '5ccbd6921539e54048690310',
        report_id: '5cc994dff2bb7b3e18e4874c'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success']);
        done();
      })
  })
};
