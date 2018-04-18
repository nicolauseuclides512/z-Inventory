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
            <button type="button" @click="close" class="btn btn-default waves-effect m-t-15">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Alert} from "../../../helpers";
  const Flatpickr = require('flatpickr').default

  export default {
    name: 'ShipmentForm',
    props: ['editShipment'],

    data(){
      return{
        date: new Date(),
        tracking_number: null,
        notes: '',
        carrier_id: '',
        salesOrderId: '',
        carrierList: []
      }
    },

    computed: {
      shipment_order_number() {
        return this.salesOrderId + new Date().toISOString()
      },
    },

    mounted() {
      this.salesOrderId = parseInt(this.$route.params.id)
      this.createShipment(this.salesOrderId)
      if(this.editShipment){
        $('#shipment-modal-add').modal('show')
        // alert('mounted to edit')
        // console.log(this.editShipment)
        // this.shipment_order_number = this.editShipment.shipment_order_number
        this.carrier_id = this.editShipment.carrier_id
        this.tracking_number = this.editShipment.tracking_number
        this.notes = this.editShipment.notes
        this.carrier_id = this.editShipment.carrier_id
        // this.date = this.editShipment.date
      }
      $('.flatpickr').flatpickr({
        defaultDate: new Date(),
        dateFormat: 'Y-m-d',
        altFormat: 'j M Y',
        altInput: true,
      })
    },

    methods: {
      createShipment(salesOrderId) {
        axios.get(`/sales_orders/${salesOrderId}/shipments/create`).then(
          res => {
            const response = res.data.data
            this.carrierList = _.filter(response.carrier, 'status')
          }).catch(err =>{
            Alert.error('error! '+ err.response.message)
            console.log(err.response)
          })
      },

      close(){
        this.$emit('close')
      },

      save() {
        let salesOrderId = this.$route.params.id
        let url

        if (!this.tracking_number) {
          Alert.error('Tracking number is required');
          return;
        }

        if(this.editShipment){
          let shipmentId = this.editShipment.shipment_id
          url = `/sales_orders/${salesOrderId}/shipments/${shipmentId}/update`
        }else{
          url = `/sales_orders/${salesOrderId}/shipments`
        }

        try{
          axios.post(url, {
            'shipment_order_number': this.shipment_order_number,
            'date': this.date,
            'carrier_id': this.carrier_id,
            'tracking_number': this.tracking_number,
            'notes': this.notes,
          }).then(res => {
            swal_success(res)
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