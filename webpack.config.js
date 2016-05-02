var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    content: './src/content.js',
    options: './src/options.js'
  },

  output: {
    path: './build/',
    filename: '[name].js'
  },

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: 'src/options/options.html',
      chunks: ['options']
    })
  ],

  module: {
    loaders: [

      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },


    ]
  }


};
