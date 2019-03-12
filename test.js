let str = `
  <p><img src="/image/20190215173254-28126" title="" alt=""></p>
`

let arr = []
str.replace(/((?<=src=")[^"]+)|(?<=<p>).+?(?=<\/p>)|(?<=<h\d>).+?(?=<\/h\d>)/g, str => {
  console.log(str + '\n')

  if (/img/.test(str)) {
    str = str.match(/(?<=src=")[^"]+/g)[0]
    console.log(str)
  }
})
