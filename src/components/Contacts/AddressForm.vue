<template>
  <div class="row">

    <pre>{{ list.shipping_country_list }}</pre>

    <div class="col-md-5">

      <div class="title">Billing Address</div>

      <div class="form-group">
        <label class="control-label text-left col-md-3">Country</label>
        <div class="col-md-9">
          <select v-model="form.billing_country_id" class="form-control" title="Country list">
            <option value="" selected hidden disabled>Hello</option>
            <option v-for="val in list.billing_country_list" value="val.id" v-text="val.name"></option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label text-left col-md-3">Province</label>
        <div class="col-md-9">
          <select v-model="form.billing_province_id" class="form-control" title="Province list">
            <option value="" selected hidden disabled></option>
            <option v-for="val in list.billing_province_list" value="val.id" v-text="val.name"></option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label text-left col-md-3">District</label>
        <div class="col-md-9">
          <select v-model="form.billing_district_id" class="form-control" title="District list">
            <option value="" selected hidden disabled></option>
            <option v-for="val in list.billing_district_list" value="val.id" v-text="val.name"></option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label text-left col-md-3">Region</label>
        <div class="col-md-9">
          <select v-model="form.billing_region_id" class="form-control" title="Region list">
            <option value="" selected hidden disabled></option>
            <option v-for="val in list.billing_region_list" value="val.id" v-text="val.name"></option>
          </select>
        </div>
      </div>

    </div>
    <div class="col-md-5 col-md-offset-1">

      <div class="title">
      <div class="clearfix">
        <div class="pull-left"> Shipping Address </div>
        <div class="pull-right">
          <a href="javascript:void(0)">
            <i class="fa fa-clipboard"></i> Copy from Billing Address
          </a>
        </div>
      </div>
      </div>

      <div class="form-group">
        <label class="control-label text-left col-md-3">Country</label>
        <div class="col-md-9">
          <select v-model="form.shipping_country_id" class="form-control" title="Country list">
            <option value="" selected hidden disabled></option>
            <option v-for="val in list.shipping_country_list" value="val.id" v-text="val.name"></option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label text-left col-md-3">Province</label>
        <div class="col-md-9">
          <select v-model="form.shipping_province_id" class="form-control" title="Province list">
            <option value="" selected hidden disabled></option>
            <option v-for="val in list.shipping_province_list" value="val.id" v-text="val.name"></option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label text-left col-md-3">District</label>
        <div class="col-md-9">
          <select v-model="form.shipping_district_id" class="form-control" title="District list">
            <option value="" selected hidden disabled></option>
            <option v-for="val in list.shipping_district_list" value="val.id" v-text="val.name"></option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label text-left col-md-3">Region</label>
        <div class="col-md-9">
          <select v-model="form.shipping_region_id" class="form-control" title="Region list">
            <option value="" selected hidden disabled></option>
            <option v-for="val in list.shipping_region_list" value="val.id" v-text="val.name"></option>
          </select>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import Regional from 'helpers/regional'

  export default {
    name: 'AddressForm',

    data() {
      return {
        form: {
          billing_country_id: null,
          billing_province_id: null,
          billing_district_id: null,
          billing_region_id: null,

          shipping_country_id: null,
          shipping_province_id: null,
          shipping_district_id: null,
          shipping_region_id: null,
        },
        list: {
          billing_country_list: [],
          billing_province_list: [],
          billing_district_list: [],
          billing_region_list: [],

          shipping_country_list: [],
          shipping_province_list: [],
          shipping_district_list: [],
          shipping_region_list: [],
        },
      }
    },

    mounted() {
      this.initialize()
    },

    methods: {
      async initialize() {
        const country_list = await Regional.countryList()

        this.list.billing_country_list = country_list
        this.list.billing_province_list = []
        this.list.billing_district_list = []
        this.list.billing_region_list = []

        this.list.shipping_country_list = country_list
        this.list.shipping_province_list = []
        this.list.shipping_district_list = []
        this.list.shipping_region_list = []

        // Set default country
        country_list.find(country => {
          if (country.name === 'Indonesia') {
            this.form.billing_country_id = country.id
            this.form.shipping_country_id = country.id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .control-label {
    font-weight: normal;
    padding-left: 15px;
  }
  .title {
    margin-bottom: 30px;
  }
</style>
