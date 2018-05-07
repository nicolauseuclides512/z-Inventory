import Axios from 'axios'

export const namespaced = true

export const state = {
  paymentsList: [],
}

export const actions = {
  getPaymentsList (ctx, {salesOrderId, invoiceId}) {
    const url = `sales_orders/${salesOrderId}/invoices/${invoiceId}/payments`
    return Axios.get(url)
      .then(resp => resp.data.data)
      .then((paymentsList) => {
        ctx.commit('SET_PAYMENTS_LIST', paymentsList)
      })
  },
}

export const mutations = {
  SET_PAYMENTS_LIST (state, paymentsList){
    state.paymentsList = paymentsList
  },
}

export const getters = {
  paymentsList: state => state.paymentsList
}
