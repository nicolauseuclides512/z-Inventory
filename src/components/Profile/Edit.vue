<template>
  <div class="tab-pane active" id="personal-information">
    <div class="row sahito-profile-tabs--personal">
      <div class="col-md-12">
        <div class="panel panel-default panel-fill">
          <div class="panel-heading">
            <h3 class="panel-title">Personal Information</h3>
            <small class="help-block">Manage your personal details, contact information, language, country, and timezone settings.</small>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12 sahito-personal-tabs-personal--content">
                <form @submit.prevent method="POST" action="#" class="form-horizontal">
                  <div class="form-group">
                    <label class="col-sm-3 control-label">Full Name</label>
                    <div class="col-sm-6">
                      <editable-text
                        keyid="full_name"
                        :text="user.full_name || '(empty)'"
                        title="Enter Full Name"
                        @change="changeText"
                      ></editable-text>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">Nick Name</label>
                    <div class="col-sm-6">
                      <editable-text
                        keyid="nickname"
                        :text="user.nickname || '(empty)'"
                        title="Enter Nick Name"
                        @change="changeText"
                      ></editable-text>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">Gender</label>
                    <div class="col-sm-6">
                      <div class="radio radio-info radio-inline">
                        <input v-model="user.gender" type="radio" id="male" value="1" name="gender">
                        <label for="male"> Male </label>
                      </div>
                      <div class="radio radio-info radio-inline">
                        <input v-model="user.gender" type="radio" id="female" value="2" name="gender">
                        <label for="female"> Female </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">Country</label>
                    <div class="col-sm-6">
                      <vuelist placeholder="Choose a Country..."
                               @change="updateCountry"
                               :options="countries"
                               label="country_name"
                               keyid="country_id"
                               :value="user.country_id"
                      ></vuelist>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">Time Zone</label>
                    <div class="col-sm-6">
                      <vuelist placeholder="Choose a timezone..."
                               @change="updateTimezone"
                               :options="timezones"
                               label="name"
                               keyid="timezone_id"
                               :value="user.timezone_id"
                      ></vuelist>
                      <div class="checkbox checkbox-primary m-t-10">
                        <input id="checkbox2" type="checkbox" v-model="showAllTimezone">
                        <label for="checkbox2">
                          Display all time zones
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-6 col-sm-offset-3">
                      <button type="submit" @click="save" v-show="!saving"
                              class="btn btn-info waves-effect waves-light"
                      >
                        Save
                      </button>
                      <button type="button" disabled="true" v-show="saving"
                              class="btn btn-default waves-effect waves-light"
                      >
                        Saving...
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { regional, timezones } from '../../mixins'
  import Vuelist from '../Vuelist.vue'
  import EditableText from '../Forms/Editable'
  import { responseOk } from 'src/helpers'
  import Timezone from "../../helpers/Timezone";

  export default {

    name: 'EditProfile',

    components: {
      EditableText,
      Vuelist
    },


    mixins: [ regional, timezones ],


    data() {
      return {
        saving: false,
        showAllTimezone: false,
        timezones: [],
        countries: [],
        user: {
          full_name: '',
          nickname: '',
          gender: '',
          timezone_id: '',
          country_id: '',
        }
      }
    },


    mounted() {
//      this.countries = this.getCountries()
      Timezone.get().then(timezones => {
        this.timezones = timezones
      })
      this.getUserProfile()
    },

    methods: {

      /**
       * Get current user profile
       */
      getUserProfile() {
        axios.get(`profile/edit`).then(res => {
          if (!responseOk(res.data.code)) return swal_error(res)

          const data = res.data.data

          this.user = {
            email: data.email, // Will be used for save
            username: data.username, // Will be used for save
            full_name: data.full_name,
            nickname: data.nickname,
            gender: data.gender,
            timezone_id: data.timezone_id,
            country_id: data.country_id,
          }

        }).catch(err => {
          return swal_error(err.response)
        })
      },


      save() {
        const payload = {
          username: this.user.username,
          email: this.user.email,
          full_name: this.user.full_name,
          nickname: this.user.nickname,
          gender: this.user.gender,
          timezone_id: this.user.timezone_id,
          country_id: this.user.country_id,
        }

        this.saving = true

        axios.put(`profile/update`, payload).then(res => {
          if (!responseOk(res.data.code)) {
            this.saving = false
            return swal_error(res)
          }

          const editedUserData = {
            email: this.user.email,
            gender: this.user.gender,
            username: this.user.username,
            nickname: this.user.nickname,
            full_name: this.user.full_name,
          }

          const user = _.merge(window.user, editedUserData)

          window.Cookie.set('user', user)

          this.saving = false

          return swal_success(res)

        }, res => {
          this.saving = false
          return swal_error(res)
        })
      },


      updateCountry(val) {
        this.user.country_id = val.country_id
      },

      updateTimezone(val) {
        this.user.timezone_id = val.timezone_id
      },

      editable(value) {

      },

      changeText(id, value) {
        this.user[id] = value
      }


    },
  }



</script>
