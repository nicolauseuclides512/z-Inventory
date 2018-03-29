<template>
  <div class="content-page">
    <div class="content full-width sahito-user bgr-white">
      <div class="container">

        <iframe id="iframe-print" src="about:blank" style="display: none"></iframe>

        <!-- Payment Modal -->

        <PaymentAddModal @success="refreshCurrentSalesOrderData"></PaymentAddModal>

        <!--<PaymentEditModal-->
          <!--:payment="form.payment"-->
          <!--:payment_method_list="paymentMethodList"-->
          <!--:payment_method_details="paymentMethodList_details"-->
        <!--&gt;</PaymentEditModal>-->

        <!-- END Payment Modal -->

        <!-- Shipment Modal -->

        <ShipmentAddModal
          :payment="payment"
        ></ShipmentAddModal>
        <!--<ShipmentEditModal></ShipmentEditModal>-->

        <!-- END Shipment Modal -->


        <div class="loading" v-if="isLoading"><i class="fa fa-spin fa-spinner"></i> Loading...</div>
        <div v-else>
          <div class="container p-0">
            <div class="row">
              <div class="col-md-4 col-sm-4 col-xs-4 left-side" style="border-right: 1px solid #eee;">

                <div class="container full-width-header">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12" v-if="!checkedList.length > 0">
                      <a href="javascript:void(0);" class="dropdown-toggle pull-left page-title" data-toggle="dropdown"
                        aria-expanded="false">
                        <h4>{{ currentFilter }} <span class="caret"></span></h4>
                      </a>
                      <ul class="dropdown-menu" role="menu" style="top: 35px;">
                        <li class="dropdown-header">FILTER BY</li>
                        <li :class="{ active: filter === 'all' }"><a href="javascript:void(0);"
                                                                    @click="getList({ filter: 'all' })">All</a></li>
                        <li class="divider"></li>
                        <li :class="{ active: filter === 'draft' }"><a href="javascript:void(0);"
                                                                      @click="getList({ filter: 'draft' })">Draft</a></li>
                        <li :class="{ active: filter == 'paid' }"><a href="javascript:void(0);"
                                                                    @click="getList({ filter: 'paid' })">Paid</a></li>
                        <li :class="{ active: filter == 'unpaid' }"><a href="javascript:void(0);"
                                                                      @click="getList({ filter: 'unpaid' })">Unpaid</a>
                        </li>
                        <li :class="{ active: filter == 'partially_paid' }"><a href="javascript:void(0);"
                                                                              @click="getList({ filter: 'partially_paid' })">Partially Paid</a>
                        </li>
                        <li :class="{ active: filter == 'overdue' }"><a href="javascript:void(0);"
                                                                        @click="getList({ filter: 'overdue' })">Overdue</a>
                        </li>
                        <!--<li :class="{ active: filter == 'shipped' }"><a href="javascript:void(0);" @click="getList({ filter: 'shipped' })">Shipped</a></li>-->
                        <!--<li :class="{ active: filter == 'not_yet_shipped' }"><a href="javascript:void(0);" @click="getList({ filter: 'not_yet_shipped' })">Not shipped</a></li>-->
                        <li :class="{ active: filter == 'void' }"><a href="javascript:void(0);"
                                                                    @click="getList({ filter: 'void' })">Void</a></li>
                      </ul>
                      <div class="pull-right">
                        <router-link :to="{ name: 'sales.create' }" class="btn btn-info waves-effect waves-light m-b-5">
                          New <i class="ion-plus"></i>
                        </router-link>
                        <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown"
                                aria-expanded="false"><i class="fa fa-bars"></i></button>
                        <ul class="dropdown-menu" role="menu" style="top: 35px;">
                          <li class="dropdown-header">SORT BY</li>
                          <li :class="{ active: sort.startsWith('created_at') }"><a href="javascript:void(0);"
                                                                                    @click="getList({ sort: 'created_at.asc' })">Created Time</a>
                          </li>
                          <li :class="{ active: sort.startsWith('updated_at') }"><a href="javascript:void(0);"
                                                                                    @click="getList({ sort: 'updated_at.asc' })">Last Modified Time</a>
                          </li>
                          <li :class="{ active: sort.startsWith('order_date') }"><a href="javascript:void(0);"
                                                                                    @click="getList({ sort: 'order_date.asc' })">Date</a>
                          </li>
                          <li :class="{ active: sort.startsWith('invoice_number') }"><a href="javascript:void(0);"
                                                                                        @click="getList({ sort: 'invoice_number.asc' })">Invoice#</a>
                          </li>
                          <li class="divider"></li>
                          <!--<li><a href="javascript:void(0);"><i class="md-file-download"></i> Import Invoices</a></li>-->
                          <!--<li><a href="javascript:void(0);"><i class="md-file-upload"></i> Export Invoices</a></li>-->
                          <!--<li class="divider"></li>-->
                          <!--<li><a href="javascript:void(0);"><i class="md-file-download"></i> Import Payments</a></li>-->
                          <!--<li><a href="javascript:void(0);"><i class="md-file-upload"></i> Export Payments</a></li>-->
                          <!--<li class="divider"></li>-->
                          <!--<li><a href="javascript:void(0);"><i class="fa fa-cog"></i> Invoice Preferences</a></li>-->
                          <!--<li class="divider"></li>-->
                          <li><a href="javascript:void(0);"><i class="md-refresh"></i> Refresh List</a></li>
                        </ul>
                      </div>
                    </div>
                    <div class="clearfix" v-if="checkedList.length > 0">
                      <div class="pull-left">
                        <!--<span class="checkbox checkbox-single checkbox-success">
                          <input type="checkbox" id="all" @click="checkAll($event)" :checked="checkedAll">
                        </span> -->
                        <a href="javascript:void(0);" @click="viewBulkInvoice" class="btn btn-default waves-effect waves-light m-b-5">
                          Print Invoice
                        </a>
                        <a href="javascript:void(0);" @click="viewShipmentLabels" class="btn btn-default waves-effect waves-light m-b-5">
                          Print Shipment Labels
                        </a>
                      </div>
                      <div class="pull-right pt-10">
                        <a href="javascript:void(0);" @click="clearCheckedAll">
                          <i class="ion-android-close"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                  <div class="row sahito-list">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <div class="sahito-list-contact table-responsive">
                        <table class="table table-hover default-table sahito-list-contact--table">
                          <tbody>
                          <tr v-for="(sale, index) in salesList":class="{ active: sale.sales_order_id == salesOrderItems.sales_order_id }">
                            <td class="col-checkbox">
                              <div class="checkbox checkbox-single checkbox-success">
                                <input type="checkbox" :value="sale" v-model="checkedList" title="Check box">
                                <label></label>
                              </div>
                            </td>
                            <td @click="showDetail(sale)" style="cursor: pointer; padding:5px 15px 5px 0px">
                              <div  class="clearfix">
                                <div class="pull-left">
                                  <a @click="showDetail(sale)" href="javascript:void(0);" v-if="sale.contact" style="color:#000">
                                    {{ sale.contact.display_name }}
                                  </a>
                                </div>
                                <div class="pull-right" style="font-size:1.1em; color:#000">
                                  {{ sale.total | money }}
                                </div>
                              </div>
                              <div class="clearfix" style="margin-top: 8px;">
                                <div class="pull-left">
                                  <a @click="showDetail(sale)" href="javascript:void(0);" v-if="sale.contact" style="color:#000; font-size:.9em">
                                    <span class="text-muted">#</span><span style="color: rgb(153, 153, 153); font-size: 0.9em !important;" >{{ sale.sales_order_number }}</span>
                                  </a>
                                </div>
                                <div class="pull-right">
                                  <!-- <span v-if="sale.invoice_status == 'PAID'" style="font-size: 10px;">{{ sale.invoice_status }}</span>
                                  <span v-else-if="sale.sales_order_status == 'DRAFT'" style="font-size: 10px;">{{ sale.sales_order_status }}</span>
                                  <span v-else style="font-size: 10px;">{{ sale.invoice_status }}</span> -->
                                                                <div v-if="sale.sales_order_status === 'DRAFT'">
                                  <span style="color:#C4C4C4; font-size:13px;">{{ sale.sales_order_status }}</span>
                                </div>
                                <div v-else>
                                  <!--{{ sale.invoice_status }}-->
                                <div v-if="sale.invoice_status === 'PAID'">
                                  <span style="color:#319B31; font-size:13px;">PAID</span>
                                </div>
                                <div v-else-if="sale.invoice_status === 'UNPAID'">
                                  <span style="color:#1C8AD9; font-size:13px;">UNPAID</span>
                                </div>
                                <div v-else-if="sale.invoices[0].invoice_status === 'PARTIALLY_PAID'">
                                  <span style="color:#319B31; font-size:13px;">PARTIALLY PAID</span>
                                </div>
                                <div v-else-if="sale.invoice_status === 'OVERDUE'">
                                  <span style="color:#E33636; font-size:13px;">OVERDUE</span>
                                </div>
                                <div v-else-if="sale.invoice_status === 'VOID'">
                                  <span style="color:#000000; font-size:13px;">VOID</span>
                                </div>
                                </div>
                                </div>
                              </div>
                              <div class="clearfix" style="margin-top: 8px;">
                                <div class="pull-left" style="color:rgb(153, 153, 153); font-size:.9em">
                                  {{ sale.invoice_date | date('short') }}
                                </div>
                                <div class="pull-right">
                                  <!-- <span v-if="sale.shipment_status !== 'NOT_YET_SHIPPED'" style="font-size: 10px;">{{ sale.shipment_status }}</span>
                                  <span v-else style="font-size: 10px;">{{ sale.shipment_status }}</span> -->
                                </div>
                              </div>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="row">
              <pagination :page-context="page_context" :result="salesList" @updated="updatePagination"></pagination>
            </div>
              </div>

              <div class="col-md-8 col-sm-8 col-xs-8 right-side" style="padding-left:20px; padding-top: 2px;">

                <div class="row" v-if="salesOrder" style="margin-bottom:30px">
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

                      <!-- <span v-if="salesOrder.sales_order_status === 'DRAFT'">
                        <small class="label label-default"> DRAFT </small>
                      </span>
                      <span v-if="salesOrder.sales_order_status === 'AWAITING_PAYMENT' && salesOrder.invoice_status === 'UNPAID'">
                        <small class="label label-danger"> UNPAID </small>
                      </span>
                      <span v-if="salesOrder.sales_order_status === 'AWAITING_PAYMENT' && salesOrder.invoice_status === 'PARTIALLY_PAID'">
                        <small class="label label-success"> PARTIALLY PAID </small>
                      </span>
                      <span v-if="salesOrder.sales_order_status === 'AWAITING_SHIPMENT' && salesOrder.invoice_status === 'PAID'">
                        <small class="label label-success"> PAID </small>
                      </span>
                      <span v-if="salesOrder.sales_order_status === 'AWAITING_PAYMENT' && salesOrder.invoice_status === 'OVERDUE'">
                        <small class="label label-danger"> OVERDUE </small>
                      </span>
                      <span v-if="salesOrder.sales_order_status === 'CANCELED' && salesOrder.invoice_status === 'VOID'">
                        <small class="label label-inverse"> VOID </small>
                      </span> -->

                      <!--<small class="label label-success" v-if="salesOrder.invoice_status === 'PAID'">
                        {{ salesOrder.invoice_status }}
                      </small>
                      <small class="label label-danger" v-else>{{ salesOrder.invoice_status }}</small>
                      <small class="label label-primary">
                        {{ salesOrder.invoices[0] ? salesOrder.invoices[0].invoice_status : '' }}
                      </small>
                      <small class="label label-success" v-if="salesOrder.shipment_status === 'SHIPPED'">{{ salesOrder.shipment_status | removeUnderScore }}</small>
                      <small class="label label-danger" v-else>{{ salesOrder.shipment_status | removeUnderScore }}</small>-->
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
                          <li>
                            <!-- <a
                              @click="showModalShipment()"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Shipment
                            </a> -->
                          </li>
                        </ul>
                      </div>


                      <div class="pull-left" style="margin-right: 10px;">
                       <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown" aria-expanded="false"
                            v-if="salesOrder.invoice_status === 'UNPAID' || salesOrder.invoice_status === 'OVERDUE'">
	                    More <i class="ion-arrow-down-b"></i>
                    </button>
                    <ul class="dropdown-menu" role="menu" style="top: 35px; left:initial; right:20px">
                      <li>
                        <a @click="cancelSalesOrder(salesOrder)" style="cursor: pointer;">
                          Mark as Void
                        </a>
                      </li>
                    </ul>
                      </div>

                      <!-- <div class="pull-left" style="margin-right: 10px;">
                        <a href="javascript:void(0);" id="close-btn" class="close-btn" @click="closeDetail">
                          <i class="ion-android-close"></i>
                        </a>
                      </div> -->
                    </div>

                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <ul class="nav nav-tabs navtab-bg nav-justified"  style="margin-left: 5px;">
                      <li :class="{ tab: true, active: currentTab == 'invoice' }" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;">
                        <a href="javascript:void(0);" @click="switchTab('invoice')">
                          <span class="hidden-xs">INVOICE</span>
                        </a>
                      </li>
                      <li :class="{ tab: true, active: currentTab == 'payment' }" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;">
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
                      <div :class="{ 'tab-pane': true, active: currentTab == 'invoice' }" id="invoice"
                          v-if="currentTab == 'invoice'">
                          <!-- <div class="row p-20 pb-0">
                            <div class="btn-toolbar" role="toolbar">
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
                            </div>
                          </div> -->

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

                      <div :class="{ 'tab-pane': true, active: currentTab == 'payment'}" id="payment" v-if="currentTab == 'payment'">
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

              </div>

            </div>

            

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import store from 'src/store'
  import Invoice from './Invoice'
  import { responseOk } from 'src/helpers'
  import { format as dateFormat } from 'date-fns'
  import subDays from 'date-fns/sub_days'

  import PaymentAddModal from './Modal/PaymentAdd'
  //  import PaymentEditModal from './Modal/PaymentEdit'
  import ShipmentAddModal from './Modal/Shipment'
  import DetailShipment from './DetailShipment.vue'
  import { swal_error } from '../../helpers'
  //  import ShipmentEditModal from './Modal/ShipmentEdit'
  import Pagination from '../Pagination.vue'
  import { swal_success } from 'helpers'

  export default {

    name: 'Detail',

    components: {
      Pagination,
      Invoice,
      PaymentAddModal,
//      PaymentEditModal,
      ShipmentAddModal,
//      ShipmentEditModal,
      DetailShipment,
    },

    filters: {
      removeUnderScore (value) {
        if (typeof  value === 'string') {
          return value.split('_').join(' ')
        }
      },
    },

    data () {
      return {
        invoiceComponent: false,
        sales_order_id: null,
        isLoading: false,
        sendingEmail: false, // loading indicator
        salesOrderItems: {},
        currentTab: 'invoice',
        enableCreatePaymentButton: false,
        enableCreateShipmentButton: false,
        current: {
          sales_order_id: null,
          invoice_id: null,
          payment_id: null,
          payment_method: {},
        },
        list: {},
      }
    },

    mounted () {
      this.initialize()

      // If shipment exists, disable create shipment button
      this.fetchShipmentData()

      if (!_.isEmpty(this.$route.query.state) && this.$route.query.state == 'pay') {
        this.showModalPayment()
      }

      if (!_.isEmpty(this.$route.query.state) && this.$route.query.state == 'shipment') {
        this.showModalShipment()
      }
    },

    computed: {

      salesOrder: {
        get () { return store.state.sales.salesOrder },
        set (value) { store.commit('sales/SALES_ORDER', value) },
      },

      invoiceList: {
        get () { return store.state.sales.invoiceList },
        set (value) { store.commit('sales/INVOICE_LIST', value) },
      },

      salesList: {
        get () {
          return _.map(store.state.sales.salesList, function (o) {
            o.checked = false
            return o
          })
        },
        set (value) { store.commit('sales/SALES_LIST', value) },
      },

      details: {
        get () { return store.state.sales.details },
        set (value) { store.commit('sales/DETAILS', value) },
      },

      payment: {
        get () { return store.state.sales.details },
        set (value) { store.commit('sales/DETAILS', value) },
      },

      paymentMethodList: {
        get () { return store.state.sales.paymentMethodList },
        set (value) { store.commit('sales/PAYMENT_METHOD_LIST', value) },
      },

      paymentMethodDetail: {
        get () { return store.state.sales.paymentMethodDetail },
        set (value) { store.commit('sales/PAYMENT_METHOD_DETAIL', value) },
      },

      checkedList: {
        get () { return store.state.sales.checkedList },
        set (value) { store.commit('sales/CHECKED_LIST', value) },
      },

      paymentList: {
        get () { return store.state.sales.paymentList },
        set (value) { store.commit('sales/PAYMENT_LIST', value) },
      },

      shipmentList: {
        get () { return store.state.sales.shipmentList ? store.state.sales.shipmentList : [] },
        set (value) { store.commit('sales/SHIPMENT_LIST', value) },
      },

      currentInvoice: {
        get () { return store.state.sales.invoice },
        set (value) { store.commit('sales/INVOICE', value) },
      },

      shipping_region_name () {
        if (this.salesOrder.shipping_region_detail
          && this.salesOrder.shipping_region_detail.name) {
          return this.salesOrder.shipping_region_detail.name
        }
        return null
      },

      shipping_district_name () {
        if (this.salesOrder.shipping_district_detail
          && this.salesOrder.shipping_district_detail.name) {
          return this.salesOrder.shipping_district_detail.name
        }
        return null
      },

      shipping_province_name () {
        if (this.salesOrder.shipping_province_detail
          && this.salesOrder.shipping_province_detail.name) {
          return this.salesOrder.shipping_province_detail.name
        }
        return null
      },

      shipping_country_name () {
        if (this.salesOrder.shipping_country_detail
          && this.salesOrder.shipping_country_detail.name) {
          return this.salesOrder.shipping_country_detail.name
        }
        return null
      },

      currentFilter () {
        return store.getters['sales/currentFilter']
      },

      sort: {
        get () { return store.state.sales.sort },
        set (value) { store.commit('sales/SORT', value) },
      },

      filter: {
        get () { return store.state.sales.filter },
        set (value) { store.commit('sales/FILTER', value) },
      },

      /**
       * Sales order status
       */
      salesOrderStatus () {
        return (this.salesOrder.sales_order_status)
          ? this.salesOrder.sales_order_status.replace(/_/, ' ')
          : ''
      },

      /**
       * Check validation of shipment data
       * @return {boolean}
       */
      isValidShipmentData () {
        return this.form.shipment.date
          && this.form.shipment.shipment_order_number
          && this.form.shipment.tracking_number
          && this.form.shipment.carrier_id
      },

      page_context: {
        get () { return store.state.sales.page_context },
        set (value) { store.commit('sales/PAGE_CONTEXT', value) },
      },

    },

    methods: {

      async initialize () {
        const salesOrderId = parseInt(this.$route.params.id)
        await store.dispatch('sales/show', salesOrderId)
        this.getInvoiceList(salesOrderId)
        this.invoiceComponent = Invoice

        await store.dispatch('sales/getPaymentList', {sales_order_id: salesOrderId, invoice_id: salesOrderId})
      },

      /**
       * Get list of sales
       */
      async getList (options = {}) {
        store.dispatch('sales/getList', options)

        const salesOrderId = parseInt(this.$route.params.id)
        this.getInvoiceList(salesOrderId)
      },

      /**
       * Get invoices by sales_order_id
       */
      async getInvoiceList (sales_order_id: number) {
        return await store.dispatch(`sales/invoiceList`, sales_order_id)
      },

      /**
       * Get Invoice by ID
       */
      async getInvoiceById (invoice_id) {
        try {
          const sales_order_id = store.setter.sales.salesOrderItems.sales_order_id
          const response = await axios.get(`sales_orders/${sales_order_id}/invoices/${invoice_id}`)

          if (!responseOk(response.data.code)) {
            return swal_error(response)
          }

          commit('sales/INVOICE', response.data.data)

          // Get payments
          await this.getPaymentListByInvoiceId(invoice_id)

        } catch (error) {
          return swal_error(error.response)
        }
      },

      /**
       * Get payment list by invoice ID
       */
      async getPaymentListByInvoiceId (invoice_id) {
        try {
          const sales_order_id = this.salesOrderItems.sales_order_id

          const response = await axios.get(`sales_orders/${sales_order_id}/invoices/${invoice_id}/payments`)

          if (!responseOk(response.data.code)) {
            return swal_error(response)
          }

          store.commit('sales/PAYMENT_LIST', response.data.data)

          return response.data.data

        } catch (error) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      /**
       * Show detail of sales order
       */
      async showDetail (item) {
        this.$router.push({
          name: 'sales.detail',
          params: {
            id: item.sales_order_id,
          },
          replace: true,
        })

        this.salesOrderItems = item
        const invoices = await this.getInvoiceList(item.sales_order_id)
        const payments = await this.getPaymentListByInvoiceId(invoices[0].invoice_id)

        await store.dispatch('sales/show', item.sales_order_id)
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
       * Print invoice
       */
      printInvoice () {
        const iframePrint = document.getElementById('iframe-print')
        iframePrint.src = 'http://sahito.ontelstudio.com:9000/invoices/pdf'
        iframePrint.contentWindow.document.domain = window.HOSTNAME
        iframePrint.contentWindow.print()
      },

      /**
       * View Shipment Labels
       */
      async viewShipmentLabels() {
        let me = this;

        let soId = _.map(me.checkedList, function (o) {
          return o.sales_order_id
        })

        const pdfWindow = window.open()

        const url = window.BASE_URL + `/sales_orders/shipments/bulk-label?ids=` + soId.join()

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
       * View bulk invoice
       */
      async viewBulkInvoice() {

        let ids = _.map(this.checkedList, function (so) {
          return so.sales_order_id
        })

        const pdfWindow = window.open()
        const url = window.BASE_URL + `/sales_orders/invoices/bulk-pdf?ids=${ids.join()}`

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

      /**
       * Show payment modal
       */
      async showModalPayment () {
        const sales_order_id = parseInt(this.$route.params.id)
        await store.dispatch('sales/payment/create', sales_order_id)
        const routeOptions = {
          name: 'sales.detail',
          params: {id: sales_order_id},
          query: {state: 'pay'},
        }
        this.$router.push(routeOptions)
        $('#payment-modal-add').modal('show')
      },

      /**
       * Show modal shipment
       */
      async showModalShipment (detail) {
        let sales_order_id = parseInt(this.$route.params.id)
        await store.dispatch('sales/shipment/create', sales_order_id)
        $('#shipment-modal-add').modal('show')
      },

      /**
       * Save payment
       */
      async savePayment () {
        const salesOrderId = parseInt(this.$route.params.id)
        await store.dispatch('sales/savePayment', salesOrderId)
      },

      /**
       * Save shipment
       */
      async saveShipment () {
        const salesOrderId = parseInt(this.$route.params.id)
        await store.dispatch('sales/saveShipment', salesOrderId)
      },

      /**
       * Update shipment data
       */
      editShipment () {
        try {
          const sales_order_id = this.salesOrderItems.sales_order_id
          this.fetchShipmentData()
          const shipment_id = this.shipmentList[0].shipment_id

          const res = axios.get(`sales_orders/${sales_order_id}/shipments/${shipment_id}/edit`)
          if (!responseOk(res.data.code)) {
            return swal_error(res)
          }

          this.form.shipment = res.data.data.shipment
          this.form.shipment.carrier_name = res.data.data.carrier.carrier_name

          // const date = dateFormat(res.data.data.shipment.date, 'YYYY-MM-DD')
          // this.shipment_date.setDate(date)

          $('#shipment-modal-edit').modal('show')

        } catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      updateShipment (shipment) {
        try {
          const sales_order_id = this.salesOrderItems.sales_order_id

          const shipment_id = this.shipmentList[0].shipment_id

          const data = {
            shipment_order_number: this.form.shipment.shipment_order_number,
            date: dateFormat(this.form.shipment.date, 'YYYY-MM-DD'),
            carrier_id: this.form.shipment.carrier_id.toString(),
            tracking_number: this.form.shipment.tracking_number.toString(),
            notes: this.form.shipment.notes,
          }

          const res = axios.post(`sales_orders/${sales_order_id}/shipments/${shipment_id}/update`, data)
          if (!responseOk(res.data.code)) {
            return swal_error(res)
          }

          this.form.shipment.date = dateFormat(new Date(), 'YYYY-MM-DD')
          this.form.shipment.shipment_order_number = ''
          this.form.shipment.tracking_number = ''
          this.form.shipment.carrier_id = ''
          this.form.shipment.carrier_name = ''
          this.form.shipment.notes = ''

          this.currentTab = 'shipment'

          swal_success(res)

          $('#shipment-edit').modal('hide')

        } catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      /**
       * Fetch shipment daata
       */
      async fetchShipmentData () {
        try {
          const sales_order_id = parseInt(this.$route.params.id)

          const res = await axios.get(`sales_orders/${sales_order_id}/shipments`)

          if (!responseOk(res.data.code)) {
            // throw new Error(`I got code: ${res.data.code} from ${res.request.responseURL}.`)
          }

          this.shipmentList = res.data.data

        } catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      /**
       * Edit payment
       */
      async editPayment (payment) {
        try {
          $('#payment-modal-edit').modal('show')

          const sales_order_id = this.current.sales_order_id = this.salesOrderItems.sales_order_id
          const invoice_id = this.current.invoice_id = payment.invoice_id
          const payment_id = this.current.payment_id = payment.payment_id

          const res = await axios.get(`sales_orders/${sales_order_id}/invoices/${invoice_id}/payments/${payment_id}/edit`)
          if (!responseOk(res.data.code)) {
            return swal_error(res)
          }

          this.form.payment.reference_number = res.data.data.payment.reference_number
          this.form.payment.date = dateFormat(res.data.data.payment.date, 'YYYY-MM-DD')
          this.form.payment.currency = res.data.data.currencies.currency_id
          this.form.payment.currency_name = res.data.data.currencies.code // Only for view
          this.form.payment.amount = res.data.data.total_payment
          this.form.payment.notes = res.data.data.payment.notes
          this.form.payment.payment_mode_id = res.data.data.payment.payment_mode_id
          this.form.payment.payment_account_id = res.data.data.payment.payment_account_id
          this.form.payment.send_receipt = 0

          console.log(_.cloneDeep(this.form.payment))

          this.current.payment_method = res.data.data.payment_method

        } catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }

      },

      /**
       * Update payment
       */
      async updatePayment () {
        try {
          const sales_order_id = this.current.sales_order_id
          const invoice_id = this.current.invoice_id
          const payment_id = this.current.payment_id

          const data = {
            reference_number: '' + this.form.payment.reference_number,
            date: dateFormat(this.form.payment.date, 'YYYY-MM-DD'),
            currency: '' + this.form.payment.currency,
            amount: this.form.payment.amount,
            notes: this.form.payment.notes,
            payment_mode_id: this.form.payment.payment_mode_id,
            payment_account_id: this.form.payment.payment_account_id,
          }

          const url = `sales_orders/${sales_order_id}/invoices/${invoice_id}/payments/${payment_id}/update`

          const res = await axios.post(url, data)
          if (!responseOk(res.data.code)) {
            return swal_error(res)
          }

          // Form resets
          this.form.payment.reference_number = null
          this.form.payment.date = null
          this.form.payment.currency = null
          this.form.payment.amount = null
          this.form.payment.notes = null
          this.form.payment.payment_mode_id = null
          this.form.payment.payment_account_id = null
          this.form.payment.send_receipt = 0

          $('#payment-edit').modal('hide')

          await this.refreshSalesOrder(sales_order_id) // Refresh payment list

          return swal_success(res)

        } catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }

      },

      async refreshCurrentSalesOrderData (data) {
        const sales_order_id = parseInt(this.$route.params.id)

        const sales_order = await axios.get(`sales_orders/${sales_order_id}`)
        store.commit('sales/SALES_ORDER', sales_order.data.data)

        const invoice = await axios.get(`sales_orders/${data.sales_order_id}/invoices/${data.invoice_id}`)
        store.commit('sales/INVOICE', invoice.data.data)

        const payment_list = await axios.get(`sales_orders/${data.sales_order_id}/invoices/${data.invoice_id}/payments`)
        store.commit('sales/PAYMENT_LIST', payment_list.data.data)

        this.getInvoiceList(sales_order_id)
      },

      /**
       * Delete payment
       */
      async deletePayment (payment) {
        Alert.confirm({
          title: 'Do you really want to delete this payment?',
          text: 'Delete this payment and your data payment will be lost.',
        }, async () => {

          try {
            const sales_order_id = this.salesOrderItems.sales_order_id
            const invoice_id = payment.invoice_id
            const payment_id = payment.payment_id

            const url = `sales_orders/${sales_order_id}/invoices/${invoice_id}/payments?ids=${payment_id}`

            const res = await axios.delete(url)
            if (!responseOk(res.data.code)) {
              return swal_error(res)
            }

            // Refresh payment list data
            this.getPaymentListByInvoiceId(invoice_id)

            // Force to refresh everything
            this.initialize()

            swal_success(res)

          } catch (err) {
            console.error(err)
            if (err.hasOwnProperty('response')) {
              swal_error(err.response)
            }
          }
        })

      },

      /**
       * Delete shipment
       */
      async deleteShipment () {
        Alert.confirm({
          title: 'Do you really want to delete this shipment?',
          text: 'Deleted this shipment cannot be recovered. Do you still want to continue?',
        }, async () => {

          try {
            const sales_order_id = this.salesOrderItems.sales_order_id

            // Fetch shipment data
            this.fetchShipmentData()
            const shipment_ids = []
            this.shipmentList.forEach(item => {
              shipment_ids.push(item.shipment_id)
            })

            const delete_ids = shipment_ids.join(',')

            const url = `sales_orders/${sales_order_id}/shipments?ids=${delete_ids}`

            const res = await axios.delete(url)
            if (!responseOk(res.data.code)) {
              return swal_error(res)
            }

            // Refresh shipment data
            this.fetchShipmentData()

            return swal_success(res)

          } catch (err) {
            console.error(err)
            if (err.hasOwnProperty('response')) {
              swal_error(err.response)
            }
          }

        })

      },

      /**
       * Close detail
       */
      closeDetail () {
        this.$router.push({
          name: 'sales.index',
        })
      },

      /**
       * Check all items
       */
      checkAll (evt) {
        if (evt.target.checked) {
          this.clearCheckedAll()
          this.checkedAll = true
          _.each(this.salesList, item => {
            this.checkedList.push(item.sales_order_id)
          })
        } else {
          this.clearCheckedAll()
        }
      },

      /**
       * Clear all checked items
       */
      clearCheckedAll () {
        this.checkedAll = false
        this.checkedList = []
      },

      /**
       * Switch tab
       */
      switchTab (name) {
        this.currentTab = name

        if (name === 'invoice') {

        }

        if (name === 'shipment') {
          this.fetchShipmentData()
        }
      },

      updatePagination (data) {
        store.commit('sales/PAGE_CONTEXT', data.paginate)
        store.commit('sales/SALES_LIST', data.data)
      },

      cancelSalesOrder (salesOrder) {
        Alert.confirm({
          title: 'Are you sure?',
          confirmButtonText: 'Mark as void',
        }, async () => {
          const sales_order_id = salesOrder.sales_order_id
          const invoice_id = salesOrder.invoices[0].invoice_id
          const url = `sales_orders/${sales_order_id}/invoices/${invoice_id}/mark_as_void`
          const res = await axios.get(url)
          if (responseOk(res.data.code)) {
            swal_success(res)
            this.refreshCurrentSalesOrderData(salesOrder)
          } else {
            swal_error(res)
          }
        })
      },

    },
  }
</script>

<style scoped>
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
