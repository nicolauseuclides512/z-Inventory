import axios from 'axios'
import Storage from 'store/dist/store.modern'

export default class Timezone {
  static get() {
    return new Promise((resolve, reject) => {
      if (Storage.get('timezones')) {
        resolve(Storage.get('timezones'))
        return
      }

      axios.get('timezones/list').then(res => {
        const timezones = res.data.data
        Storage.set('timezones', timezones)
        resolve(timezones)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
