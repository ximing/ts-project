const webpack = require('webpack');
const path = require('path');
const webpackMmerge = require('webpack-merge');
const common = require('./webpack.common.config');

const port = process.env.PORT || 8000;

module.exports = webpackMmerge({}, common, {
    mode: 'development',
    output: {
        filename: '[name].js',
        publicPath: `http://127.0.0.1:${port}/`,
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        proxy: {},
        publicPath: `http://127.0.0.1:${port}/`,
        contentBase: path.join(process.cwd(), 'public'),
        compress: false, // enable gzip compression
        historyApiFallback: true,
        hot: true,
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
        port,
        host: '127.0.0.1',
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
});
