module.exports = (request, expect) => () => {
  /**
   * 查询用户 观看数、收藏数、点赞（用户名必须已注册过）
   * request: '/api/viewCollectionThumbUps?name=admin'
   * response: {
   *   success: true,
   *   data: {
   *     id: "5ccbd6921539e54048690310",
   *     name: "admin",
   *     views: 0,
   *     collections: 0,
   *     thumbs_ups: 1
   *   } 
   * }
   */
  it('it should return 200 with registryed name.', ( done ) => {
    request
      .get('/api/viewCollectionThumbUps?name=admin')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'data']);
        done();
      })
  })

  /**
   * 缺少关键字段：name（或者为空）
   * request: '/api/viewCollectionThumbUps?name='
   * response: { success: false, message: "缺少用户名这个必要的字段" }
   */
  it('it should return message notification with unregistered name: 缺少用户名这个必要的字段.', ( done ) => {
    request
      .get('/api/viewCollectionThumbUps?name=')
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
   * 用户名未注册
   * request: '/api/viewCollectionThumbUps?name=jack'
   * response: { success: false, message: "用户名未注册" }
   */
  it('it should return message notification with unregistered name: 用户名未注册.', ( done ) => {
    request
      .get('/api/viewCollectionThumbUps?name=jack')
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