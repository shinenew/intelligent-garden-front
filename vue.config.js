module.exports = {
  publicPath: process.env.VUE_APP_ENV_WEB_URL, // web项目根路径
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        '@a': '@/assets',
        '@c': '@/components',
        '@v': '@/views',
      }
    }
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    before(app) {
      // 开发环境才启动mock
      if (process.env.NODE_ENV === "development") {
        const Mock = require("./src/mock");
        Mock.mock(app);
      }
    }
  }
}