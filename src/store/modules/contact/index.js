import axios from 'axios'
import { responseOk } from 'src/helpers'

const state = {
  page: 1,
  per_page: 15,
  sort_column: 'display_name',
  sort_order: 'ASC',
  filter_by: 'all',
  contactList: [],
  pageContext: {},
}


const getters = {
  displayActiveCurrentFilter(state) {
    return state.filter_by.charAt(0).toUpperCase() + state.filter_by.slice(1)
  }
}


const mutations = {

  CONTACT_LIST(state, payload) {
    state.contactList = payload
  },

  PAGE_CONTEXT(state, payload) {
    state.pageContext = payload
  },

  FILTER_BY(state, payload) {
    state.filter_by = payload
  },

  SORT_BY(state, payload) {
    state.sort_column = payload.sort_column
    state.sort_order = payload.sort_order
  },

}


const actions = {

  getList({ state, commit }, options) {

    const defaultOptions = {
      page: state.page,
      per_page: state.per_page,
      sort_column: state.sort_column,
      sort_order: state.sort_order,
      filter_by: state.filter_by,
    }

    options = _.merge(defaultOptions, options)

    axios.get('contacts', { params: options }).then(res => {
      if (!responseOk(res.data.code)) return swal_error(res)

      commit('CONTACT_LIST', res.data.data)
      commit('PAGE_CONTEXT', res.data.page_context)

    }, res => {
      return swal_error(res)
    })
  },

  sortContactList({ state, dispatch, commit }, sort_column) {
    const sort_order = state.sort_order === 'ASC' ? 'DESC' : 'ASC'
    commit('SORT_BY', { sort_column, sort_order })
    dispatch('getList', { sort_column, sort_order })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
