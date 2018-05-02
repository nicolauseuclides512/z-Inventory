'use strict'

const apiUrl = process.env.API_BASE_URL
  ? process.env.API_BASE_URL
  : 'https://development.zuragan.com/api/v1'

module.exports = {
  MIXPANEL_TOKEN: '""',
  GA_ID: '"UA-104614950-3"',
  NODE_ENV: '"production"',
  API_BASE_URL: '"' + apiUrl + '"'
}
