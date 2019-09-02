const path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '10.200.20.39',
    port: 8888
  },
  module: {
    rules: [
    ]
  }
};
