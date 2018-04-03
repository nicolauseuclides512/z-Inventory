<template>
  <div class="wrapper-page">
    <div class="panel panel-color panel-primary panel-pages panel-sign-in">
      <div class="panel-heading">
        <div class="bg-overlay" style="padding-left:15px; padding-top:15px;">
          <div class="zuragan-logo-login">
            <img src="/static/images/zuragan_logo_login.png" height="62" width="125">
          </div>
        </div>
      </div>


      <div class="panel-body">
        <form method="POST" class="form-horizontal m-t-20" @submit.prevent>

          <div v-if="!emailIsTrue" class="form-group">
            <div class="col-xs-12">
              <input class="form-control input-lg"
                     style="text-transform: lowercase;"
                     type="email"
                     id="email"
                     required
                     placeholder="Email"
                     autocomplete="off"
                     autofocus
                     v-model="formEmail.email"
              />
            </div>
          </div>

          <div v-if="emailIsTrue" class="form-group">
            <div class="col-xs-12">
              <input class="form-control input-lg"
                     style="text-transform: lowercase;"
                     type="email"
                     id="email"
                     required
                     placeholder="Email"
                     autocomplete="off"
                     autofocus
                     v-model="form.username"
              />
            </div>
          </div>

          <div v-if="emailIsTrue" class="form-group">
            <div class="col-xs-12">
              <input class="form-control input-lg"
                     type="password"
                     id="password"
                     required
                     placeholder="Password"
                     autocomplete="off"
                     v-model="form.password"
              />
            </div>
          </div>

          <div class="form-group" v-if="!notVerified">
            <div v-if="emailIsTrue" class="col-xs-6" >
              <div class="checkbox checkbox-primary">
                <input id="remember" type="checkbox" v-model="form.remember">
                <label for="remember">
                  Remember me
                </label>
              </div>

            </div>

            <!-- <div class="col-xs-6" v-if="notVerified">
              <router-link :to="{ name: 'auth.verification' }">
                Resend verification email
              </router-link>
            </div> -->

          </div>

          <div class="form-group text-center m-t-30">
            <div class="col-xs-12" v-if="!notVerified">
              <button v-if="!loading && !emailIsTrue" id="submit" type="submit" class="btn btn-primary btn-lg w-lg waves-effect waves-light" @click="checkMail">Log In</button>
              <button v-if="!loading && emailIsTrue" id="submit" type="submit" class="btn btn-primary btn-lg w-lg waves-effect waves-light" @click="login">Log In</button>
              <button v-if="loading" id="loading-button" type="button" class="btn btn-default btn-lg w-lg waves-effect waves-light" disabled>
                <i class="fa fa-spin fa-spinner"></i> Log In
              </button>
            </div>
            <div class="col-xs-12" v-if="notVerified">
              <router-link v-if="!loading" :to="{ name: 'auth.verification' }">
                <button  class="btn btn-warning btn-lg w-lg waves-effect waves-light">
                  Resend Verification Email
                </button>
              </router-link>
              <router-link  v-else :to="{ name: 'auth.verification' }">
                <button class="btn btn-default btn-lg w-lg waves-effect waves-light" disabled>
                  <i class="fa fa-spin fa-spinner"></i> Resend Verification Email
                </button>
              </router-link>
            </div>
          </div>

          <div class="form-group m-t-30">
            <div class="col-sm-7">
              <router-link v-if="emailIsTrue" :to="{ name: 'auth.forgot' }" id="goto-forgot-password">
                <i class="fa fa-lock m-r-5"></i> Forgot your password?
              </router-link>
            </div>
            <div class="col-sm-5 text-right">
              <router-link :to="{ name: 'auth.register' }" id="goto-register">
                Create an account
              </router-link>
            </div>
          </div>
        </form>

        <!--<div class="col-xs-12 sign-in-social">-->
          <!--<span> Sign in using </span>-->

          <!--<ul>-->
            <!--<li><a href="#"><i class="ion-social-google"></i></a></li>-->
            <!--<li><a href="#"><i class="ion-social-facebook"></i></a></li>-->
          <!--</ul>-->
        <!--</div>-->
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Cookie from 'js-cookie'
  import Storage from 'store/dist/store.modern'
  import swal from 'sweetalert2'
  import { responseOk } from '../../helpers'
  import Carrier from '../../helpers/Carrier'
  import Form from '../../helpers/Form'
  import PaymentMethodList from '../../helpers/PaymentMethodList'
  import Regional from '../../helpers/regional'


  export default {
    name: 'Login',

    data() {
      return {
        emailIsTrue: false,
        notVerified: null,
        loading: false,
        formEmail: new Form({
          email: '',
          application: 'inventory'
        }),
        form: new Form({
          grant_type: 'password',
          client_id: 2, // FIXME: Hard coded
          client_secret: 'beXvmNU9dQS1cN35vmGSSDAfOR8nSVASouE3sVBT', // FIXME: Hard coded
          // email: '',
          username: '',
          password: '',
          scope: '',
          remember: true,
          application: 'inventory',
          application_id: 'inventory',
        })
      }
    },

    methods: {
      async checkMail () {
        try {
          this.loading = true
          const res = await this.formEmail.post(`register/check_avail_email`)
          if (res.data.code == 200) {
            this.$router.push({
              name: 'auth.register',
              query: {
                email: this.formEmail.email,
              }
            })
          }
          if (res.data.code == 202) {
            this.$router.push({
              name: 'auth.register.company',
              query: {
                email: this.formEmail.email,
              }
            })
          }
          this.loading = false
        }
        catch (err) {
          const errCode = err.response.data.code
          if (errCode == 400) {
            if (err.response.data.data && err.response.data.data.email && err.response.data.data.email.length) {
              swal({
                title: res.data.data.email[0],
                type: 'error',
                showConfirmButton: true,
              })
            }
          }
          if (errCode == 409) {
            this.emailIsTrue = true;
            this.form.username = this.formEmail.email
          }
          else{
            swal({
              title: err.message,
              type: 'error',
              showConfirmButton: true,
            }).catch(swal.noop)
          }

          this.loading = false

        }
      },

      async login () {

        try {
          this.loading = true

          const res = await this.form.post(`oauth/token`)

          if (!responseOk(res.data.code)) {
            throw {
              name: 'InvalidCredentials',
              message: res.data.message,
            }
          }

          if (res.data.message === 'User is not registered on this application.') {
            this.$router.push({
              name: 'auth.register.company',
              query: {
                email: this.form.username,
              }
            })
            return
          }

          let options = {}

          if (this.form.remember) {
            options.expires = 14
          }

          Cookie.set('token_type', res.data.data.token_type, options)
          Cookie.set('access_token', res.data.data.access_token, options)
          Cookie.set('refresh_token', res.data.data.refresh_token, options)
          Cookie.set('organization_id', res.data.data.organization_id, options)

          axios.defaults.headers.common['Authorization'] = Cookie.get('token_type') + ' ' + Cookie.get('access_token')
          axios.defaults.headers.common['X-Header-Organization-Id'] = Cookie.get('organization_id')

          // ----------------------------------------------------------------------------------------------------
          // Cache
          // ----------------------------------------------------------------------------------------------------

          // First, clear all caches.
          Storage.clearAll()

          this.cacheCarriers()
          this.cachePaymentMethods()
          this.cacheRegional()


          // ----------------------------------------------------------------------------------------------------
          // Run setup
          // ----------------------------------------------------------------------------------------------------
          await axios.get('setup')
          let destination = '/'

          if (this.$route.query.redirect) {
            destination = this.$route.query.redirect
          }
          this.$router.push(destination)

          this.loading = false
        }
        catch (err) {
          console.error(err)

          if (err.message === 'Account not verified.') {
            this.notVerified = true
            err.message = "Account not verified. Please verify by click a link in email. Or resend verification email if you don't get one."
          }

          if (err.message === 'invalid_credentials') {
            err.message = 'Password or Email does not match'
          }

          swal({
            title: err.message,
            type: 'error',
            showConfirmButton: true,
          }).catch(swal.noop)

          this.loading = false

        }

      },


      /**
       * Cache carriers/courier(?)
       */
      cacheCarriers() {
        Carrier.get()
      },


      /**
       * Cache payment methods
       */
      cachePaymentMethods() {
        PaymentMethodList.get()
      },


      /**
       * Cache regional area
       */
      cacheRegional() {
        Regional.countryList()
        Regional.provinceList()
        Regional.districtList()
        Regional.regionList()
      }
    }
  }

</script>
