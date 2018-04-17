<template>
  <div>
    <div id="shipment-modal-add" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">Add Shipment</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <form action="#" class="form-horizontal">
                  <div class="form-group">
                    <label class="col-md-3 control-label">Ship Date</label>
                    <div class="col-md-6">
                      <input type="text" v-model="date" class="flatpickr" title="Shipment date">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label">Carrier</label>
                    <div class="col-md-7">
                      <select id="carrier" class="form-control" title="Carrier" v-model="carrier_id">
                        <option v-for="carrier in carrierList" :key="carrier.code" :value="carrier.id">
                          {{ carrier.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label">Tracking#</label>
                    <div class="col-md-4">
                      <input v-model="tracking_number" class="form-control form-trans" id="reference" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label">Notes</label>
                    <div class="col-md-8">
                      <textarea class="form-control" rows="4" v-model="notes" maxlength="500"></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="save" class="btn btn-info waves-effect waves-light m-t-15">Save</button>
            <button type="button" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  // import store from 'src/store'
  // import dateFormat from 'date-fns/format'
  import {Alert} from "../../../helpers";
  const Flatpickr = require('flatpickr').default

  export default {
    name: 'ShipmentForm',
    props: [],

    data(){
      return{
        // shipment_order_number: null,

        date: new Date(),
        tracking_number: null,
        notes: '',
        // carrierList: '',
        carrier_id: 'Please Select Carrier',
        salesOrderId: '',
        carrierList: []
      }
    },

    computed: {
      shipment_order_number() {
        return this.salesOrderId + new Date().toISOString()
      },
      // carrierList: {
      //   get() { return this.$store.state.sales.shipment.carrierList },
      //   set(value) { this.$store.commit('sales/shipment/CARRIERLIST', value) },
      // },
      // carrier_id: {
      //   get() { return this.$store.state.sales.shipment.carrier_id },
      //   set(value) { this.$store.commit('sales/shipment/CARRIER_ID', value) },
      // },
    },

    mounted() {
      this.salesOrderId = parseInt(this.$route.params.id)
      this.createShipment(this.salesOrderId)

      $('.flatpickr').flatpickr({
        defaultDate: new Date(),
        dateFormat: 'Y-m-d',
        altFormat: 'j M Y',
        altInput: true,
      })
    },

    methods: {
      createShipment(salesOrderId) {
        // this.$store.dispatch('sales/shipment/getCarriers')
        axios.get(`/sales_orders/${salesOrderId}/shipments/create`).then(
          res => {
            // console.log(res.data.data)
            const response = res.data.data
            this.carrierList = _.filter(response.carrier, 'status')
          }).catch(err =>{
            Alert.error('error! '+ err.response.message)
            console.log(err.response)
          })
      },

      // watch: {
      //   '$route'(to, from) {
      //     console.log(to,form)
      //     // if(to !== form){
      //     //   this.salesOrderId = parseInt(this.$route.params.id)
      //     // }
      //   },
      // },

      save() {
        let salesOrderId = this.$route.params.id
        if (!this.tracking_number) {
          Alert.error('Tracking number is required');
          return;
        }
        try{
          axios.post(`/sales_orders/${salesOrderId}/shipments`, {
            'shipment_order_number': this.shipment_order_number,
            'date': this.date,
            'carrier_id': this.carrier_id,
            'tracking_number': this.tracking_number,
            'notes': this.notes,
          }).then(res => {
            swal_success(res)
            // console.log(res)
            this.$emit('close')
          }).catch(err => {
            swal_error(err.response)
          })
        } catch (err) {
          err =>{
            console.log(err.response)
          }
        }
      }

    },

  }
</script>

<style lang="scss" scoped>
    input.flatpickr.flatpickr-input.flatpickr-mobile {
        text-indent: 5px;
        border: 1px solid gainsboro;
        height: 34px;
        color: #444;
    }
</style>