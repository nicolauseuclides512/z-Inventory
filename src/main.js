// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import Cookie from 'js-cookie'
import { sync } from 'vuex-router-sync'
import _ from 'lodash'

import App from './App'
import router from './router'
import store from './store'

// import Select2 from './directives'
// Vue.use(Select2)

Vue.config.productionTip = false

Vue.prototype.$http = Axios
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

const infiniteScroll = require('vue-infinite-scroll').default

// Vue.use(infiniteScroll)

window.HOSTNAME = 'ontelstudio.com'
let baseUrl = process.env.API_BASE_URL
if (baseUrl === 'undefined') {
  baseUrl = 'https://development.zuragan.com/api/v1'
}

Axios.defaults.baseURL = window.BASE_URL = baseUrl
Axios.defaults.headers.common['Authorization'] = Cookie.get('token_type') + ' ' + Cookie.get('access_token')
Axios.defaults.headers.common['Accept'] = 'application/json'
Axios.defaults.headers.common['Content-Type'] = 'application/json'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Axios.interceptors.response.use((response) => response, async (error) => {
  if(!navigator.onLine) {
    Alert.error('Your browser can not connect to the server. Please check the internet connection.')
  }

  if (error.response.data.message === 'Unauthenticated.' && error.status !== 200 && error.config && !error.config.__isRetryRequest) {
    await Axios.post('logout')
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
