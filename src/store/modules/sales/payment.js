import axios from 'axios'
import dateFormat from 'date-fns/format'
import PaymentMethodList from "../../../helpers/PaymentMethodList"
import {responseOk} from "../../../helpers";

const state = {
  paymentMethodModeList: [], // Bank transfer, credit card, etc.
  paymentMethodList: [], // BCA, Mandiri, BNI, etc.
}

const mutations = {
  PAYMENT_METHOD_MODE_LIST(state, payload) { state.paymentMethodModeList = payload },
  PAYMENT_METHOD_DETAIL_LIST(state, payload) { state.paymentMethodList = payload }
}

const actions = {

  getPaymentMethodModeList({commit}) {
    PaymentMethodList.get().then(payment_methods => {
      commit('PAYMENT_METHOD_MODE_LIST', payment_methods)
    })
  },


  async invoice({}, {sales_order_id, invoice_id}): Promise {
    try {
      const response = await axios.get(`sales_orders/${sales_order_id}/invoices/${invoice_id}`)
      return response.data.data
    } catch (e) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },


  async create({state, commit, dispatch, rootState}, sales_order_id) {
    try {

    const invoiceList = await dispatch('sales/invoiceList', sales_order_id, {root: true})

    const invoice = await dispatch('invoice', {
      sales_order_id,
      invoice_id: invoiceList[0].invoice_id
    })

    const invoice_id = invoice.invoice_id

    const url = `sales_orders/${sales_order_id}/invoices/${invoice_id}/payments/create`

    const res = await axios.get(url)

    if (!responseOk(res.data.code)) {
      throw new Error(`I got code: ${res.data.code} from server.`)
    }

    commit('sales/PAYMENT_METHOD_LIST', res.data.data.payment_method, {root: true})

    // this.form.payment.currency = res.data.data.currencies.currency_id
    // this.form.payment.amount = res.data.data.total_payment

    // if (_.isEmpty(state.paymentMethodList)) {
    //   Alert.error('You must set payment method on settings page.')
    //   this.$router.push({name: 'settings'})
    // }

    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },

  save({state}, sales_order_id) {
    this.getInvoiceList(sales_order_id)
    this.getInvoiceById(this.list.invoices[0].invoice_id)
    const invoice_id = store.state.sales.invoice.invoice_id

    const data = {
      reference_number: this.form.payment.reference_number,
      date: this.form.payment.date,
      currency: this.form.payment.currency.toString(),
      amount: this.form.payment.amount,
      notes: this.form.payment.notes,
      payment_mode_id: this.form.payment.payment_mode_id,
      payment_account_id: this.form.payment.payment_account_id,
      send_receipt: this.form.payment.send_receipt
    }

    this.$http.post(`sales_orders/${sales_order_id}/invoices/${invoice_id}/payments`, data).then(res => {
      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      this.form.payment.date = dateFormat(new Date(), 'YYYY-MM-DD')
      this.form.payment.reference_number = ''
      this.form.payment.currency = ''
      this.form.payment.amount = ''
      this.form.payment.payment_mode_id = null
      this.form.payment.payment_account_id = null
      this.form.payment.notes = ''
      this.form.payment.send_receipt = 0

      swal_success(res)

      $('#payment').modal('hide')

    }, res => {
      return swal_error(res)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
