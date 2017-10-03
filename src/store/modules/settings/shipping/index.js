import axios from 'axios'
import * as types from './mutation-types'
import { regional as regionalHelper } from 'src/helpers'
import { responseOk } from 'src/helpers'

const state = {
  showModal: false,

  countryList: [],
  provinceList: [],
  districtList: [],
  regionList: [],

  from: '',
  address: '',
  country_id: '',
  province_id: '',
  district_id: '',
  region_id: '',
  zip_code: '',
  phone_number: '',

  carrierList: [],
  carrier_ids: '',
}

const getters = {
  carrier_ids(state) { return state.carrier_ids }
}

const mutations = {
  [types.SHOW_MODAL] (state, payload) { state.showModal = payload },

  [types.COUNTRY_LIST] (state, payload) { state.countryList = payload },
  [types.PROVINCE_LIST] (state, payload) { state.provinceList = payload },
  [types.DISTRICT_LIST] (state, payload) { state.districtList = payload },
  [types.REGION_LIST] (state, payload) { state.regionList = payload },

  [types.FROM] (state, payload) { state.from = payload },
  [types.ADDRESS] (state, payload) { state.address = payload },
  [types.ZIP_CODE] (state, payload) { state.zip_code = payload },
  [types.PHONE_NUMBER] (state, payload) { state.phone_number = payload },
  [types.COUNTRY_ID] (state, payload) { state.country_id = payload },
  [types.PROVINCE_ID] (state, payload) { state.province_id = payload },
  [types.DISTRICT_ID] (state, payload) { state.district_id = payload },
  [types.REGION_ID] (state, payload) { state.region_id = payload },
  [types.CARRIER_LIST] (state, payload) { state.carrierList = payload },
  [types.CARRIER_IDS] (state, payload) { state.carrier_ids = payload },
}

const actions = {

  save({ state }) {

    const form = {
      settings: {
        'web.shipping.from': state.from,
        'web.shipping.address': state.address,
        'web.shipping.region_id': state.region_id,
        'web.shipping.district_id': state.district_id,
        'web.shipping.province_id': state.province_id,
        'web.shipping.zip_code': '' + state.zip_code,
        'web.shipping.country_id': state.country_id,
        'web.shipping.phone_number': state.phone_number,
        'web.shipping.carrier_ids': '[' + state.carrier_ids.join(',') + ']',
      }
    }

    axios.post('settings/shipping', form).then(res => {
      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      return swal_success(res)

    }, res => {
      return swal_error(res)
    })
  },

  updateDistrictList({ state, commit }) {
    commit(types.DISTRICT_LIST, [])
    commit(types.REGION_LIST, [])
    regionalHelper.getDistrictList(state.province_id).then(data => {
      commit(types.DISTRICT_LIST, data)
    })
  },

  updateRegionList({ state, commit }) {
    commit(types.REGION_LIST, [])
    regionalHelper.getRegionList(state.district_id).then(data => {
      commit(types.REGION_LIST, data)
    })
  },

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
