const glob = require('glob')

console.log('--- 多页面信息：--------------------------------------------------')
// 函数定义
function getEntry (globPath) {
  let entries = {}
  glob.sync(globPath).forEach(element => {
    let arr = element.split('/')
    let page = arr[2]
    let pageHtml = page + '.html'
    entries[page] = {
      entry: element,
      template: 'public/' + pageHtml,
      filename: pageHtml,
      chunks: ['chunk-vendors', 'chunk-common', page]
    }
  })
  return entries
}

let pages = getEntry('src/pages/**/*.js')

console.log(pages)
console.log('------------------------------------------------------------------')

module.exports = {
  pages
  /*
  pages: {
    index: {
      entry: 'src/pages/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    help: {
      entry: 'src/pages/help/main.js',
      template: 'public/help.html',
      filename: 'help.html',
      chunks: ['chunk-vendors', 'chunk-common', 'help']
    }
  }
  */
}
