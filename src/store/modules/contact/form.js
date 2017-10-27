import axios from 'axios'
import { regional as regionalHelper } from 'src/helpers'
import { responseOk } from 'src/helpers'
import Salutation from "../../../helpers/Salutation";
import Regional from "../../../helpers/regional";

const state = {
  salutationList: [],
  contactTypeList: [],
  paymentTermList: [],
  currencyList: [],
  localeMapList: [],

  billingCountryList: [],
  billingProvinceList: [],
  billingDistrictList: [],
  billingRegionList: [],

  shippingCountryList: [],
  shippingProvinceList: [],
  shippingDistrictList: [],
  shippingRegionList: [],

  salutation_id: null,
  currency_id: null,
  payment_term_id: null,
  contact_type: 1,
  first_name: null,
  last_name: null,
  display_name: 1,
  display_code: 1, // Person name or company name
  email: null,
  phone: null,
  mobile: null,
  website: null,
  company_title: null,
  company_name: null,

  billing_country_id: null,
  billing_province_id: null,
  billing_district_id: null,
  billing_region_id: null,
  billing_country: {
    id: null,
    code: null,
    name: null,
    status: null,
  },
  billing_province: {
    id: null,
    country_id: null,
    name: null,
    status: null,
  },
  billing_district: {
    id: null,
    province_id: null,
    name: null,
    type: null,
    zip: null,
    status: null,
  },
  billing_region: {
    id: 0,
    district_id: 0,
    name: null,
    type: null,
    zip: null,
    status: null,
  },
  billing_address: null,
  billing_zip: null,
  billing_fax: null,

  shipping_country_id: null,
  shipping_province_id: null,
  shipping_district_id: null,
  shipping_region_id: null,
  shipping_country: {
    id: null,
    code: null,
    name: null,
    status: null,
  },
  shipping_province: {
    id: null,
    country_id: null,
    name: null,
    status: null,
  },
  shipping_district: {
    id: null,
    province_id: null,
    name: null,
    type: null,
    zip: null,
    status: null,
  },
  shipping_region: {
    id: 0,
    district_id: 0,
    name: null,
    type: null,
    zip: null,
    status: null,
  },
  shipping_address: null,
  shipping_zip: null,
  shipping_fax: null,

  contact_status: null,
  organization_id: null,
  notes: null,
}

