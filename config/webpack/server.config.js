const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
.filter(x => ['.bin'].indexOf(x) === -1)
.forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

module.exports = {
  entry: './server/index.js',
  output: {
    library: "tom",
    filename: 'index.js',
    path: 'dist',
    libraryTarget: "commonjs2"
  },
  target: 'node',
  externals: nodeModules,
  node: {
    __dirname: false
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: 'node_modules',
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};
