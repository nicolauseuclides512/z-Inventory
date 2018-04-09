<template>
  <div class="wrapper-page">
    <div class="panel panel-color panel-primary panel-pages panel-sign-in">

      <div class="panel-heading">
        <div class="bg-overlay"></div>
        <h3 class="text-center m-t-10 text-white"> Forgot Password </h3>
      </div>

      <div class="panel-body">

        <p class="text-muted">
          Enter your email address and we will send you the instruction. <br> <br>
        </p>

        <form @submit.prevent="submit" role="form" class="text-center">
          <div class="form-group m-b-0">
            <div class="input-group">
              <input type="email"
                     id="email"
                     class="form-control input-lg"
                     v-model="email"
                     placeholder="Your email address"
                     required="">
              <span class="input-group-btn">
                <button
                  v-if="!loading"
                  type="submit"
                  id="submit"
                  class="btn btn-lg btn-primary waves-effect waves-light"
                >
                  Reset
                </button>
                <button
                  v-else
                  class="btn btn-lg btn-disabled waves-effect waves-light"
                  disabled
                >
                  Loading...
                </button>
              </span>
            </div>
          </div>

        </form>

        <hr>

        <p>
          <router-link to="/login">
            <i class="fa fa-arrow-left"></i> Back to login page
          </router-link>
        </p>

      </div>

    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import {responseOk, swal_error, swal_success} from 'helpers'

  export default {

    name: 'ForgotPassword',


    data() {
      return {
        email: '',
        loading: false,
        application: inventory
      }
    },


    methods: {
      async submit () {
        try {
          this.loading = true

          const res = await Axios.post('password/request_reset', {
            email: this.email,
            application: 'inventory'
          })

          if (!responseOk(res.data.code)) {
            this.loading = false
            return swal_error(res)
          }

          this.loading = false
          swal_success(res)
          this.$router.push('/login')

        } catch (err) {
          console.error(err)
          this.loading = false
          if (err.hasOwnProperty('message')) {
            swal_error(err.response)
          }
        }
      },
    }
  }
</script>
