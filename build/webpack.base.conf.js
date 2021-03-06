'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const today = new Date()
const month = today.getMonth()+'-re-'
const date = today.getDate()+'-bo-'
const time = today.getTime()+'-tak'
const timeStamp = month+''+date+''+time

// const glob = require('glob');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: [
    "babel-polyfill",'./src/main.js'
  ],
  output: {
    path: config.build.assetsRoot,
    // filename: '[name].js',
    filename: '[name].[hash:4]'+timeStamp+'.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  plugins: [
    //   new PurifyCSSPlugin({
    //   // Give paths to parse for rules. These should be absolute!
    //   paths: glob.sync(path.join(__dirname, 'app/*.html')),
    // })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: ['src', 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
