<template>
  <section id="shipping" class="content">

    <!-- shipping -->
    <div>
      <header class="container bgr-grey">
        <h4 class="title">Shipment</h4>
      </header>

      <div class="container bg-white">
        <ShippingAddress></ShippingAddress>
      </div>

      <div class="container bg-white">
        <h5>Shipment Courier</h5>

        <div class="row">
          <div class="col-md-5">
            <p>Carrier-calculated shipping lets you pass on shipping rates directly from carriers, according
              to the package destination, weight, and dimensions.</p>
          </div>
          <div class="col-md-7">
            <div class="row">
              <div class="col-md-4" v-for="carrier in list.carrier_list">
                <div class="courier-box">
                  <input type="checkbox"
                         class="checkbox"
                         :id="carrier.code.toLowerCase()"
                         :value="carrier.id"
                         v-model="form.carrier_ids"
                  />
                  <label :for="carrier.code.toLowerCase()">
                    <div>
                      <img
                        :src="'https://s3-ap-southeast-1.amazonaws.com/sahitotest/assets/carriers/' + carrier.code + '_id.jpg'"
                        :class="['img-responsive', 'checkbox-courier-' + carrier.code.toLowerCase()]"/>
                    </div>
                  </label>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="container p-b-10 m-b-20 bg-white">
        <div class="row">
          <div class="col-md-12 text-center">
            <button type="button" class="btn btn-info waves-effect waves-light" @click="save">Save</button>
            <button type="button" @click="resetForm" class="btn btn-default waves-effect">Cancel</button>
          </div>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
  import Axios from 'axios'
  import store from 'src/store'
  import { regional } from '../../mixins'
  import Form from '@/helpers/Form'
  import Carrier from '@/helpers/Carrier'
  import ShippingAddress from './ShippingAddress'

  export default {
    name: 'Shipment',

    components: {ShippingAddress},

    mixins: [regional],

    data () {
      return {
        originalForm: null,
        list: {
          carrier_list: [],
        },
        form: new Form({
          carrier_ids: [],
        }),
      }
    },

    async mounted () {
      try {
        // Get the list of couriers
        const carriers = await Carrier.get()
        const carrierList = carriers.map(carrier => {
          return {
            id: carrier.id,
            name: carrier.name,
            display: carrier.code.toUpperCase(),
            code: carrier.code,
            logo: carrier.logo,
          }
        })
        this.list.carrier_list = carrierList


        // Set the current state of selected couriers
        const res = await Axios.get(`settings/edit`)
        let carrier_ids_string = res.data.data.settings['web.shipping.carrier_ids']
        carrier_ids_string = carrier_ids_string.replace('[', '').replace(']', '')
        this.form.carrier_ids = carrier_ids_string.split(',')
      }
      catch (err) {
        console.error(err)
      }
    },

    methods: {

      async save () {
        try {
          const data = {
            settings: {
              'web.shipping.carrier_ids': '[' + this.form.carrier_ids.join(',') + ']',
            },
          }

          const res = await Axios.post('settings/shipping', data)
          swal_success(res)
        }
        catch (err) {
          console.error(err)
        }
      },

      /**
       * Reset to original form state
       */
      resetForm () {
        store.dispatch('settings/initialize')
      },
    },

  }
</script>

<style scoped>
  .courier-box {
    position: relative;
    height: 130px !important;
    margin-bottom: 20px;
  }

  .courier-box input[type="checkbox"] {
    border: 0 solid #5fc7f6;
    top: 0;
    left: 0;
    position: absolute;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    height: 100%;
    transition: all 0.1s ease-out;
  }

  .courier-box input[type="checkbox"]:checked {
    border-width: 3px;
  }
</style>
