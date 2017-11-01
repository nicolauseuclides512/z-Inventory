// --------------------------------------------------------------
// All of these methods are used in Create.vue and Edit.vue
// --------------------------------------------------------------

import store from 'src/store'
import Regional from '../../helpers/regional'

export default {

  async updateBillingCountryList () {
    this.list.billing_country_list = await Regional.countryList()
    this.list.billing_province_list = []
    this.list.billing_district_list = []
    this.list.billing_region_list = []
  },

  async updateBillingProvinceList () {
    this.list.billing_province_list = await Regional.provinceList(this.form.billing_country)
    this.list.billing_district_list = []
    this.list.billing_region_list = []
  },

  async updateBillingDistrictList () {
    this.list.billing_district_list = await Regional.districtList(this.form.billing_province)
    this.list.billing_region_list = []
  },

  async updateBillingRegionList () {
    this.list.billing_region_list = await Regional.regionList(this.form.billing_district)
  },

  // Shipping
  async updateShippingCountryList () {
    this.list.shipping_country_list = await Regional.countryList()
    this.list.shipping_province_list = []
    this.list.shipping_district_list = []
    this.list.shipping_region_list = []
  },

  async updateShippingProvinceList () {
    this.list.shipping_province_list = await Regional.provinceList(this.form.shipping_country)
    this.list.shipping_district_list = []
    this.list.shipping_region_list = []
  },

  async updateShippingDistrictList () {
    this.list.shipping_district_list = await Regional.districtList(this.form.shipping_province)
    this.list.shipping_region_list = []
  },

  async updateShippingRegionList () {
    this.list.shipping_region_list = await Regional.regionList(this.form.shipping_district)
  },

  /**
   * Copy billing address to shipping address
   */
  copyBillingAddress () {
    store.dispatch('contactForm/copyBillingAddress')

    this.list.shipping_country_list = this.list.billing_country_list
    this.list.shipping_province_list = this.list.billing_province_list
    this.list.shipping_district_list = this.list.billing_district_list
    this.list.shipping_region_list = this.list.billing_region_list

    this.form.shipping_country = this.form.billing_country
    this.form.shipping_province = this.form.billing_province
    this.form.shipping_district = this.form.billing_district
    this.form.shipping_region = this.form.billing_region

    this.form.shipping_address = this.form.billing_address
    this.form.shipping_zip = this.form.billing_zip
  },

  changeTab (name) {
    this.currentTab = name
  },
}
