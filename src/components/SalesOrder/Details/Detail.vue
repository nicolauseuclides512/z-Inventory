<template>
  <div>

    <div v-if="loading && !Object.keys(salesOrder).length"
         style="height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div class="text-center text-muted">
        <i class="fa fa-5x fa-spin fa-circle-o-notch"></i>
        <div class="lead" style="padding: 30px 0 5px;">
          Loading
          <br>
          <small>Please wait...</small>
        </div>
      </div>
    </div>

    <!-- =========================== -->
    <!-- Quick Overview              -->
    <!-- =========================== -->

    <div v-if="!loading && Object.keys(salesOrder).length">
      <div class="row">
        <div class="col-md-12">
          <h4 class="pull-left page-title">
            <span class="text-muted">#</span>
            <span style="margin-right:15px">{{salesOrder.sales_order_number}}</span>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top"
                      title="View as PDF" @click="viewInvoice"><i class="fa fa-file-pdf-o"></i></button>
              <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top"
                      title="Print" @click="viewInvoice"><i class="fa fa-print"></i></button>
              <button
                type="button"
                class="btn btn-default"
                data-toggle="tooltip"
                data-placement="top"
                title="Send as mail"
                :disabled="sendingEmail"
                @click="sendInvoiceAsMail"
              >
                <i class="fa fa-envelope-o" v-if="!sendingEmail"></i>
                <i class="fa fa-spin fa-spinner" v-else="sendingEmail"></i>
              </button>
            </div>

          </h4>
          <div class="pull-right">
            <div class="pull-left" style="margin-right: 10px;">
              <router-link
                :to="{ name: 'sales.edit', param: { id: salesOrder.sales_order_id } }"
                v-if="(salesOrder.invoice_status !== 'VOID') && (salesOrder.invoice_status !== 'PAID')"
                class="btn btn-default waves-effect waves-light m-b-5"
              >
                Edit
              </router-link>
            </div>
            <div class="dropdown pull-left" style="margin-right: 10px;">
              <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"
                      v-if="(salesOrder.invoice_status == 'UNPAID' || salesOrder.invoice_status == 'OVERDUE') && salesOrder.sales_order_status != 'DRAFT'">
                Record
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                <li>
                  <a
                    @click="showModalPayment()"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    v-if="salesOrder.invoice_status !== 'VOID'"
                    :disabled="salesOrder.invoice_status === 'PAID'"
                  >
                    Payment
                  </a>
                </li>
              </ul>
            </div>


            <div class="pull-left" style="margin-right: 10px;">
              <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown"
                      aria-expanded="false"
                      v-if="salesOrder.invoice_status === 'UNPAID' || salesOrder.invoice_status === 'OVERDUE' || salesOrder.invoice_status === 'DRAFT'">
                More <i class="ion-arrow-down-b"></i>
              </button>
              <ul class="dropdown-menu" role="menu" style="top: 35px; left:initial; right:20px">
                <li>
                  <a v-if="salesOrder.invoice_status === 'DRAFT'"
                     @click="markAsSentSalesOrder(salesOrder)"
                     style="cursor: pointer;">
                    Mark as Sent
                  </a>
                  <a v-if="salesOrder.invoice_status === 'UNPAID' || salesOrder.invoice_status === 'OVERDUE'"
                     @click="cancelSalesOrder(salesOrder)" style="cursor: pointer;">
                    Mark as Void
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>

    <!-- =========================== -->
    <!-- END Quick Overview          -->
    <!-- =========================== -->

    <!-- =========================== -->
    <!-- Detail Body                 -->
    <!-- =========================== -->

    <div class="row" v-if="!loading && Object.keys(salesOrder).length">
      <div class="col-md-12">
        <ul class="nav nav-tabs navtab-bg nav-justified" style="margin-left: 5px;">
          <li :class="{ tab: true, active: currentTab == 'invoice' }"
              style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;">
            <a href="javascript:void(0);" @click="switchTab('invoice')">
              <span class="hidden-xs">INVOICE</span>
            </a>
          </li>
          <li :class="{ tab: true, active: currentTab == 'payment' }"
              style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;">
            <a href="javascript:void(0);" @click="switchTab('payment')">
              <span class="hidden-xs">PAYMENT</span>
            </a>
          </li>
          <!-- <li :class="{ tab: true, active: currentTab == 'shipment' }">
            <a href="javascript:void(0);" @click="switchTab('shipment')">
              <span class="hidden-xs">SHIPMENT</span>
            </a>
          </li> -->
        </ul>

        <div class="tab-content p-0 tab-content-clear tab-content--contact">
          <div :class="{ 'tab-pane': true, active: currentTab == 'invoice' }" id="invoice" v-if="currentTab == 'invoice'">
            <div class="row p-15" style="padding:20px 15px 15px 15px;">
              <div v-for="invoice in invoiceList">
                <component
                  :is="invoiceComponent"
                  :value="invoice"
                  :sales-order="salesOrder"
                  :payment-list="paymentList"
                ></component>
              </div>
            </div>
          </div>

          <div :class="{ 'tab-pane': true, active: currentTab == 'payment'}" id="payment"
               v-if="currentTab == 'payment'">
            <div class="row p-15">
              <div class="border-1 table-responsive mt-20">
                <table class="table sahito-invoice-table">
                  <caption><h3>Payment Receival</h3></caption>
                  <thead>
                  <tr class="grey-background">
                    <th>Date</th>
                    <th>Reference</th>
                    <th>Payment Mode</th>
                    <th class="text-right">Amount</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-show="!paymentList.length > 0">
                    <td colspan="5" class="text-muted text-center">No payment received</td>
                  </tr>
                  <tr v-for="payment in paymentList" v-show="paymentList.length > 0">
                    <td style="padding: 12px 8px;">
                      {{ payment.date | date('short') }}
                    </td>
                    <td style="padding: 12px 8px;">
                      <span class="text-muted">#</span> {{ payment.reference_number }}
                    </td>
                    <td style="padding: 12px 8px;">
                      {{ payment.payment_mode_name }}
                    </td>
                    <td class="text-right" style="padding: 12px 8px;">
                      {{ payment.amount | money }}
                    </td>
                    <td>
                      <div class="clearfix">
                        <div class="pull-left">
                          <!--<a class="btn btn-default btn-sm" href="javascript:void(0);" title="Edit this payment" @click="editPayment(payment)"><i class="fa fa-pencil"></i></a>-->
                          <!--<a class="btn btn-default btn-sm" href="javascript:void(0);" onclick="alert('API not available')" title="Send payment receipt to customer">-->
                          <!--<i class="fa fa-envelope"></i>-->
                          <!--</a>-->
                        </div>
                        <div class="pull-right">
                          <a class="btn btn-default btn-sm" href="javascript:void(0);"
                             title="Delete this payment" @click="deletePayment(payment)"><i
                            class="fa fa-trash"></i></a>
                        </div>
                      </div>
                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div :class="{ 'tab-pane': true, active: currentTab == 'shipment' }" id="shipment"
               v-if="currentTab == 'shipment'">
            <DetailShipment
              :shipment-list="shipmentList"
              :sales-order="salesOrder"
              @edit-shipment="editShipment"
              @delete-shipment="deleteShipment"
            ></DetailShipment>
          </div>
        </div>
      </div>
    </div>

    <!-- =========================== -->
    <!-- END Detail Body             -->
    <!-- =========================== -->

    <!-- =========================== -->
    <!-- Payment Record Form Modal   -->
    <!-- =========================== -->

    <PaymentForm />

    <!-- =========================== -->
    <!-- END Payment Record Form Modal -->
    <!-- =========================== -->



  </div>
