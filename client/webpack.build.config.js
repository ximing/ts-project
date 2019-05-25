const webpack = require('webpack');
const path = require('path');
const webpackMmerge = require('webpack-merge');
const common = require('./webpack.common.config');

const ASSET_PATH = process.env.ASSET_PATH || '/';
module.exports = webpackMmerge(common, {
    mode: 'production',
    module: {
        rules: [],
    },
    output: {
        filename: '[name].[chunkhash].js',
        publicPath: ASSET_PATH,
        path: path.resolve(__dirname, 'dist'),
    },
    context: __dirname,
    target: 'web',
    stats: 'errors-only',
    plugins: [new webpack.HashedModuleIdsPlugin()],
});
