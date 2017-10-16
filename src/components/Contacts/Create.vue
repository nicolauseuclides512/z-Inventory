<template>
  <form method="POST" action="#" @submit.prevent="save" class="form-horizontal">

    <div class="container full-width-header bt-1 p-b-10 m-b-20">
      <div class="row">
        <div class="col-md-12">
          <h4 class="pull-left page-title">New Contact</h4>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12 p-b-20">
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Name</label>
            <div class="col-md-1">
              <select id="salutation_id" v-model="salutation_id" class="form-control" title="Salutation">
                <option :value="null"></option>
                <option v-for="o in salutationList" :value="o.salutation_id">{{ o.name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control" placeholder="Name" id="first_name" v-model="first_name" ref="firstName" maxlength="100" required>
            </div>
            <!--<div class="col-md-2">-->
              <!--<input type="text" class="form-control" placeholder="Last Name" id="last_name" v-model="last_name" maxlength="100">-->
            <!--</div>-->
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Company Name</label>
            <div class="col-md-4">
              <input type="text" class="form-control" placeholder="" maxlength="100" id="company_name" v-model="company_name">
            </div>
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left text-danger">Display Name</label>
            <div class="col-md-4">
              <select id="display_code" v-model="display_code" class="form-control">
                <!--<option :value="0">{{ displayNameFormat1 }}</option>-->
                <option :value="1">{{ displayNameFormat2 }}</option>
                <option :value="2">{{ displayNameFormat3 }}</option>
              </select>
            </div>
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Email</label>
            <div class="col-md-4">
              <input type="email" class="form-control" placeholder="" id="email" v-model="email" maxlength="255">
            </div>
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Phone</label>
            <div class="col-md-2">
              <input type="text" class="form-control" placeholder="Work Phone" maxlength="20" id="phone" v-model="phone">
            </div>
            <div class="col-md-2">
              <input type="text" class="form-control" placeholder="Mobile" maxlength="20" id="mobile" v-model="mobile">
            </div>
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Website</label>
            <div class="col-md-4">
              <input type="text" class="form-control" placeholder="" maxlength="255" id="website" v-model="website">
            </div>
          </div>
          <!--<div class="form-group form-general m-b-20">-->
            <!--<label class="col-md-3 control-label text-left text-danger">Contact Type</label>-->
            <!--<div class="col-md-7">-->
              <!--<div v-for="(type, index) of contactTypeList" class="radio radio-info radio-inline">-->
                <!--<input type="radio" :id="'customer_type-' + type" :value="index" name="contact-type" id="contact_type" v-model="contact_type" required>-->
                <!--<label :for="'customer_type-' + type"> {{ type }} </label>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>

    </div>
    <div class="container bt-1 p-b-10 m-b-20">
      <div class="row">
        <div class="col-md-12">
          <ul class="nav nav-tabs nav-tabs-clear nav-grey btp-1 tabs" style="width: 100%;">
            <!--
            <li class="tab" style="width: 33.3333%;">
              <a href="#payment-details" data-toggle="tab" aria-expanded="false">
                <span class="hidden-xs">Payment Details</span>
              </a>
            </li>
            -->
            <li :class="{ tab: true, active: currentTab === 'address'}" style="width: 50%;">
              <a href="javascript:void(0)" @click="changeTab('address')"> Address </a>
            </li>
            <li :class="{ tab: true, active: currentTab === 'notes'}" style="width: 50%;">
              <a href="javascript:void(0)" @click="changeTab('notes')">Notes</a>
            </li>
            <div class="indicator" style="right: 932px; left: 0px;"></div>
          </ul>
          <div class="tab-content r-pl-pr tab-content-clear">
            <!--
            <div class="tab-pane" id="payment-details">
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Currency</label>
                <div class="col-md-4">
                  <selectid="currency_id"  v-model="currency_id" class="select2 form-control">
                    <option value=""></option>
                    <option v-for="c in currencyList" :value="c.currency_id">{{ c.name }}</option>
                  </select>
                </div>
              </div>
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Payment Terms</label>
                <div class="col-md-4">
                  <selectid="payment_term_id"  v-model="payment_term_id" class="select2 form-control">
                    <option value=""></option>
                    <option v-for="p in paymentTermsList" :value="p.payment_term_id">{{ p.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            -->
            <div v-show="currentTab == 'address'">
              <div class="col-md-6">
                <p class="m-b-30" style="color: #aaa;">Billing Address</p>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Country</label>
                  <div class="col-md-7">
                    <select id="billing_country_id" v-model="billing_country_id" class="form-control">
                      <option :value="0" hidden disabled>Select Country</option>
                      <option v-for="c in billingCountryList" :value="c.id">{{ c.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Province</label>
                  <div class="col-md-7">
                    <select id="billing_province_id" v-model="billing_province_id" class="form-control" @change="updateBillingDistrictList" :disabled="!billingProvinceList.length > 0">
                      <option :value="0" hidden disabled>Select Province</option>
                      <option v-for="p in billingProvinceList" :value="p.id">{{ p.name }}</option>
                    </select>
                  </div>
                </div>

                <!--<div class="form-group form-general m-b-20">-->
                  <!--<label class="col-md-4 control-label text-left">District</label>-->
                  <!--<div class="col-md-7">-->
                    <!--<select id="billing_district_id" v-model="billing_district_id" class="form-control" @change="updateBillingRegionList" :disabled="!billingDistrictList.length > 0">-->
                      <!--<option :value="0" hidden disabled>Select District</option>-->
                      <!--<option v-for="d in billingDistrictList" :value="d.id">{{ d.name }}</option>-->
                    <!--</select>-->
                  <!--</div>-->
                <!--</div>-->

                <!--<div class="form-group form-general m-b-20">-->
                  <!--<label class="col-md-4 control-label text-left">Region</label>-->
                  <!--<div class="col-md-7">-->
                    <!--<select id="billing_region_id" v-model="billing_region_id" class="form-control" :disabled="!billingRegionList.length > 0">-->
                      <!--<option :value="0" hidden disabled>Select Region</option>-->
                      <!--<option v-for="r in billingRegionList" :value="r.id">{{ r.name }}</option>-->
                    <!--</select>-->
                  <!--</div>-->
                <!--</div>-->

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Street</label>
                  <div class="col-md-7">
                    <textarea class="form-control" rows="2" id="billing_address" v-model="billing_address"></textarea>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Zip Code</label>
                  <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="" maxlength="5" id="billing_zip" v-model="billing_zip">
                  </div>
                </div>

                <!--<div class="form-group form-general m-b-20">-->
                  <!--<label class="col-md-4 control-label text-left">Fax</label>-->
                  <!--<div class="col-md-7">-->
                    <!--<input type="text" class="form-control" placeholder="" maxlength="20" id="billing_fax" v-model="billing_fax">-->
                  <!--</div>-->
                <!--</div>-->

              </div>
              <div class="col-md-6">
                <p class="m-b-30" style="display: inline-block;color: #aaa;">Shipping Address</p>

                <a href="javascript:void(0);" @click="copyBillingAddress" class="pull-right">
                  <i class="ion-arrow-down-a"></i>
                  Copy Billing Address
                </a>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Country</label>
                  <div class="col-md-7">
                    <select id="shipping_country_id" v-model="shipping_country_id" class="form-control">
                      <option :value="0" hidden disabled>Select Country</option>
                      <option v-for="c in shippingCountryList" :value="c.id">{{ c.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Province</label>
                  <div class="col-md-7">
                    <select id="shipping_province_id" v-model="shipping_province_id" class="form-control" @change="updateShippingDistrictList" :disabled="!shippingProvinceList.length > 0">
                      <option :value="0" hidden disabled>Select Province</option>
                      <option v-for="c in shippingProvinceList" :value="c.id">{{ c.name }}</option>
                    </select>
                  </div>
                </div>

                <!--<div class="form-group form-general m-b-20">-->
                  <!--<label class="col-md-4 control-label text-left">District</label>-->
                  <!--<div class="col-md-7">-->
                    <!--<select id="shipping_district_id" v-model="shipping_district_id" class="form-control" @change="updateShippingRegionList" :disabled="!shippingDistrictList.length > 0">-->
                      <!--<option :value="0" hidden disabled>Select District</option>-->
                      <!--<option v-for="d in shippingDistrictList" :value="d.id">{{ d.name }}</option>-->
                    <!--</select>-->
                  <!--</div>-->
                <!--</div>-->

                <!--<div class="form-group form-general m-b-20">-->
                  <!--<label class="col-md-4 control-label text-left">Region</label>-->
                  <!--<div class="col-md-7">-->
                    <!--<select id="shipping_region_id" v-model="shipping_region_id" class="form-control" :disabled="!shippingRegionList.length > 0">-->
                      <!--<option :value="0" hidden disabled>Select Region</option>-->
                      <!--<option v-for="r in shippingRegionList" :value="r.id">{{ r.name }}</option>-->
                    <!--</select>-->
                  <!--</div>-->
                <!--</div>-->

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Street</label>
                  <div class="col-md-7">
                    <textarea class="form-control" rows="2" id="shipping_address" v-model="shipping_address"></textarea>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Zip Code</label>
                  <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="" maxlength="5" id="shipping_zip" v-model="shipping_zip">
                  </div>
                </div>

                <!--<div class="form-group form-general m-b-20">-->
                  <!--<label class="col-md-4 control-label text-left">Fax</label>-->
                  <!--<div class="col-md-7">-->
                    <!--<input type="text" class="form-control" placeholder="" maxlength="20" id="shipping_fax" v-model="shipping_fax">-->
                  <!--</div>-->
                <!--</div>-->

              </div>
            </div>

            <div v-show="currentTab == 'notes'">
              <div class="col-md-11">
                <div class="form-group form-general m-b-20">
                  <label class="control-label text-left">Notes
                    <span style="color: #aaa">(For Internal Use)</span></label>
                  <textarea id="notes" v-model="notes" class="form-control m-l-15" rows="4"></textarea>
                </div>
              </div>
            </div>

          </div><!-- .tab-content -->

        </div>
      </div>
    </div>
    <div class="float-save">
      <div class="container">
        <div class="clearfix">
          <div class="pull-right">
            <button type="submit" :disabled="saving" class="btn btn-primary waves-effect waves-light">
              Save
            </button>
          </div>
          <div class="pull-left">
            <router-link :to="{ name: 'contact.index' }" class="btn btn-default" type="button">
              <i class="fa fa-chevron-left"></i> Cancel
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import store from 'src/store'
  import Vuelist from '../Vuelist'
  import { regional } from '../../mixins.js';
  import { regional as regionalHelper } from 'src/helpers'
  import sharedMethods from './sharedMethods.js'

  export default {

    name: 'Contact-Create',

    components: {
      Vuelist
    },

    mixins: [ regional ],

    data() {
      return {
        dirtyForm: false,
        // options: {},
        saving: false,
        currentTab: 'address',
      };
    },


    computed: {
      salutationList: {
        get() { return store.state.contactForm.salutationList },
        set(value) { store.commit('contactForm/SALUTATION_LIST', value) }
      },
      contactTypeList: {
        get() { return store.state.contactForm.contactTypeList },
        set(value) { store.commit('contactForm/CONTACT_TYPE_LIST', value) }
      },
      billingCountryList: {
        get() { return store.state.contactForm.billingCountryList },
        set(value) { store.commit('contactForm/BILLING_COUNTRY_LIST', value) }
      },
      billingProvinceList: {
        get() { return store.state.contactForm.billingProvinceList },
        set(value) { store.commit('contactForm/BILLING_PROVINCE_LIST', value) }
      },
      billingDistrictList: {
        get() { return store.state.contactForm.billingDistrictList },
        set(value) { store.commit('contactForm/BILLING_DISTRICT_LIST', value) }
      },
      billingRegionList: {
        get() { return store.state.contactForm.billingRegionList },
        set(value) { store.commit('contactForm/BILLING_REGION_LIST', value) }
      },
      shippingCountryList: {
        get() { return store.state.contactForm.shippingCountryList },
        set(value) { store.commit('contactForm/SHIPPING_COUNTRY_LIST', value) }
      },
      shippingProvinceList: {
        get() { return store.state.contactForm.shippingProvinceList },
        set(value) { store.commit('contactForm/SHIPPING_PROVINCE_LIST', value) }
      },
      shippingDistrictList: {
        get() { return store.state.contactForm.shippingDistrictList },
        set(value) { store.commit('contactForm/SHIPPING_DISTRICT_LIST', value) }
      },
      shippingRegionList: {
        get() { return store.state.contactForm.shippingRegionList },
        set(value) { store.commit('contactForm/SHIPPING_REGION_LIST', value) }
      },

      salutation_id: {
        get() { return store.state.contactForm.salutation_id },
        set(value) { store.commit('contactForm/SALUTATION_ID', value) }
      },
      first_name: {
        get() { return store.state.contactForm.first_name },
        set(value) { store.commit('contactForm/FIRST_NAME', value) }
      },
      last_name: {
        get() { return store.state.contactForm.last_name },
        set(value) { store.commit('contactForm/LAST_NAME', value) }
      },
      company_name: {
        get() { return store.state.contactForm.company_name },
        set(value) { store.commit('contactForm/COMPANY_NAME', value) }
      },
      display_name: {
        get() { return store.state.contactForm.display_name },
        set(value) { store.commit('contactForm/DISPLAY_NAME', value) }
      },
      display_code: {
        get() { return store.state.contactForm.display_code },
        set(value) { store.commit('contactForm/DISPLAY_CODE', value) }
      },
      email: {
        get() { return store.state.contactForm.email },
        set(value) { store.commit('contactForm/EMAIL', value) }
      },
      phone: {
        get() { return store.state.contactForm.phone },
        set(value) { store.commit('contactForm/PHONE', value) }
      },
      mobile: {
        get() { return store.state.contactForm.mobile },
        set(value) { store.commit('contactForm/MOBILE', value) }
      },
      website: {
        get() { return store.state.contactForm.website },
        set(value) { store.commit('contactForm/WEBSITE', value) }
      },
      contact_type: {
        get() { return store.state.contactForm.contact_type },
        set(value) { store.commit('contactForm/CONTACT_TYPE', value) }
      },
      currency_id: {
        get() { return store.state.contactForm.currency_id },
        set(value) { store.commit('contactForm/CURRENCY_ID', value) }
      },
      payment_term_id: {
        get() { return store.state.contactForm.payment_term_id },
        set(value) { store.commit('contactForm/PAYMENT_TERM_ID', value) }
      },
      notes: {
        get() { return store.state.contactForm.notes },
        set(value) { store.commit('contactForm/NOTES', value) }
      },
      billing_address: {
        get() { return store.state.contactForm.billing_address },
        set(value) { store.commit('contactForm/BILLING_ADDRESS', value) }
      },
      billing_country_id: {
        get() { return store.state.contactForm.billing_country_id },
        set(value) { store.commit('contactForm/BILLING_COUNTRY_ID', value) }
      },
      billing_province_id: {
        get() { return store.state.contactForm.billing_province_id },
        set(value) { store.commit('contactForm/BILLING_PROVINCE_ID', value) }
      },
      billing_district_id: {
        get() { return store.state.contactForm.billing_district_id },
        set(value) { store.commit('contactForm/BILLING_DISTRICT_ID', value) }
      },
      billing_region_id: {
        get() { return store.state.contactForm.billing_region_id },
        set(value) { store.commit('contactForm/BILLING_REGION_ID', value) }
      },
      billing_zip: {
        get() { return store.state.contactForm.billing_zip },
        set(value) { store.commit('contactForm/BILLING_ZIP', value) }
      },
      billing_fax: {
        get() { return store.state.contactForm.billing_fax },
        set(value) { store.commit('contactForm/BILLING_FAX', value) }
      },
      shipping_address: {
        get() { return store.state.contactForm.shipping_address },
        set(value) { store.commit('contactForm/SHIPPING_ADDRESS', value) }
      },
      shipping_country_id: {
        get() { return store.state.contactForm.shipping_country_id },
        set(value) { store.commit('contactForm/SHIPPING_COUNTRY_ID', value) }
      },
      shipping_province_id: {
        get() { return store.state.contactForm.shipping_province_id },
        set(value) { store.commit('contactForm/SHIPPING_PROVINCE_ID', value) }
      },
      shipping_district_id: {
        get() { return store.state.contactForm.shipping_district_id },
        set(value) { store.commit('contactForm/SHIPPING_DISTRICT_ID', value) }
      },
      shipping_region_id: {
        get() { return store.state.contactForm.shipping_region_id },
        set(value) { store.commit('contactForm/SHIPPING_REGION_ID', value) }
      },
      shipping_zip: {
        get() { return store.state.contactForm.shipping_zip },
        set(value) { store.commit('contactForm/SHIPPING_ZIP', value) }
      },
      shipping_fax: {
        get() { return store.state.contactForm.shipping_fax },
        set(value) { store.commit('contactForm/SHIPPING_FAX', value) }
      },

      displayNameFormat1() {
        const firstName = this.first_name ? this.first_name : '(First Name)';
        const lastName = this.last_name ? this.last_name : '(Last Name)';

        return firstName + ' ' + lastName
      },
      displayNameFormat2() {
        let salutationName = this.salutationList.find(item => item.salutation_id === this.salutation_id)

        if (!salutationName) {
          salutationName = ''
        }

        const salutation = salutationName ? salutationName.name : '(Salutation)';
        const firstName = this.first_name ? this.first_name : '(First Name)';
        const lastName = this.last_name ? this.last_name : '(Last Name)';

        return salutation + ' ' + firstName
      },
      displayNameFormat3() {
        return this.company_name ? this.company_name : '(Company name)'
      },
    },

    beforeRouteLeave(to, from, next) {
      if (this.dirtyForm) {
        const leave = confirm('Are you sure leave this page?')
        if (!leave) return next(false)
      }
      return next()
    },

    mounted() {
      $('input').on('change', (event) => {
        this.dirtyForm = true
      })

      this.$refs.firstName.focus()
      store.dispatch('contactForm/initializeCreate')
    },

    methods: {
      ...sharedMethods,

      /**
       * Save contact
       */
      async save() {
        await store.dispatch('contactForm/create')
        this.dirtyForm = false
        this.$router.push('/contacts')
      },

      changeTab(name) {
        this.currentTab = name
      }
    }
  }
</script>

<style scoped>
  .tab.active {
    border-bottom: 2px solid #6e8cd7;
  }
</style>
