module.exports = (request, expect) => () => {
  /**
   * 如果用户查看了本文章：更新查看时间
   * request: { user_id: '5cbecdacde673a2cf41c884a', report_id: '5cc14332ea922947dc4a6165' }
   * response: { success: true }
   */
  it('it should return 200 with correct user_id and report_id.', ( done ) => {
    request
      .post('/api/updateView')
      .send({
        user_id: '5ccbd6921539e54048690310',
        report_id: '5cc99d49cc64c255cc934fc3'
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
   * 缺少用户id(user_id) 或者文章id(report_id)：登陆失败，状态码为 400 并有 message 提示信息
   * request: { }
   * response: { success: false, message: '缺少必要字段：user_id或者report_id' }
   */
  it('it should return message notification without user_id or report_id: 缺少必要字段：user_id或者report_id.', done => {
    request
      .post('/api/updateView')
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
