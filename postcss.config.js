export default {
    plugins: {
        autoprefixer: {},
        'postcss-preset-env': {
            browserslist: ['> 1%', 'last 2 versions'],
        },
        cssnano: {}
    }
};