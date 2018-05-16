'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// const babelCore = require("babel-core/register");
// const babelPolyfill = require("babel-polyfill");
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
// const DIST_DIR = 'dist'

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
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  plugins: [
    new workboxPlugin.GenerateSW({
        swDest: 'sw.js',
        clientsClaim: true,
        skipWaiting: true,

      // globDirectory: DIST_DIR,
      globPatterns: ['**/*.{html,js,css}'],
      // swDest: path.join(DIST_DIR, 'sw.js'),

      globDirectory: './dist/',
      // globPatterns: ['**/*.{html,js,css}'],
      // swDest: './dist/service-worker.js'
    }),
    // service worker caching with SWPrecacheWebpackPlugin
    // new SWPrecacheWebpackPlugin({
    //   cacheId: 'zuragan-inventory-web-app',
    //   filename: 'service-worker.js',
    //   staticFileGlobs: ['dist/**/*.{js,html,css}'],
    //   minify: true,
    //   stripPrefix: 'dist/',
    //   runtimeCaching: [
    //   {
    //     urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
    //     handler: 'cacheFirst'
    //   },
    //   {
    //     urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
    //     handler: 'cacheFirst'
    //   },
    //   {
    //     urlPattern: /^https:\/\/code\.getmdl\.io\//,
    //     handler: 'cacheFirst'
    //   }]
    // }),
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
