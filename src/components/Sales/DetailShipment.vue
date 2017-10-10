<template>
  <div>
    <div class="container">
      <div class="row p-20 pb-0">
        <div class="btn-toolbar" role="toolbar" aria-label="shipment">
          <button
            v-show="shipmentList.length"
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
            <button
              type="button" class="btn btn-default"
              data-toggle="tooltip"
              data-placement="top"
              title="View package list and shipment label"
            >
              <i class="fa fa-file-pdf-o"></i>
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
                  View package list
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top">
                  View shipment label
                </a>
              </li>
            </ul>
          </div>

          <div class="btn-group">
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
          </div>

          <button
            type="button"
            class="btn btn-default"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            v-show="shipmentList.length"
            @click="deleteShipment"
          >
            <i class="fa fa-trash"></i>
          </button>

        </div>
      </div>
      <div v-if="!shipmentList.length" class="text-center" style="padding-top: 60px">
        <h3>No shipment yet</h3>
      </div>
      <div v-else>
        <div class="row p-20 m-b-20">
          <div class="col-md-12">
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left"><strong>Shipment Order#</strong></label>
              <div class="col-md-7">
                {{ shipmentList[0].shipment_order_number }}
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left"><strong>Date of Shipment</strong></label>
              <div class="col-md-7">
                {{ shipmentList[0].date | date('short') }}
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left"><strong>Carrier</strong></label>
              <div class="col-md-7">
                {{ shipmentList[0].carrier.name }}
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left"><strong>Tracking</strong></label>
              <div class="col-md-7">
                <span class="text-muted">#</span> {{ shipmentList[0].tracking_number }}
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left"><strong>Status</strong></label>
              <div class="col-md-7">
                <span class="label label-info">
                  {{ shipmentList[0].is_delivered ? 'Delivered' : 'Not delivered yet'}}
                </span>
                <small class="label label-success" v-if="salesOrder.shipment_status === 'SHIPPED'">
                  {{ salesOrder.shipment_status | removeUnderScore }}
                </small>
                <small class="label label-danger" v-else>
                  {{ salesOrder.shipment_status | removeUnderScore }}
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class="row p-20 btop-1">
          <div class="col-md-12">
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left">
                <strong>Recipient</strong>
              </label>
              <div class="col-md-7">
                <a href="javascript:void(0);">
                  {{ salesOrder.contact ? salesOrder.contact.display_name : ''}}
                </a>
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left"><strong>Shipment Address</strong></label>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left light">Alamat</label>
              <div class="col-md-7">
                {{ salesOrder.shipping_address }}
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left light">Region</label>
              <div class="col-md-7">
                {{ shipping_region_name }}
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left light">District</label>
              <div class="col-md-7">
                {{ shipping_district_name }}
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left light">Province</label>
              <div class="col-md-7">
                {{ shipping_province_name }}
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left light">Kode Pos</label>
              <div class="col-md-7">
                {{ salesOrder.shipping_zip }}
              </div>
            </div>
            <div class="row mb-15">
              <label class="col-md-4 control-label text-left light">Country</label>
              <div class="col-md-7">
                {{ shipping_country_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailShipment',

    props: {
      shipmentList: {
        type: Array,
        default: [],
      },
      salesOrder: {
        type: Object,
      },
    },

    data () {
      return {}
    },

    methods: {
      editShipment () {
        this.$emit('editShipment')
      },
      deleteShipment () {
        this.$emit('deleteShipment')
      },
    },

  }
</script>
