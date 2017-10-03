import axios from 'axios'
import { responseOk } from 'src/helpers'

import { regional as regionalHelper } from 'src/helpers'
import Carrier from '../../../helpers/Carrier'

import organization from './organization'
import primary_contact from './primary_contact'
import store_detail from './store_detail'
import checkout from './checkout'
import shipping from './shipping/index'
import tax from './tax'
import payment from './payment'

import Timezone from "../../../helpers/Timezone";
import Currency from "../../../helpers/Currency";
import Language from "../../../helpers/Language";
import Weight from "../../../helpers/Weight";
import Regional from "../../../helpers/regional";

const state = {
  bankList: [],
}

const mutations = {
  BANK_LIST(state, payload) {
    state.bankList = payload
  },
}


const actions = {

  initialize({ dispatch }) {
    dispatch('organization/initialize')
    // Disable primary contact. We fetch primary contact email directly from /organizations/:id
    // dispatch('primary_contact/initialize')
    dispatch('getSettings')
  },

  async getSettings({ commit, dispatch }) {
    try {
      const res = await axios.get('settings/edit')
      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      /* -------------------------------------
       * Global Setting List
       * ---------------------------------- */
      commit('BANK_LIST', res.data.data.banks)

      /* -------------------------------------
       * Store Detail
       * ---------------------------------- */
      Timezone.get().then(timezones => {
        commit('store_detail/TIMEZONE_LIST', timezones)
        commit('store_detail/TIMEZONE', res.data.data.settings['global.timezone.timezone_id'])
      })

      Currency.get().then(currencies => {
        commit('store_detail/CURRENCY_LIST', currencies)
        commit('store_detail/CURRENCY', res.data.data.settings['global.currency.currency_id'])
      })

      Language.get().then(languages => {
        commit('store_detail/LANGUAGE_LIST', languages)
        commit('store_detail/LANGUAGE', res.data.data.settings['global.language.language_id'])
      })

      Weight.get().then(weights => {
        commit('store_detail/WEIGHT_LIST', weights)
        commit('store_detail/WEIGHT', res.data.data.settings['global.unit.weight'])
      })

      /* -------------------------------------
       * Tax
       * ---------------------------------- */
      commit('tax/TAX_INCLUDED', res.data.data.settings['web.item.price.tax_included'])

      /* -------------------------------------
       * Checkout
       * ---------------------------------- */
      commit('checkout/ALLOW_OUT_OF_STOCK_ORDER', res.data.data.settings['web.checkout.allow_out_of_stock_order'])
      commit('checkout/ORDER_RESERVED_HOURS', res.data.data.settings['web.checkout.order_reserved_hours'])

      commit('checkout/REFUND_POLICY', res.data.data.settings['web.checkout.refund_policy'])
      commit('checkout/PRIVACY_POLICY', res.data.data.settings['web.checkout.privacy_policy'])
      commit('checkout/TERMS_OF_SERVICE', res.data.data.settings['web.checkout.terms_of_service'])

      commit('checkout/SAMPLES', {
        'web.checkout.refund_policy.sample': res.data.data.settings['web.checkout.refund_policy.sample'],
        'web.checkout.privacy_policy.sample': res.data.data.settings['web.checkout.privacy_policy.sample'],
        'web.checkout.terms_of_service.sample': res.data.data.settings['web.checkout.terms_of_service.sample'],
      })


      /* -------------------------------------
       * Shipping
       * ---------------------------------- */

      commit('shipping/FROM', res.data.data.settings['web.shipping.from'])
      commit('shipping/ADDRESS', res.data.data.settings['web.shipping.address'])
      commit('shipping/ZIP_CODE', res.data.data.settings['web.shipping.zip_code'])
      commit('shipping/PHONE_NUMBER', '' + res.data.data.settings['web.shipping.phone_number'])

      commit('shipping/COUNTRY_LIST', [res.data.data.settings['web.shipping.country']])
      commit('shipping/COUNTRY_ID', res.data.data.settings['web.shipping.country_id'])

      Regional.provinceList(res.data.data.settings['web.shipping.country_id']).then(data => {
        commit('shipping/PROVINCE_LIST', data)
        commit('shipping/PROVINCE_ID', res.data.data.settings['web.shipping.province_id'])
      })

      if (res.data.data.settings['web.shipping.province_id']) {
        Regional.districtList(res.data.data.settings['web.shipping.province_id']).then(data => {
          commit('shipping/DISTRICT_LIST', data)
          commit('shipping/DISTRICT_ID', res.data.data.settings['web.shipping.district_id'])
        })
      }

      if (res.data.data.settings['web.shipping.district_id']) {
        Regional.regionList(res.data.data.settings['web.shipping.district_id']).then(data => {
          commit('shipping/REGION_LIST', data)
          commit('shipping/REGION_ID', res.data.data.settings['web.shipping.region_id'])
        })
      }

      // Fetch shipment carriers from local storage
      Carrier.get().then(carriers => {
        commit('shipping/CARRIER_LIST', carriers)
      })

      const carrierIds = res.data.data.settings['web.shipping.carrier_ids']
      if (typeof carrierIds === 'string') {
        const currentCarriers = carrierIds.replace(/\[/, '').replace(/\]/, '').split(',').map(item => parseInt(item))
        commit('shipping/CARRIER_IDS', currentCarriers)
      }




      /* -------------------------------------
       * Payment
       * ---------------------------------- */

      // Current Payment data
      commit('payment/PAYMENTS', res.data.data.settings['web.payments'])

      // Payment Methods
      dispatch('payment/getPaymentMethodList')

    } catch(error) {
      return swal_error(error.response)
    }
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    organization,
    primary_contact,
    store_detail,
    checkout,
    shipping,
    tax,
    payment,
  }
}
