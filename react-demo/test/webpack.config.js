var path = require('path');

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/app.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader'},
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
        ]
    }
};