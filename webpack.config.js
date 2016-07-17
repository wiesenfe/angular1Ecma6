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
    devServer: {
        proxy: {
            '/rest/*': {
                target: 'http://localhost:8001',
                secure: false
            }
        }
    },
    devtool: 'source-map',
    module: {
        loaders: [
            // Babel transpile
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015' },
            // Raw HTML into bundle
            { test: /\.html$/, loader: 'raw' }
        ]
    },
    plugins: [
        // Make angular depedency injection compatible with minification
        new ngAnnotatePlugin({ add: true }),
        // Minification
        // new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true })
    ],
    externals: {
        "angular": "angular"
    }
}