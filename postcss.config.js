export default {
    plugins: {
        autoprefixer: {},
        'postcss-nested': {},
        'postcss-preset-env': {
            browserslist: ['> 1%', 'last 2 versions'],
            stage: 3,
            features: {
                'nesting-rules': true,
            },
        },
        cssnano: {},
    }
};
