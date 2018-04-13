import axios from 'axios'
import { responseOk } from 'src/helpers'

const state = {
  isTaxIncluded: true
}


const mutations = {
  TAX_INCLUDED (state, payload) {
    state.isTaxIncluded = payload
  }
}


const actions = {

  save({ state }) {

    const form = {
      settings: {
        'web.item.price.tax_included': state.isTaxIncluded
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

const getters = {
  isTaxIncluded(state) {
    if(state.isTaxIncluded == 0){
      return false
    }else if(state.isTaxIncluded == 1){
      return true
    }else{
      return state.isTaxIncluded
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
