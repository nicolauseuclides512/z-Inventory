import Accounting from 'accounting'
import format from 'date-fns/format'
import Vue from 'vue'

Vue.filter('money', (value, currency = 'Rp ', precision = 2, thousand = '.', decimal = ',', format = '%s%v') => {
  if (typeof value === 'number') {
    return Accounting.formatMoney(value, currency, precision, thousand, decimal, format)
  }

  return value
})

Vue.filter('date', (value, dateFormat = 'YYYY-MM-DD') => {

  if (dateFormat === 'raw') {
    return format(value)
  }

  if (dateFormat === 'short') {
    return format(value, 'D MMM YYYY')
  }

  if (dateFormat === 'long') {
    return format(value, 'DD MMMM YYYY')
  }

  return format(value, dateFormat)

})

Vue.filter('capitalize', value => {
  return value.charAt(0).toUpperCase() + value.substring(1)
})
