const { Report } = require('../db/Schema');

const handleContent = contentStr => {
  let img_urls = [], content = [];

  // 左负断言在 RN 中不能使用
  contentStr
    .replace(/\s+/g, '')
    .replace(/((?<=src=")[^"]+)|(?<=<p>).*?(?=<\/p>)|(?<=<h\d>).+?(?=<\/h\d>)/g, str => {
      if (str && !/鹰眼舆情观察室|更多舆情热点请关注|蚁坊软件|\(|（|<\/?br>/.test(str)) {

        /^http/.test(str) && img_urls.push({url: str});

        // p>img
        if (/img/.test(str)) {
          str = str.match(/(?<=src=")[^"]+/g)[0];
          img_urls.push({url: str});
        }

        // p>a
        if (/<\/a>/.test(str)) {
          str = str.replace(/<a.+?>|<\/a>/g, '');
        }

        content.push(str);
      }
    })

  return {
    img_urls,
    content
  };
};

const list = async (ctx, next) => {
  const {query: {type, page, num}} = ctx;
  let data = null, tempData = [];

  try {
    data = await Report.find({
      type
    })
      .skip((page - 1) * num)
      .limit(Number(num));

    await data.forEach(item => {
      item = JSON.parse(JSON.stringify(item));

      tempData.push(
        Object.assign(
          item,
          handleContent(item.content)
        )
      );
    });

    data = Object.assign({
      data: tempData, 
      success: true
    });
  } catch (e) {
    console.log(e);
    data = {
      success: false
    };
  }
  
  ctx.body = data;
}

module.exports = list;
