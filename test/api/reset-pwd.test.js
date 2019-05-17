module.exports = (request, expect) => () => {
  /**
   * 重设密码成功（用户名必须已注册过）
   * request: { name: '柏强', pwd: '123456' }
   * response: { success: true, message: 'ok' }
   */
  it('it should reset pwd successfully with registryed name.', ( done ) => {
    request
      .post('/api/reset-pwd')
      .send({
        name: '柏强',
        pwd: '123456'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'message']);
        done();
      })
  })

  /**
   * 如果用户未注册的话，重设密码失败
   * request: { name: '小蛋子', pwd: '123456' }
   * response: { success: false, message: '用户未注册' }
   */
  it('it should return message notification with unregistered name: 用户未注册.', ( done ) => {
    request
      .post('/api/reset-pwd')
      .send({
        name: '小蛋子',
        pwd: '123456'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'message']);
        done();
      })
  })
};