<template>
  <div class="wrapper-page">
    <div class="panel panel-color panel-primary panel-pages panel-sign-in">
      <div class="panel-heading">
        <div class="bg-overlay"></div>
        <h3 class="text-center m-t-10 text-white"> Send verification email </h3>
      </div>


      <div class="panel-body">
        <form method="POST" class="form-horizontal m-t-20" @submit.prevent="sendVerificationEmail">

          <div class="form-group">
            <div class="col-xs-12">
              <input
                class="form-control input-lg"
                type="email"
                id="email"
                required
                :disabled="loading"
                placeholder="Email"
                autocomplete="off"
                autofocus
                v-model="email"
              />
            </div>
          </div>


          <div class="form-group text-center m-t-30">
            <div class="col-xs-12">
              <router-link :to="{ name: 'auth.login' }" class="btn btn-default btn-lg waves-effect">
                <span class="fa fa-arrow-left"></span>
              </router-link>
              <button
                v-if="!loading"
                class="btn btn-primary btn-lg w-lg waves-effect waves-light"
                id="send-verification-email"
                type="submit"
              >
                Send me a verification email
              </button>
              <button
                v-else
                type="button"
                class="btn btn-disabled btn-lg w-lg waves-effect waves-light"
                disabled
              >
                Loading...
              </button>
            </div>
          </div>

        </form>

      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import swal from 'sweetalert2'
  import {responseOk, swal_success, swal_error} from "src/helpers";

  export default {
    name: 'Login',

    data() {
      return {
        email: null,
        loading: false,
      }
    },


    methods: {

      async sendVerificationEmail () {
        try {
          this.loading = true

          const res = await axios.post(`register/resend_verification_email`, {email: this.email})

          if (!responseOk(res.data.code)) {
            swal({
              title: res.data.message,
              type: 'error',
              showConfirmButton: true,
            }).catch(swal.noop)

            this.loading = false

            return
          }

          swal({
            //title: 'Terima kasih. Silakan cek email untuk proses selanjutnya.',
            title: 'Thankyou. Please check your email and verify your account.',
            type: 'success',
            showConfirmButton: true,
          }).catch(swal.noop)

          this.loading = false

          this.$router.push({name: 'auth.login'})

        } catch (err) {
          this.loading = false

          swal({
            title: err.data.message,
            type: 'error',
            showConfirmButton: true,
          }).catch(swal.noop)
        }
      },
    }
  }

</script>
