'use strict'

const apiUrl = process.env.API_BASE_URL
  ? process.env.API_BASE_URL
  : 'https://development.zuragan.com/api/v1'

module.exports = {
  NODE_ENV: '"production"',
  API_BASE_URL: '"' + apiUrl + '"'
}
