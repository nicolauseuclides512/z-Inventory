import axios from 'axios'
import { responseOk } from 'src/helpers'

const state = {
  taxIncluded: true
}


const mutations = {
  TAX_INCLUDED(state, payload) {
    state.taxIncluded = payload
  }
}


const actions = {

  save({ state }) {

    const form = {
      settings: {
        'web.item.price.tax_included': state.taxIncluded
      }
    }

    axios.post('settings/tax', form).then(res => {
      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      swal_success(res)

    }, res => {
      swal_error(res)
    })

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
