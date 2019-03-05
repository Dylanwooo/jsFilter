const path = require('path')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    index: './src/js/index.jsx'
  },

  output: {
    path: path.join(__dirname, 'src'),
    filename: 'js/[name].bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html', // 相对publicPath
      template: './src/index.html', // 相对config
      inject: 'body',
      hash: false
    }),
    new ExtractTextPlugin('css/[name].bundle.css'),
    new webpack.DefinePlugin({
      'process.env': {
          'STATIC_ENV': JSON.stringify(false)
      }
    }),
    new webpack.ProvidePlugin({
        Promise: 'promise-polyfill'
    }),
    new CopyWebpackPlugin([{
      from: './src/static',
      to: 'js',
      ignore: ['.gitkeep']
    }])
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ],
          publicPath: '../'
        })
      },
      {
        test: /\.(png|jpe?g|gif|mp3|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1500,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    disableHostCheck: true,
    // host: '0.0.0.0',
    port: 4002
  },

  devtool: 'source-map'
}

