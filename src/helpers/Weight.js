import axios from 'axios'
import Storage from 'store/dist/store.modern'

export default class Weight {
  static get() {
    return new Promise((resolve, reject) => {
      if (Storage.get('weight_units')) {
        resolve(Storage.get('weight_units'))
        return
      }

      // Fetch new data
      // axios.get(`weight_units`).then(res => {
      //   Storage.set('weight_units', res.data.data)
      //   resolve(res.data.data)
      // }).catch(err => {
      //   reject(err)
      // })
    })
  }
}
