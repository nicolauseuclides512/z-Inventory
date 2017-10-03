import axios from 'axios'

export const filter = {
  computed: {
    lowercase: text => {
      return text.toLowerCase()
    }
  }
}

export const regional = {

  methods: {

    /**
     * Get all countries
     * @return {Array}  List of all countries
     */
    getCountries() {

      // This options is mandatory
      const options = {
        page: 1,
        per_page: 9999,
        sort_column: 'country_name',
        sort_order: 'ASC',
        filter_by: 'status_all',
      }

      const result = []

      axios.get('countries', { params: options })
        .then(res => {
          if (res.data.code != 0) return swal_error(res)

          _.each(res.data.data, item => {
            result.push(_.cloneDeep(item))
          })

        }).catch(err => swal_error(err.response))

        return result
    },


    /**
     * Get all provinces based on Country ID
     * @param  {number} countryId  Country ID
     * @return {Array}  List of provinces
     */
    getProvinces(countryId) {

      const options = {
        page: 1,
        per_page: 9999,
        sort_column: 'province_name',
        sort_order: 'ASC',
        filter_by: 'status_all',
      }

      const result = []

      axios.get(`provinces/country/${countryId}`, { params: options })
        .then(res => {
          if (res.data.code != 0) return swal_error(res)

          _.each(res.data.data, item => {
            result.push(_.cloneDeep(item))
          })

        }).catch(err => swal_error(err.response))

        return result
    },


    /**
     * Get all districts based on Province ID
     * @param  {number} provinceId  Province ID
     * @return {Array}  List of districts
     */
    getDistricts(provinceId) {

      const options = {
        page: 1,
        per_page: 9999,
        sort_column: 'district_name',
        sort_order: 'ASC',
        filter_by: 'status_all',
      }

      const result = []

      axios.get(`districts/province/${provinceId}`, { params: options })
        .then(res => {
          if (res.data.code != 0) return swal_error(res)

          _.each(res.data.data, item => {
            result.push(_.cloneDeep(item))
          })

        }).catch(err => swal_error(err.response))

        return result
    },


    /**
     * Get all regions based on district ID
     * @param  {number} districtId  District ID
     * @return {Array}  List of regions
     */
    getRegions(districtId) {

      const options = {
        page: 1,
        per_page: 9999,
        sort_column: 'region_name',
        sort_order: 'ASC',
        filter_by: 'status_all',
      }

      const result = []

      axios.get(`regions/district/${districtId}`, { params: options })
        .then(res => {
          if (res.data.code != 0) return swal_error(res)

          _.each(res.data.data, item => {
            result.push(_.cloneDeep(item))
          })

        }).catch(err => swal_error(err.response))

        return result
    },

  }

}

export const timezones = {

  methods: {
    /**
     * Get all timezones
     * @return {Array}  List of all timezones
     */
    getTimezones() {

      // This options is mandatory
      const options = {
        page: 1,
        per_page: 9999,
        sort_column: 'created_at',
        sort_order: 'ASC',
        filter_by: 'status_all',
      }

      const result = []

      axios.get('timezones', { params: options })
        .then(res => {
          if (res.data.code != 0) return swal_error(res)

          _.each(res.data.data, item => {
            result.push(_.cloneDeep(item))
          })

        }).catch(err => swal_error(err.response))

        return result
    }
  }


}
