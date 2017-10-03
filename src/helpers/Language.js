import axios from 'axios'
import Storage from 'store/dist/store.modern'

export default class Language {
  static get() {
    return new Promise((resolve, reject) => {
      if (Storage.get('languages')) {
        resolve(Storage.get('languages'))
        return
      }

      axios.get('languages/list', {params: {per_page: 9999}}).then(res => {
        const languages = res.data.data
        Storage.set('languages', languages)
        resolve(languages)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
