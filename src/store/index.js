import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import global from './modules/global'
import login from './modules/auth/login'
import registration from './modules/auth/registration'
import contact from './modules/contact'
import contactForm from './modules/contact/form'
import settings from './modules/settings'
import itemForm from './modules/items/form'

import sales from './modules/sales'
import salesDetail from './modules/sales/detail'
import salesForm from './modules/sales/form'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    global,
    login,
    registration,
    contact,
    contactForm,
    settings,
    itemForm,
    sales,
    salesDetail,
    salesForm,
  }
})
