// vue.config.js
const path = require("path");
// 是不是生产环境
const isDev = process.env.NODE_ENV == "development";
const isPrd = process.env.NODE_ENV == "production";
// 代码压缩插件
const TerserPlugin = require('terser-webpack-plugin');

// CDN资源
const JS_CDN = [
  "cdn//vue.min.js",
  "cdn//vuex.min.js",
  "cdn//vue-router.min.js",
  "cdn//axios.min.js",
  "cdn//element-ui/2.12.0/index.js",
]
const CSS_CDN = [
  "cdn//element-ui@2.12.0/lib/theme-chalk/index.css"
]

const cdn = {
  css: CSS_CDN,
  js: JS_CDN
}

function resolve(dir) {
  return path.join(__dirname, dir);
}

let ApiOnlineProxyList = {
  // node 后台API
  '/api': {
    target: 'http://127.0.0.1:7001',
    // true允许跨域
    changeOrigin: true,
    // secure: false,
    // pathRewrite: {
    //   // 需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
    //   '^/api': ''
    // }
  },
};
module.exports = {
  // context: [],
  lintOnSave: isDev,
  publicPath: '/',
  assetsDir: "assets",
  // 生产环境中改成false 
  productionSourceMap: isDev,
  // css:{
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract : false ,
  //   // 开启 CSS source maps?
  //   sourceMap : false ,
  //   // css预设器配置项
  //   loaderOptions  : {},
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules  : false
  // },

  // webpack的配置
  configureWebpack: config => {

    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'components': resolve('src/components.ts'),
        'styles': resolve('src/assets/styles'),
      }
    },

      // 生产环境cdn方式引入的资源

      config.externals = isPrd ? {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios',
        'element-ui': 'ELEMENT'
      } : {},

      // 生产环境下去掉控制台提示
      config.optimization = isPrd ? {
        minimizer: [
          // 生产环境去掉 控制台提示
          new TerserPlugin({
            terserOptions: {
              compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'alert', 'debugger']
              },
            },
          }),
        ],
      } : {}
  },

  chainWebpack: config => {
    // 删除预读取 实现懒加载
    config.plugins.delete('prefetch')
    config.resolve.alias.set("assets", resolve("src/assets"));

    // if (isDev) {     // 分析
    //   config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }

    // 生产环境使用cdn
    if (isPrd) {
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        })
    }
  },

  devServer: {
    host: 'localhost',
    port: 8090,
    // 设置代理
    proxy: ApiOnlineProxyList
  },

  // pluginOptions 第三方插件
  pluginOptions: {
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'png', 'jpeg', 'jpg'],
    threshold: 10240, //对超过10k的数据进行压缩
  }
};
