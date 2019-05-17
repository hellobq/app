module.exports = (request, expect) => () => {
  /**
   * 获取某一文章的收藏数、点赞数、与当前用户有关的（是否被当前用户收藏、是否被用户点赞）
   * request: '/api/getThumbsupAndStar?report_id=5cc99d49cc64c255cc934fc2',
   * response: {
   *    success: true
   *    collections: 1
   *    thumbsUps: 1
   *    collected: false
   *    thumbsUped: false
   * }
   */
  it('it should only return thumbsUps and collections with report_id but without user_id(如果用户未登陆，不能知晓该文章是否被用户收藏和点赞).', done => {
    request
      .get('/api/getThumbsupAndStar?report_id=5cc99d49cc64c255cc934fc2')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'collections', 'thumbsUps', 'collected', 'thumbsUped']);
        done();
      })
  })

  /**
   * 获取某一文章的收藏数、点赞数、与当前用户有关的（是否被当前用户收藏、是否被用户点赞）
   * request: '/api/getThumbsupAndStar?report_id=5cc99d49cc64c255cc934fc2&user_id=5ccbd6921539e54048690310',
   * response: {
   *    success: true
   *    collections: 1
   *    thumbsUps: 1
   *    collected: true
   *    thumbsUped: true
   * }
   */
  it('it should return thumbsUps、collections、collected、thumbsUped with report_id and user_id(如果用户已登陆，可以知晓该文章是否被用户收藏和点赞).', done => {
    request
      .get('/api/getThumbsupAndStar?report_id=5cc99d49cc64c255cc934fc2')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(`Error Found! ${err}`);
        }
        expect(res.body).to.have.keys(['success', 'collections', 'thumbsUps', 'collected', 'thumbsUped']);
        done();
      })
  })
};
