import axios from 'axios';
import dateFormat from 'date-fns/format';
import {responseOk} from "src/helpers";
import Carrier from "../../../helpers/Carrier";


const state = {
  carrierList: [],
  shipment_order_number: '',
  date: dateFormat(new Date(), 'YYYY-MM-DD'),
  carrier_id: '',
  tracking_number: '',
  notes: '',
}

const mutations = {
  CARRIER_LIST(state, payload) { state.carrierList = payload },
  SHIPMENT_ORDER_NUMBER(state, payload) { state.shipment_order_number = payload },
  DATE(state, payload) { state.date = payload },
  CARRIER_ID(state, payload) { state.carrier_id = payload },
  TRACKING_NUMBER(state, payload) { state.tracking_number = payload },
  NOTES(state, payload) { state.notes = payload },
}

const actions = {

  getCarriers({commit}): Promise {
    return Carrier.get().then(carriers => {
      commit('CARRIER_LIST', carriers)
    })
  },

  create({state, commit, dispatch}, sales_order_id): Promise {
    return new Promise((resolve, reject) => {
      const url = `sales_orders/${sales_order_id}/shipments/create`
      axios.get(url).then(res => {
        if (!responseOk(res.data.code)) {
          reject(res)
        }

        resolve(res)

      }).catch(err => {
        reject(err)
      })
    })
  },

  save({state}, sales_order_id, formData): Promise {
    const url = `sales_orders/${sales_order_id}/shipments`
    const data = formData
    // const data = {
    //   shipment_order_number: sales_order_id + new Date().toISOString(),
    //   date: state.date,
    //   carrier_id: state.carrier_id,
    //   tracking_number: state.tracking_number,
    //   notes: state.notes,
    // }

    return new Promise((resolve, reject) => {
      axios.post(url, data).then(res => {
        if (!responseOk(res.data.code)) {
          return reject(res)
        }

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  edit({state, commit, dispatch}, payload): Promise {
    return new Promise((resolve, reject) => {
      const url = `sales_orders/${payload.sales_order_id}/shipments/${payload.shipment_id}edit`
      axios.get(url).then(res => {
        if (!responseOk(res.data.code)) {
          reject(res)
        }

        resolve(res)

      }).catch(err => {
        reject(err)
      })
    })
  },

  update({state}, payload): Promise {
    const url = `sales_orders/${payload.sales_order_id}/shipments/${payload.shipment_id}/update`

    const data = {
      shipment_order_number: state.shipment_order_number,
      date: state.date,
      carrier_id: state.carrier_id,
      tracking_number: state.tracking_number,
      notes: state.notes,
    }

    return new Promise((resolve, reject) => {
      axios.post(url, data).then(res => {
        if (!responseOk(res.data.code)) {
          return reject(res)
        }

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
