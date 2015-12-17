var gulp = require('gulp')
var gutil = require('gulp-util');

var webpack =  require('webpack')
var webpackConfig = require('./webpack.config.js')

var path = require('path');
var WebpackDevServer = require("webpack-dev-server");

function createTask(entryFile){
    var config = Object.create(webpackConfig);
    config.debug = true;
    config.devtool = 'eval'
    config.output.sourceMapFilename='[name].map'
    config.plugins = config.plugins ||[];
    config.plugins.push(new webpack.HotModuleReplacementPlugin())

    config.entry.index.push(entryFile)
    return new WebpackDevServer(webpack(config),{
        publicPath:config.output.publicPath,
        hot:true,
        inline: true,
        stats:{
            colors:true
        },
        lazy: false
    })
}

gulp.task('l3',function(){
    var wpServer = createTask('./src/L3/index.js')
    wpServer.listen(8080,'localhost',function(err){//8080,如果端口在使用，换一个
        if(err) throw new gutil.PluginError('webpack-dev-server',err);
    })
})

gulp.task('default',function(){
    var wpServer = createTask('./src/L4/index.js');
    wpServer.listen(8080,'localhost',function(err){//8080,如果端口在使用，换一个
        if(err) throw new gutil.PluginError('webpack-dev-server',err);
    })
})
