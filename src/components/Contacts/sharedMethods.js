// --------------------------------------------------------------
// All of these methods are used in Create.vue and Edit.vue
// --------------------------------------------------------------

import store from 'src/store'
import Regional from "../../helpers/regional";

export default {

  updateBillingCountryList() {
    store.commit('contactForm/BILLING_COUNTRY_LIST', this.getCountries())
  },

  async updateBillingProvinceList() {
    const provinceList = await Regional.provinceList(store.state.contactForm.billing_country_id)
    store.commit('contactForm/BILLING_PROVINCE_LIST', provinceList)
  },

  async updateBillingDistrictList() {
    const districtList = await Regional.districtList(store.state.contactForm.billing_province_id)
    store.commit('contactForm/BILLING_DISTRICT_LIST', districtList)
    store.commit('contactForm/BILLING_REGION_LIST', [])
  },

  async updateBillingRegionList() {
    const regionList = await Regional.regionList(store.state.contactForm.billing_district_id)
    store.commit('contactForm/BILLING_REGION_LIST', regionList)
  },

  // Shipping
  updateShippingCountryList() {
    store.commit('contactForm/SHIPPING_REGION_LIST', this.getCountries())
  },

  async updateShippingProvinceList() {
    const provinceList = await Regional.provinceList(store.state.contactForm.shipping_country_id)
    store.commit('contactForm/SHIPPING_REGION_LIST', provinceList)
  },

  updateShippingDistrictList() {
    store.dispatch('contactForm/updateShippingDistrictList')
  },

  async updateShippingRegionList() {
    const regionList = await Regional.regionList(store.state.contactForm.shipping_district_id)
    store.commit('contactForm/SHIPPING_REGION_LIST', regionList)
  },

  /**
   * Copy billing address to shipping address
   */
  copyBillingAddress() {
    store.dispatch('contactForm/copyBillingAddress')
  },
}
