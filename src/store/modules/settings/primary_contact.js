import axios from 'axios'
import Cookie from 'js-cookie'
import { Alert } from 'src/helpers'
import { responseOk } from 'src/helpers'

const orgId = Cookie.get('organization_id')

const state = {
  contactList: [],
  primary_contact: {},
  showNewContactForm: false,
  newContactName: '',
  newContactEmail: '',
  editedContactName: '',
}


const mutations = {
  CONTACT_LIST(state, payload) {
    if (Array.isArray(payload)) {
      return state.contactList = payload.map(item => {
        return {
          ...item,
          editable: false,
        }
      })
    }

    state.contactList.push(payload)
  },
  PRIMARY_CONTACT(state, payload) {
    state.primary_contact = payload
  },
  SHOW_NEW_CONTACT_FORM(state, payload) {
    state.showNewContactForm = payload
  },
  NEW_CONTACT_NAME(state, payload) {
    state.newContactName = payload
  },
  NEW_CONTACT_EMAIL(state, payload) {
    state.newContactEmail = payload
  },
  EDIT_CONTACT(state, payload) {
    state.contactList.filter(item => {
      if (item.id === payload.contact.id) {
        item.editable = payload.editable
        state.editedContactName = payload.contact.name
      } else {
        item.editable = false
      }
    })
  },
  EDITED_CONTACT(state, payload) {
    state.editedContactName = payload
  },
}


const actions = {

  initialize({ state, commit }) {
    axios.get(`organizations/${orgId}/contacts`).then(res => {
      commit('CONTACT_LIST', res.data.data)
      commit('PRIMARY_CONTACT', state.contactList.find(contact => contact.is_primary))
    })
  },

  updateContact({ state, commit, dispatch }, contact) {
    const url = `organizations/${orgId}/contacts/${contact.id}`

    axios.put(url, { name: state.editedContactName }).then(res => {
      if (!responseOk(res.data.code)) return swal_error(res)

      commit('EDIT_CONTACT', { contact, editable: false })
      dispatch('initialize')

      swal_success(res)

    }, res => {
      swal_error(res)
    })
  },


  addContact({ state, commit, dispatch }) {

    const form = {
      name: state.newContactName,
      email: state.newContactEmail,
      organization_contact_status: 1
    }

    axios.post(`organizations/${orgId}/contacts`, form).then(res => {
      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      commit('SHOW_NEW_CONTACT_FORM', false)
      dispatch('initialize')

      return swal_success(res)

    }, res => {
      return swal_error(res)
    })
  },

  removeContact({ dispatch }, contact) {

    Alert.confirm({
      title: 'Are you sure want to remove this contact?',
      text: '',
    }, () => {
      const url = `organizations/${orgId}/contacts/` + contact.id
      axios.delete(url).then(res => {
        if (!responseOk(res.data.code)) {
          return swal_error(res)
        }

        dispatch('initialize')

        swal_success(res)

      }, res => {
        swal_error(res)
      })
    })
  },

  setPrimaryContact({ dispatch }, contact) {
    const url = `organizations/${orgId}/contacts/set_primary/` + contact.id

    axios.get(url).then(res => {
      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      dispatch('initialize')

      swal_success(res)

    }, res => {
      swal_error(res)
    })

  },


  sendVerification({}, contact) {
    const url = `organizations/${orgId}/contacts/resend_verification/${contact.id}`

    axios.get(url).then(res => {
      if (!responseOk(res.data.code)) return swal_error(res)

      swal_success(res)

    }).catch(err => swal_error(res.response))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
