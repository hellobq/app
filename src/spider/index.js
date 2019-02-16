const cheerio = require('cheerio')
const superagent = require('superagent')
const {
  SpiderTimeout,
  webSite
} = require('./config')
const connect = require('../db/connect')
const Report = require('../db/Report')
const DemoReport = require('../db/DemoReport')

const analyzeList = page => {
  const $ = cheerio.load(page), pageData = []
  let href

  $('.broadcast-item').each((idx, el) => {
    href = $(el).find('.title a').attr('href')
    pageData.push({
      type: href.match(/(?<=\/)[^\/]+/)[0],
      image: webSite + $(el).find('img').attr('src'),
      href: webSite + href,
      title: $(el).find('.title a').text(),
      description: $(el).find('.content a').text(),
      date: $(el).find('.item-head span:first-child').text()
    })
  })

  return pageData
}


const analyzeSpecifc = page => { 
  const $ = cheerio.load(page, {decodeEntities: false})
  // 图片完整地址
  return $('.document-content').html().replace(/(?<=src=")\//g, s => `${webSite}/`)
}


const requestList = async (url, cb) => {
  const {status, res} = await superagent(url)
  console.log(`已请求的链接是：${url}`)

  if (status === 200) {
    let data = analyzeList(res.text)
    cb(data)
  }
}

const requestSpecifc = async (url, cb) => {
  const {status, res} = await superagent(url)
  console.log(`已请求的链接是：${url}`)

  if (status === 200) {
    let data = analyzeSpecifc(res.text)
    cb(data)
  }
}


const getListUrls = () => {
  const obj = {
    'hot-report': 64,
    'daily-report': 130,
    'hot-comment': 105,
    'yanjiu': 20
  }, tempArr = []

  Object.keys(obj).forEach(item => {
    for(let i = 1; i <= obj[item]; ++i) {
      tempArr.push(`${webSite}/${item}/${i}`)
    }
  })
  return tempArr
}


const spider = () => {
  const urls = getListUrls()
  let count = 0, objs = []

  connect()
  for (let i = 0; i < urls.length; ++i) {
    setTimeout(() => {
      console.log(Date.now())
      requestList(urls[i], (pageData) => {
        pageData.forEach((item, j) => {
          setTimeout(() => {
            console.log(Date.now())
            requestSpecifc(item.href, async specificData => {

              if (count === 100) {
                await DemoReport.insertMany(objs)
                count = 0
                objs = []
                console.log('有100条数据插入完成-----')
              } else {
                count++
                objs.push(Object.assign(item, { content: specificData }))
                console.log('有一个数据加入完成-----')
              }
              
              
            })
          }, SpiderTimeout * (urls.length + j))
        })
      })
    }, SpiderTimeout * i)
  }
  
}

module.exports = spider
