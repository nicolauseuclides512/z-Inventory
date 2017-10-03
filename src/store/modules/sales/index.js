import axios from 'axios'
import _ from 'lodash'
import {getParameterByName} from 'src/helpers'
import {responseOk} from 'src/helpers'
import dateFormat from 'date-fns/format'

import email from './email'
import detail from './detail'
import payment from './payment'
import shipment from './shipment'

const state = {
  isLoading: false,
  filter: 'all',
  sort: 'created_at.desc',
  overview: {},
  salesList: [],
  salesOrder: null,
  salesOrderItems: [],
  paymentList: [],
  paymentMethodList: [],
  paymentMethodDetail: [],
  invoiceList: [],
  shipmentList: [],
  carrierList: [],
  details: {},
  invoice: {},
  orderList: [],
  checkedList: [],
  page_context: {},
  q: '',
}

const mutations = {
  FILTER(state, payload) { state.filter = payload },
  SORT(state, payload) { state.sort = payload },
  CHECKED_LIST(state, payload) { state.checkedList = payload },
  OVERVIEW(state, payload) { state.overview = payload },
  SALES_LIST(state, payload) { state.salesList = payload },
  SALES_ORDER(state, payload) { state.salesOrder = payload },
  SALES_ORDER_ITEMS(state, payload) { state.salesOrderItems = payload },
  INVOICE_LIST(state, payload) { state.invoiceList = payload },
  INVOICE(state, payload) { state.invoice = payload },
  SHIPMENT_LIST(state, payload) { state.shipmentList = payload },
  PAYMENT_LIST(state, payload) { state.paymentList = payload },
  CARRIER_LIST(state, payload) { state.carrierList = payload },
  PAYMENT_METHOD_LIST(state, payload) { state.paymentMethodList = payload },
  PAYMENT_METHOD_DETAIL(state, payload) { state.paymentMethodDetail = payload },
  DETAILS(state, payload) { state.details = payload },
  INVOICE(state, payload) { state.invoice = payload },
  ORDER_LIST(state, payload) { state.orderList = payload },
  PAGE_CONTEXT(state, payload) { state.page_context = payload },
  CHECKED_ITEM(state, payload) {
    if (Array.isArray(payload)) {
      state.checkedList = payload
      return
    }

    state.checkedList.push(payload) // payload: integer
  },
}

const actions = {

  async initialize({dispatch}) {
    await dispatch('getList')
  },


  async saveShipment({state}, sales_order_id: number) {
    const data = {
      shipment_order_number: null,
      date: dateFormat(new Date(), 'YYYY-MM-DD'),
      carrier_id: null,
      carrier_name: null, // This field only for view, not send to server.
      tracking_number: null,
      notes: '',
    }

    try {
      const res = axios.post(`sales_orders/${sales_order_id}/shipments`, data)

      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      commit('SHIPMENT')
      this.form.shipment.date = dateFormat(new Date(), 'YYYY-MM-DD')
      this.form.shipment.shipment_order_number = ''
      this.form.shipment.tracking_number = ''
      this.form.shipment.carrier_id = ''
      this.form.shipment.carrier_name = ''
      this.form.shipment.notes = ''

      this.currentTab = 'shipment'

      swal_success(res)

      $('#shipment').modal('hide')

    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },

  async getList({state, commit}, userParams = {}) {

    if (state.sort === userParams.sort) {
      commit('SORT', state.sort.replace(/\.asc/, '.desc'))
    } else if (userParams.sort) {
      commit('SORT', userParams.sort.replace(/\.desc/, '.asc'))
    }

    commit('FILTER', userParams.filter || state.filter)

    const defaultParams = {
      page: 1,
      per_page: 20,
      sort: state.sort,
      filter: state.filter,
    }

    const params = Object.assign({}, defaultParams, userParams)

    try {
      const res = await axios.get(`sales_orders`, {params})
      commit('SALES_LIST', res.data.data)
      commit('PAGE_CONTEXT', res.data.paginate)

      return res.data.data
    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },


  async show({state, commit, dispatch}, salesOrderId) {
    try {
      const res = await axios.get(`sales_orders/${salesOrderId}`)

      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      commit('SALES_ORDER', res.data.data)
      await dispatch('getList')
      await dispatch('invoiceList', salesOrderId)

    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },


  async getPaymentList({commit}, payload) {
    try {
      const res = await axios.get(`sales_orders/${payload.sales_order_id}/invoices/${payload.invoice_id}/payments`)
      commit('PAYMENT_LIST', res.data.data)
      return res.data.data
    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },

  async salesOrderItems({commit}, salesOrderId) {
    try {
      const res = await axios.get(`sales_orders/${salesOrderId}/details`)
      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      commit('SALES_ORDER_ITEMS', res.data.data)

      return res.data.data

    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },


  async invoiceList({state, commit, dispatch}, sales_order_id: number): Promise {
    try {
      const res = await axios.get(`sales_orders/${sales_order_id}/invoices`)

      if (!responseOk(res.data.code)) {
        throw new Error(`I got code: ${res.data.code} from server.`)
      }

      commit('INVOICE_LIST', res.data.data)

      return res.data.data

    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },


  async invoice({commit}, {sales_order_id, invoice_id}): Promise {
    try {
      const res = await axios.get(`sales_orders/${sales_order_id}/invoices/${invoice_id}`)
      commit(`INVOICE`, res.data.data)
      return res.data.data
    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },


  markItemAsChecked({commit}, sales_order_id) {
    commit('CHECKED_ITEM', sales_order_id)
  },

  clearAllCheckedItems({commit}) {
    commit('CHECKED_ITEM', [])
  },

  async overviewToggle({state, commit, dispatch}, sales_order_id) {
    if (state.overview.sales_order_id === sales_order_id) {
      commit('OVERVIEW', {})
      return
    }

    try {
      const res = await axios.get(`sales_orders/${sales_order_id}`)
      if (!responseOk(res.data.code)) return swal_error(res)

      await dispatch('getOrderList', sales_order_id)

      commit('OVERVIEW', res.data.data)

      return res.data.data

    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },

  async getOrderList({commit}, sales_order_id) {
    try {
      const res = await axios.get(`sales_orders/${sales_order_id}/details`)
      if (!responseOk(res.data.code)) return swal_error(res)

      commit('ORDER_LIST', res.data.data)

      return res.data.data
    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  }
}

const getters = {
  currentFilter(state) {
    const currentFilter = state.filter
    return _.capitalize(currentFilter.split('_').join(' '))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    email,
    detail,
    payment,
    shipment,
  },
}
