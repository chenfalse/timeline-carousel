module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: "src/main.js", //入口文件
      template: "public/index.html",
      filename: "index.html"
    }
  },
  // 组件样式内联
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .include.add(/src/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  }
};