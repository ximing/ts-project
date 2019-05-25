module.exports = {
    plugins: [
        require('postcss-clearfix')(),
        require('cssnano')({
            preset: ['default', {}],
        }),
        require('autoprefixer')({
            browsers: ['last 5 versions', 'Android >= 4.0', 'iOS >= 7'],
        }),
    ],
};
