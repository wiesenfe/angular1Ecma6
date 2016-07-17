var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '/src'),
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/dist/',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?presets[]=es2015'
            },
            { test: /\.html$/, loader:'raw'}
        ]
    },
    plugins: [
        new ngAnnotatePlugin({ add: true }),
       // new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true })
    ],
    externals: {
        "angular": "angular"
    }
}