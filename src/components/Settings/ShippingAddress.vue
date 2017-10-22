<template>
  <div>
    <ShippingAddressForm
      v-if="ui.showModal"
      @close="closeModal"
    ></ShippingAddressForm>

    <div class="row" style="padding: 20px 0;">
      <div class="col-md-5">
        <h5>Shipment Origin</h5>
        <p>The address used to calculate shipping rates.</p>
      </div>
      <div class="col-md-7" style="border: 1px solid #f0f0f0; padding: 10px;">
        <div class="clearfix">
          <h5 class="pull-left">Shipment from</h5>

          <div class="pull-right">
            <a href="javascript:void(0)" @click="modalToggle">Edit address</a>
          </div>
        </div>

        <div>{{ address }}</div>
        <div>{{ region ? region.name : '' }}</div>
        <div>{{ district ? district.name : '' }}, {{ province ? province.name : '' }}</div>
        <div>{{ country ? country.name : '' }}</div>
        <div>{{ zip_code }}</div>
        <div>Phone: {{ phone_number }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    name: 'ShippingAddress',

    components: {
      ShippingAddressForm: () => import('./ShippingAddressForm'),
    },

    data () {
      return {
        ui: {
          showModal: false,
        },

        phone_number: '',
        address: '',
        zip_code: '',
        region: {},
        country: {},
        province: {},
        district: {},
      }
    },

    async mounted () {
      this.init()
    },

    methods: {

      async init () {
        try {
          const res = await Axios.get(`settings/edit`)

          this.phone_number = res.data.data.settings['web.shipping.phone_number']
          this.address = res.data.data.settings['web.shipping.address']
          this.zip_code = res.data.data.settings['web.shipping.zip_code']

          this.country = res.data.data.settings['web.shipping.country']
          this.province = res.data.data.settings['web.shipping.province']
          this.district = res.data.data.settings['web.shipping.district']
          this.region = res.data.data.settings['web.shipping.region']
        }
        catch (err) {
          console.error(err)
        }

      },

      modalToggle () {
        this.ui.showModal = !this.ui.showModal
      },

      closeModal () {
        this.ui.showModal = false
        this.init()
      },
    },

  }
</script>
