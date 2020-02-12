const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    // host: '0.0.0.0',
    // port: 1234,
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: "http://139.196.87.24:9005",
        // changeOrigin: true, // 要不要变更origin头
        // ws: false
        pathRewrite: {
          // 地址重写：http://127.0.0.1:3000/user/login
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },
  configureWebpack: {
    name: "后台管理",
    // externals: {
    //   AMap: "AMap"
    // }
  },
  chainWebpack(config) {
    // svg规则配置一下，排除icons目录
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    // 新增icons规则，设置svg-sprite-loader
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      }) // 使用图标名称
      .end();
  }
};