const path = require('path');
const webpack = require('webpack');

const src = path.resolve(process.cwd(), 'src'); // 源码目录
const evn = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    mode: evn,
    resolve: {
        alias: {},
        extensions: ['.js', '.tsx'],
    },
    entry: {
        // 定义程序中打包公共文件的入口文件vendor.js
        vendor: [path.resolve(src, 'js', 'vendor.js')],
    },
    output: {
        path: path.join(src, 'js', 'dll'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
        libraryTarget: 'this',
    },
    plugins: [
        new webpack.DllPlugin({
            // 定义程序中打包公共文件的入口文件vendor.js
            context: process.cwd(),
            // manifest.json文件的输出位置
            path: path.join(src, 'dll', '[name]-manifest.json'),
            // 定义打包的公共vendor文件对外暴露的函数名
            name: '[name]_[hash]',
        }),
    ],
};
