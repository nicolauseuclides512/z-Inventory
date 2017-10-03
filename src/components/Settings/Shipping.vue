<template>
  <section id="shipping" class="content">

    <!-- shipping -->
    <div>
      <div class="container bt-1 bgr-grey">
        <div class="row">
          <div class="col-md-12">
            <h4 class="title">Shipment</h4>
          </div>
        </div>
      </div>
      <div class="container setting-page-right-content">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12 p-b-20">
            <div class="form-horizontal form-shipping">
              <div class="form-group form-general form-have-title form-shipping-from p-15 m-b-20">
                <label class="col-md-4 control-label text-left">
                  <h5>Shipment Origin</h5>
                  <p>The address used to calculate shipping rates.</p>
                </label>
                <div class="col-md-7 col-md-offset-1 bgr-white p-20">
                  <h5>Shipment from</h5>
                  <span class="pull-right">
                  <a href="javascript:void(0)" @click="modalToggle">Edit address</a>
                </span>
                  <p>{{ address }}</p>
                  <p>{{ region.region_name }}</p>
                  <p>{{ district.district_name }}</p>
                  <p>
                    <span>{{ province.province_name }}</span>
                    <span>{{ zip_code }}</span>
                  </p>
                  <p>{{ country.country_name }}</p>
                  <p v-show="phone_number">Phone: {{ phone_number }}</p>
                </div>
              </div>
              <div class="form-group form-general form-have-title form-shipping-courier m-b-20">
                <label class="col-md-4 control-label text-left">
                  <h5>Shipment Courier</h5>
                  <p>Carrier-calculated shipping lets you pass on shipping rates directly from carriers, according
                    to the package destination, weight, and dimensions.</p>

                </label>
                <div class="col-md-7 col-md-offset-1 bgr-white">
                  <div class="row">
                    <!--<pre>{{carrierList}}</pre>-->
                    <div class="col-md-4" v-for="carrier in carrierList">
                      <div class="courier-box">
                        <input type="checkbox"
                               class="checkbox"
                               :id="carrier.code.toLowerCase()"
                               :value="carrier.id"
                               v-model="carrier_ids"
                        />
                        <label :for="carrier.code.toLowerCase()">
                          <div>
                            <img :src="'https://s3-ap-southeast-1.amazonaws.com/sahitotest/assets/carriers/' + carrier.code + '_id.jpg'"
                                 :class="['img-responsive', 'checkbox-courier-' + carrier.code.toLowerCase()]" />
                          </div>
                        </label>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container p-b-10 m-b-20">
        <div class="row">
          <div class="col-md-12 text-center">
            <button type="button" class="btn btn-info waves-effect waves-light" @click="save">Save</button>
            <button type="button" @click="resetForm" class="btn btn-default waves-effect">Cancel</button>
          </div>
        </div>
      </div>

    </div>

    <!-- Shipping Address modal -->
    <ShippingAddress v-if="showModal"/>
  </section>
</template>

