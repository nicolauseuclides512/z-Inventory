import axios from 'axios'
import Storage from 'store/dist/store.modern'

export default class Regional {

  static countryList() {
    return new Promise((resolve, reject) => {
      if (Storage.get('countries')) {
        resolve(Storage.get('countries'))
        return
      }

      axios.get(`countries/list`).then(res => {
        Storage.set('countries', res.data.data)
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static provinceList(country_id) {
    return new Promise((resolve, reject) => {
      if (Storage.get('provinces') && country_id) {
        const provinceList = Storage.get('provinces')
        const filteredProvinceList = provinceList.filter(province => {
          if (province.country_id === country_id) {
            return province
          }
        })
        resolve(filteredProvinceList)
        return
      }

      if (Storage.get('provinces')) {
        resolve(Storage.get('provinces'))
        return
      }

      axios.get(`provinces/list`).then(res => {
        Storage.set('provinces', res.data.data)
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static districtList(province_id) {
    return new Promise((resolve, reject) => {

      if (Storage.get('districts') && province_id) {
        const districtList = Storage.get('districts')
        const filteredDistrictList = districtList.filter(district => {
          if (district.province_id === province_id) {
            return district
          }
        })
        resolve(filteredDistrictList)
      }

      if (Storage.get('districts')) {
        resolve(Storage.get('districts'))
        return
      }

      axios.get(`districts/list`).then(res => {
        Storage.set('districts', res.data.data)
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static regionList(district_id) {
    return new Promise((resolve, reject) => {

      if (Storage.get('regions') && district_id) {
        const regionList = Storage.get('regions')
        const filteredRegionList = regionList.filter(region => {
          if (region.district_id === district_id) {
            return region
          }
        })
        resolve(filteredRegionList)
      }

      if (Storage.get('regions')) {
        resolve(Storage.get('regions'))
        return
      }

      axios.get(`regions/list`).then(res => {
        Storage.set('regions', res.data.data)
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

}
