'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const apiUrl = process.env.API_BASE_URL
  ? process.env.API_BASE_URL
  : 'https://development.zuragan.com/api/v1'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"' + apiUrl + '"'
})