</template>

<script>
  import Axios from 'axios'
  import {mapState} from 'vuex'
  import Form from '@/helpers/Form'
  import Invoice from '@/components/Sales/Invoice'
  import PaymentForm from './PaymentForm';

  export default {
    name: 'Detail',

    components: {
      Invoice,
      PaymentForm,
    },

    data () {
      return {
        invoiceComponent: false,
        loading: false,
        sendingEmail: false,
        currentTab: 'invoice',
      }
    },

    computed: {
      ...mapState('salesOrders', {
        salesOrder: 'salesOrder',
        invoiceList: 'invoices',
        paymentList: 'payments',
        createPayment: 'createPayment',
      })
    },

    async mounted () {
      this.invoiceComponent = Invoice
      this.loading = true
      const salesOrderId = this.$route.params.id
      this.$store.dispatch('salesOrders/selectSalesOrder', salesOrderId)
        .then(() => {
          this.loading = false
        })
    },

    methods: {

      switchTab (tabName) {
        this.currentTab = tabName
      },

      /**
       * View invoice
       */
      async viewInvoice () {
        const pdfWindow = window.open()
        const salesOrderId = this.$route.params.id

        // Fetch invoice list
        await this.getInvoiceList(parseInt(salesOrderId))
        const invoiceId = store.state.sales.invoiceList[0].invoice_id

        const url = window.BASE_URL + `/sales_orders/${salesOrderId}/invoices/${invoiceId}/pdf`

        const response = await axios.get(url, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/pdf',
          },
        })

        const file = new Blob([response.data], {type: 'application/pdf'})
        const fileURL = URL.createObjectURL(file)
        pdfWindow.location = fileURL
      },

      /**
       * Send invoice as mail
       */
      async sendInvoiceAsMail () {
        const sales_order_id = parseInt(this.$route.params.id)
        const invoice_id = parseInt(store.state.sales.invoiceList[0].invoice_id)
        this.$router.push({name: 'sales.email', params: {sales_order_id, invoice_id}})
      },

      showModalPayment () {
        $('#payment-modal').modal('show')
      },

    }
  }
</script>

<style scoped lang="scss">
  .label {
    font-size: 11px;
    vertical-align: middle;
  }

  .nav-tabs > li.active > a,
  .nav-tabs > li.active > a:focus,
  .nav-tabs > li.active > a:hover,
  .tabs-vertical > li.active > a,
  .tabs-vertical > li.active > a:focus,
  .tabs-vertical > li.active > a:hover {
    /* border-top: 3px solid #337ab7; */
    color: white;
    border-top: 1px solid #03a2cd;
    border-left: 1px solid #03a2cd;
    border-right: 1px solid #03a2cd;
    border-bottom: 1px solid #03a2cd;
  }
</style>
