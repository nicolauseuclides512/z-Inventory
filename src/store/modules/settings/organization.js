import axios from 'axios'
import trim from 'lodash/trim'
import {
  responseOk,
  regional,
} from 'src/helpers'
import Regional from "../../../helpers/regional";

const state = {
  countryList: [],
  provinceList: [],
  districtList: [],
  regionList: [],

  primary_contact: [],

  organization_id: null,

  name: null,
  portal: null,

  country_id: null,
  province_id: null,
  district_id: null,
  region_id: null,
  address: null,
  zip: null,
  phone: null,
  fax: null,

  currency_id: null,
  timezone_id: null,
  image_logo: null,
  image_logo_small: null,
  image_logo_medium: null,
  organization_status: null,

  primary_contact_issues_count: 0, // res.data.data.organization.unverified_contact_size
}


const mutations = {
  NAME(state, payload) { if (typeof payload !== 'undefined') state.name = payload },
  PORTAL(state, payload) { if (typeof payload !== 'undefined') state.portal = payload },

  PRIMARY_CONTACT(state, payload) { if (typeof payload !== 'undefined') state.primary_contact = payload },

  COUNTRY(state, payload) { if (typeof payload !== 'undefined') state.country_id = payload },
  PROVINCE(state, payload) { if (typeof payload !== 'undefined') state.province_id = payload },
  DISTRICT(state, payload) { if (typeof payload !== 'undefined') state.district_id = payload },
  REGION(state, payload) { if (typeof payload !== 'undefined') state.region_id = payload },
  ADDRESS(state, payload) { if (typeof payload !== 'undefined') state.address = payload },
  ZIP(state, payload) { if (typeof payload !== 'undefined') state.zip = payload },
  PHONE(state, payload) { if (typeof payload !== 'undefined') state.phone = payload },
  FAX(state, payload) { if (typeof payload !== 'undefined') state.fax = payload },

  CURRENCY(state, payload) { if (typeof payload !== 'undefined') state.currency_id = payload },
  TIMEZONE(state, payload) { if (typeof payload !== 'undefined') state.timezone_id = payload },
  IMAGE_LOGO(state, payload) { if (typeof payload !== 'undefined') state.image_logo = payload },
  IMAGE_LOGO_SMALL(state, payload) { if (typeof payload !== 'undefined') state.image_logo_small = payload },
  IMAGE_LOGO_MEDIUM(state, payload) { if (typeof payload !== 'undefined') state.image_logo_medium = payload },
  ORGANIZATION_STATUS(state, payload) { if (typeof payload !== 'undefined') state.organization_status = payload },

  ORGANIZATION_ID(state, payload) { if (typeof payload !== 'undefined') state.organization_id = payload },

  PRIMARY_CONTACT_ISSUES_COUNT(state, payload) { if (typeof payload !== 'undefined') state.primary_contact_issues_count = payload },

  COUNTRY_LIST(state, payload) { if (typeof payload !== 'undefined') state.countryList = payload },
  PROVINCE_LIST(state, payload) {
    if (Array.isArray(payload) && payload.length > 0) {
      state.provinceList = payload
    }
  },
  DISTRICT_LIST(state, payload) { if (typeof payload !== 'undefined') state.districtList = payload },
  REGION_LIST(state, payload) { if (typeof payload !== 'undefined') state.regionList = payload },
}


const actions = {

  async initialize({ commit }, payload) {

    try {
      const orgId = Cookie.get('organization_id')

      const res = await axios.get(`organizations/${orgId}`)

      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      commit('ORGANIZATION_ID', res.data.data.id)
      commit('NAME', res.data.data.name)
      commit('PORTAL', res.data.data.portal)
      commit('FAX', res.data.data.fax)
      commit('CURRENCY', res.data.data.currency_id)
      commit('TIMEZONE', res.data.data.timezone_id)
      commit('IMAGE_LOGO', res.data.data.logo)
      commit('IMAGE_LOGO_SMALL', res.data.data.multi_res_logo.small)
      commit('IMAGE_LOGO_MEDIUM', res.data.data.multi_res_logo.medium)
      commit('ORGANIZATION_STATUS', res.data.data.status)

      commit('PRIMARY_CONTACT', res.data.data.primary_contact)

      // FIXME: Ugly chain-nested
      const countries = await Regional.countryList()
      commit('COUNTRY_LIST', countries)
      commit('COUNTRY', res.data.data.country_id)

      const provinces = await Regional.provinceList(res.data.data.country_id)
      commit('PROVINCE_LIST', provinces)
      commit('PROVINCE', res.data.data.province_id)

      const districts = await Regional.districtList(res.data.data.province_id)
      commit('DISTRICT_LIST', districts)
      commit('DISTRICT', res.data.data.district_id)

      const regionals = await Regional.regionList(res.data.data.district_id)
      commit('REGION_LIST', regionals)
      commit('REGION', res.data.data.region_id)

      // commit('DISTRICT_LIST', [res.data.data.organization.asset_district])
      // commit('REGION_LIST', [res.data.data.organization.asset_region])

      // Server returns "null string", so I need to clean this up
      let address = res.data.data.address
      if (trim(address) === 'null') {
        address = null
      }
      commit('ADDRESS', address)

      // Server returns "null string", so I need to clean this up
      let phoneNumber = res.data.data.phone
      if (trim(phoneNumber) === 'null') {
        phoneNumber = null
      }
      commit('PHONE', phoneNumber)

      // Server returns "null string", so I need to clean this up
      let zipCode = res.data.data.zip
      if (trim(zipCode) === 'null') {
        zipCode = null
      }
      commit('ZIP', zipCode)

    } catch (err) {
      console.error(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }
  },

  save({ state }) {
    const url = `organizations/${state.organization_id}`;

    const form = {
      name: state.name,
      portal: state.portal,

      country_id: state.country_id,
      province_id: state.province_id,
      district_id: state.district_id,
      region_id: state.region_id,
      address: '' + state.address,
      zip: '' + state.zip,
      phone: '' + state.phone,
      fax: '' + state.fax,

      currency_id: state.currency_id,
      timezone_id: state.timezone_id,
      image_logo: state.image_logo_small,
      organization_status: state.organization_status,
    }

    axios.put(url, form).then(res => {
      if (!responseOk(res.data.code)) return swal_error(res)
      swal_success(res)
    }).catch(err => {
      swal_error(err.response)
    })
  },


  /**
   * Update country list
   * @param commit
   */
  updateCountryList({ commit }) {
    Regional.countryList().then(countries => {
      commit('COUNTRY_LIST', countries)
      commit('PROVINCE_LIST', [])
      commit('PROVINCE', null)
    })
  },

  updateProvinceList({ state, commit }) {
    Regional.provinceList(state.country_id).then(provinces => {
      commit('PROVINCE_LIST', provinces)
      commit('PROVINCE', state.province_id)

      commit('DISTRICT_LIST', [])
      commit('DISTRICT', null)

      commit('REGION_LIST', [])
      commit('REGION', null)
    })
  },

  updateDistrictList({ state, commit }) {
    return new Promise((resolve, reject) => {
      Regional.districtList(state.province_id).then(districts => {
        commit('DISTRICT_LIST', districts)
        commit('DISTRICT', state.district_id)

        commit('REGION_LIST', [])
        commit('REGION', null)
        resolve()
      })
    })
  },

  updateRegionList({ state, commit }) {
    return new Promise((resolve, reject) => {
      Regional.regionList(state.district_id).then(regions => {
        commit('REGION_LIST', regions)
        commit('REGION', state.region_id)
        resolve()
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
