// vue.config.js
const isProduction = process.env.NODE_ENV === "production";

// 预发布环境
const isLocalBuild = process.env.IS_LOCAL_BUILD === "isLocalBuild";

const CDN_URL = isLocalBuild ? "" : "//cdn-jck.icve.com.cn";

let ApiOnlineProxyList = {
  // "/api/": {
  //   target: "http://120.55.149.92",
  //   changeOrigin: true,
  //   secure: false,
  //   pathRewrite: {
  //     "^/api/": ""
  //   }
  // }
};

module.exports = {
  productionSourceMap: false,
  publicPath: isProduction ? CDN_URL : "",
  chainWebpack: config => {
    // 移除 prefetch 插件
    // config.plugins.delete("preload");
    // config.plugins.delete("prefetch");
    // build打包才使用CDN
    if (isProduction) {
      config.plugin("html").tap(args => {
        args[0].cdn = CDN_URL;
        return args;
      });
    }
  },
  devServer: {
    port: 8080,
    proxy: ApiOnlineProxyList
  }
};
