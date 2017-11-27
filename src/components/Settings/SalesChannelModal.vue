<template>
  <div id="lazada" class="modal fade in" tabindex="-1" role="dialog"
       aria-labelledby="myModalLabel" aria-hidden="true" style="display: block; padding-right: 8px;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" @click="close" data-dismiss="modal" aria-hidden="true">
            ×
          </button>
          <h4 class="modal-title">Synchronize to Marketplace</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <h5 class="title">
                <center>SELLER CENTER LAZADA</center>
              </h5>
              <div class="form-horizontal">
                <form class="form-horizontal m-t-20" action="index.html">
                  <div class="form-group">
                    <div class="col-xs-12">
                      <input
                        v-model="form.email"
                        type="email"
                        class="form-control input-lg"
                        required
                        placeholder="Email to Log in to Lazada">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-xs-12">
                      <input
                        v-model="form.api_key"
                        type="text"
                        class="form-control input-lg"
                        required
                        placeholder="API Key"
                      />
                    </div>
                  </div>

                  <div class="form-group text-center m-t-30">
                    <div class="col-xs-12">
                      <button type="button" @click="connect"
                              class="btn btn-primary waves-effect waves-light btn-lg m-b-5">
                        Connect
                      </button>
                      <button type="button" @click="disconnect"
                              class="btn btn-primary waves-effect waves-light btn-lg m-b-5">
                        Disconnect
                      </button>
                      <button type="button" @click="close"
                              class="btn btn-default waves-effect waves-light btn-lg m-b-5">
                        Cancel
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
  import Axios from 'axios'
  import Form from '@/helpers/Form'

  export default {
    name: 'SalesChannelModal',

    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        form: new Form({
          email: '',
          api_key: '',
        }),
      }
    },

    async mounted () {
      const res = await Axios.get('integration/lazada/api-config')
      this.form.email = res.data.data.email
      this.form.api_key = res.data.data.api_key
    },

    methods: {
      async close () {
        this.$emit('close')
      },

      async connect () {
        try {

          if (!this.form.email || !this.form.api_key) {
            Alert.error('Please fill the email and API key')
            return
          }

          if (!/\w@.+/.test(this.form.email)) {
            Alert.error('Invalid email address')
            return
          }

          const res = this.form.post('integration/lazada/api-config')
          swal_success(res)
          this.close()
        } catch (err) {
          console.error(err)
        }
      },

      async disconnect () {
        try {
          const res = await Axios.delete('integration/lazada/api-config')
          swal_success(res)
          this.close()
        } catch (err) {
          console.error(err)
        }
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
