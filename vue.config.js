const path = require("path")
// const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '',
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()
    }
    // 移除 preload(预载) 插件
    config.plugins.delete('preload')
    // 移除 prefetch(预取) 插件
    config.plugins.delete('prefetch')
    // //压缩代码
    config.optimization.minimize(true)
    // config.externals({
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuescroll': 'vuescroll',
    //   'mockjs': 'Mock',
    // })
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("pages", resolve("src/pages"))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3300',
        changeOrigin: true,//允许跨域
        pathRewrite: { '^/api': '' },
      },
    },
  }
}
