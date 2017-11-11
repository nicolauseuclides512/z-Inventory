import Axios from 'axios'
import Storage from 'store/dist/store.modern'

export default class Carrier {
  static get () {
    return new Promise((resolve, reject) => {
      if (Storage.get('carriers')) {
        resolve(Storage.get('carriers'))
        return
      }

      // Fetch new data
      Axios.get(`carriers/list`).then(res => {
        // Clean up data. We don't need any data such as created_at, created_by, updated_at, etc
        const data = _.cloneDeep(res.data.data)

        const courier = data.map(item => {
          return {
            id: item.id,
            name: item.name,
            code: item.code,
            logo: item.logo,
          }
        })

        Storage.set('carriers', courier)
        resolve(courier)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
