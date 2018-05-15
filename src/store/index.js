import Vue from 'vue'
import Vuex from 'vuex'
import VuexPromiseMiddleware from 'vuex-promise-middleware'

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
import salesOrders from './modules/sales_orders/index'
import * as paymentList from './modules/sales_orders/paymentslist'

// request with middleware
import * as example from './modules/examplerequest'

const plugins = [VuexPromiseMiddleware]

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins,
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
    salesOrders,
    example,
    paymentList
  }
})
