import { fromJS } from 'immutable'

const defaultState = fromJS({
  everyDay: [{
    id: 1,
    title: '辱华零容忍！美歌手diss姚明 吴亦凡天府事变上热搜',
    date: '2018-12-18 17:07',
    imgUrl: 'http://m.eefung.com/image/77f688e1-c683-4bd5-aa85-2fc349d026a5',
    see_count: 10220,
    msg_count: 10,
    love_count: 20,
    content: `<img src="http://m.eefung.com/image/20181218170815-04235"/>
      <p>2018年12月18日15时左右，#红花会Mai#、#天府事变#、#吴亦凡#等多个说唱歌手突然出现在了微博热搜榜上。这还要从美国说唱歌手diss姚明说起。</p>
      <img src="http://m.eefung.com/image/20181218170824-49416" alt=""/>
      <p>17日18时许，@梨视频体育 首发博文：【辱华？美国说唱歌手diss姚明，做眯眯眼，使用明显辱华字眼】美国说唱歌手Lil Pump在自己的社交媒体上发布了自己新歌的部分内容，其中部分歌词非常具有攻击性。直接唱到“他们叫我姚明因为我眼睛小”，并且做出了“眯眯眼”的手势，后面还用了明显的辱华字眼ChingChong。网友喊话吴亦凡，用说唱来回应这种不礼貌的行为。</p>
      <p>随后，@梨视频 带话题#美国说唱歌手diss姚明#转发了这一消息。当天晚上，国内说唱团体天府事变率先出了首diss《Fxxk Lil Pump》以示回应，红花会Mai深夜放出free beat。次日一早，舆论热度开始迅速上升，在社交媒体上引起轩然大波。</p>
      <p>18日11时20分，@新浪娱乐 发文“贝克汉姆三儿子点赞辱华说唱歌手”，大量网民参与讨论，将相关舆情推向高峰。</p>
      <img src="http://m.eefung.com/image/20181218170846-07787" alt=""/>
      <p>据舆情监测系统鹰眼速读网显示，网民情感以负面为主，占比57%，对于“美歌手diss姚明”，大部分言论指向了“像个脑残”、“关键他眼睛也没亚洲人大”、“这种歌手永远上不了台面”。
      说唱圈的集体回怼令广大网友叫好，形成了27.1%的正面情感。
      @爱搬铁的terry：天府事变这一波还可以，很期待中国diss最强的那几位出手，法老，八贼，大傻，祖国需要你们。
      @Panda-K喷喷：这种垃圾，天府事变干的漂亮，FXXK Lil Pump...坐等活死人，CDC大佬出diss。
      面对众多网友喊话，截至18日17时，吴亦凡还没有任何动静，这波热度却惹恼了吴亦凡的粉丝。
      @猪猪最可爱1：吴亦凡也太倒霉了吧！什么都能扯到人家，无语了。你们打键盘这么能耐，怎么不拿键盘把这人diss回去呀？就会diss人家吴亦凡。
      @你心里有我别藏了：说句公道话，吴亦凡很惨了。还有电音的事，他专辑不带电音的很多吧。</p>
    `
  }, {
    id: 2,
    title: '海底捞“霸王餐”事件舆情分析&后续发展',
    date: '2018-12-14 16:35',
    imgUrl: 'http://m.eefung.com/image/7cb2b8ec-6944-4e86-9424-a880eb4a3a7c',
    see_count: 10000,
    msg_count: 10,
    love_count: 20
  }, {
    id: 3,
    title: '海底捞“霸王餐”事件舆情分析&后续发展',
    date: '2018-12-14 16:35',
    imgUrl: 'http://m.eefung.com/image/7cb2b8ec-6944-4e86-9424-a880eb4a3a7c',
    see_count: 10000,
    msg_count: 10,
    love_count: 20
  }, {
    id: 4,
    title: '海底捞“霸王餐”事件舆情分析&后续发展',
    date: '2018-12-14 16:35',
    imgUrl: 'http://m.eefung.com/image/7cb2b8ec-6944-4e86-9424-a880eb4a3a7c',
    see_count: 10000,
    msg_count: 10,
    love_count: 20
  }, {
    id: 5,
    title: '海底捞“霸王餐”事件舆情分析&后续发展',
    date: '2018-12-14 16:35',
    imgUrl: 'http://m.eefung.com/image/7cb2b8ec-6944-4e86-9424-a880eb4a3a7c',
    see_count: 10000,
    msg_count: 10,
    love_count: 20
  }, {
    id: 6,
    title: '海底捞“霸王餐”事件舆情分析&后续发展',
    date: '2018-12-14 16:35',
    imgUrl: 'http://m.eefung.com/image/7cb2b8ec-6944-4e86-9424-a880eb4a3a7c',
    see_count: 10000,
    msg_count: 10,
    love_count: 20
  }]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    default: 
      return state
  }
}