const mutations = {

  // List
  SALUTATION_LIST(state, payload) { state.salutationList = payload },
  CONTACT_TYPE_LIST(state, payload) { state.contactTypeList = payload },
  PAYMENT_TERM_LIST(state, payload) { state.paymentTermList = payload },
  CURRENCY_LIST(state, payload) { state.currencyList = payload },
  LOCALE_MAP_LIST(state, payload) { state.localeMapList = payload },

  BILLING_COUNTRY_LIST(state, payload) { state.billingCountryList = payload },
  BILLING_PROVINCE_LIST(state, payload) { state.billingProvinceList = payload },
  BILLING_DISTRICT_LIST(state, payload) { state.billingDistrictList = payload},
  BILLING_REGION_LIST(state, payload) { state.billingRegionList = payload },

  SHIPPING_COUNTRY_LIST(state, payload) { state.shippingCountryList = payload },
  SHIPPING_PROVINCE_LIST(state, payload) { state.shippingProvinceList = payload },
  SHIPPING_DISTRICT_LIST(state, payload) { state.shippingDistrictList = payload },
  SHIPPING_REGION_LIST(state, payload) { state.shippingRegionList = payload },

  // Form
  SALUTATION_ID(state, payload) { state.salutation_id = payload },

  // Regional Billing Form
  BILLING_COUNTRY_ID (state, payload) {
    if (typeof payload === 'number') {
      state.billing_country_id = payload
    }
  },
  BILLING_PROVINCE_ID (state, payload) {
    if (typeof payload === 'number') {
      state.billing_province_id = payload
    }
  },
  BILLING_DISTRICT_ID (state, payload) {
    if (typeof payload === 'number') {
      state.billing_district_id = payload
    }
  },
  BILLING_REGION_ID (state, payload) {
    if (typeof payload === 'number') {
      state.billing_region_id = payload
    }
  },
  BILLING_ADDRESS (state, payload) { state.billing_address = payload },
  BILLING_ZIP (state, payload) {
    if (payload) {
      state.billing_zip = '' + payload
    } else {
      state.billing_zip = null
    }
  },
  BILLING_FAX (state, payload) { state.billing_fax = payload },

  // Regional Shipping Form
  SHIPPING_COUNTRY_ID (state, payload) {
    if (typeof payload === 'number') {
      state.shipping_country_id = payload
    }
  },
  SHIPPING_PROVINCE_ID (state, payload) {
    if (typeof payload === 'number') {
      state.shipping_province_id = payload
    }
  },
  SHIPPING_DISTRICT_ID (state, payload) {
    if (typeof payload === 'number') {
      state.shipping_district_id = payload
    }
  },
  SHIPPING_REGION_ID (state, payload) {
    if (typeof payload === 'number') {
      state.shipping_region_id = payload
    }
  },
  SHIPPING_ADDRESS (state, payload) { state.shipping_address = payload },
  SHIPPING_ZIP (state, payload) {
    if (payload) {
      state.shipping_zip = '' + payload
    } else {
      state.shipping_zip = null
    }
  },
  SHIPPING_FAX (state, payload) { state.shipping_fax = payload },

  FIRST_NAME(state, payload) { state.first_name = payload },
  LAST_NAME(state, payload) { state.last_name = payload },
  DISPLAY_NAME(state, payload) { state.display_name = payload },
  DISPLAY_CODE(state, payload) { state.display_code = payload },

  CURRENCY_ID(state, payload) { state.currency_id = payload },
  PAYMENT_TERM_ID(state, payload) { state.payment_term_id = payload },
  CONTACT_TYPE(state, payload) { state.contact_type = payload },

  EMAIL(state, payload) { state.email = payload },
  PHONE(state, payload) { state.phone = payload },
  MOBILE(state, payload) { state.mobile = payload },
  WEBSITE(state, payload) { state.website = payload },

  COMPANY_TITLE(state, payload) { state.company_title = payload },
  COMPANY_NAME(state, payload) { state.company_name = payload },
  CONTACT_STATUS(state, payload) { state.contact_status = payload },
  ORGANIZATION_ID(state, payload) { state.organization_id = payload },
  NOTES(state, payload) { state.notes = payload },
}


