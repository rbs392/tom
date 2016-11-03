const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.jsx',
  output: {
    path: './dist/app',
    filename: 'bundle.js'
  },
  target: 'web',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tom',
      filename: 'index.html',
      template: `${__dirname}/template.ejs`
    })
  ]
};
