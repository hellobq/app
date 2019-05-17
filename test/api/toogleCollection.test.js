module.exports = (request, expect) => () => {
  /**
   * 对某篇文章收藏(第二次点赞表示取消收藏)
   * request: {
   *    name_id: '5ccbd6921539e54048690310',
   *    report_id: '5cc99d49cc64c255cc934fc2'
   * }
   * response: {
   *    success: true
   * }
   */
  it('it should toogleCollection successfully with name_id and report_id.', done => {
    request
      .post('/api/toogleCollection')
      .send({
        name_id: '5ccbd6921539e54048690310',
        report_id: '5cc99d49cc64c255cc934fc2'
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

  /**
   * 对某篇文章收藏(第二次点赞表示取消收藏)
   * request: {
   *    name_id: '5ccbd6921539e54048690310',
   *    report_id: '5cc99d49cc64c255cc934fc2'
   * }
   * response: {
   *    success: false,
   *    message: '缺少必要字段：name_id 或 report_id'
   * }
   */
  it('it should return 400 without name_id and report_id.', done => {
    request
      .post('/api/toogleCollection')
      .send({
        name_id: ''
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'message']);
        done();
      })
  })
};
