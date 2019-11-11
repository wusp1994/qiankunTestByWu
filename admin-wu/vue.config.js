const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    // 项目部署基础
    // 默认情况下，我们假设你的应用将被部署在域的根目录下,
    // 例如：https://www.my-app.com/
    // 默认：'/'
    // 如果您的应用程序部署在子路径中，则需要在这指定子路径
    // 例如：https://www.foobar.com/my-app/
    // 需要将它改为'/my-app/'
    // 例如===》iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
    publicPath:  process.env.NODE_ENV === 'production'
        ? '/'  //生产环境
        : '/', //开发环境
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    /**
     * 链式操作 (高级)
     * Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。这个库提供了一个 webpack
     * 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
     * @param config
     */
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    devServer: {
        open:true,
        // proxy: '',//代理地址
        host: 'localhost',
        port: 9428,
    },
}
