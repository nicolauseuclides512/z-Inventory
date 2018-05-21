<template>
  <div class="modal-add-customer-wrap">
    <!-- <button class="btn btn-add-customer btn-block" @click="showModalAddCustomer">
      Add New Customer
    </button> -->
    <div id="modal-add-customer" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-customer-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          </div>
          <div class="modal-body">
            <h4 class="modal-title">Add New Contact</h4>
            <form v-on:submit.prevent="save">
              <div class="form-new-customer personal-info">

                  <!-- <select id="salutation_id" v-model="model.salutation" class="form-control" title="Salutation">
                    <option :value="null"></option>
                    <option v-for="(salutation,i) in list.salutation_list" :value="salutation" :key="i">
                      {{ salutation }}
                    </option>
                  </select> -->

                    <div class="form-group d-flex label-wrap">
                      <label class="control-label text-left">Type</label>
                      <div class="input">
                        <div class="checkbox checkbox-success checkbox-inline">
                          <input type="checkbox" id="inlineCheckbox1" v-model="model.is_customer">
                          <label for="inlineCheckbox1">Customer</label>
                        </div>
                        <div class="checkbox checkbox-success checkbox-inline">
                          <input type="checkbox" id="inlineCheckbox2" v-model="model.is_dropshipper">
                          <label for="inlineCheckbox2">Dropshipper</label>
                        </div>
                        <div class="checkbox checkbox-success checkbox-inline">
                          <input type="checkbox" id="inlineCheckbox4" v-model="model.is_reseller">
                          <label for="inlineCheckbox4">Resellers</label>
                        </div>
                      </div>
                    </div>
                <div class="form-group">
                  <div class="d-flex label-wrap">
                    <label for="FullName">Name</label>
                    <input type="text" name="FullName" id="first_name" placeholder="Name" v-model="model.first_name" v-validate="'required'" v-bind:class="{'form-control': true, 'error': errors.has('first_name') }" />
                  </div>
                  <span v-show="errors.has('first_name')" class="text-danger">{{ errors.first('first_name') }}</span>
                </div>

                <div class="form-group">
                  <div class="d-flex label-wrap">
                    <label for="email">Email</label>
                    <input type="email" name="email"  id="formEmail" placeholder="Email" v-model="model.email" v-validate="'email'" v-bind:class="{'form-control': true, 'error': errors.has('email') }" />
                  </div>
                  <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                </div>

                <div class="form-group">

                  <div class="d-flex label-wrap">
                    <label for="phone">Phone</label>
                    <div class="row" style="flex:1;">
                      <div class="col-xs-6">
                        <input type="text" name="phone"  id="formPhone" placeholder="Work Number" v-model="model.phone" v-validate="'numeric|max:15|min:9'" v-bind:class="{'form-control': true, 'error': errors.has('phone') }"/>
                      <span v-show="errors.has('phone')" class="text-danger">{{ errors.first('phone') }}</span>
                      </div>
                      <div class="col-xs-6">
                        <input type="text" name="mobile"  id="formMobile" placeholder="Mobile Number" v-model="model.mobile" v-validate="'numeric|max:15|min:9'" v-bind:class="{'form-control': true, 'error': errors.has('mobile') }"/>
                      <span v-show="errors.has('mobile')" class="text-danger">{{ errors.first('mobile') }}</span>
                      </div>

                    </div>

                  </div>
                </div>

                <div class="form-group">

                  <div class="d-flex label-wrap">
                    <label for="company_name">Company Name</label>
                    <input type="text" name="company_name"  placeholder="Company Name" id="company_name" v-model="model.company_name" v-bind:class="{'form-control': true, 'error': errors.has('company_name') }">
                  </div>
                  <span v-show="errors.has('company_name')" class="text-danger">{{ errors.first('company_name') }}</span>
                </div>

                <div class="form-group">

                  <div class="d-flex label-wrap">
                    <label for="website">Website</label>
                    <input type="text" name="website" v-validate="'url'" placeholder="Website" id="website" v-model="model.website" v-bind:class="{'form-control': true, 'error': errors.has('website') }">
                  </div>
                  <span v-show="errors.has('website')" class="text-danger">{{ errors.first('website') }}</span>
                </div>

              </div>

              <div class="same-address">
                <h3>Billing & Shipping Address</h3>
              </div>
              <div class="form-new-customer row address-detail">
                <div class="col-sm-6">
                  <h4 v-if="!model.is_sameAddress">Billing Address</h4>
                  <div class="form-group">
                  <div class="d-flex label-wrap">
                    <label for="website">Province</label>
                    <select
                    placeholder="Province"
                    id="billing_province_id"
                    v-model="model.billing_province"
                    class="form-control"
                    @change="updateBillingDistrictList" :disabled="!list.billing_province_list.length"
                      >
                      <option :value="null" selected>Select Billing Province</option>
                      <option
                        :key="idx"
                        v-for="(province,idx) in list.billing_province_list" :value="province.id"
                        >
                        {{ province.name }}
                      </option>
                    </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="d-flex label-wrap">
                      <label for="website">District</label>
                      <select
                        placeholder="District"
                        id="billing_district_id"
                        v-model="model.billing_district"
                        class="form-control"
                        @change="updateBillingRegionList" :disabled="!list.billing_district_list.length">
                        <option :value="null" selected>Select Billing District</option>
                        <option :key="idx" v-for="(district,idx) in list.billing_district_list" :value="district.id">
                          {{ district.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="d-flex label-wrap">
                      <label for="website">Region</label>
                      <select
                        placeholder="Region"
                        id="billing_region_id"
                        v-model="model.billing_region"
                        class="form-control"
                        :disabled="!list.billing_region_list.length"
                        >
                        <option :value="null" selected>Select Billing Region</option>
                        <option :key="idx" v-for="(region,idx) in list.billing_region_list" :value="region.id">
                          {{ region.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="d-flex label-wrap">
                      <label for="website">Street</label>
                      <textarea name="address" placeholder="Billing Street/Address" id="formaddress" class="form-control" rows="3" v-model="model.billing_address" v-validate="'max:500|min:3'" v-bind:class="{'form-control': true, 'error': errors.has('billing_address') }"></textarea>
                    </div>
                    <span v-show="errors.has('billing_address')" class="text-danger">{{ errors.first('billing_address') }}</span>
                  </div>
                  <div class="form-group">
                    <div class="d-flex label-wrap">
                      <label for="website">Zip</label>
                      <input type="text" name="zip" id="shippingZip" placeholder="Billing Zip" v-model="model.billing_zip" v-validate="'numeric|max:5'" v-bind:class="{'form-control': true, 'error': errors.has('zip') }">
                    </div>
                    <span v-show="errors.has('zip')" class="text-danger">{{ errors.first('zip') }}</span>
                  </div>


                  <div class="same-address no-border checkbox checkbox-success">
                    <input
                      v-model="model.is_sameAddress"
                      type="checkbox"
                      id="sameAddress"
                    />
                    <label for="sameAddress">Shipping address is same as billing address</label>
                  </div>
                </div>

                <div v-if="!model.is_sameAddress" class="col-sm-6">
                  <h4>Shipping Address</h4>
                  <div class="form-group">
                    <div class="d-flex label-wrap">
                      <label for="website">Province</label>
                      <select
                      placeholder="Province"
                      id="billing_province_id"
                      v-model="model.shipping_province"
                      class="form-control"
                      @change="updateShippingDistrictList" :disabled="!list.shipping_province_list.length"
                        >
                        <option :value="null" >Select Shipping Province</option>
                        <option
                          :key="idx"
                          v-for="(province,idx) in list.shipping_province_list" :value="province.id"
                          >
                          {{ province.name }}
                        </option>
                      </select>
                      </div>
                  </div>
                  <div class="form-group">
                  <div class="d-flex label-wrap">
                    <label for="website">District</label>
                    <select
                      placeholder="District"
                      id="shipping_district_id"
                      v-model="model.shipping_district"
                      class="form-control"
                      @change="updateShippingRegionList" :disabled="!list.shipping_district_list.length">
                      <option :value="null" selected>Select Shipping District</option>
                      <option :key="idx" v-for="(district,idx) in list.shipping_district_list" :value="district.id">
                        {{ district.name }}
                      </option>
                    </select>
                  </div>
                  </div>
                  <div class="form-group">
                  <div class="d-flex label-wrap">
                    <label for="website">Region</label>
                    <select
                      placeholder="Region"
                      id="shipping_region_id"
                      v-model="model.shipping_region"
                      class="form-control"
                      :disabled="!list.shipping_region_list.length"
                      >
                      <option :value="null" selected>Select Shipping Region</option>
                      <option :key="idx" v-for="(region,idx) in list.shipping_region_list" :value="region.id">
                        {{ region.name }}
                      </option>
                    </select>
                  </div>
                  </div>

                  <div class="form-group">
                  <div class="d-flex label-wrap">
                    <label for="website">Street</label>
                    <textarea name="address" placeholder="Shipping Street/Address" id="formaddress" class="form-control" rows="3" v-model="model.shipping_address" v-validate="'max:500|min:3'" v-bind:class="{'form-control': true, 'error': errors.has('shipping_address') }"></textarea>
                  </div>
                    <span v-show="errors.has('shipping_address')" class="text-danger">{{ errors.first('shipping_address') }}</span>
                  </div>
                  <div class="form-group">
                  <div class="d-flex label-wrap">
                    <label for="website">Zip</label>
                    <input type="text" name="shippingzip" id="shippingZip" placeholder="Shipping Zip" v-model="model.shipping_zip" v-validate="'numeric|max:5'" v-bind:class="{'form-control': true, 'error': errors.has('shippingzip') }">
                  </div>
                    <span v-show="errors.has('shippingzip')" class="text-danger">{{ errors.first('zip') }}</span>
                  </div>

                </div>
              </div>

              <button :disabled="errors.any() || saving" type="submit" class="btn btn-info waves-effect waves-light m-t-15">
                <span v-if="!saving">Save</span>
                <span v-if="saving">Saving...</span>
                </button>
              <button type="reset" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  import Regional from 'src/helpers/regional';
  import Form from 'src/helpers/Form';

  Vue.use(VeeValidate);

  export default {
    name: 'ModalAddCustomer',
    computed: {
      displayName(){
        return this.model.first_name+' '+this.model.company_name
      }
    },

    created(){
    },

    props:[
      'editContactData'
    ],

    data() {
      return {
        list: {
          // salutation_list: ['Mr','Mrs', 'Miss', 'Ms'],
          billing_country_list: [],
          billing_province_list: [],
          billing_district_list: [],
          billing_region_list: [],
          shipping_country_list: [],
          shipping_province_list: [],
          shipping_district_list: [],
          shipping_region_list: [],
        },
        model: {
          is_customer: false,
          is_dropshipper: false,
          is_reseller: false,

          shipping_zip: null,
          billing_province:null,
          // salutation:'',
          website: '',
          name:'',
          first_name:'',
          company_name:'',
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
          phone: '',
          mobile: '',
          email: '',
          is_customer:'true', // hidden
          display_code:1,  // hidden
          contact_status:1, // hidden
          is_sameAddress: true, // hidden
          saving: false
        },
        saving: false
      }
    },
    mounted() {
      $('#modal-add-customer').modal('show')
      this.initContact()
    },
    watch:{
      editContactData(newContactData){
        this.model = new Form(newContactData)
      }

    },
    methods: {
      async updateBillingCountryList () {
        this.list.billing_country_list = await Regional.countryList()
        this.list.billing_province_list = []
        this.list.billing_district_list = []
        this.list.billing_region_list = []
      },

      async updateBillingProvinceList () {
        this.list.billing_province_list = await Regional.provinceList(this.model.billing_country)
        this.list.billing_district_list = []
        this.list.billing_region_list = []
      },

      async updateBillingDistrictList () {
        this.list.billing_district_list = await Regional.districtList(this.model.billing_province)
        this.list.billing_region_list = []
      },

      async updateBillingRegionList () {
        this.list.billing_region_list = await Regional.regionList(this.model.billing_district)
      },

      async updateShippingCountryList () {
        this.list.shipping_country_list = await Regional.countryList()
        this.list.shipping_province_list = []
        this.list.shipping_district_list = []
        this.list.shipping_region_list = []
      },

      async updateShippingProvinceList () {
        this.list.shipping_province_list = await Regional.provinceList(this.model.shipping_country)
        this.list.shipping_district_list = []
        this.list.shipping_region_list = []
      },

      async updateShippingDistrictList () {
        this.list.shipping_district_list = await Regional.districtList(this.model.shipping_province)
        this.list.shipping_region_list = []
      },

      async updateShippingRegionList () {
        this.list.shipping_region_list = await Regional.regionList(this.model.shipping_district)
      },

      async initContact(){
        if(this.editContactData){
          this.model = this.editContactData
        }
        const country_list = await Regional.countryList()
        this.list.billing_country_list = country_list
        this.list.shipping_country_list = country_list

        // Set default country is Indonesia
        country_list.find(country => {
          if (country.name === 'Indonesia') {
            this.model.billing_country = country.id
            this.model.shipping_country = country.id
          }
        })

        this.list.billing_province_list = await Regional.provinceList(this.model.billing_country)
        this.list.shipping_province_list = await Regional.provinceList(this.model.shipping_country)

        this.list.billing_district_list = await Regional.districtList(this.model.billing_province)
        this.list.shipping_district_list = await Regional.districtList(this.model.shipping_province)

        this.list.billing_region_list = await Regional.regionList(this.model.billing_district)
        this.list.shipping_region_list = await Regional.regionList(this.model.shipping_district)

      },

      hideModalAddCustomer(){
        $('#modal-add-customer').modal('hide')
      },

      showModalAddCustomer(){
        $('#modal-add-customer').modal('show')
      },

      save() {
        let url = '/contacts'
        if(this.editContactData && this.editContactData.contact_id){
          url = `/contacts/${this.editContactData.contact_id}/update`
          // alert('wkwkw')
        }
        this.saving = true;

        if (this.model.is_sameAddress === true) {
          this.model.shipping_country = this.model.billing_country
          this.model.shipping_province = this.model.billing_province
          this.model.shipping_district = this.model.billing_district
          this.model.shipping_region = this.model.billing_region
          this.model.shipping_address = this.model.billing_address
          this.model.shipping_zip = this.model.billing_zip
        }

        this.$validator.validateAll().then((result) => {
          if (result) {
            try{
              axios.post(url,
                {
                  ...this.model,
                  display_name: this.displayName,
                }
              ).then(res => {
                this.saving = false
                swal_success(res)
                this.hideModalAddCustomer()
                // console.log(res.data.data.contact_id)
                this.$emit('fetchContactList')
                this.$emit('selectContact', res.data.data)
                this.$emit('close')
                // console.log('alo')
              }).catch(err => {
                this.saving = false
                this.$emit('close')
                swal_mapError(err.response)
              })
            }catch (err) {
                this.saving = false
                this.$emit('close')
              err =>{
                console.log(err.response)
          this.$emit('close')
              }
            }
            return;
          }else{
            this.saving = false
            this.$emit('close')
            Alert.error('Customer form is not valid!');
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  #modal-add-customer{
    .modal-dialog{
      width: 100%;
      max-width: 900px;
      .same-address{
        cursor: pointer;
        margin-bottom: 20px;
        height: 20px;
        padding: 40px 0 20px;
        display: flex;
        align-items: center;
        margin-top: 40px;
        border-top: gainsboro 1px solid;
        width: 100%;
        &.no-border{
          border:none;
          padding:  20px;
          margin-top: 20px;
        }
        label{
          font-weight: normal;
        }
      }
    }
  }
  textarea {
    resize: none;
  }
  .btn-add-customer{
    width: 100%;
  }
  button.close{
    font-size: 30px;
  }
  h4.modal-title{
    margin-bottom: 80px;
  }
  .modal-customer-header {
    display: block;
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    padding: 40px 20px;
    top: 0;
    background-color: #ddd;
  }
  select#salutation_id {
    width: 70px;
    padding: 0 0 0 10px;
    margin-right: 10px;
  }
  .label-wrap{
    overflow: hidden;
    width: 100%;
    justify-content: center;
    label{
      display: block;
      width: 120px;
    }
    select,
    textarea,
    input,
    .input{
      flex: 1;
    }
  }
</style>
