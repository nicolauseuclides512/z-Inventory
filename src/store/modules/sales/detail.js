import axios from 'axios'
import { format as dateFormat } from 'date-fns'
import {responseOk} from 'src/helpers'
import invoice from './invoice'

const state = {
  sales_order_id: null,
  isLoading: false,
  sendingEmail: false, // loading indicator
  filter_by: 'status_all',
  salesOrderItems: {},
  currentInvoice: {},
  currentTab: 'invoice',
  enableCreatePaymentButton: false,
  enableCreateShipmentButton: false,
  current: {
    sales_order_id: null,
    invoice_id: null,
    payment_id: null,
    payment_method: {},
  },
  form: {
    payment: {
      reference_number: null,
      date: dateFormat(new Date(), 'YYYY-MM-DD'),
      currency: null,
      currency_name: null, // Only for view
      amount: null,
      notes: '',
      payment_mode_id: null,
      payment_account_id: null,
      send_receipt: 0,
    },
    shipment: {
      shipment_order_number: null,
      date: dateFormat(new Date(), 'YYYY-MM-DD'),
      carrier_id: null,
      carrier_name: null, // This field only for view, not send to server.
      tracking_number: null,
      notes: '',
    }
  },

  payment: {},
  shipment: {},

  salesList: [],
  invoiceList: [],
  paymentList: [],
  checkedList: [],
  shipmentList: [],
  carrierList: [],
  paymentMethodList: [],
  paymentMethodDetailList: []
}

const mutations = {
  PAYMENT(state, payload) { state.payment = payload },
  SHIPMENT(state, payload) { state.shipment = payload },

  SALES_ORDER_ITEMS(state, payload) { state.salesOrderItems = payload },
  SALES_LIST(state, payload) { state.salesList = payload },
  CURRENT_INVOICE(state, payload) { state.currentInvoice = payload },
  INVOICE_LIST(state, payload) { state.salesList = payload },
  PAYMENT_LIST(state, payload) { state.paymentList = payload },
  CHECKED_LIST(state, payload) { state.checkedList = payload },
  SHIPMENT_LIST(state, payload) {
    state.shipmentList = Array.isArray(payload) ? payload : []
  },
  CARRIER_LIST(state, payload) { state.carrierList = payload },
  PAYMENT_METHOD_LIST(state, payload) { state.payment_method_list = payload },
  PAYMENT_METHOD_DETAIL_LIST(state, payload) { state.paymentMethodDetailList = payload },
}

const actions = {

  initialize({dispatch, commit}, sales_order_id) {

    // axios.get(`sales_orders/${sales_order_id}`).then(res => {
    //   if (!responseOk(res.data.code)) {
    //     return swal_error(res)
    //   }
    //
    //   commit('SALES_ORDER_ITEMS', res.data.data)
    //   dispatch('getInvoiceList', state.salesOrderItems.sales_order_id)
    //
    //   this.getList()
    //
    // }).catch(err => {
    //   return swal_error(err.response)
    // })
  },


  /**
   * Get Invoice by ID
   */
  getInvoiceById({commit}, { sales_order_id, invoice_id }) {

    axios.get(`sales_orders/${sales_order_id}/invoices/${invoice_id}`)
      .then(res => {
        if (!responseOk(res.data.code)) return swal_error(res);

        commit('CURRENT_INVOICE', res.data.data)

        // Get payments
        dispatch('getPaymentListByInvoiceId', {
          sales_order_id,
          invoice_id,
        })

      }).catch(err => {
        return swal_error(err.response);
      })
  },


  /**
   * Get payment list by invoice ID
   */
  getPaymentListByInvoiceId({commit}, { sales_order_id, invoice_id }) {

    axios.get(`sales_orders/${sales_order_id}/invoices/${invoice_id}/payments`).then(res => {
      if (!responseOk(res.data.code)) return swal_error(res)

      commit('PAYMENT_LIST', res.data.data)

    }).catch(err => {
      return swal_error(err.response)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    invoice,
  }
}
