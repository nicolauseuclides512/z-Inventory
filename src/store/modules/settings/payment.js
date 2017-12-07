import axios from 'axios'
import { Alert } from 'src/helpers'
import { responseOk } from 'src/helpers'
import PaymentMethodList from "../../../helpers/PaymentMethodList"

const state = {
  cash: false,
  bank: false,

  selected_payment_method: null,

  payment_method_list: [],
  payments: [],
  payment_details: [],

  name: null,
  description: null,
  payment_method_status: 1,

  account_number: null,
  account_name: null,
  account_holder: null,
}


const mutations = {
  CASH(state, payload: boolean) {
    state.cash = payload
  },
  BANK(state, payload: boolean) {
    state.bank = payload
  },
  PAYMENT_METHOD_LIST(state, payload) {
    state.payment_method_list = payload
  },
  SELECTED_PAYMENT_METHOD(state, payload) {
    state.selected_payment_method = payload
  },
  PAYMENTS(state, payload) {
    state.payments = payload
  },
  PAYMENT_DETAILS(state, payload) {
    state.payment_details = payload
  },
  ACCOUNT_NAME(state, payload) {
    state.account_name = payload
  },
  ACCOUNT_NUMBER(state, payload) {
    state.account_number = payload
  },
  ACCOUNT_HOLDER(state, payload) {
    state.account_holder = payload
  },
}

const actions = {

  getPaymentMethodList({ commit }) {
    PaymentMethodList.get().then(payment_methods => {
      commit('PAYMENT_METHOD_LIST', payment_methods)
    })
  },

  add({ state, commit }) {
    const payment_method_id = state.selected_payment_method.payment_method_id

    // Add payment mode_id
    axios.post('settings/payments', { mode_id: payment_method_id }).then(res => {
      if (!responseOk(res.data.code) && res.data.message !== 'payment exist.') {
        return swal_error(res)
      }

      const form = {
        account_number: state.account_number,
        account_name: state.account_name,
        account_holder: state.account_holder,
      }

      axios.post(`settings/payments/${payment_method_id}/add_detail`, form)
        .then(res => {
          if (!responseOk(res.data.code)) {
            return swal_error(res)
          }

          commit('PAYMENTS', res.data.data)
          commit('ACCOUNT_NAME', '')
          commit('ACCOUNT_NUMBER', '')
          commit('ACCOUNT_HOLDER', '')
          commit('SELECTED_PAYMENT_METHOD', null)

          return swal_success(res)

        }, res => {
          return swal_error(res)
        })

    })

  },


  remove({ state, commit }, payment_detail) {

    Alert.confirm({
      title: 'Are you sure delete this data?',
      text: '',
    }, () => {

      axios.delete(`settings/payments/remove_detail?id=` + payment_detail.account_id).then(res => {
        if (!responseOk(res.data.code)) return swal_error(res)

        commit('PAYMENTS', res.data.data)

        swal_success(res)

      }, res => {
        swal_error(res)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
