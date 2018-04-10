const path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/client/dist')
  },
  module: {
    rules: [   
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }

};