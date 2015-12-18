var path = require('path');

module.exports = {
    entry: [path.resolve(__dirname, 'app/app.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dist.js'
    },
    module: {
        loaders: [
            {
                test: /[\.jsx|\.js ]$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};