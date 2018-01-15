import axios from 'axios'
import { responseOk } from 'src/helpers'

const state = {
  organization_name: '',
  organization_portal: '',
  email: '',
  password: '',
  password_confirmation: '',
  accept_terms: false,
  portal_name_is_not_available: null,
}

const mutations = {
  ORGANIZATION_NAME(state, payload) { state.organization_name = payload },
  ORGANIZATION_PORTAL(state, payload) { state.organization_portal = payload },
  EMAIL(state, payload) { state.email = payload },
  PASSWORD(state, payload) { state.password = payload },
  PASSWORD_CONFIRMATION(state, payload) { state.password_confirmation = payload },
  ACCEPT_TERMS(state, payload) { state.accept_terms = payload },
  PORTAL_NAME_AVAILABILITY(state, payload) { state.portal_name_is_not_available = ! payload },
}

const actions = {
  async register ({state}) {
    try {
      const data = {
        organization_name: state.organization_name,
        organization_portal: state.organization_portal,
        email: state.email,
        password: state.password,
        password_confirmation: state.password_confirmation,
        application_id: 'inventory',
      }

      return await axios.post('register', data)

    } catch (err) {
      console.error(err)
    }
  },

  async checkPortalNameAvailability({ state, commit }) {
    const url = 'organizations/check_name?name=' + state.organization_portal

    axios.get(url).then(res => {
      commit('PORTAL_NAME_AVAILABILITY', res.data.data.is_available)

    }).catch(err => {
      swal_error(err.response)
      commit('PORTAL_NAME_AVAILABILITY', false)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
