const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  parallel: false,
  productionSourceMap: false,
  lintOnSave: false, 
  pages: {
    index: {
      // 测试时使用
      // entry: 'src/main.js',
      // 发布时使用
      entry: 'src/index.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
