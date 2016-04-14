var webpack = require('webpack');

module.exports = {

  entry: {
    content: './src/content.js',
    background: './src/background.js',
    options: './src/options.js'
  },

  output: {
    path: './build/',
    filename: '[name].js'
  },

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    loaders: [

      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }

    ]
  }


};
