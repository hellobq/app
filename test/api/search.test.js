module.exports = (request, expect) => () => {
  /**
   * 根据文章名称进行搜索
   * request: '/api/search?q=华',
   * response: {
   *    success: true,
   *    data: [{
   *        title: "奔驰女车主维权获全网声援，新华网：油漏了，别把良心也“漏”了！"
   *        _id: "5cc9a22a234d3f04a4300645"
   *    }...]
   * }
   */
  it('it should return search results successfully with q.', done => {
    request
      .get('/api/getCollectionList?name_id=5ccbd6921539e54048690310&page=1&num=10')
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
