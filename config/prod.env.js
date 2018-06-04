'use strict'

const apiUrl = process.env.API_BASE_URL
  ? process.env.API_BASE_URL
  : 'https://development.zuragan.com/api/v1'

module.exports = {
  MIXPANEL_TOKEN: '"43cf762e0c11bd4af0b2e54cc0c2df28"',
  GA_ID: '"UA-104614950-3"',
  NODE_ENV: '"production"',
  API_BASE_URL: '"' + apiUrl + '"',
  APP_VERSION:'"v.2.1.1"'
}
