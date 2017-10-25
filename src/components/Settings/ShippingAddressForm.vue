<template>
  <form method="POST" @submit.prevent="save">
    <div class="modal fade in" tabindex="-1" role="dialog" style="display: block; padding-left: 0px;">
      <div class="modal-dialog modal-lg sahito-modal">
        <div v-if="ui.loading">
          <div class="text-center lead">
            <i class="fa fa-spin fa-spinner"></i> Loading ...
          </div>
        </div>
        <div v-if="!ui.loading">
          <div class="modal-content p-0">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal">×</button>
              <h4>Edit Address</h4>
            </div>
            <div class="modal-body">
              <div class="clearfix">
                <div class="pull-right">
                  <a href="javascript:;" @click="copyFromBusinessAddress">Copy from business address</a>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                      Enter the address from which you ship orders to customers. <br>
                      This address will be used to calculate shipping costs.
                    </div>
                  </div>
                  <div class="form-horizontal p-10">

                    <div class="form-group">
                      <label class="col-md-2 control-label text-left">Address</label>
                      <div class="col-md-10">
                        <input
                          type="text"
                          class="form-control form-white"
                          id="address"
                          placeholder="Insert default shipment address from"
                          v-model="form.address"
                          required
                        />
                      </div>
                    </div>

                    <div class="form-group">

                      <label class="col-md-2 control-label text-left">Country</label>
                      <div class="col-md-4">
                        <select
                          id="country_id"
                          v-model="form.country_id"
                          class="form-control"
                          data-placeholder="Choose country…"
                          title="Country"
                          required
                        >
                          <option value="" disabled hidden>-- Select your country --</option>
                          <option v-for="country in list.country_list" :value="country.id">
                            {{ country.name }}
                          </option>
                        </select>
                      </div>

                      <label class="col-md-2 control-label text-left">Province</label>
                      <div class="col-md-4">
                        <select
                          class="form-control"
                          data-placeholder="Choose province…"
                          title="Province"
                          id="province_id"
                          v-model="form.province_id"
                          @change="updateDistrictList"
                          :disabled="!list.country_list.length"
                          required
                        >
                          <option value="" disabled hidden>-- Select your province --</option>
                          <option v-for="province in list.province_list" :value="province.id">
                            {{ province.name }}
                          </option>
                        </select>
                      </div>

                    </div>

                    <div class="form-group">

                      <label class="col-md-2 control-label text-left">District</label>
                      <div class="col-md-4">
                        <select
                          class="form-control"
                          data-placeholder="Choose District…"
                          title="District"
                          id="district_id"
                          v-model="form.district_id"
                          @change="updateRegionList"
                          :disabled="!list.district_list.length || !list.province_list.length"
                          required
                        >
                          <option value="" disabled hidden>-- Select your district --</option>
                          <option v-for="district in list.district_list" :value="district.id">
                            {{ district.name }}
                          </option>
                        </select>
                      </div>

                      <label class="col-md-2 control-label text-left">Region</label>
                      <div class="col-md-4">
                        <select
                          class="form-control"
                          data-placeholder="Choose Region…"
                          title="Region"
                          id="region_id"
                          v-model="form.region_id"
                          :disabled="!list.region_list.length || !list.district_list.length"
                          required
                        >
                          <option value="" disabled hidden>-- Select your region --</option>
                          <option v-for="region in list.region_list" :value="region.id">
                            {{ region.name }}
                          </option>
                        </select>
                      </div>

                    </div>
                    <div class="form-group">

                      <label class="col-md-2 control-label text-left">Postal Code</label>
                      <div class="col-md-4">
                        <input
                          type="text"
                          class="form-control form-white"
                          id="postal"
                          placeholder=""
                          v-model="form.zip_code"
                          maxlength="5"
                          required
                        />
                      </div>

                      <label class="col-md-2 control-label text-left">Phone</label>
                      <div class="col-md-4">
                        <input
                          type="text"
                          class="form-control form-white"
                          id="phone"
                          placeholder=""
                          v-model="form.phone_number"
                          required
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="modal-footer p-20 text-center">
              <button type="submit" class="btn btn-info waves-effect waves-light m-t-15">Save</button>
              <button type="button" class="btn btn-default waves-effect m-t-15" @click="closeModal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import Axios from 'axios'
  import Form from '@/helpers/Form'
  import Regional from '@/helpers/regional'

  export default {
    name: 'ShippingAddressForm',

    data () {
      return {
        ui: {
          loading: true,
        },
        list: {
          country_list: [],
          province_list: [],
          district_list: [],
          region_list: [],
        },
        form: new Form({
          from: '',
          address: '',
          country_id: '',
          province_id: '',
          district_id: '',
          region_id: '',
          zip_code: '',
          phone_number: '',
        }),
      }
    },

    mounted () {
      this.init()
    },

    methods: {

      async init () {
        try {
          const res = await Axios.get(`settings/edit`)

          this.form.phone_number = res.data.data.settings['web.shipping.phone_number']
          this.form.address = res.data.data.settings['web.shipping.address']
          this.form.zip_code = res.data.data.settings['web.shipping.zip_code']

          this.form.country_id = res.data.data.settings['web.shipping.country_id']
          this.form.province_id = res.data.data.settings['web.shipping.province_id']
          this.form.district_id = res.data.data.settings['web.shipping.district_id']
          this.form.region_id = res.data.data.settings['web.shipping.region_id']

          this.list.country_list = await Regional.countryList()
          this.list.province_list = await Regional.provinceList(this.form.country_id)
          this.list.district_list = await Regional.districtList(this.form.province_id)
          this.list.region_list = await Regional.regionList(this.form.district_id)

          this.ui.loading = false
        }
        catch (err) {
          console.error(err)
        }

      },

      async copyFromBusinessAddress () {
        try {
          const organization_id = Cookie.get('organization_id')
          const res = await Axios.get(`organizations/${organization_id}`)

          this.form.country_id = res.data.data.country_id
          this.form.province_id = res.data.data.province_id
          this.form.district_id = res.data.data.district_id
          this.form.region_id = res.data.data.region_id

          this.form.address = res.data.data.address
          this.form.phone_number = res.data.data.phone
          this.form.zip_code = res.data.data.zip

          this.list.country_list = await Regional.countryList()
          console.log(this.list.country_list, 'sdsd')
          this.list.province_list = await Regional.provinceList(this.form.country_id)
          this.list.district_list = await Regional.districtList(this.form.province_id)
          this.list.region_list = await Regional.regionList(this.form.district_id)
        }
        catch (err) {
          console.error(err)
        }
      },

      closeModal () {
        this.$emit('close')
      },

      async save () {
        try {
          // Make sure zip and phone are strings
          const zip_code = this.form.zip_code ? String(this.form.zip_code) : ''
          const phone_number = this.form.phone_number ? String(this.form.phone_number) : ''

          const data = {
            settings: {
              'web.shipping.from': this.form.from,
              'web.shipping.address': this.form.address,
              'web.shipping.region_id': this.form.region_id,
              'web.shipping.district_id': this.form.district_id,
              'web.shipping.province_id': this.form.province_id,
              'web.shipping.country_id': this.form.country_id,
              'web.shipping.zip_code': zip_code,
              'web.shipping.phone_number': phone_number,
            },
          }

          const res = await Axios.post('settings/shipping', data)

          swal_success(res)

          this.$emit('closeModal')
        }
        catch (err) {
          console.error(err)
          return swal_error(res)
        }
      },

      /**
       * Update Province list
       */
      async updateDistrictList () {
        this.list.district_list = await Regional.districtList(this.form.province_id)
        this.list.region_list = []
      },

      /**
       * Update District list
       */
      async updateRegionList () {
        this.list.region_list = await Regional.regionList(this.form.district_id)
      },

    },
  }
</script>

<style scoped>
  .modal {
    background: rgba(0, 0, 0, 0.4);
  }
</style>
