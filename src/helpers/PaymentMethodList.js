import axios from 'axios'
import Storage from 'store/dist/store.modern'

export default class PaymentMethodList {
  static get() {
    return new Promise((resolve, reject) => {
      const payment_methods = Storage.get('payment_methods')

      if (payment_methods) {
        resolve(payment_methods)
        return
      }

      // Fetch new
      axios.get('payment_methods/list').then(res => {
        // Clean up data. We don't need any data such as created_at, created_by, updated_at, etc
        const data = _.cloneDeep(res.data.data)

        const payment_methods = data.map(item => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
          }
        })

        Storage.set('payment_methods', payment_methods)

        resolve(payment_methods)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
