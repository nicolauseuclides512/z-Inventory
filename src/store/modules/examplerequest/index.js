import axios from 'axios'

export const namespaced = true

export const state = {
  data: [],
  pending: false,
  error: null
}

export const events = {
  RETRIEVE: 'RETRIEVE',
  RETRIEVE_SUCCEEDED: 'RETRIEVE_SUCCEEDED',
  RETRIEVE_FAILED: 'RETRIEVE_FAILED'
}

export const mutations = {
  [events.RETRIEVE] (state) {
    state.pending = true
    state.error = null
  },
  [events.RETRIEVE_SUCCEEDED] (state, payload) {
    state.data = payload.data.data
    state.pending = false
    state.error = null
  },
  [events.RETRIEVE_FAILED] (state, payload) {
    state.pending = false
    state.error = payload
    state.data = []
  }
}

export const actions = {
  [events.RETRIEVE] (ctx) {
    const url = `provinces/list`
    const request = axios.get(url)
    ctx.commit(events.RETRIEVE, request)
  },


}

export const getters = {
  data: state => state.data,
  pending: state => state.pending,
  error: state => state.error
}
