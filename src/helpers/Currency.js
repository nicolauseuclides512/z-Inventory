import axios from 'axios'
import Storage from 'store/dist/store.modern'

export default class Currency {
  static get() {
    return new Promise((resolve, reject) => {
      if (Storage.get('currencies')) {
        resolve(Storage.get('currencies'))
        return
      }

      axios.get('currencies/list').then(res => {
        const currencies = res.data.data
        Storage.set('currencies', currencies)
        resolve(currencies)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