const actions = {

  clearAllForm({ commit }) {
    return new Promise((resolve, reject) => {
      commit('BILLING_COUNTRY_LIST', [])
      commit('BILLING_PROVINCE_LIST', [])
      commit('BILLING_DISTRICT_LIST', [])
      commit('BILLING_REGION_LIST', [])
      commit('SHIPPING_COUNTRY_LIST', [])
      commit('SHIPPING_PROVINCE_LIST', [])
      commit('SHIPPING_DISTRICT_LIST', [])
      commit('SHIPPING_REGION_LIST', [])
      commit('SALUTATION_ID', null)
      commit('BILLING_COUNTRY_ID', 0)
      commit('BILLING_PROVINCE_ID', 0)
      commit('BILLING_DISTRICT_ID', 0)
      commit('BILLING_REGION_ID', 0)
      commit('BILLING_ADDRESS', null)
      commit('BILLING_ZIP', null)
      commit('BILLING_FAX', null)
      commit('SHIPPING_COUNTRY_ID', 0)
      commit('SHIPPING_PROVINCE_ID', 0)
      commit('SHIPPING_DISTRICT_ID', 0)
      commit('SHIPPING_REGION_ID', 0)
      commit('SHIPPING_ADDRESS', null)
      commit('SHIPPING_ZIP', null)
      commit('SHIPPING_FAX', null)
      commit('FIRST_NAME', null)
      commit('LAST_NAME', null)
      commit('DISPLAY_NAME', null)
      commit('DISPLAY_CODE', 1)
      commit('CURRENCY_ID', null)
      commit('PAYMENT_TERM_ID', null)
      commit('CONTACT_TYPE', null)
      commit('EMAIL', null)
      commit('PHONE', null)
      commit('MOBILE', null)
      commit('WEBSITE', null)
      commit('COMPANY_TITLE', null)
      commit('COMPANY_NAME', null)
      commit('CONTACT_STATUS', null)
      commit('ORGANIZATION_ID', null)
      commit('NOTES', null)
      resolve()
    })
  },

  async create({ state }) {
    try {

      const data = {
        contact_type: state.contact_type,
        salutation_id: state.salutation_id,
        currency_id: state.currency_id,
        payment_term_id: state.payment_term_id,
        first_name: state.first_name,
        last_name: state.last_name,
        // display_name: state.display_name, // will pushed at the bottom
        display_code: state.display_code,
        email: state.email,
        phone: state.phone,
        mobile: state.mobile,
        website: state.website,
        company_title: state.company_title,
        company_name: state.company_name,
        billing_address: state.billing_address,
        billing_region: state.billing_region_id,
        billing_district: state.billing_district_id,
        billing_province: state.billing_province_id,
        billing_country: state.billing_country_id,
        billing_zip: state.billing_zip,
        billing_fax: state.billing_fax,
        shipping_address: state.shipping_address,
        shipping_region: state.shipping_region_id,
        shipping_district: state.shipping_district_id,
        shipping_province: state.shipping_province_id,
        shipping_country: state.shipping_country_id,
        shipping_zip: state.shipping_zip,
        shipping_fax: state.shipping_fax,
        notes: state.notes,
        contact_status: state.contact_status,
      }

      // Display name
      if (state.display_code === 1) {
        data.display_name = state.first_name
      } else if (state.display_code === 2) {
        data.display_name = state.company_name
      }

      const res = await axios.post('contacts', data)
      swal_success(res)
      return res

    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },

  update({ state }, contactId) {
    const data = {
      contact_type: state.contact_type,
      salutation_id: state.salutation_id,
      currency_id: state.currency_id,
      payment_term_id: state.payment_term_id,
      first_name: state.first_name,
      last_name: state.last_name,
      display_name: state.display_name,
      display_code: state.display_code,
      email: state.email,
      phone: state.phone,
      mobile: state.mobile,
      website: state.website,
      company_title: state.company_title,
      company_name: state.company_name,
      billing_address: state.billing_address,
      billing_region: state.billing_region_id,
      billing_district: state.billing_district_id,
      billing_province: state.billing_province_id,
      billing_country: state.billing_country_id,
      billing_zip: state.billing_zip,
      billing_fax: state.billing_fax,
      shipping_address: state.shipping_address,
      shipping_region: state.shipping_region_id,
      shipping_district: state.shipping_district_id,
      shipping_province: state.shipping_province_id,
      shipping_country: state.shipping_country_id,
      shipping_zip: state.shipping_zip,
      shipping_fax: state.shipping_fax,
      notes: state.notes,
      contact_status: state.contact_status,
    }

    // Display name
    if (state.display_code === 1) {
      data.display_name = state.first_name
    } else if (state.display_code === 2) {
      data.display_name = state.company_name
    }

    return new Promise((resolve, reject) => {
      axios.post(`contacts/${contactId}/update`, data).then(res => {
        if (!responseOk(res.data.code)) return swal_error(res)

        swal_success(res)
        resolve(res)
      }).catch(err => {
        console.error(err)
        if (err && err.hasOwnProperty('response')) {
          swal_error(res.response)
        }
        reject(err)
      })
    })
  },

  async setBillingAndShippingCountryList({ commit }) {
    const countryList = await Regional.countryList()
    commit('BILLING_COUNTRY_LIST', countryList)
    commit('SHIPPING_COUNTRY_LIST', countryList)

    // Set default country is Indonesia
    countryList.find(country => {
      if (country.name === 'Indonesia') {
        commit('BILLING_COUNTRY_ID', country.id)
        commit('SHIPPING_COUNTRY_ID', country.id)
      }
    })
  },

  async setBillingAndShippingProvinceList({ state, commit }) {
    const billingProvinceList = await Regional.provinceList(state.billing_country_id)
    const shippingProvinceList = await Regional.provinceList(state.shipping_country_id)

    commit('BILLING_PROVINCE_LIST', billingProvinceList)
    commit('SHIPPING_PROVINCE_LIST', shippingProvinceList)
  },

  async initializeCreate({ commit, dispatch }) {
    await dispatch('clearAllForm')
    await dispatch('setBillingAndShippingCountryList')
    await dispatch('setBillingAndShippingProvinceList')

    const response = await axios.get('contacts/create')
    commit('SALUTATION_ID', null)

    const salutations = await Salutation.get()
    commit('SALUTATION_LIST', salutations)

    commit('CONTACT_TYPE', 1) // Make sure default type 'customer' is selected
    commit('CONTACT_TYPE_LIST', response.data.data.contact_type)
    commit('PAYMENT_TERM_LIST', response.data.data.payment_term)
    commit('CURRENCY_LIST', response.data.data.currencies)
    commit('LOCALE_MAP_LIST', response.data.data.locale_map)
},

  initializeEdit({ state, commit, dispatch }, contactId) {

    dispatch('clearAllForm')

    return new Promise ((resolve, reject)  => {
      axios.get(`contacts/${contactId}/edit`).then(res => {

        dispatch('setBillingAndShippingCountryList')
        dispatch('setBillingAndShippingProvinceList')

        commit('SALUTATION_ID', null)

        Salutation.get().then(salutations => {
          commit('SALUTATION_LIST', salutations)
        })

        commit('CONTACT_TYPE_LIST', res.data.data.contact_type)
        commit('PAYMENT_TERM_LIST', res.data.data.payment_term)
        commit('CURRENCY_LIST', res.data.data.currencies)
        commit('LOCALE_MAP_LIST', res.data.data.locale_map)

        // Form
        commit('SALUTATION_ID', res.data.data.contact.salutation_id)
        commit('CURRENCY_ID', res.data.data.contact.currency_id)
        commit('PAYMENT_TERM_ID', res.data.data.contact.payment_term_id)
        commit('CONTACT_TYPE', res.data.data.contact.contact_type)
        commit('FIRST_NAME', res.data.data.contact.first_name)
        commit('LAST_NAME', res.data.data.contact.last_name)
        commit('DISPLAY_NAME', res.data.data.contact.display_name)
        commit('DISPLAY_CODE', res.data.data.contact.display_code)
        commit('EMAIL', res.data.data.contact.email)
        commit('PHONE', res.data.data.contact.phone)
        commit('MOBILE', res.data.data.contact.mobile)
        commit('WEBSITE', res.data.data.contact.website)
        commit('COMPANY_TITLE', res.data.data.contact.company_title)
        commit('COMPANY_NAME', res.data.data.contact.company_name)

        // Server gives use "ID" within "billing_country" instead of "billing_country_id"
        commit('BILLING_COUNTRY_ID', res.data.data.contact.billing_country)
        commit('BILLING_PROVINCE_ID', res.data.data.contact.billing_province)
        commit('BILLING_DISTRICT_ID', res.data.data.contact.billing_district)
        commit('BILLING_REGION_ID', res.data.data.contact.billing_region)

        // commit('BILLING_COUNTRY_LIST', [])
        // commit('BILLING_PROVINCE_LIST', [])
        // commit('BILLING_DISTRICT_LIST', [])
        // commit('BILLING_REGION_LIST', [])

        commit('BILLING_ADDRESS', res.data.data.contact.billing_address)
        commit('BILLING_ZIP', res.data.data.contact.billing_zip)
        commit('BILLING_FAX', res.data.data.contact.billing_fax)


        // Server gives use "ID" within "shipping_country" instead of "shipping_country_id"
        commit('SHIPPING_COUNTRY_ID', res.data.data.contact.shipping_country)
        commit('SHIPPING_PROVINCE_ID', res.data.data.contact.shipping_province)
        commit('SHIPPING_DISTRICT_ID', res.data.data.contact.shipping_district)
        commit('SHIPPING_REGION_ID', res.data.data.contact.shipping_region)

        // commit('SHIPPING_COUNTRY_LIST', [])
        // commit('SHIPPING_PROVINCE_LIST', [])
        // commit('SHIPPING_DISTRICT_LIST', [])
        // commit('SHIPPING_REGION_LIST', [])

        commit('SHIPPING_ADDRESS', res.data.data.contact.shipping_address)
        commit('SHIPPING_ZIP', res.data.data.contact.shipping_zip)
        commit('SHIPPING_FAX', res.data.data.contact.shipping_fax)

        commit('CONTACT_STATUS', res.data.data.contact.contact_status)
        commit('ORGANIZATION_ID', res.data.data.contact.organization_id)
        commit('NOTES', res.data.data.contact.notes)

        const data = {
          billing_country_id: res.data.data.contact.billing_country !== null ? res.data.data.contact.billing_country.country_id : state.billing_country.country_id,
          billing_province_id: res.data.data.contact.billing_province !== null ? res.data.data.contact.billing_province.province_id : state.billing_province.province_id,
          billing_district_id: res.data.data.contact.billing_district !== null ? res.data.data.contact.billing_district.district_id : state.billing_district.district_id,
          billing_region_id: res.data.data.contact.billing_region !== null ? res.data.data.contact.billing_region.region_id : state.billing_region.region_id,
          shipping_country_id: res.data.data.contact.shipping_country !== null ? res.data.data.contact.shipping_country.country_id : state.shipping_country.country_id,
          shipping_province_id: res.data.data.contact.shipping_province !== null ? res.data.data.contact.shipping_province.province_id : state.shipping_province.province_id,
          shipping_district_id: res.data.data.contact.shipping_district !== null ? res.data.data.contact.shipping_district.district_id : state.shipping_district.district_id,
          shipping_region_id: res.data.data.contact.shipping_region !== null ? res.data.data.contact.shipping_region.region_id : state.shipping_region.region_id,
        }

        resolve(data)

      }).catch(err => {
        reject()
      })
    })
  },

  copyBillingAddress({ state, commit }) {
    commit('SHIPPING_ADDRESS', state.billing_address)
    commit('SHIPPING_FAX', state.billing_fax)
    commit('SHIPPING_ZIP', state.billing_zip)

    commit('SHIPPING_COUNTRY_LIST', state.billingCountryList)
    commit('SHIPPING_PROVINCE_LIST', state.billingProvinceList)
    commit('SHIPPING_DISTRICT_LIST', state.billingDistrictList)
    commit('SHIPPING_REGION_LIST', state.billingRegionList)

    commit('SHIPPING_COUNTRY_ID', state.billing_country_id)
    commit('SHIPPING_PROVINCE_ID', state.billing_province_id)
    commit('SHIPPING_DISTRICT_ID', state.billing_district_id)
    commit('SHIPPING_REGION_ID', state.billing_region_id)
  },

  async setRegionalId({ commit }, payload) {
    commit('BILLING_COUNTRY_ID', payload.billing_country_id)
    commit('BILLING_PROVINCE_ID', payload.billing_province_id)
    commit('BILLING_DISTRICT_ID', payload.billing_district_id)
    commit('BILLING_REGION_ID', payload.billing_region_id)

    commit('SHIPPING_COUNTRY_ID', payload.shipping_country_id)
    commit('SHIPPING_PROVINCE_ID', payload.shipping_province_id)
    commit('SHIPPING_DISTRICT_ID', payload.shipping_district_id)
    commit('SHIPPING_REGION_ID', payload.shipping_region_id)

    const billingDistrictList = await Regional.districtList(payload.billing_province_id)
    const billingRegionList = await Regional.regionList(payload.billing_district_id)
    commit('BILLING_DISTRICT_LIST', billingDistrictList)
    commit('BILLING_REGION_LIST', billingRegionList)

    const shippingDistrictList = await Regional.districtList(payload.shipping_province_id)
    const shippingRegionList = await Regional.regionList(payload.shipping_district_id)
    commit('SHIPPING_DISTRICT_LIST', shippingDistrictList)
    commit('SHIPPING_REGION_LIST', shippingRegionList)
  },

  async updateBillingDistrictList({ state, commit }) {
    const districtList = await Regional.districtList(state.billing_province_id)
    commit('BILLING_DISTRICT_LIST', districtList)
    commit('BILLING_REGION_LIST', [])
  },

  async updateShippingDistrictList({ state, commit }) {
    const districtList = await Regional.districtList(state.shipping_province_id)
    commit('SHIPPING_DISTRICT_LIST', districtList)
    commit('SHIPPING_REGION_LIST', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
