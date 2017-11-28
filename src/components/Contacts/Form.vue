<template>
  <form method="POST" action="#" @submit.prevent="save" class="form-horizontal">

    <div class="container full-width-header bt-1 p-b-10 m-b-20">
      <div class="row">
        <div class="col-md-12">
          <h4 v-if="this.$route.params.id" class="pull-left page-title">Edit Contact</h4>
          <h4 v-if="!this.$route.params.id" class="pull-left page-title">New Contact</h4>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12 p-b-20">

          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">I am a</label>
            <div class="col-md-9">
              <div class="checkbox checkbox-success checkbox-inline">
                <input type="checkbox" id="inlineCheckbox1" v-model="form.is_customer">
                <label for="inlineCheckbox1">Customer</label>
              </div>
              <div class="checkbox checkbox-success checkbox-inline">
                <input type="checkbox" id="inlineCheckbox2" v-model="form.is_dropshipper">
                <label for="inlineCheckbox2">Dropshipper</label>
              </div>
              <div class="checkbox checkbox-success checkbox-inline">
                <input type="checkbox" id="inlineCheckbox3" v-model="form.is_vendor">
                <label for="inlineCheckbox3">Vendor</label>
              </div>
              <div class="checkbox checkbox-success checkbox-inline">
                <input type="checkbox" id="inlineCheckbox4" v-model="form.is_reseller">
                <label for="inlineCheckbox4">Resellers</label>
              </div>
            </div>
          </div>

          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Name</label>
            <div class="col-md-2">
              <select id="salutation_id" v-model="form.salutation_id" class="form-control" title="Salutation">
                <option :value="null"></option>
                <option v-for="salutation in list.salutation_list" :value="salutation.salutation_id">
                  {{ salutation.name }}
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <input type="text" class="form-control" placeholder="Name" id="first_name" v-model="form.first_name"
                     ref="firstName" maxlength="100" required>
            </div>
            <!--<div class="col-md-2">-->
            <!--<input type="text" class="form-control" placeholder="Last Name" id="last_name" v-model="form.last_name" maxlength="100">-->
            <!--</div>-->
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Company Name</label>
            <div class="col-md-6">
              <input type="text" class="form-control" placeholder="" maxlength="100" id="company_name"
                     v-model="form.company_name">
            </div>
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left text-danger">Display Name</label>
            <div class="col-md-6">
              <select id="display_code" v-model="form.display_code" class="form-control">
                <!--<option :value="0">{{ displayNameFormat1 }}</option>-->
                <option :value="1">{{ displayNameFormat2 }}</option>
                <option :value="2">{{ displayNameFormat3 }}</option>
              </select>
            </div>
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Email</label>
            <div class="col-md-6">
              <input type="email" class="form-control" placeholder="" id="email" v-model="form.email" maxlength="255">
              <div v-if="form.errors && form.errors.email" class="alert alert-danger">
                {{ form.errors && form.errors.email && form.errors.email[0] }}
              </div>
            </div>
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Phone</label>
            <div class="col-md-3">
              <input type="text" class="form-control" placeholder="Work Phone" maxlength="20" id="phone"
                     v-model="form.phone">
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control" placeholder="Mobile" maxlength="20" id="mobile"
                     v-model="form.mobile">
            </div>
          </div>
          <div class="form-group form-general m-b-20">
            <label class="col-md-3 control-label text-left">Website</label>
            <div class="col-md-6">
              <input type="text" class="form-control" placeholder="" maxlength="255" id="website"
                     v-model="form.website">
            </div>
          </div>
          <!--<div class="form-group form-general m-b-20">-->
          <!--<label class="col-md-3 control-label text-left text-danger">Contact Type</label>-->
          <!--<div class="col-md-7">-->
          <!--<div v-for="(type, index) of contactTypeList" class="radio radio-info radio-inline">-->
          <!--<input type="radio" :id="'customer_type-' + type" :value="index" name="contact-type" id="contact_type" v-model="form.contact_type" required>-->
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
                  <select id=currency_id v-model="form.currency_id" class="select2 form-control">
                    <option value=""></option>
                    <option v-for="c in currencyList" :value="c.currency_id">{{ c.name }}</option>
                  </select>
                </div>
              </div>
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Payment Terms</label>
                <div class="col-md-4">
                  <select id=payment_term_id v-model="form.payment_term_id" class="select2 form-control">
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
                    <select id="billing_country_id" v-model="form.billing_country" class="form-control">
                      <option :value="0" hidden disabled>Select Country</option>
                      <option v-for="country in list.billing_country_list" :value="country.id" v-text="">
                        {{ country.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Province</label>
                  <div class="col-md-7">
                    <select id="billing_province_id" v-model="form.billing_province" class="form-control"
                            @change="updateBillingDistrictList" :disabled="!list.billing_province_list.length">
                      <option :value="0" hidden disabled>Select Province</option>
                      <option v-for="province in list.billing_province_list" :value="province.id">
                        {{ province.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">District</label>
                  <div class="col-md-7">
                    <select id="billing_district_id" v-model="form.billing_district" class="form-control"
                            @change="updateBillingRegionList" :disabled="!list.billing_district_list.length">
                      <option :value="0" hidden disabled>Select District</option>
                      <option v-for="district in list.billing_district_list" :value="district.id">
                        {{ district.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Region</label>
                  <div class="col-md-7">
                    <select id="billing_region_id" v-model="form.billing_region" class="form-control"
                            :disabled="!list.billing_region_list.length">
                      <option :value="0" hidden disabled>Select Region</option>
                      <option v-for="region in list.billing_region_list" :value="region.id">{{ region.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Street</label>
                  <div class="col-md-7">
                    <textarea class="form-control" rows="2" id="billing_address"
                              v-model="form.billing_address"></textarea>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Zip Code</label>
                  <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="" maxlength="5" id="billing_zip"
                           v-model="form.billing_zip">
                  </div>
                </div>

                <!--<div class="form-group form-general m-b-20">-->
                <!--<label class="col-md-4 control-label text-left">Fax</label>-->
                <!--<div class="col-md-7">-->
                <!--<input type="text" class="form-control" placeholder="" maxlength="20" id="billing_fax" v-model="form.billing_fax">-->
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
                    <select id="shipping_country_id" v-model="form.shipping_country" class="form-control">
                      <option :value="0" hidden disabled>Select Country</option>
                      <option v-for="country in list.shipping_country_list" :value="country.id">
                        {{ country.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Province</label>
                  <div class="col-md-7">
                    <select id="shipping_province_id" v-model="form.shipping_province" class="form-control"
                            @change="updateShippingDistrictList" :disabled="!list.shipping_province_list.length">
                      <option :value="0" hidden disabled>Select Province</option>
                      <option v-for="province in list.shipping_province_list" :value="province.id">
                        {{ province.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">District</label>
                  <div class="col-md-7">
                    <select id="shipping_district_id" v-model="form.shipping_district" class="form-control"
                            @change="updateShippingRegionList" :disabled="!list.shipping_district_list.length">
                      <option :value="0" hidden disabled>Select District</option>
                      <option v-for="district in list.shipping_district_list" :value="district.id">{{ district.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Region</label>
                  <div class="col-md-7">
                    <select id="shipping_region_id" v-model="form.shipping_region" class="form-control"
                            :disabled="!list.shipping_region_list.length">
                      <option :value="0" hidden disabled>Select Region</option>
                      <option v-for="region in list.shipping_region_list" :value="region.id">{{ region.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Street</label>
                  <div class="col-md-7">
                    <textarea class="form-control" rows="2" id="shipping_address"
                              v-model="form.shipping_address"></textarea>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-4 control-label text-left">Zip Code</label>
                  <div class="col-md-7">
                    <input type="text" class="form-control" placeholder="" maxlength="5" id="shipping_zip"
                           v-model="form.shipping_zip">
                  </div>
                </div>

                <!--<div class="form-group form-general m-b-20">-->
                <!--<label class="col-md-4 control-label text-left">Fax</label>-->
                <!--<div class="col-md-7">-->
                <!--<input type="text" class="form-control" placeholder="" maxlength="20" id="shipping_fax" v-model="form.shipping_fax">-->
                <!--</div>-->
                <!--</div>-->

              </div>
            </div>

            <div v-show="currentTab == 'notes'">
              <div class="col-md-11">
                <div class="form-group form-general m-b-20">
                  <label class="control-label text-left">
                    Notes <span style="color: #aaa">(For Internal Use)</span>
                  </label>
                  <textarea id="notes" v-model="form.notes" class="form-control m-l-15" rows="4"></textarea>
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
            <button v-if="!saving" type="submit" :disabled="saving" class="btn btn-primary waves-effect waves-light">
              Save
            </button>
            <button v-if="saving" type="submit" :disabled="saving" class="btn btn-default waves-effect waves-light">
              <i class="fa fa-spin fa-spinner"></i> Saving ...
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
  import Axios from 'axios'
  import store from 'src/store'
  import Vuelist from '../Vuelist'
  import Form from 'src/helpers/Form'
  import sharedMethods from './sharedMethods.js'
  import Salutation from 'src/helpers/Salutation'
  import Regional from 'src/helpers/regional'

  export default {

    name: 'ContactForm',

    components: {
      Vuelist,
    },

    data () {
      return {
        dirtyForm: false,
        saving: false,
        currentTab: 'address',

        list: {
          salutation_list: [],
          billing_country_list: [],
          billing_province_list: [],
          billing_district_list: [],
          billing_region_list: [],
          shipping_country_list: [],
          shipping_province_list: [],
          shipping_district_list: [],
          shipping_region_list: [],
        },

        form: new Form({
          is_vendor: false,
          is_customer: false,
          is_dropshipper: false,
          is_reseller: false,
          contact_type: null,
          salutation_id: null,
          currency_id: null,
          payment_term_id: null,
          first_name: '',
          last_name: '',
          display_name: null,
          display_code: null,
          email: '',
          phone: '',
          mobile: '',
          website: '',
          company_title: '',
          company_name: '',
          billing_address: '',
          billing_region: null,
          billing_district: null,
          billing_province: null,
          billing_country: null,
          billing_zip: '',
          billing_fax: '',
          shipping_address: null,
          shipping_region: null,
          shipping_district: null,
          shipping_province: null,
          shipping_country: null,
          shipping_zip: '',
          shipping_fax: '',
          notes: '',
          contact_status: 1,
        }),
      }
    },


    computed: {

      displayNameFormat1 () {
        const first_name = this.form.first_name ? this.form.first_name : '(First Name)'
        const last_name = this.form.last_name ? this.form.last_name : '(Last Name)'

        return first_name + ' ' + last_name
      },

      displayNameFormat2 () {
        let salutation_name = this.list.salutation_list.find(item => item.salutation_id === this.form.salutation_id)

        if (!salutation_name) {
          salutation_name = ''
        }

        const salutation = salutation_name ? salutation_name.name : '(Salutation)'
        const firstName = this.form.first_name ? this.form.first_name : '(First Name)'
        const lastName = this.form.last_name ? this.form.last_name : '(Last Name)'

//        return salutation + ' ' + firstName + ' ' + lastName
        return salutation + ' ' + firstName
      },

      displayNameFormat3 () {
        return this.form.company_name ? this.form.company_name : 'Company name'
      },

    },

    beforeRouteLeave (to, from, next) {
      if (this.dirtyForm) {
        const leave = confirm('Are you sure leave this page?')
        if (!leave) return next(false)
      }
      return next()
    },


    async mounted () {
      $('input').on('change', (event) => {
        this.dirtyForm = true
      })

      this.$refs.firstName.focus()

      if (this.$route.params.id) {
        this.initEdit()
      } else {
        this.initCreate()
      }
    },

    methods: {
      ...sharedMethods,

      async initCreate () {
        const res = await Axios.get(`contacts/create`)

        this.list.salutation_list = await Salutation.get()

        const country_list = await Regional.countryList()
        this.list.billing_country_list = country_list
        this.list.shipping_country_list = country_list

        // Set default country is Indonesia
        country_list.find(country => {
          if (country.name === 'Indonesia') {
            this.form.billing_country = country.id
            this.form.shipping_country = country.id
          }
        })

        this.list.billing_province_list = await Regional.provinceList(this.form.billing_country)
        this.list.shipping_province_list = await Regional.provinceList(this.form.shipping_country)

        this.list.billing_district_list = await Regional.districtList(this.form.billing_province)
        this.list.shipping_district_list = await Regional.districtList(this.form.shipping_province)

        this.list.billing_region_list = await Regional.regionList(this.form.billing_district)
        this.list.shipping_region_list = await Regional.regionList(this.form.shipping_district)
      },

      async initEdit () {
        const contact_id = this.$route.params.id
        const res = await Axios.get(`contacts/${contact_id}/edit`)
        this.form = new Form(res.data.data.contact)

        this.list.salutation_list = await Salutation.get()

        const country_list = await Regional.countryList()
        this.list.billing_country_list = country_list
        this.list.shipping_country_list = country_list

        // Set default country is Indonesia
        country_list.find(country => {
          if (country.name === 'Indonesia') {
            this.form.billing_country = country.id
            this.form.shipping_country = country.id
          }
        })

        this.list.billing_province_list = await Regional.provinceList(this.form.billing_country)
        this.list.shipping_province_list = await Regional.provinceList(this.form.shipping_country)

        this.list.billing_district_list = await Regional.districtList(this.form.billing_province)
        this.list.shipping_district_list = await Regional.districtList(this.form.shipping_province)

        this.list.billing_region_list = await Regional.regionList(this.form.billing_district)
        this.list.shipping_region_list = await Regional.regionList(this.form.shipping_district)
      },

      /**
       * Save contact
       */
      async save () {

        try {
          // Display name
          if (this.form.display_code === 1) {
            this.form.display_name = this.form.first_name
          }

          if (this.form.display_code === 2) {
            this.form.display_name = this.form.company_name
          }

          let url
          const contactId = this.$route.params.id

          if (contactId) {
            url = `contacts/${contactId}/update`
          } else {
            url = `contacts`
          }

          this.saving = true

          const data = _.cloneDeep(this.form)
          delete data['originalData']
          delete data['errors']

          // This is weird. But I must convert Boolean to String to make it work.
          data.is_customer = String(this.form.is_customer)
          data.is_reseller = String(this.form.is_reseller)
          data.is_vendor = String(this.form.is_vendor)
          data.is_dropshipper = String(this.form.is_dropshipper)

          const res = await Axios.post(url, data)
          swal_success(res)

          this.dirtyForm = false
          this.saving = false

          this.$router.push({name: 'contact.edit', params: {id: res.data.data.contact_id}})
        }
        catch(err) {
          this.saving = false
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)

            if (this.$route.params.id) {
              this.form.errors = err.response.data.data.errors
            } else {
              this.form.errors = err.response.data.data
            }
          }
        }

      },
    },
  }
</script>

<style scoped>
  .tab.active {
    border-bottom: 2px solid #6e8cd7;
  }
</style>
