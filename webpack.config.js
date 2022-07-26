const path = require('path')

module.exports = {
    // entry: path.resolve(__dirname, './src/index.js'),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        }
      ]
    }
}
