module.exports = {
    entry: "./js/app.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: require.resolve('babel-preset-env')
                    }
                }
            }
        ]
    },
    mode: "development"
}