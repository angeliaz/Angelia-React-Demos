var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin();
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPluginInstance = new ExtractTextPlugin("../css/[name].[hash:8].css");
var htmlWebpackPluginInstance = new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: '../index.html',
    inject: 'body',
});
var htmlWebpackPluginInstance1 = new HtmlWebpackPlugin({
    template: 'src/test.html',
    filename: '../test.html',
    inject: 'body',
});


module.exports = {
    //插件项
    plugins: [commonsPlugin, assetsPluginInstance, htmlWebpackPluginInstance1, htmlWebpackPluginInstance,  extractTextPluginInstance],
    //页面入口文件配置
    entry: {
        page1: "./src/page1",
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./src/page2", "./src/test.js"],
    },
    //入口文件输出配置
    output: {
        path: 'dist/js',
        publicPath: 'http://mycdn.com/',
        filename: '[name].[hash:8].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    // 其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};