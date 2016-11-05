const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.jsx',
  output: {
    path: './dist/app',
    filename: 'bundle.js'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: 'node_modules',
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        loader: ["style", "css", "sass"]
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
