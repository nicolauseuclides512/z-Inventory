import Axios from 'axios'
import Storage from 'store/dist/store.modern'

export default class Regional {

  static async countryList () {
    try {

      if (Storage.get('countries')) {
        return Storage.get('countries')
      }

      const res = await Axios.get(`countries/list`)
      Storage.set('countries', res.data.data)
      return res.data.data

    }
    catch (err) {
      console.error(err)
    }
  }


  static async provinceList (country_id) {
    try {

      if (Storage.get('provinces') && country_id) {
        const provinceList = Storage.get('provinces')
        return provinceList.filter(province => province.country_id === country_id)
      }

      if (Storage.get('provinces')) {
        return Storage.get('provinces')
      }

      const res = await Axios.get(`provinces/list`)
      Storage.set('provinces', res.data.data)
      return res.data.data

    }
    catch (err) {
      console.error(err)
    }
  }

  static async districtList (province_id) {
    try {

      if (Storage.get('districts') && province_id) {
        const districtList = Storage.get('districts')
        return districtList.filter(district => district.province_id === province_id)
      }

      if (Storage.get('districts')) {
        return Storage.get('districts')
      }

      const res = await Axios.get(`districts/list`)
      Storage.set('districts', res.data.data)
      return res.data.data

    }
    catch (err) {
      console.error(err)
    }
  }

  static async regionList (district_id) {
    try {

      if (Storage.get('regions') && district_id) {
        const regionList = Storage.get('regions')
        return regionList.filter(region => region.district_id === district_id)
      }

      if (Storage.get('regions')) {
        return Storage.get('regions')
      }

      const res = await Axios.get(`regions/list`)
      Storage.set('regions', res.data.data)
      return res.data.data

    }
    catch (err) {
      console.error(err)
    }
  }

}
