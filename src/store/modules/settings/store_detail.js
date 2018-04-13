import axios from 'axios'
import { Alert, responseOk } from 'src/helpers'

const state = {
  timezoneList: [],
  weightList: [],
  currencyList: [],
  languageList: [],
  timezone_id: 0,
  weight: 0,
  currency_id: 0,
  language_id: 0,
}


const mutations = {
  TIMEZONE_LIST(state, payload) {
    state.timezoneList = payload
  },
  WEIGHT_LIST(state, payload) {
    state.weightList = payload
  },
  CURRENCY_LIST(state, payload) {
    state.currencyList = payload
  },
  LANGUAGE_LIST(state, payload) {
    state.languageList = payload
  },
  TIMEZONE(state, payload) {
    if (payload) {
      state.timezone_id = payload
    }
  },
  WEIGHT(state, payload) {
    if (payload) {
      state.weight = payload
    }
  },
  CURRENCY(state, payload) {
    if (payload) {
      state.currency_id = payload
    }
  },
  LANGUAGE(state, payload) {
    if (payload) {
      state.language_id = payload
    }
  },
}

const actions = {

  async save({dispatch}) {
    try {
      const [
        store_detail,
        // tax
      ] = await Promise.all([
        dispatch('updateStoreDetail'),
        // dispatch('updateTax'),
      ])

      if (!responseOk(store_detail.data.code) ) {
        Alert.error('Failed to save')
        return
      }

      Alert.success('Store Detail updated.')

    } catch (err) {
      console.error(err)
      Alert.error('Failed to save')
    }
  },


  async updateStoreDetail({state}) {
    return await axios.post('settings/store_detail', {
      settings: {
        'global.timezone.timezone_id': state.timezone_id,
        'global.unit.weight': 'gr',
        'global.currency.currency_id': state.currency_id,
        'global.language.language_id': state.language_id,
      }
    })
  },


  async updateTax({rootState}) {
    return await axios.post('settings/tax', {
      settings: {
        'web.item.price.tax_included': rootState.settings.tax.isTaxIncluded
      }
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
