const cheerio = require('cheerio');
const superagent = require('superagent');
const { connect } = require('../db/dis-connect');
const { sleep } = require('../util');
const { DemoReport } = require('../db/Schema');
const webSite = 'https://www.eefung.com';
const MAX_PAGE = 70;

const get_item_specific = async url => {
  const { res, status } = await superagent(url);
  console.log(`详情页请求：现在请求的链接是：${url}`);
  if (status === 200) {
    let $ = cheerio.load(res.text, { decodeEntities: false });
    return $('.document-content').html();
  } else {
    console.log(`详情页请求出错，状态码为: ${status}`);
  }
};

const get_one_page_list = async (url, i) => {
  const { res, status } = await superagent(url + '/' + i);
  console.log(`现在请求的链接是：${url}`);

  if (status === 200) {
    let $ = cheerio.load(res.text), pageData = [], j = 0;

    $('.broadcast-item').each(async (idx, el) => {
      let href = $(el).find('.title a').attr('href');
      await sleep(2 * idx);
      console.log(href);
      let content = await get_item_specific(webSite + href);
      pageData.push({
        type: href.match(/(?<=\/)[^\/]+/)[0],
        image: webSite + $(el).find('img').attr('src'),
        title: $(el).find('.title a').text(),
        description: $(el).find('.content a').text(),
        date: $(el).find('.time').text(),
        content,
        originHref: webSite + href
      });
      ++j;
      if (j === $('.broadcast-item').length) {
        get_next_page_list(pageData, i);
      }
    });
  } else {
    console.log(`请求出错，状态码为: ${status}`);
  }

  const get_next_page_list = async (pageData, i) => {
    try {
      await DemoReport.insertMany(pageData);
      console.log(`插入数据库成功..., 共有${pageData.length}条数据插入......${i}`);
    } catch (e) {
      console.log('已有同名的舆情信息，不能重复插入...');
    }

    if (i === MAX_PAGE) {
      console.log(`已达最大请求次数，退出爬虫...`);
      process.exit(0);
    }
    await sleep(2);
    get_one_page_list(webSite + '/hot-comment', ++i);
  }
}

const spider = async () => {
  await connect();
  await get_one_page_list(webSite + '/hot-comment', 1);
};

spider();
