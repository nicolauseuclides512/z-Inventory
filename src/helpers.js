import Axios from 'axios'
import swal from 'sweetalert2'

/**
 * Check if response code. If 2xx should return true, else will be false.
 * @param {int} responseCode
 * @returns {boolean}
 */
export const responseOk = (responseCode) => {
  return responseCode === 0 || 200 <= responseCode && responseCode <= 299
}

export const Alert = new function () {

  /**
   * Show success "sweet alert"
   * @param  {String}   message  A message to show
   * @param  {Function} callback
   */
  this.success = (message, callback) => {

    swal({
      title: message,
      type: 'success',
      timer: 2000,
      width: 720,
      showConfirmButton: false,
    }).catch(swal.noop)

    if (callback && typeof(callback) === 'function') {
      callback()
    }

  },


    /**
     * Show error "sweet alert"
     * @param  {String}   message  A message to show
     * @param  {Function} callback
     */
    this.error = (message, callback) => {

      swal({
        title: message,
        type: 'error',
        width: 720,
        showConfirmButton: true,
      }).catch(swal.noop)

      if (callback && typeof(callback) === 'function') {
        callback()
      }

    },


    /**
     * Show confirmation
     * @param  {String}   message
     * @param  {Function} callback [description]
     */
    this.confirm = (args, callback) => {

      let params

      const defaultOptions = {
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#f27474',
        width: 720,
      }

      if (typeof(args) === 'string') {
        params = _.merge(defaultOptions, {title: args})
      }

      if (typeof(args) === 'object') {
        params = _.merge(defaultOptions, args)
      }

      if (typeof(callback) === 'function') {
        swal(params)
          .then((result) => {
            if (result.value) {
              callback()
            }
          })
          .catch(swal.noop)
      }
    }
}


/**
 * Show Sweet Alert success
 * Note: This helper still required.
 *       Because it's shorter than Alert.success(res.data.message)
 */
export const swal_success = (res) => {
  swal({
    title: res.data.message,
    type: 'success',
    timer: 2000,
    showConfirmButton: false,
  }).catch(swal.noop)
}


/**
 * Show Sweet Alert error
 * Note: This helper still required.
 *       Because it's shorter than Alert.error(res.data)
 */
export const swal_error = (res) => {
  if(res){
    let message, title

    if (!res.data.message) {
      title = 'Whoops, something went wrong!'
    } else {
      title = res.data.message
    }

    if (_.size(res.data.errors) > 0) {
      message = '<ul>'
      _.each(res.data.errors, (item, index) => {
        _.each(item, error => {
          message += `<li>${error}</li>`
        })
      })
      message += '</ul>'
    }

    swal({
      title: title,
      html: message,
      type: 'error',
      showConfirmButton: true,
    }).catch(swal.noop)
  }
}

//alert for multiple array of error message
export const swal_mapError = (response) => {

  let errorMessage

  if (response.data && response.data.data){
    errorMessage = _.map(Object.values(response.data.data),errorMessage =>{return (`\n`+_.first(errorMessage)+` `) }).toString()
    swal({
      title: errorMessage ,
      type: 'error',
      showConfirmButton: true,
    })
  } return

}
/**
 * http://stackoverflow.com/a/901144/300582
 * @param name
 * @param url
 * @returns {String}
 */
export function getParameterByName (name, url) {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const regional = {

  getCountryList () {
    return new Promise((resolve, reject) => {
      Axios.get('countries', {params: {per_page: 9999, filter: 'active'}}).then(res => {
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getProvinceList (countryId) {
    return new Promise((resolve, reject) => {
      if (typeof countryId !== 'number') reject('Invalid countryId')

      Axios.get(`provinces/countries/${countryId}`).then(res => {
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getDistrictList (provinceId) {
    return new Promise((resolve, reject) => {
      if (typeof provinceId !== 'number') reject('Invalid provinceId')

      Axios.get(`districts/provinces/${provinceId}`).then(res => {
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getRegionList (districtId) {
    return new Promise((resolve, reject) => {
      if (typeof districtId !== 'number') reject('Invalid districtId')

      Axios.get(`regions/districts/${districtId}`).then(res => {
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

}
