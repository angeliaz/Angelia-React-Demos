var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin();
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPluginInstance = new ExtractTextPlugin("../css/[name].[hash:8].css");
var htmlWebpackPluginInstance = new HtmlWebpackPlugin({
    template: 'index.html',
    filename: '../index.html',
    inject: 'body',
});

module.exports = {
    //插件项
    plugins: [commonsPlugin, assetsPluginInstance, htmlWebpackPluginInstance,  extractTextPluginInstance],
    //页面入口文件配置
    entry: [
      lib: './code/lib',
      index: './code/js'
    ],
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
            { test: /\.js|jsx$/, loaders: 'react-hot!babel?harmony', exclude: /node_modules/},
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    // 其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', // 绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};