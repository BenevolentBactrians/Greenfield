const path = require('path');
console.log(path.join(__dirname, '/client/dist'))

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/client/dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env", "react", "stage-2"]
        }
      }
    ]
  }

};