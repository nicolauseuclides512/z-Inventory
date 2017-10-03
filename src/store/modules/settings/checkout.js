import axios from 'axios'
import { responseOk } from 'src/helpers'

const state = {
  allow_out_of_stock_order: 0,

  order_reserved_hours: 48,
  never_expired: false,

  refund_policy: '',
  privacy_policy: '',
  terms_of_service: '',

  samples: {
    refund_policy: '',
    privacy_policy: '',
    terms_of_service: '',
  }
}


const mutations = {
  ALLOW_OUT_OF_STOCK_ORDER(state, payload) {
    state.allow_out_of_stock_order = payload
  },
  NEVER_EXPIRED() {
    state.never_expired = ! state.never_expired
  },
  ORDER_RESERVED_HOURS(state, payload) {
    state.order_reserved_hours = payload
  },
  REFUND_POLICY(state, payload) {
    state.refund_policy = payload
  },
  PRIVACY_POLICY(state, payload) {
    state.privacy_policy = payload
  },
  TERMS_OF_SERVICE(state, payload) {
    state.terms_of_service = payload
  },
  SAMPLES(state, payload) {
    state.samples.refund_policy = payload['web.checkout.refund_policy.sample']
    state.samples.privacy_policy = payload['web.checkout.privacy_policy.sample']
    state.samples.terms_of_service = payload['web.checkout.terms_of_service.sample']
  },
}

const actions = {

  save() {

    const form = {
      settings: {
        'web.checkout.allow_out_of_stock_order': state.allow_out_of_stock_order,
        'web.checkout.order_reserved_hours': ! state.never_expired ? state.order_reserved_hours : 0,
        'web.checkout.refund_policy': state.refund_policy,
        'web.checkout.privacy_policy': state.privacy_policy,
        'web.checkout.terms_of_service': state.terms_of_service,
      }
    }

    axios.post('settings/checkout', form).then(res => {
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
