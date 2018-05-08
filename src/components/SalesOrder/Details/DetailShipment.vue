<template>
  <div class="detail-sales-order-shipment">
    <!-- <pre>
      {{shipmentList}}
    </pre> -->
    <div class="not-found container" v-if="!loadingShipmentData && !shipmentList">
      <div v-if="!shipmentList && !loadingShipmentData" class="text-center" style="padding-top: 60px">
        <!-- <h3 class="text-danger" v-if="packageNotFound">Package not found!</h3> -->
        <h3> No shipment yet</h3>
      </div>
    </div>
    <div v-if="shipmentList && !loadingShipmentData" class="container">
      <!-- <code><pre>{{shipmentList}}</pre></code> -->
      <div class="row p-20 pb-0">
        <div class="btn-toolbar" role="toolbar" aria-label="shipment">
          <button
            v-if="shipmentList.length"
            type="button"
            class="btn btn-default"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
            @click="editShipment"
          >
            <i class="fa fa-pencil"></i>
          </button>

          <div class="btn-group">
            <!-- <button
              type="button" class="btn btn-default"
              data-toggle="tooltip"
              data-placement="top"
              title="View package list and shipment label"
            >
              <i class="fa fa-file-pdf-o"></i> -->
            </button>
            <button
              type="button"
              class="btn btn-default dropdown-toggle"
              @click="viewShipmentLabels"
            >
              <i class="fa fa-file-pdf-o"></i>
            </button>
            <!-- <ul class="dropdown-menu">
              <li>
                <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" v-on:click="viewShipmentLabels">
                  View shipment label
                </a>
              </li>
            </ul> -->
          </div>

          <!-- <div class="btn-group">
            <button
              type="button"
              class="btn btn-default"
              data-toggle="tooltip"
              data-placement="top"
              title="Print package list and shipment label">
              <i class="fa fa-print"></i>
            </button>
            <button
              type="button"
              class="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="caret" data-toggle="tooltip" data-placement="top" title="More options"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top">
                  Print package list
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top">
                  Print shipment label
                </a>
              </li>
            </ul>
          </div> -->

          <button
            type="button"
            class="btn btn-default"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            v-if="shipmentList.length"
            @click="deleteShipment"
          >
            <i class="fa fa-trash"></i>
          </button>

        </div>
      </div>
      <div v-if="shipmentList.length > 0 && !loadingShipmentData">
        <div class="row p-20 m-b-20" v-for="shipment,index in shipmentList" :key="shipment.shipment_id+index">
          <div class="col-md-12">
            <div class="row mb-15 shipment-order">
              <label class="col-md-4 control-label text-left"><strong>Shipment Order#</strong></label>
              <div class="col-md-7 shipment_order_number">
                {{ shipment.shipment_order_number }}
              </div>
            </div>
            <div class="row mb-15 date-shipment">
              <label class="col-md-4 control-label text-left"><strong>Date of Shipment</strong></label>
              <div class="col-md-7 shipment-date">
                {{ shipment.date | date('short') }}
              </div>
            </div>
            <div class="row mb-15 carrier-name">
              <label class="col-md-4 control-label text-left"><strong>Carrier</strong></label>
              <div class="col-md-7 carrier-name">
                {{ shipment.carrier.name }}
              </div>
            </div>
            <div class="row mb-15 tracking-number">
              <label class="col-md-4 control-label text-left"><strong>Tracking</strong></label>
              <div class="col-md-7">
                <span class="text-muted">#</span> {{ shipment.tracking_number }}
              </div>
            </div>
            <div class="row mb-15 status-delivery">
              <label class="col-md-4 control-label text-left"><strong>Status</strong></label>
              <div class="col-md-7 shipment-is_delivered">
                <span class="label label-info">
                  {{salesOrders.shipment_status | normalizeStatus}}
                </span>

                <!-- <small class="label label-success salesOrder-shipment_status" v-if="salesOrders.shipment_status === 'SHIPPED'">
                  {{ salesOrders.shipment_status || removeUnderScore }}
                </small> -->

                <!-- <small class="label label-danger salesOrder-shipment_status" v-else>
                  {{ salesOrders.shipment_status || removeUnderScore }}
                </small> -->
              </div>
            </div>
            <div class="row mb-15 shipment-notes">
              <label class="col-md-4 control-label text-left"><strong>Notes</strong></label>
              <div class="col-md-7">
                <p>{{ shipment.notes }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row p-20 btop-1">
          <!-- <code><pre>{{salesOrders}}</pre></code> -->
          <div class="col-md-12">
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left">
                <strong>Recipient</strong>
              </label>
              <div class="col-md-7">
                <a href="javascript:void(0);">
                  {{ salesOrders.contact ? salesOrders.contact.display_name : ''}}
                </a>
              </div>
            </div>
            <div
              class="row mb-15"
              v-if="
                salesOrders.shipping_address ||
                salesOrders.shipping_region ||
                salesOrders.shipping_district ||
                salesOrders.shipping_country ||
                salesOrders.shipping_province ||
                salesOrders.shipping_zip
            ">
              <label class="col-md-4 control-label text-left"><strong>Shipment Address</strong></label>
            </div>
            <div class="row mb-15" v-if="salesOrders.shipping_address">
              <label class="col-md-4 control-label text-left light">Alamat</label>
              <div class="col-md-7">
                {{ salesOrders.shipping_address }}
              </div>
            </div>
            <div class="row mb-15" v-if="salesOrders.shipping_region">
              <label class="col-md-4 control-label text-left light">Region</label>
              <div class="col-md-7">
                {{ salesOrders.shipping_region }}
              </div>
            </div>
            <div class="row mb-15" v-if="salesOrders.shipping_district">
              <label class="col-md-4 control-label text-left light">District</label>
              <div class="col-md-7">
                {{ salesOrders.shipping_district }}
              </div>
            </div>
            <div v-if="salesOrders.shipping_province" class="row mb-15">
              <label class="col-md-4 control-label text-left light">Province</label>
              <div class="col-md-7">
                {{ salesOrders.shipping_province }}
              </div>
            </div>
            <div class="row mb-15" v-if="salesOrders.shipping_zip">
              <label class="col-md-4 control-label text-left light">Kode Pos</label>
              <div class="col-md-7">
                {{ salesOrders.shipping_zip }}
              </div>
            </div>
            <div class="row mb-15" v-if="salesOrders.shipping_country">
              <label class="col-md-4 control-label text-left light">Country</label>
              <div class="col-md-7">
                {{ salesOrders.shipping_country }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Spinner v-if="loadingShipmentData"/>
  </div>
</template>

<script>

  import axios from 'axios'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'DetailShipment',
    components:{
      Spinner: () => import('@/components/Helpers/Spinner')
    },
    filters: {
      normalizeStatus(text) {
        return text.replace(/_/gi, ' ').toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())
      },
    },
    props: {
      shipmentList: {
        type: Array
      },
      // packageNotFound:{
      //   type: Boolean
      // },
      loadingShipmentData:{
        type: Boolean,
        default: false
      },
      // salesOrder: {
      //   type: Object,
      // },
    },

    computed: {
      ...mapGetters({
        salesOrders: 'salesOrders/salesOrderData'
      })
    },

    data() {
      return {
      }
    },

    methods: {

      editShipment() {
        this.$emit('editShipment')
      },
      deleteShipment() {
        this.$emit('deleteShipment')
      },
      async viewShipmentLabels() {
        const pdfWindow = window.open()
        const salesOrderId = parseInt(this.$route.params.id)
        // /shipments/bulk-label?ids=62
        const url = window.BASE_URL + `/sales_orders/shipments/bulk-label?ids=` + salesOrderId

        const response = await axios.get(url, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/pdf',
          },
        })

        const file = new Blob([response.data], {type: 'application/pdf'})
        const fileURL = URL.createObjectURL(file)
        pdfWindow.location = fileURL
      }
    },

  }
</script>
