const path = require('path')

module.exports = {
    entry: {
        index: './test/index.js'
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'test')
                ],
                loader: 'babel-loader'
            }
        ]
    }
}
