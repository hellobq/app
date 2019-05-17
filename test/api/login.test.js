module.exports = (request, expect) => () => {
  /**
   * 成功登陆
   * request: { name: 'admin', pwd: '666666' }
   * response: { success: true, message: 'ok', user_id: '5cbecdacde673a2cf41c884a' }
   */
  it('it should login successfully with correct name and pwd.', ( done ) => {
    request
      .post('/api/login')
      .send({
        name: 'admin',
        pwd: '666666'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'message', 'user_id']);
        done();
      })
  })

  /**
   * 缺少用户名或者密码：登陆失败，状态码为 400 并有 message 提示信息
   * request: { name: 'admin', pwd: '' }
   * response: { success: false, message: '缺少必要的字段，用户未填写用户名或者密码' }
   */
  it('it should return 400 without name or pwd.', ( done ) => {
    request
      .post('/api/login')
      .send({
        name: 'admin',
        pwd: ''
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

  /**
   * 密码输入错误：返回提示信息
   * request: { name: 'admin', pwd: '123456' }
   * response: { success: false, message: '密码输入错误', user_id: '' }
   */
  it('it should return message notification with incorrect password: 密码输入错误.', ( done ) => {
    request
      .post('/api/login')
      .send({
        name: 'admin',
        pwd: '123456'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'message', 'user_id']);
        done();
      })
  })

  /**
   * 当用户名是新的 name 时，相当于用户注册
   * request: { name: '柏强', pwd: 'admin' }
   * response: { success: true, message: 'ok', user_id: '5ccafa3f48434a578c24ef26' }
   */
  it('it should login successfully with correct new name and pwd, which equals to registry.', ( done ) => {
    request
      .post('/api/login')
      .send({
        name: '柏强',
        pwd: 'admin'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'message', 'user_id']);
        done();
      })
  })
};
