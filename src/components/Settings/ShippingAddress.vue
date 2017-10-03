<template>
  <div class="modal fade in" tabindex="-1" role="dialog" style="display: block; padding-left: 0px;">
      <div class="modal-dialog modal-lg sahito-modal">
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
                      <input type="text" class="form-control form-white" id="address" placeholder="Insert default shipment address from" v-model="address">
                    </div>
                  </div>

                  <div class="form-group">

                    <label class="col-md-2 control-label text-left">Country</label>
                    <div class="col-md-4">
                      <select id="country_id" v-model="country_id" class="form-control" data-placeholder="Choose country…" title="Country">
                        <option value="" disabled hidden>-- Select your country --</option>
                        <option v-for="country in countryList" :value="country.id">
                          {{ country.name }}
                        </option>
                      </select>
                    </div>

                    <label class="col-md-2 control-label text-left">Province</label>
                    <div class="col-md-4">
                      <select class="form-control" data-placeholder="Choose province…" title="Province"
                              id="province_id"
                              v-model="province_id"
                              @change="updateDistrictList"
                              :disabled="!countryList.length > 0">
                        <option value="" disabled hidden>-- Select your province --</option>
                        <option v-for="province in provinceList" :value="province.id">
                          {{ province.name }}
                        </option>
                      </select>
                    </div>

                  </div>

                  <div class="form-group">

                    <label class="col-md-2 control-label text-left">District</label>
                    <div class="col-md-4">
                      <select class="form-control" data-placeholder="Choose District…" title="District"
                              id="district_id"
                              v-model="district_id"
                              @change="updateRegionList"
                              :disabled="!districtList.length > 0 || !provinceList.length > 0">
                        <option value="" disabled hidden>-- Select your district --</option>
                        <option v-for="district in districtList" :value="district.id">
                          {{ district.name }}
                        </option>
                      </select>
                    </div>

                    <label class="col-md-2 control-label text-left">Region</label>
                    <div class="col-md-4">
                      <select class="form-control" data-placeholder="Choose Region…" title="Region"
                              id="region_id"
                              v-model="region_id"
                              :disabled="!regionList.length > 0 || !districtList.length > 0"
                      >
                        <option value="" disabled hidden>-- Select your region --</option>
                        <option v-for="region in regionList" :value="region.id">
                          {{ region.name }}
                        </option>
                      </select>
                    </div>

                  </div>
                  <div class="form-group">

                    <label class="col-md-2 control-label text-left">Postal Code</label>
                    <div class="col-md-4">
                      <input type="text" class="form-control form-white" id="postal" placeholder="" v-model="zip_code" maxlength="5">
                    </div>

                    <label class="col-md-2 control-label text-left">Phone</label>
                    <div class="col-md-4">
                      <input type="text" class="form-control form-white" id="phone" placeholder="" v-model="phone_number">
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer p-20 text-center">
            <button type="button" class="btn btn-info waves-effect waves-light m-t-15" @click="updateForm">OK</button>
            <button type="button" class="btn btn-default waves-effect m-t-15" @click="closeModal" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import store from 'src/store'

  export default {
    name: 'ShippingAddress',

    computed: {
      countryList: {
        get() { return store.state.settings.shipping.countryList },
        set(value) { store.commit('settings/shipping/COUNTRY_LIST', value) },
      },
      provinceList: {
        get() { return store.state.settings.shipping.provinceList },
        set(value) { store.commit('settings/shipping/PROVINCE_LIST', value) },
      },
      districtList: {
        get() { return store.state.settings.shipping.districtList },
        set(value) { store.commit('settings/shipping/DISTRICT_LIST', value) },
      },
      regionList: {
        get() { return store.state.settings.shipping.regionList },
        set(value) { store.commit('settings/shipping/REGION_LIST', value) },
      },
      from: {
        get() { return store.state.settings.shipping.from },
        set(value) { store.commit('settings/shipping/FROM', value) },
      },
      address: {
        get() { return store.state.settings.shipping.address },
        set(value) { store.commit('settings/shipping/ADDRESS', value) },
      },
      country_id: {
        get() { return store.state.settings.shipping.country_id },
        set(value) { store.commit('settings/shipping/COUNTRY_ID', value) },
      },
      province_id: {
        get() { return store.state.settings.shipping.province_id },
        set(value) { store.commit('settings/shipping/PROVINCE_ID', value) },
      },
      district_id: {
        get() { return store.state.settings.shipping.district_id },
        set(value) { store.commit('settings/shipping/DISTRICT_ID', value) },
      },
      region_id: {
        get() { return store.state.settings.shipping.region_id },
        set(value) { store.commit('settings/shipping/REGION_ID', value) },
      },
      zip_code: {
        get() { return store.state.settings.shipping.zip_code },
        set(value) { store.commit('settings/shipping/ZIP_CODE', value) },
      },
      phone_number: {
        get() { return store.state.settings.shipping.phone_number },
        set(value) { store.commit('settings/shipping/PHONE_NUMBER', value) },
      },
    },

    mounted() {
//      store.dispatch('initialize')
    },

    methods: {

      copyFromBusinessAddress() {
        store.commit('settings/shipping/COUNTRY_LIST', store.state.settings.organization.countryList)
        store.commit('settings/shipping/PROVINCE_LIST', store.state.settings.organization.provinceList)
        store.commit('settings/shipping/DISTRICT_LIST', store.state.settings.organization.districtList)
        store.commit('settings/shipping/REGION_LIST', store.state.settings.organization.regionList)

        store.commit('settings/shipping/COUNTRY_ID', store.state.settings.organization.country_id)
        store.commit('settings/shipping/PROVINCE_ID', store.state.settings.organization.province_id)
        store.commit('settings/shipping/DISTRICT_ID', store.state.settings.organization.district_id)
        store.commit('settings/shipping/REGION_ID', store.state.settings.organization.region_id)

        store.commit('settings/shipping/ADDRESS', store.state.settings.organization.address)
        store.commit('settings/shipping/ZIP_CODE', '' + store.state.settings.organization.zip)
        store.commit('settings/shipping/PHONE_NUMBER', '' + store.state.settings.organization.phone)
      },

      closeModal() {
        store.commit('settings/shipping/SHOW_MODAL', false)
      },

      updateForm() {
        store.dispatch('settings/shipping/save')
      },

      /**
       * Update Province list
       */
      updateDistrictList(country_id) {
        store.dispatch('settings/shipping/updateDistrictList')
      },

      /**
       * Update District list
       */
      updateRegionList() {
        store.dispatch('settings/shipping/updateRegionList')
      },

    }
  }
</script>

<style scoped>
  .modal {
    background: rgba(0, 0, 0, 0.4);
  }
</style>
