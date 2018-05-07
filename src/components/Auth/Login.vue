<template>
  <div class="wrapper-page">
    <div class="panel panel-color panel-primary panel-pages panel-sign-in">
      <div class="panel-heading">
        <div class="bg-overlay" style="padding-left:15px; padding-top:15px;">
          <div class="zuragan-logo-login">
            <img src="/static/images/zuragan_logo_login.png" style="width: 125px; height: 62px;">
          </div>
        </div>
      </div>


      <div class="panel-body">
        <form method="POST" class="form-horizontal m-t-20" @submit.prevent>

          <div v-if="$route.query.thanks">
            <h3>Thank you!</h3>
            One more step to go. You’ve just been sent an email with a confirmation link.
            To confirm your subscription, check your email inbox and click the link in that email.
            <hr>
          </div>

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
                     id="email2"
                     required
                     placeholder="Email"
                     autocomplete="off"
                     v-model="form.username"
              />
            </div>
          </div>

          <div v-if="emailIsTrue" class="form-group">
            <div class="col-xs-12">
              <input class="form-control input-lg"
                     type="password"
                     id="password"
                     ref="password"
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
              <button v-if="!loading && emailIsTrue" id="submit2" type="submit" class="btn btn-primary btn-lg w-lg waves-effect waves-light" @click="login">Log In</button>
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
          if (res.data.code === 200) {
            this.$router.push({
              name: 'auth.register',
              query: {
                email: this.formEmail.email,
              }
            })
          }
          if (res.data.code === 202) {
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
          if (errCode === 400) {
            if (err.response.data.data && err.response.data.data.email && err.response.data.data.email.length) {
              swal({
                title: res.data.data.email[0],
                type: 'error',
                showConfirmButton: true,
              })
            }
          }
          // User already registered
          if (errCode === 409) {
            this.emailIsTrue = true;
            this.form.username = this.formEmail.email
            this.$nextTick(() => this.$refs.password.focus())
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

          // console.log(res.data.data)
          const authData = res.data.data
          Cookie.set('auth', JSON.stringify(authData))

          // {
          //   "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQwNTE5MjQzMTQ5YzBmMWMyZWEyNTQ1ZmEwOWNkM2RmZDQ2ZGExOWE5MDE0OGY0NDA1ODcwODc4Yjg0YzI0MzM0N2UyN2I4YjdlNTk5NTg2In0.eyJhdWQiOiIyIiwianRpIjoiNDA1MTkyNDMxNDljMGYxYzJlYTI1NDVmYTA5Y2QzZGZkNDZkYTE5YTkwMTQ4ZjQ0MDU4NzA4NzhiODRjMjQzMzQ3ZTI3YjhiN2U1OTk1ODYiLCJpYXQiOjE1MjU2ODgyNDAsIm5iZiI6MTUyNTY4ODI0MCwiZXhwIjoxNTI2OTg0MjQwLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.iKIEExGAUkP8o-IbSoK0xI5Ld1VXmQwlX-fA19pTuT2NhS97y64YXjU_hjIqc0U9fkCSJoXA4kt3GWPu7_N5XNNMea9Rnna6E5o6POyTXE7OMz28SRv51IT5TzEhuKA1UEFgyE4HaqIzCi7qqQE7oXdz_wqQV3UvITBNASb3LufsCH30Cnehv94QDgvECENGsbIjxm2saI586nZM8toja5PasShKHS2OtguAKurOi4HbQ9-fBijwv8FHRMKGw72uYH-EoGd85-zncEeQSEsWd0j0jS_XbyryZDWvlyMjgqiaDQjEiHMoydR6zPiuzk1RAoQRCd-7DLHB7NNPBc-NeQpAaNphWdK6phFkqNEJxF6QRp6JpKjegJ2labliiT02CdvUMwO-8vs-EYbYUIGod3XIqjHYq9oc4CdNyoZndV_nVNhJQjsbG8fMphj5e050fsbIC0-WvrysDCS752xwyHhTGA-Zo_GRfGE0eFhwk_85c_rsoNwOMq-J9N8ljdT0UAZkZN0epNo5aNmc-CBoWnKCgm4MuMRs1sUJz13aPb_6rFLqWJLOSQjqcXLATAKPrhEeMKvUzSo4bXUArRUfPyYw16U9c2fDwO7mUmb_htK2o_KvEeldtQsuggeESawE6ws7NEYEd7gzQhRDnBM_eCp7jVhXc-UvIC2LwygTRPg",
          //   "email": "rebotak@gmail.com",
          //   "expires_in": 1296000,
          //   "organization_id": 9,
          //   "refresh_token": "def502001220b990e49a172714ebc702ab2b687d37cb224cbf283acd2a0138804309a659e97de1e93e2532eefa49152fb5bdc30c97c1fd33d06959dd348f158f897c56f38e1e5ef4f3c63519f335b5d642d7a82d28231feba1732ded23d98a72c1e11af93594692f41951c09ec5a8e1d14c351679e5fc6bfa4eccdda4f5776231914e42e7cfca09743dad9cad5df957254bca24964fdaf58b6ef755fa1d15ed6bcfa20c651b71421ce1765dac3b444efa7be45dd5070fad03215796ce81de9c27c565187f6fd6eac4c2787025b792d86a7932870722e3aae737179eb77b12accd3bc2dbb55111604a047feef169e5ca569b3555f7beef1fa30f0cf838673e6544eeb3664c2d90e47e7c3ad014662911b1831f073cedfe9fe669ce2a7511c1f9b557923cab365649ade1cb14ab301a7954e8ed662bdff924cc8c74f2531a7bcd0e3d34c1ab43e3b39f620eb71a435ca61fe0c477b007e2549e2e3f1b64f2583",
          //   "token_type": "Bearer",
          //   "user_id": 9,
          //   "username": "rebotak"
          // }


          // const auth = Cookie.get('auth')
          // const authObj = JSON.parse(auth)

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
          console.log(err.response.data.message)

          if (err.response.data.message === 'Account not verified.') {
            this.notVerified = true
            err.response.data.message = "Account not verified. Please verify by click a link in email. Or resend verification email if you don't get one."
          }

          if (err.response.data.message === 'invalid_credentials') {
            err.message = 'Password or Email does not match'
          }
          if (err.response.data.message === 'Account does not exist.') {
            swal({
              title: 'Account does not exist.',
              text: "Please register your email.",
              type: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Yes, sign me up!'
            }).then((result) => {
              if (result.value) {
                this.$router.push({
                  name: 'auth.register.company',
                  query: {
                    email: this.form.username,
                  }
                })
              }
            })

          }else{
            swal({
              title: err.response.data.message,
              type: 'error',
              showConfirmButton: true,
            }).catch(swal.noop)
          }

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
