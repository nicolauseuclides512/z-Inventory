import axios from 'axios'
import Storage from 'store/dist/store.modern'

export default class Salutation {

  static byId(id): ?Object {
    if (Storage.get('salutations')) {
      return Storage.get('salutations').find(salutation => {
        return salutation.salutation_id === id
      })
    }
    return {
      salutation_id: 0,
      name: ''
    }
  }

  static get() {
    return new Promise((resolve, reject) => {
      if (Storage.get('salutations')) {
        resolve(Storage.get('salutations'))
        return
      }

      axios.get('salutations').then(res => {
        const salutations = res.data.data

        const activeSalutations = salutations.filter(salutation => {
          if (salutation.salutation_status === 1) {
            return salutation
          }
        })

        Storage.set('salutations', activeSalutations)
        resolve(activeSalutations)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
