import _ from 'lodash'
import axios from 'axios'
import { responseOk } from 'src/helpers'
import { swal_error, swal_success } from "../../../helpers";

const state = {
  item_name: null,
  description: null,
  images: [],
  sales_rate: null,
  compare_rate: null,
  code_sku: null,
  uom_id: 1, // default pcs
  tax_id: null,
  dimension_l: null,
  dimension_w: null,
  dimension_h: null,
  url: '',
  weight: null,
  weight_unit: 'gr',
  uomList: [],
  accountList: [],
  taxList: [],
  attributeList: [],
  categoryList: [],
  weightUnitList: [],
}

const mutations = {
  ITEM_NAME (state, payload) { state.item_name = payload },
  DESCRIPTION (state, payload) { state.description = payload },
  IMAGES (state, payload) { state.images = payload },
  SALES_RATE (state, payload) { state.sales_rate = payload },
  COMPARE_RATE (state, payload) { state.compare_rate = payload },
  CODE_SKU (state, payload) { state.code_sku = payload },
  UOM_ID (state, payload) { state.uom_id = payload },
  TAX_ID (state, payload) { state.tax_id = payload },
  WEIGHT (state, payload) { state.weight = payload },
  WEIGHT_UNIT (state, payload) { state.weight_unit = payload },
  WEIGHT_UNIT_LIST (state, payload) { state.weightUnitList = payload },
  DIMENSION_L (state, payload) { state.dimension_l = payload },
  DIMENSION_W (state, payload) { state.dimension_w = payload },
  DIMENSION_H (state, payload) { state.dimension_h = payload },
  UOM_LIST (state, payload) { state.uomList = payload },
  ACCOUNT_LIST (state, payload) { state.accountList = payload },
  TAX_LIST (state, payload) { state.taxList = payload },
  ATTRIBUTE_LIST (state, payload) { state.attributeList = payload },
  CATEGORY_LIST (state, payload) { state.categoryList = payload },
  URL (state, payload) { state.url = payload }
}

const actions = {

  create({state, commit}) {

    axios.get('items/create').then(res => {
      if (!responseOk(res.data.code)) return swal_error(res)

      // Default uom_id is 'pcs'
      commit('UOM_LIST', res.data.data.uoms)
      const default_uom = state.uomList.find(uom => uom.name === 'pcs')
      commit('UOM_ID', default_uom.uom_id)

      commit('URL', res.data.data.url)
      commit('WEIGHT_UNIT', res.data.data.default_weight_unit)
      commit('WEIGHT_UNIT_LIST', res.data.data.weight_units)
      commit('ACCOUNT_LIST', res.data.data.accounts)
      commit('TAX_LIST', res.data.data.taxes)
      commit('ATTRIBUTE_LIST', res.data.data.attributes)
      commit('CATEGORY_LIST', res.data.data.categories)

    }).catch(err => swal_error(err.response))

  },

  async edit({ commit }, item_id) {
    try {
      const res = await axios.get(`items/${item_id}/edit`)
      if (!responseOk(res.data.code)) return swal_error(res)

      commit('ITEM_NAME', res.data.data.item.item_name)
      commit('DESCRIPTION', res.data.data.item.description)
      commit('IMAGES', res.data.data.item.item_medias)
      commit('SALES_RATE', res.data.data.item.sales_rate)
      commit('COMPARE_RATE', res.data.data.item.compare_rate)
      commit('CODE_SKU', res.data.data.item.code_sku)
      commit('UOM_ID', res.data.data.item.uom_id)
      commit('TAX_ID', res.data.data.item.tax_id)
      commit('WEIGHT', res.data.data.item.weight)
      commit('DIMENSION_L', res.data.data.item.dimension_l || null)
      commit('DIMENSION_W', res.data.data.item.dimension_w || null)
      commit('DIMENSION_H', res.data.data.item.dimension_h || null)

      commit('URL', res.data.data.url)
      commit('WEIGHT_UNIT', res.data.data.default_weight_unit)
      commit('WEIGHT_UNIT_LIST', res.data.data.weight_units)
      commit('UOM_LIST', res.data.data.uoms)
      commit('ACCOUNT_LIST', res.data.data.accounts)
      commit('TAX_LIST', res.data.data.taxes)
      commit('ATTRIBUTE_LIST', res.data.data.attributes)
      commit('CATEGORY_LIST', res.data.data.categories)

    } catch (e) {
      swal_error(e.response)
    }
  },

  async save({state, commit}) {
    commit('WEIGHT_UNIT', 'gr') // Make sure weight_unit is gram
    commit('TAX_ID', null)
    const data = _.cloneDeep(state)

    try {
      const response = await axios.post('items', data)
      if (!responseOk(response.data.code)) return swal_error(response)

      swal_success(response)

    } catch(e) {
      swal_error(e.response)
    }
  },

  async update({ state, commit }, item_id) {
    commit('WEIGHT_UNIT', 'gr') // Make sure weight_unit is gram
    commit('TAX_ID', null)
    const data = _.cloneDeep(state)

    try {
      const response = await axios.post(`items/${item_id}/update`, data)
      if (!responseOk(response.data.code)) return swal_error(response)

      swal_success(response)

    } catch(e) {
      swal_error(e.response)
    }

  },

  getItem({ state, commit }, id) {
    axios.get(`items/${id}/edit`).then(res => {
      if (! responseOk(res.data.code)) return swal_error(res)

      commit('URL', res.data.data.url)
      commit('WEIGHT_UNIT', res.data.data.default_weight_unit)
      commit('WEIGHT_UNIT_LIST', res.data.data.weight_units)
      commit('UOM_LIST', res.data.data.uoms)
      commit('ACCOUNT_LIST', res.data.data.accounts)
      commit('TAX_LIST', res.data.data.taxes)
      commit('ATTRIBUTE_LIST', res.data.data.attributes)
      commit('CATEGORY_LIST', res.data.data.categories)

      commit('DIMENSION_L', res.data.data.item.dimension_l)
      commit('DIMENSION_W', res.data.data.item.dimension_w)
      commit('DIMENSION_H', res.data.data.item.dimension_h)
      commit('WEIGHT', res.data.data.item.weight)
      commit('WEIGHT_UNIT', res.data.data.item.weight_unit)

    }).catch(err => swal_error(err.response))

  },

  clear({commit}) {
    commit('ITEM_NAME', null)
    commit('DESCRIPTION', null)
    commit('IMAGES', [])
    commit('SALES_RATE', null)
    commit('COMPARE_RATE', null)
    commit('CODE_SKU', null)
    commit('UOM_ID', null)
    commit('TAX_ID', null)
    commit('WEIGHT', null)
    commit('WEIGHT_UNIT', null)

    commit('DIMENSION_L', null)
    commit('DIMENSION_W', null)
    commit('DIMENSION_H', null)

    commit('URL', null)

    commit('WEIGHT_UNIT_LIST', [])
    commit('UOM_LIST', [])
    commit('ACCOUNT_LIST', [])
    commit('TAX_LIST', [])
    commit('ATTRIBUTE_LIST', [])
    commit('CATEGORY_LIST', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
