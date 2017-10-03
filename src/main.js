// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import _ from 'lodash'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import { sync } from 'vuex-router-sync'

import Cookie from 'js-cookie'
import Select2 from './directives'
Vue.use(Select2)

Vue.config.productionTip = false

Vue.prototype.$http = axios
window.Vue = Vue
window.Cookie = Cookie

// Load helpers
import { Alert, swal_success, swal_error } from './helpers'
window.Alert = Alert
window.swal_success = swal_success
window.swal_error = swal_error

// Load custom filters
require('./filters.js')

// Load custom validators
// require('./validators.js')

const infiniteScroll = require('vue-infinite-scroll')

Vue.use(infiniteScroll)

window.HOSTNAME = 'ontelstudio.com'
let baseUrl = process.env.API_BASE_URL
if (baseUrl === 'undefined') {
  baseUrl = 'https://development.zuragan.com/api/v1'
}
axios.defaults.baseURL = window.BASE_URL = baseUrl
axios.defaults.headers.common['Authorization'] = Cookie.get('token_type') + ' ' + Cookie.get('access_token')
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.response.use((response) => response, async (error) => {
  if (error.response.data.message === 'Unauthenticated.' && error.status !== 200 && error.config && !error.config.__isRetryRequest) {
    await axios.post('logout')
    // Force user to logout
    Cookie.remove('token_type')
    Cookie.remove('access_token')
    Cookie.remove('refresh_token')
    Cookie.remove('organization_id')
    router.replace('/login')
    Alert.error('You don\'t have authorization to access that page.')
  }
  return Promise.reject(error)
})

sync(store, router)

const Bus = window.Bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
