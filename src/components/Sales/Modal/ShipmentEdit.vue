<template>
  <div>
    <div id="shipment-modal-edit" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">Edit Shipment</h4>
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
                    <div class="col-md-4">
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
                      <input type="text" v-model="tracking_number" class="form-control form-trans" id="reference">
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
  import store from 'src/store'
  import dateFormat from 'date-fns/format'
  import {responseOk} from "src/helpers";

  export default {
    name: 'SalesOrderModalShipment',
    props: ['payment'],

    computed: {
      carrierList: {
        get() { return store.state.sales.shipment.carrierList },
        set(value) { store.commit('sales/shipment/CARRIERLIST', value) },
      },
      shipment_order_number: {
        get() { return store.state.sales.shipment.shipment_order_number },
        set(value) { store.commit('sales/shipment/SHIPMENT_ORDER_NUMBER', value) },
      },
      date: {
        get() { return store.state.sales.shipment.date },
        set(value) { store.commit('sales/shipment/DATE', value) },
      },
      carrier_id: {
        get() { return store.state.sales.shipment.carrier_id },
        set(value) { store.commit('sales/shipment/CARRIER_ID', value) },
      },
      tracking_number: {
        get() { return store.state.sales.shipment.tracking_number },
        set(value) { store.commit('sales/shipment/TRACKING_NUMBER', value) },
      },
      notes: {
        get() { return store.state.sales.shipment.notes },
        set(value) { store.commit('sales/shipment/NOTES', value) },
      },
    },

    mounted() {
      this.getCarriers()
    },

    methods: {
      getCarriers() {
        store.dispatch('sales/shipment/getCarriers')
      },

      save() {
        const sales_order_id = parseInt(this.$route.params.id)
        const invoice_id = sales_order_id

        store.dispatch('sales/shipment/update', {sales_order_id, invoice_id})
          .then(res => {
            swal_success(res)
          })
          .catch(err => {
            swal_error(err.response)
          })
      }
    }
  }
</script>