<script>
  import store from 'src/store'
  import { regional } from '../../mixins'

  import ShippingAddress from './ShippingAddress'

  export default {
    name: 'Shipment',

    components: { ShippingAddress },

    mixins: [regional],

    data() {
      return {
        originalForm: null,
      }
    },


    methods: {

      modalToggle() {
        store.commit('settings/shipping/SHOW_MODAL', true)
      },


      save() {
        store.dispatch('settings/shipping/save')
      },


      /**
       * Reset to original form state
       */
      resetForm() {
        store.dispatch('settings/initialize')
      },
    },


    computed: {

      showModal: {
        get() { return store.state.settings.shipping.showModal },
        set(value) { store.commit('settings/shipping/SHOW_MODAL', value) },
      },

      carrierList: {
        get() { return store.state.settings.shipping.carrierList },
        set(value) { store.commit('settings/shipping/CARRIER_LIST', value) }
      },

      carrier_ids: {
        get() { return store.getters['settings/shipping/carrier_ids'] },
        set(value) { store.commit('settings/shipping/CARRIER_IDS', value) }
      },

      countryList: {
        get() {
          return store.state.settings.countryList
        },
        set(value) {
          store.commit('settings.shipping.countryList', value)
        }
      },
      provinceList: {
        get() {
          return store.state.settings.provinceList
        },
        set(value) {
          store.commit('settings.shipping.provinceList', value)
        }
      },
      districtList: {
        get() {
          return store.state.settings.districtList
        },
        set(value) {
          store.commit('settings.shipping.districtList', value)
        }
      },
      regionList: {
        get() {
          return store.state.settings.regionList
        },
        set(value) {
          store.commit('settings.shipping.regionList', value)
        }
      },

      from: {
        get() {
          return store.state.settings.shipping.from
        },
        set(value) {
          store.commit('settings/shipping/FROM', value)
        }
      },

      address: {
        get() {
          return store.state.settings.shipping.address
        },
        set(value) {
          store.commit('settings/shipping/ADDRESS', value)
        }
      },

      zip_code: {
        get() {
          return store.state.settings.shipping.zip_code
        },
        set(value) {
          store.commit('settings/shipping/ZIP_CODE', value)
        }
      },

      phone_number: {
        get() {
          return store.state.settings.shipping.phone_number
        },
        set(value) {
          store.commit('settings/shipping/PHONE_NUMBER', value)
        }
      },

      country: {
        get() {
          const country = store.state.settings.shipping.country
          if (country === Object(country) && country.hasOwnProperty('country_name')) {
            return country
          }
          return { country_id: 104, country_code: 'ID', country_name: 'Indonesia', country_status: 1 }
        },
        set(value) {
          store.commit('settings/shipping/COUNTRY', value)
        }
      },

      province: {
        get() {
          const province = store.state.settings.shipping.province
          if (province === Object(province) && province.hasOwnProperty('province_name')) {
            return province
          }
          return { country_id: null, province_id: null, province_id: null, province_name: null, province_status: null }
        },
        set(value) {
          store.commit('settings/shipping/PROVINCE', value)
        }
      },

      district: {
        get() {
          const district = store.state.settings.shipping.district
          if (district === Object(district) && district.hasOwnProperty('district_name')) {
            return district
          }
          return { province_id: null, district_id: null, district_id: null, district_name: null, district_status: null }
        },
        set(value) {
          store.commit('settings/shipping/DISTRICT', value)
        }
      },

      region: {
        get() {
          const region = store.state.settings.shipping.region
          if (region === Object(region) && region.hasOwnProperty('region_name')) {
            return region
          }
          return { district_id: null, region_id: null, region_name: null, region_status: null }
        },
        set(value) {
          store.commit('settings/shipping/REGION', value)
        }
      },

      /**
       * Get country name
       * @return {string}  Country name
       */
      country_name() {



//        const that = this
//        return _.result( _.find(that.list.countries, (o) => {
//          return o.country_id === that.form.country_id
//        }), 'country_name' )
      },


      /**
       * Get province name
       * @return {string}  Province name
       */
      province_name() {
//        const that = this
//        return _.result( _.find(that.list.provinces, (o) => {
//          return o.province_id === that.form.province_id
//        }), 'province_name' )
      },


      /**
       * Get district name
       * @return {string}  District name
       */
      district_name() {
//        const that = this
//        return _.result( _.find(that.list.districts, (o) => {
//          return o.district_id === that.form.district_id
//        }), 'province_name' )
      },


      /**
       * Get country name
       * @return {string}  Country name
       */
      region_name() {
//        const that = this
//        return _.result( _.find(this.list.regions, (o) => {
//          return o.region_id === this.form.region_id
//        }), 'region_name' )
      },


    }


  }
</script>

<style scoped>
  .form-shipping > .form-shipping-courier .courier-box {
    height: 130px !important;
    margin-bottom: 20px;
  }
</style>
