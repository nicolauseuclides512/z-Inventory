<template>
  <div>
    <div class="container full-width-header bt-1 p-b-10">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12" id="mark_default" v-if="!checkedList.length > 0">

          <a href="javascript:void(0);" class="dropdown-toggle pull-left page-title" data-toggle="dropdown"
             aria-expanded="false">
            <h4><span class="text-muted">Status: </span> {{ currentFilter }} <span class="caret"></span></h4>
          </a>

          <ul class="dropdown-menu" role="menu" style="top: 35px;">
            <li class="dropdown-header">FILTER BY</li>
            <li :class="{ active: filter == 'all' }">
              <a href="javascript:void(0);" @click="changeFilter({ filter: 'all' })">All</a>
            </li>
            <li class="divider"></li>
            <li :class="{ active: filter == 'draft' }">
              <a href="javascript:void(0);" @click="changeFilter({ filter: 'draft' })">Draft</a>
            </li>
            <li :class="{ active: filter == 'paid' }">
              <a href="javascript:void(0);" @click="changeFilter({ filter: 'paid' })">Paid</a>
            </li>
            <li :class="{ active: filter == 'unpaid' }">
              <a href="javascript:void(0);" @click="changeFilter({ filter: 'unpaid' })">Unpaid</a>
            </li>
            <li :class="{ active: filter == 'partially_paid' }">
              <a href="javascript:void(0);" @click="getList({ filter: 'partially_paid' })">Partially Paid</a>
            </li>
            <li :class="{ active: filter == 'overdue' }">
              <a href="javascript:void(0);" @click="changeFilter({ filter: 'overdue' })">Overdue</a>
            </li>
            <li :class="{ active: filter == 'shipped' }">
              <a href="javascript:void(0);" @click="changeFilter({ filter: 'shipped' })">Shipped</a>
            </li>
            <li :class="{ active: filter == 'not_yet_shipped' }">
              <a href="javascript:void(0);" @click="changeFilter({ filter: 'not_yet_shipped' })">Not shipped</a>
            </li>
            <li :class="{ active: filter == 'void' }">
              <a href="javascript:void(0);" @click="changeFilter({ filter: 'void' })">Void</a>
            </li>
          </ul>

          <div class="pull-right">
            <router-link :to="{ name: 'sales.create' }" href="javascript:void(0);"
                         class="btn btn-info waves-effect waves-light m-b-5">
              <span>New </span> <i class="ion-plus"></i>
            </router-link>
            <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-bars"></i></button>
            <ul class="dropdown-menu" role="menu" style="top: 35px;">
              <li class="dropdown-header">SORT BY</li>
              <li :class="{ active: sort.startsWith('created_at') }">
                <a href="javascript:void(0);"
                   @click="changeSorter({ sort: 'created_at.asc' })"
                >
                  Created Time
                </a>
              </li>
              <li :class="{ active: sort.startsWith('updated_at') }">
                <a href="javascript:void(0);"
                   @click="changeSorter({ sort: 'updated_at.asc' })"
                >
                  Last Modified Time
                </a>
              </li>
              <li :class="{ active: sort.startsWith('order_date') }">
                <a href="javascript:void(0);"
                   @click="changeSorter({ sort: 'order_date.asc' })"
                >
                  Date
                </a>
              </li>
              <li :class="{ active: sort.startsWith('invoice_number') }">
                <a href="javascript:void(0);"
                   @click="changeSorter({ sort: 'invoice_number.asc' })"
                >
                  Invoice#
                </a>
              </li>
              <li class="divider"></li>
              <!--<li><a href="javascript:void(0);"><i class="md-file-download"></i> Import Invoices</a></li>-->
              <!--<li><a href="javascript:void(0);"><i class="md-file-upload"></i> Export Invoices</a></li>-->
              <!--<li class="divider"></li>-->
              <!--<li><a href="javascript:void(0);"><i class="md-file-download"></i> Import Payments</a></li>-->
              <!--<li><a href="javascript:void(0);"><i class="md-file-upload"></i> Export Payments</a></li>-->
              <!--<li class="divider"></li>-->
              <!--<li><a href="javascript:void(0);"><i class="fa fa-cog"></i> Invoice Preferences</a></li>-->
              <li><a href="javascript:void(0);"><i class="md-refresh"></i> Refresh List</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12" id="mark_active" v-if="checkedList.length > 0">
          <div class="pull-left">
            <a href="javascript:void(0);" @click="printInvoice(43)"
               class="btn btn-default waves-effect waves-light m-b-5">Print Invoice</a>
            <a href="javascript:void(0);" class="btn btn-default waves-effect waves-light m-b-5">Print Packing</a>
          </div>
          <div class="pull-right pt-10">
            <a href="javascript:void(0);" @click="clearCheckedAll">
              <i class="ion-android-close"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="container p-0">
      <div class="row sahito-list">
        <div class="col-md-12">
          <div class="sahito-list-contact table-responsive">
            <div class="table table-hover default-table sahito-list-item-group-list--table">
              <div>
                <div v-if="!salesList.length > 0">
                  <div class="text-muted text-center lead" style="padding: 30px 0 10px">No data</div>
                </div>


                <div v-else>
                  <table
                    class="table table-hover default-table sahito-list-item-group-list--table sahito-sales-order-table">
                    <thead>
                    <tr>
                      <th class="col-checkbox">
                        <div class="checkbox checkbox-single checkbox-success">
                          <input type="checkbox" id="all">
                          <label></label>
                        </div>
                      </th>
                      <th id="icon_collapse">
                        <div class="placeholder-collapse"></div>
                      </th>
                      <th>Date</th>
                      <th>Order ID</th>
                      <th>Ref</th>
                      <th>Customer </th>
                      <th class="editable editable-click">Status</th>
                      <th>Total(IDR)</th>
                      <th>Paid</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(sale, index) in salesList">
                      <tr>
                        <td class="col-checkbox">
                          <div class="checkbox checkbox-single checkbox-success">
                            <input type="checkbox">
                            <label></label>
                          </div>
                        </td>
                        <td>
                          <a href="javascript:void(0);" @click="overviewToggle(sale.sales_order_id)">
                            <i v-if="overview.sales_order_id == sale.sales_order_id"
                               class="ion-minus-circled text-green fa-lg"></i>
                            <i v-else="" class="ion-plus-circled text-green fa-lg"></i>
                          </a>
                        </td>
                        <td>{{ sale.invoice_date | date('short') }}</td>
                        <td>
                          <a href="javascript:void(0);" @click="showDetail(sale)">
                            {{ sale.sales_order_number }}
                          </a>
                        </td>
                        <td>{{ sale.reference_number }}</td>
                        <td>
                          <router-link :to="{ name: 'contact.edit', params: {id: sale.contact.contact_id } }"
                                       href="javascript:void(0);">
                            {{ sale.contact.display_name }}
                          </router-link>
                        </td>
                        <td>
                          {{ sale.sales_order_status.toLowerCase().replace(/_/g, ' ') | capitalize }}
                          {{ sale.shipment_status.toLowerCase().replace(/_/g, ' ') | capitalize }}
                        </td>
                        <td>{{ sale.total | money }}</td>
                        <td>
                          <div v-if="sale.invoice_status === 'PAID'">
                            <i class="fa fa-circle text-green" title="Paid"></i>
                          </div>
                          <div v-if="sale.invoice_status === 'PARTIALLY_PAID'">
                            <i class="fa fa-adjust text-green" title="Partially Paid"></i>
                          </div>
                          <div v-if="sale.invoice_status === 'UNPAID'">
                            <i class="fa fa-circle-o text-green" title="Unpaid"></i>
                          </div>
                          <div v-if="sale.invoice_status === 'OVERDUE'">
                            <i class="fa fa-circle-o text-danger" title="Overdue"></i>
                          </div>
                        </td>
                        <td>
                          <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"
                             aria-expanded="false">
                            <span class="fa fa-cog"></span>
                          </a>
                          <ul class="dropdown-menu" role="menu" style="right: 70px;top: 70px;left: initial;">
                            <li>
                              <router-link :to="{ name: 'sales.edit', params: { id: sale.sales_order_id } }"
                                           href="javascript:void(0)">
                                Edit
                              </router-link>
                            </li>
                            <li v-if="sale.invoice_status === 'UNPAID'">
                              <a href="javascript:void(0);" @click="gotoDetailPayment(sale)">
                                Record Payment
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0);" @click="downloadInvoice(sale.sales_order_id)">
                                Download Invoice
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0);" @click="downloadInvoice(sale.sales_order_id)">
                                Print Invoice
                              </a>
                            </li>
                            <!--<li><a href="javascript:void(0);">Email Invoice</a></li>-->
                            <li v-if="sale.shipment_status === 'NOT_YET_SHIPPED'">
                              <a href="javascript:void(0);" @click="gotoDetailShipment(sale)">
                                Record Shipment
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr class="">
                        <td colspan="11" class="p-0 bt-0">
                          <table v-if="overview.sales_order_id == sale.sales_order_id"
                                 class="table sales-order-inner-table">
                            <tbody>
                            <tr>
                              <td class="col-checkbox">
                              </td>
                              <th>Customer</th>
                              <th>Order Details</th>
                            </tr>
                            <tr>
                              <td class="col-checkbox">
                              </td>
                              <td>
                                <div v-if="sale.contact">
                                  <router-link :to="{ name: 'contact.edit', params: {id: sale.contact.contact_id } }"
                                               href="javascript:void(0);">
                                    {{ sale.contact.display_name }}
                                  </router-link>
                                </div>
                                <div v-else><span class="text-muted">&mdash;</span></div>
                              </td>
                              <td rowspan="3" style="border-left:1px solid #ddd;">
                                <div class="border-1 table-responsive">
                                  <table class="table sahito-invoice-table-inside">
                                    <thead>
                                    <tr class="dark-grey-background">
                                      <th>Item &amp; Description</th>
                                      <th>Qty</th>
                                      <th>Disc</th>
                                      <th>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="order in orderList">
                                      <td>{{ order.item_name }}</td>
                                      <td>
                                        <p class="qty-amount">{{ order.item_quantity }} {{ order.uom }}</p>
                                      </td>
                                      <td>{{ order.item_rate | money }}</td>
                                      <td class="text-right">
                                        <span
                                          v-if="order.discount_amount_type === 'fixed'">{{ order.discount_amount_value | money
                                          }}</span>
                                        <span v-else>{{ order.discount_amount_value }}%</span>
                                      </td>
                                      <td>{{ order.amount | money }}</td>
                                    </tr>
                                    <tr class="sub-total">
                                      <td colspan="4" class="text-right text-bold">Sub Total</td>
                                      <td>{{ overview.sub_total | money }}</td>
                                    </tr>
                                    <!--<tr class="sub-total">-->
                                    <!--<td colspan="4" class="text-right text-bold">Shipment Charge</td>-->
                                    <!--<td>{{ overview.shipping_charge | money }}</td>-->
                                    <!--</tr>-->
                                    <tr class="sub-total">
                                      <td colspan="4" class="text-right text-bold">
                                        {{ overview.adjustment_name || 'Adjusment' }}
                                      </td>
                                      <td>{{ overview.adjustment_value | money }}</td>
                                    </tr>
                                    <tr class="sub-total">
                                      <td colspan="4" class="text-right text-bold">Tax</td>
                                      <td>
                                        <span v-if="overview.tax === -1">Included</span>
                                        <span v-else>{{ overview.tax | money }}</span>
                                      </td>
                                    </tr>
                                    <tr class="balance-due" style="background: #f0f0f0;">
                                      <td colspan="1" class="no-bgr"></td>
                                      <td colspan="3" class="text-right text-bold">Total</td>
                                      <td>{{ overview.total | money }}</td>
                                    </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th class="col-checkbox">
                              </th>
                              <th>Payment Method</th>
                            </tr>
                            <tr>
                              <td class="col-checkbox">
                              </td>
                              <td>
                                <p>Bank Transfer</p>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 pr-20 text-right">
          <pagination :page-context="page_context" :result="salesList" @updated="updatePagination"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import store from 'src/store'
  import { getParameterByName } from 'src/helpers'
  import Pagination from '../Pagination.vue'

  export default {
    name: 'List',

    components: {
      Pagination,
    },

    watch: {
      '$route' (to, from) {
        if (to.query) {
          this.getList({
            q: to.query.q,
            filter: to.query.filter,
            sort: to.query.sort,
          })
        } else {
          this.getList()
        }
      },
    },

    mounted () {
      store.dispatch('sales/initialize')
    },

    computed: {

      filter: {
        get () { return store.state.sales.filter },
        set (value) { store.commit('sales/FILTER', value) },
      },

      sort: {
        get () { return store.state.sales.sort },
        set (value) { store.commit('sales/SORT', value) },
      },

      overview: {
        get () { return store.state.sales.overview },
        set (value) { store.commit('sales/OVERVIEW', value) },
      },

      orderList: {
        get () { return store.state.sales.orderList },
        set (value) {
//        store.commit('sales/OVERVIEW', value)
        },
      },

      currentFilter () {
        return store.getters['sales/currentFilter']
      },

      checkedList: {
        get () { return store.state.sales.checkedList },
        set (value) { store.commit('sales/CHECKED_LIST', value) },
      },

      salesList: {
        get () { return store.state.sales.salesList },
        set (value) { store.commit('sales/SALES_LIST') },
      },

      page_context: {
        get () { return store.state.sales.page_context },
        set (value) { store.commit('sales/PAGE_CONTEXT', value) },
      },

    },

    methods: {

      getList (options = {}) {
        store.dispatch('sales/getList', options)
      },

      changeFilter (options = {}) {
        this.$router.push({
          name: 'sales.index',
          query: {
            filter: options.filter || this.currentFilter || 'all',
            sort: options.sort || this.currentSortColumn || 'created_at.asc',
          },
        })
        this.getList(options)
      },

      changeSorter (options = {}) {
        this.$router.push({
          name: 'sales.index',
          query: {
            filter: this.filter,
            sort: this.sort,
          },
        })
        this.getList(options)
      },

      /**
       * Overview toggle
       */
      overviewToggle (sales_order_id) {
        store.dispatch('sales/overviewToggle', sales_order_id)
      },

      /**
       * Show detail of sales order
       */
      showDetail (item) {
        this.$router.push({
          name: 'sales.detail',
          params: {
            id: item.sales_order_id,
          },
        })
      },

      printInvoice (sales_order_id: number) {
        // Fetch all invoices
        axios.get(`sales_orders/${sales_order_id}/invoices`).then(res => {
          res.data.data.forEach(invoice => {
            // TODO: Update this URL
            window.open(`sales_orders/${sales_order_id}/invoices/` + invoice.invoice_id)
          })
        }).catch(err => {
          swal_error(err.response)
        })
      },

      async downloadInvoice (sales_order_id) {
        const pdfWindow = window.open()

        // Fetch invoice list
        await store.dispatch(`sales/invoiceList`, parseInt(sales_order_id))
        const invoice_id = store.state.sales.invoiceList[0].invoice_id

        const url = window.BASE_URL + `/sales_orders/${sales_order_id}/invoices/${invoice_id}/pdf`

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

      checkItem (id) {
        store.dispatch('sales/markItemAsChecked', id)
      },

      /**
       * Check all items
       */
      checkAll (evt) {
        if (evt.target.checked) {
          this.clearCheckedAll()
//        this.checkedAll = true
          _.each(this.salesList, item => {
            store.dispatch('sales/markItemAsChecked', item.sales_order_id)
          })
        } else {
          this.clearCheckedAll()
        }
      },

      /**
       * Clear all checked items
       */
      clearCheckedAll () {
        store.dispatch('sales/clearAllCheckedItems')
//      this.checkedAll = false
      },

      updatePagination (data) {
        store.commit('sales/PAGE_CONTEXT', data.paginate)
        store.commit('sales/SALES_LIST', data.data)
      },

      gotoDetailPayment (sale) {
        const routeOptions = {
          name: 'sales.detail',
          params: {id: sale.sales_order_id},
          query: {state: 'pay'},
        }
        this.$router.push(routeOptions)
      },

      gotoDetailShipment (sale) {
        const routeOptions = {
          name: 'sales.detail',
          params: {id: sale.sales_order_id},
          query: {state: 'shipment'},
        }
        this.$router.push(routeOptions)
      },

    },
  }
</script>
