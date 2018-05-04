import Axios from 'axios'
import paymentMethodList from 'src/helpers/PaymentMethodList'
// import shipment from './shipment';


const CONSTANT = {
  SALES_ORDER_LIST: 'SALES_ORDER_LIST',
  SALES_ORDER: 'SALES_ORDER',
  INVOICES: 'INVOICES',
  PAYMENTS: 'PAYMENTS',
  CREATE_PAYMENT: 'CREATE_PAYMENT',
  PAYMENT_METHOD_LIST: 'PAYMENT_METHOD_LIST',
  SHIPMENT_LIST: 'SHIPMENT_LIST'
}

const state = {
  salesOrderList: [],
  salesOrder: {},
  invoices: [],
  payments: [],
  createPayment: {},
  paymentMethodList: {},
  shipmentList: [],
}

const mutations = {
  [CONSTANT.SHIPMENT_LIST] (state, value) {
    state.shipmentList = value
  },
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
      // dispatch('getPayments', salesOrderId),
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

  async createPayment ({state, commit, dispatch}, salesOrderId, invoicesId) {
    // return dispatch('getInvoices', salesOrderId)
      // .then(async (invoices) => {
        try {
          const firstInvoice = invoices[0]
          const createPaymentResponse = await Axios.get(`sales_orders/${salesOrderId}/invoices/${invoicesId}/payments/create`)
          commit(CONSTANT.CREATE_PAYMENT, createPaymentResponse.data.data)
          commit(CONSTANT.PAYMENT_METHOD_LIST, createPaymentResponse.data.data.payment_method)
          return state.createPayment
        }
        catch (err){
          console.log(err.response)
        }
      // }
    // )
  }

}

const getters = {
  salesOrderData(state) {
    return state.salesOrder
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
