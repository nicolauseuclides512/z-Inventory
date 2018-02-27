import Axios from 'axios'
import { responseOk } from 'src/helpers'

const state = {
  grant_type: 'password',
  client_id: 2, // FIXME: Hard coded
  client_secret: 'beXvmNU9dQS1cN35vmGSSDAfOR8nSVASouE3sVBT', // FIXME: Hard coded
  username: '',
  password: '',
  scope: '',
  remember: true,
}

const mutations = {
  USERNAME(state, payload) { state.username = payload.toLowerCase() },
  PASSWORD(state, payload) { state.password = payload },
  REMEMBER(state, payload) { state.remember = payload },
}

const actions = {
  login({ state }) {

    const credentials = {
      grant_type: state.grant_type,
      client_id: state.client_id,
      client_secret: state.client_secret,
      username: state.username,
      password: state.password,
      scope: state.scope,
    }

    return new Promise ((resolve, reject) => {

      Axios.post(`oauth/token`, credentials).then(res => {
        if (!responseOk(res.data.code)) {
          return reject(res)
        }

        resolve(res)

      }).catch(err => {
        reject(err.response)
      })

    })
  },

  clearLoginForm({commit}) {
    commit('USERNAME', '')
    commit('PASSWORD', '')
    commit('REMEMBER', false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
