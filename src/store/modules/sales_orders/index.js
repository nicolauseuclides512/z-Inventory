import Axios from 'axios'
import paymentMethodList from 'src/helpers/PaymentMethodList'

const CONSTANT = {
  SALES_ORDER_LIST: 'SALES_ORDER_LIST',
  SALES_ORDER: 'SALES_ORDER',
  INVOICES: 'INVOICES',
  PAYMENTS: 'PAYMENTS',
  CREATE_PAYMENT: 'CREATE_PAYMENT',
  PAYMENT_METHOD_LIST: 'PAYMENT_METHOD_LIST'
}

const state = {
  salesOrderList: [],
  salesOrder: {},
  invoices: [],
  payments: [],
  createPayment: {},
  paymentMethodList: {},
}

const mutations = {
  [CONSTANT.SALES_ORDER_LIST] (state, value) {
    state.salesOrderList = value
  },
  [CONSTANT.SALES_ORDER] (state, value) {
    state.salesOrder = value
  },
  [CONSTANT.INVOICES] (state, value) {
    state.invoices = value
  },
  [CONSTANT.PAYMENTS] (state, value) {
    state.payments = value
  },
  [CONSTANT.CREATE_PAYMENT] (state, value) {
    state.createPayment = value
  },
  [CONSTANT.PAYMENT_METHOD_LIST] (state, value) {
    state.paymentMethodList = value
  },
}

const actions = {
  async getList ({state, commit}, options) {
    try {
      const defaultParams = {
        page: 1,
        per_page: 30,
        sort: 'created_at.desc',
        filter: 'all',
        q: '',
      }

      const params = Object.assign({}, defaultParams, options)

      const response = await Axios.get(`sales_orders`, {params})
      commit(CONSTANT.SALES_ORDER_LIST, response.data.data)
      return state.salesOrderList
    }
    catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        //
      }
    }
  },

  async selectSalesOrder ({dispatch}, salesOrderId) {
    return Promise.all([
      dispatch('getSalesOrder', salesOrderId),
      dispatch('getPayments', salesOrderId),
    ])
  },

  async getSalesOrder ({state, commit}, salesOrderId) {
    try {
      const {data} = await Axios.get(`sales_orders/${salesOrderId}`)
      commit(CONSTANT.SALES_ORDER, data.data)
      return state.salesOrder
    }
    catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        //
      }
    }
  },

  async getInvoices ({state, commit}, salesOrderId) {
    try {
      return Axios.get(`sales_orders/${salesOrderId}/invoices`)
        .then(({data}) => {
          commit(CONSTANT.INVOICES, data.data)
          return state.invoices
        })
    }
    catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        //
      }
    }
  },

  async getPayments ({state, commit, dispatch}, salesOrderId) {
    try {
      return dispatch('getInvoices', salesOrderId)
        .then(async (invoices) => {
          const lastInvoice = invoices[invoices.length - 1]
          const paymentsResponse = await Axios.get(`sales_orders/${salesOrderId}/invoices/${lastInvoice.invoice_id}/payments`)
          commit(CONSTANT.PAYMENTS, paymentsResponse.data.data)
          return state.payments
        })
    }
    catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        //
      }
    }
  },

  async createPayment ({state, commit, dispatch}, salesOrderId) {
    return dispatch('getInvoices', salesOrderId)
      .then(async (invoices) => {
        const firstInvoice = invoices[0]
        const createPaymentResponse = await Axios.get(`sales_orders/${salesOrderId}/invoices/${firstInvoice.invoice_id}/payments/create`)
        commit(CONSTANT.CREATE_PAYMENT, createPaymentResponse.data.data)
        commit(CONSTANT.PAYMENT_METHOD_LIST, createPaymentResponse.data.data.payment_method)
        return state.createPayment
      })
  }

}

const getters = {}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
