const cheerio = require('cheerio');
const superagent = require('./node_modules/superagent');
const { connect } = require('../db/dis-connect');
const { Report } = require('../db/Schema');

const website = 'http://www.knowlesys.cn/wp/article/category/public_opinion';
const w = 'http://www.knowlesys.cn/wp/article/category/public_opinion/page/';

let i = 1;
const urls = [];
const objs = [];

const getSpeficInfo = async () => {
  if (i < urls.length) {
    console.log(`正在爬虫详细内容................ ${urls[i]}`, i, urls.length);
    try {
      const { status, res } = await superagent(urls[i]);
      if (status === 200) {
        let $ = cheerio.load(res.text, { decodeEntities: false });
        const $info = $('.post.artical-con');
        objs[i] = Object.assign(
          objs[i],
          {
            image: $info.find('.alignnone').eq(0).attr('src'),
            connect: $info.find('.content').html()
          }
        )
        setTimeout(() => {
          ++i;
          getSpeficInfo();
        }, 1000);
      }
    } catch (e) {
      await Report.insertMany(objs);
      console.log('已保存已有的...', objs);
      console.log('请求出错，中途退出...');
      return;
    }
    
    
  } else {
    await Report.insertMany(objs);
    console.log('详细信息内容获取得到...', objs);
    return;
  }
};


const spider = async (website) => {
  console.log(`正在爬虫................ ${website}`)
  const {status, res} = await superagent(website);
  const newUrls = [];
  if (status === 200) {
    let $ = cheerio.load(res.text, {decodeEntities: false});
    let $list = $('.post.artical-con');
    $list.each(function () {
      let date = $(this).find('.date').text();
      if (Number(date.substring(0, 4)) > 2016) {
        let href = $(this).find('.title').attr('href');
        newUrls.push(href);
        objs.push({
          title: $(this).find('.title').text(),
          date,
          description: $(this).find('.content').text(),
          href
        })
      } else {
        return;
      }
    });
    
    if (newUrls.length === $list.length) {
      urls.push(...newUrls);
      setTimeout(() => {
        spider(`${w}${++i}`); 
      }, 600)
    } else {
      console.log('结束了...', urls.length)
      console.log(urls)
      await connect();
      i = 0;
      getSpeficInfo();
    }
  };
};

spider(website);
