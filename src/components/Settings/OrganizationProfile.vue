<template>
  <section id="organization" class="content sahito-user full-width bgr-white">

    <div v-if="loading" class="lead text-muted text-center">
      <i class="fa fa-spin fa-spinner fa-lg"></i> Loading Checkout Detail
    </div>

    <div>
      <form method="POST" @submit.prevent="save">

        <div>
          <div class="container bt-1 bgr-white p-b-10">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <h4 class="title">Organization Profile</h4>
              </div>
            </div>
          </div>
          <div class="container setting-page-right-content">
            <div class="row">
              <div class="col-md-12 pt-20 m-b-20 pl-pr-15">
                <div class="form-horizontal">
                  <div class="form-group form-general m-b-20">
                    <div class="col-md-4">

                      <div v-if="!uploading && !removing">
                        <div action="#" class="custom-dropzone">
                          <div class="message" v-show="!image_logo_medium">Click here to select new image logo</div>
                          <img :src="image_logo_medium" alt="" v-if="image_logo_medium" class="" style="width: auto; height: auto; max-width: 240px; max-height: 100px;">
                          <input ref="logo" @change="uploadLogo" name="file" type="file" accept="image/*" style="opacity: 0;" v-if="!image_logo_medium">
                        </div>
                        <a @click="removeLogo" v-show="image_logo_medium" href="javascript:void(0)"
                           style="display: block; padding: 5px 10px; text-align: center; background: #515151; color: white; font-size: 12px;">
                          Remove logo
                        </a>
                      </div>
                      <div v-if="uploading" class="lead text-muted">Uploading logo...</div>
                      <div v-if="removing" class="lead text-muted">Removing logo...</div>

                    </div>
                    <div class="col-md-8">
                      <p class="note-text">
                        This logo will appear on the documents such as sales order and purchase order that you created.
                      </p>
                      <span class="help-text">Preferred Image Size: 240px x 240px @ 72 DPI Maximum size of 1MB.</span>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-3 control-label text-left">Business Name</label>
                    <div class="col-md-5">
                      <input type="text" id="name" v-model.trim="name" class="form-control" placeholder="" required>
                    </div>
                  </div>
                  <!--<div class="form-group form-general m-b-20">-->
                    <!--<label class="col-md-3 control-label text-left">Portal Name</label>-->
                    <!--<div class="col-md-5">-->
                      <!--<div class="input-group">-->
                        <!--<input type="text" id="portal" v-model.trim="portal" class="form-control" placeholder="" required>-->
                        <!--<span class="input-group-addon">.zuragan.com</span>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-3 control-label text-left">Phone</label>
                    <div class="col-md-5">
                      <input type="text" id="phone" v-model.trim="phone" class="form-control" placeholder="">
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-3 control-label text-left">Email</label>
                    <div class="col-md-5 primary-contact">
                      <div class="row">
                        <!--<div class="col-md-5 primary-contact--name" v-if="primary_contact">-->
                        <div class="col-md-5 primary-contact--name" v-if="primary_contact">
                          <!--<h5>{{ primary_contact.name }}</h5>-->
                          <p>{{ primary_contact.email }}</p>
                        </div>
                        <div class="col-md-5 primary-contact--mail">
                          <!--<a href="javascript:void(0)" data-toggle="modal" data-target="#configure_email">-->
                          <!--Configure Email-->
                          <!--</a>-->
                          <p v-show="primary_contact_issues_count">
                            <span class="ion-alert-circled"></span>
                            {{ primary_contact_issues_count }} email need to be configure
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--<div class="form-group form-general m-b-20">-->
                    <!--<label class="col-md-3 control-label text-left">Domain Name</label>-->
                    <!--<div class="col-md-10">-->
                      <!--<input type="text" class="form-control" placeholder="">-->
                    <!--</div>-->
                  <!--</div>-->
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-3 control-label text-left">Company Address</label>
                    <div class="col-md-5">
                      <select v-model.trim="country_id" @change="updateProvinceList" id="country" class="form-control" data-placeholder="Country" title="Country">
                        <option value="" disabled hidden>-- Select your country --</option>
                        <option v-for="country in countryList" :value="country.id">{{ country.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <div class="col-md-5 col-md-offset-3">
                      <select v-model.trim="province_id" @change="updateDistrictList" id="province" class="form-control" data-placeholder="Province" title="Province">
                        <option value="" disabled hidden>-- Select your province --</option>
                        <option v-for="p in provinceList" :value="p.id">{{ p.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <div class="col-md-5 col-md-offset-3">
                      <select v-model.trim="district_id" @change="updateRegionList" id="district" class="form-control" data-placeholder="District" title="District">
                        <option value="" disabled hidden>-- Select your district --</option>
                        <option v-for="d in districtList" :value="d.id">{{ d.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <div class="col-md-5 col-md-offset-3">
                      <select v-model.trim="region_id" id="region" class="form-control" data-placeholder="Region" title="Region">
                        <option value="" disabled hidden>-- Select your region --</option>
                        <option v-for="r in regionList" :value="r.id">{{ r.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-3 control-label text-left">Address</label>
                    <div class="col-md-5">
                      <textarea id="address" v-model.trim="address" style="min-width: 100%; max-width: 100%;" class="form-control" placeholder="" rows="3">{{address}}</textarea>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-3 control-label text-left">Zip/Postal Code</label>
                    <div class="col-md-5">
                      <input type="text" id="zip" v-model.trim="zip" class="form-control" placeholder="" maxlength="5" />
                    </div>
                  </div>
                  <!--<div class="form-group form-general m-b-20">-->
                    <!--<label class="col-md-3 control-label text-left">Fax</label>-->
                    <!--<div class="col-md-5">-->
                      <!--<input type="text" id="fax" v-model.trim="fax" class="form-control" placeholder="">-->
                    <!--</div>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
          </div>
          <div class="container p-b-10 m-b-20">
            <div class="row">
              <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-info waves-effect waves-light" :disabled="saving">Save</button>
                <button type="button" @click="resetForm" class="btn btn-default waves-effect" :disabled="saving">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>


      <!-- Modal dialog -->
      <div id="configure_email" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true" style="display: none">
        <div class="modal-dialog sahito-modal modal-lg">
          <div class="modal-content p-0">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4>Organization Contacts</h4>
            </div>
            <div class="modal-body">

              <div v-if="contactList">

                <div class="row">
                  <div class="col-xs-3"><strong>Name</strong></div>
                  <div class="col-xs-3"><strong>Email</strong></div>
                  <div class="col-xs-3"></div>
                  <div class="col-xs-3"></div>
                </div>

                <hr>

                <div v-for="(contact, index) in contactList">
                  <div class="row contact-row">
                    <div class="col-xs-3">
                      <label v-show="!contact.editable" for="editedContactName">{{ contact.name }}</label>
                      <input type="text"
                             id="editedContactName"
                             v-model.trim="editedContactName"
                             v-show="contact.editable"
                             class="form-control"
                      />
                    </div>
                    <div class="col-xs-3">
                      <span class="text-muted">
                        {{ contact.email }}
                        <i v-show="!contact.verified_at" class="ion-alert-circled"></i>
                      </span>
                    </div>
                    <div class="col-xs-3 show_button">
                      <span v-show="contact.is_primary" class="label label-success">Primary</span>

                      <a @click="setAsPrimary(contact)" v-show="!contact.is_primary && contact.verified_at" href="javascript:void(0)" style="color: #337ab7;">
                        Set as primary
                      </a>

                      <a v-show="!contact.verified_at && !contact.is_primary" @click="resendVerificationToken(contact)"
                         href="javascript:void(0)" style="color: #337ab7;"
                      >
                        Resend Verification Email
                      </a>
                    </div>
                    <div class="col-xs-3 text-right">
                      <div v-show="!contact.editable">
                        <a @click="editAdditionalContact(contact)" href="javascript:void(0)" class="btn-link"><i class="fa fa-pencil"></i></a>
                        <a @click="remove(contact)" href="javascript:void(0)" class="btn-link"><i class="ion-trash-b"></i></a>
                      </div>
                      <div v-show="contact.editable">
                        <button type="submit" @click="updateContact(contact)" class="btn btn-primary">Update</button>
                        <button type="button" @click="cancelEditAdditionalContact(contact)" class="btn btn-default">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr>
                </div>
              </div>
              <div class="lead text-muted text-center" v-else>
                You don't have any contacts yet.
              </div>


              <!-- New contact -->
              <div v-if="showNewContactForm">
                <fieldset>
                  <legend class="text-muted">Additional Contact</legend>

                  <form method="POST" @submit.prevent="saveAdditionalContact" class="form">

                    <div class="form-group col-xs-4">
                      <label for="new_contact_name">Name</label>
                      <input type="text" v-model.trim="newContactName" id="new_contact_name" name="name" class="form-control" required>
                    </div>
                    <div class="form-group col-xs-4">
                      <label for="new_contact_email">Email</label>
                      <input type="email" v-model.trim="newContactEmail" id="new_contact_email" name="email" class="form-control" required>
                    </div>
                    <div class="form-group col-xs-2">
                      <label>&nbsp;</label>
                      <button type="submit" class="btn btn-primary btn-block">Confirm</button>
                    </div>
                    <div class="form-group col-xs-2">
                      <label>&nbsp;</label>
                      <button type="button" @click="cancelAdditionalContact" class="btn btn-default btn-block">Cancel
                      </button>
                    </div>
                  </form>
                </fieldset>
              </div>
              <div v-else>
                <a @click="addAdditionalContact" href="javascript:void(0)" style="line-height: 4;">
                  <i class="ion-plus-round"></i> Add Additional Contact
                </a>
              </div>
            </div>
            <div class="modal-footer p-15 text-center">
              <button type="button" class="btn btn-info waves-effect waves-light m-t-15">Save</button>
              <button type="button" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>


<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Cookie from 'js-cookie'
  import store from 'src/store'
  import { regional } from 'src/mixins'
  import { responseOk, swal_error, swal_success } from 'src/helpers'

  const orgId = Cookie.get('organization_id')

  export default {
    name: 'OrganizationProfile',

    mixins: [regional],

    data() {
      return {
        loading: false,
        uploading: false,
        removing: false,
        saving: false,
        originalForm: [],
        originalContactList: [],
        organization_id: null,
        awsBaseUrl: '',
        new_contact: {
          name: '',
          email: '',
          show: false,
        },
        primary_contact_issues_count: 0,
      }
    },

    computed: {
      name: {
        get() { return store.state.settings.organization.name },
        set(value) { store.commit('settings/organization/NAME', value) }
      },
      portal: {
        get() { return store.state.settings.organization.portal },
        set(value) { store.commit('settings/organization/PORTAL', value) }
      },
      country_id: {
        get() { return store.state.settings.organization.country_id },
        set(value) { store.commit('settings/organization/COUNTRY', value) }
      },
      province_id: {
        get() { return store.state.settings.organization.province_id },
        set(value) { store.commit('settings/organization/PROVINCE', value) }
      },
      district_id: {
        get() { return store.state.settings.organization.district_id },
        set(value) { store.commit('settings/organization/DISTRICT', value) }
      },
      region_id: {
        get() { return store.state.settings.organization.region_id },
        set(value) { store.commit('settings/organization/REGION', value) }
      },
      address: {
        get() { return store.state.settings.organization.address },
        set(value) { store.commit('settings/organization/ADDRESS', value) }
      },
      zip: {
        get() { return store.state.settings.organization.zip },
        set(value) { store.commit('settings/organization/ZIP', value) }
      },
      phone: {
        get() { return store.state.settings.organization.phone },
        set(value) { store.commit('settings/organization/PHONE', value) }
      },
      fax: {
        get() { return store.state.settings.organization.fax },
        set(value) { store.commit('settings/organization/FAX', value) }
      },
      currency_id: {
        get() { return store.state.settings.organization.currency_id },
        set(value) { store.commit('settings/organization/CURRENCY_ID', value) }
      },
      timezone_id: {
        get() { return store.state.settings.organization.timezone_id },
        set(value) { store.commit('settings/organization/TIMEZONE_ID', value) }
      },
      image_logo_medium: {
        get() { return store.state.settings.organization.image_logo_medium },
        set(value) { store.commit('settings/organization/IMAGE_LOGO', value) }
      },
      organization_status: {
        get() { return store.state.settings.organization.organization_status },
        set(value) { store.commit('settings/organization/ORGANIZATION_STATUS', value) }
      },
      primary_contact() { return store.state.settings.organization.primary_contact },
      contactList() { return store.state.settings.primary_contact.contactList },
      countryList: {
        get() { return store.state.settings.organization.countryList },
        set(value) { store.commit('settings/organization/COUNTRY_LIST', value) }
      },
      provinceList: {
        get() { return store.state.settings.organization.provinceList },
        set(value) { store.commit('settings/organization/PROVINCE_LIST', value) }
      },
      districtList: {
        get() { return store.state.settings.organization.districtList },
        set(value) { store.commit('settings/organization/DISTRICT_LIST', value) }
      },
      regionList: {
        get() { return store.state.settings.organization.regionList },
        set(value) { store.commit('settings/organization/REGION_LIST', value) }
      },
      showNewContactForm() { return store.state.settings.primary_contact.showNewContactForm },
      newContactName: {
        get() { return store.state.settings.primary_contact.newContactName },
        set(value) { store.commit('settings/primary_contact/NEW_CONTACT_NAME', value) }
      },
      newContactEmail: {
        get() { return store.state.settings.primary_contact.newContactEmail },
        set(value) { store.commit('settings/primary_contact/NEW_CONTACT_EMAIL', value) }
      },
      editedContactName: {
        get() { return store.state.settings.primary_contact.editedContactName },
        set(value) { store.commit('settings/primary_contact/EDITED_CONTACT', value) }
      }
    },

    mounted() {
      this.getCountryList()
      this.getOrganizationProfile()
//      this.getContacts()
    },


    methods: {

      /**
       * Get list of countries
       */
      getCountryList() {
        store.dispatch('settings/organization/updateCountryList')
      },

      /**
       * Update Province list
       */
      updateProvinceList(country_id) {
        store.dispatch('settings/organization/updateProvinceList', country_id)
      },


      /**
       * Update District list
       */
      updateDistrictList() {
        store.dispatch('settings/organization/updateDistrictList')
      },


      /**
       * Update Region list
       */
      updateRegionList(district_id) {
        store.dispatch('settings/organization/updateRegionList', district_id)
      },


      /**
       * Save organization profile
       */
      save() {
        store.dispatch('settings/organization/save')
      },


      /**
       * Add additional contact
       */
      addAdditionalContact() {
        store.commit('settings/primary_contact/SHOW_NEW_CONTACT_FORM', true)
        store.commit('settings/primary_contact/NEW_CONTACT_NAME', '')
        store.commit('settings/primary_contact/NEW_CONTACT_EMAIL', '')
      },


      /**
       * Save additional contact
       */
      saveAdditionalContact() {
        store.dispatch('settings/primary_contact/addContact')
      },


      /**
       * Set a contact to editable
       * @param  {Object} contact
       */
      editAdditionalContact(contact) {
        store.commit('settings/primary_contact/EDIT_CONTACT', { contact, editable: true })
      },


      updateContact(contact) {
        store.dispatch('settings/primary_contact/updateContact', contact)
      },


      /**
       * Set a contact to editable
       * @param  {Object} contact
       */
      cancelEditAdditionalContact(contact) {
        store.commit('settings/primary_contact/EDIT_CONTACT', { contact, editable: false })
      },


      /**
       * Cancel/hide addtional contact form
       */
      cancelAdditionalContact() {
        store.commit('settings/primary_contact/SHOW_NEW_CONTACT_FORM', false)
      },


      /**
       * Remove contact from list
       * @param  {Object} contact
       */
      remove(contact) {
        store.dispatch('settings/primary_contact/removeContact', contact)
      },


      getContacts() {
        axios.get(`organizations/${orgId}/contacts`).then(res => {
          if (!responseOk(res.data.code)) return swal_error(res)

//            // let baru = _.map(res.data.data, (item, index) => {
//            //   // item.push({ editable: false })
//            //   console.log(item['editable'] = false)
//            // })
//            // console.log(baru)

//            // Store original contact list
//            // this.originalContactList = res.data.data
          }).catch(err => swal_error(err.response))
      },


      /**
       * Get current organization profile
       */
      getOrganizationProfile() {
        //
      },


      /**
       * Upload logo
       */
      async uploadLogo () {
        try {
          this.uploading = true
          const image = this.$refs.logo.files[0]
          const form = new FormData()
          form.append('logo', image)

          const res = await axios.post(`organizations/${orgId}/upload_logo`, form)
          if (!responseOk(res.data.code)) {
            this.uploading = false
            return swal_error(res)
          }

          store.commit('settings/organization/IMAGE_LOGO_MEDIUM', res.data.data.logo)
          swal_success(res)
          this.uploading = false

        } catch (err) {
          this.uploading = false
          swal_error(err.response)
        }
      },


      /**
       * Remove logo
       */
      async removeLogo () {
        try {
          this.removing = true
          const res = await axios.delete(`organizations/${orgId}/remove_logo`)
          if (!responseOk(res.data.code)) {
            this.removing = false
            return swal_error(res)
          }

          store.commit('settings/organization/IMAGE_LOGO_MEDIUM', null)
          swal_success(res)
          this.removing = false
        } catch (err) {
          this.removing = false
          swal_error(err.response)
        }
      },


      /**
       * Set as primary contact
       * @param  {Object} contact
       */
      setAsPrimary(contact) {
        store.dispatch('settings/primary_contact/setPrimaryContact', contact)
      },


      /**
       * TODO: Belum ada endpoint
       * Resend verification token
       * @param  {Object} contact
       */
      resendVerificationToken(contact) {
        store.dispatch('settings/primary_contact/sendVerification', contact)
      },


      /**
       * Reset to original form state
       */
      resetForm() {
        store.dispatch('settings/initialize')
      },

    },

  }
</script>

<style scoped>
  fieldset {
    margin-top: 20px;
  }

  .show_button > a {
    visibility: hidden;
  }

  .row:hover .show_button > a {
    visibility: visible;
  }

  .btn-link {
    padding: 14px 20px;
    color: #999;
  }

  .btn-link:hover {
    color: #333;
    background: #f0f0f0;
  }

  .contact-row {
    padding: 4px 0;
  }

  .modal-body hr {
    margin: 10px 0;
  }

  .custom-dropzone {
    padding: 0;
    position: relative;
    display: flex;
  }

  .custom-dropzone input[type="file"] {
    opacity: 0;
    border: 1px solid red;
    width: 100%;
    height: 140px;
  }

  .custom-dropzone .message {
    color: #999;
    padding: 20px;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: absolute;
  }
</style>
