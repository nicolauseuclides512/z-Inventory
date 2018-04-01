<template>
  <div>
    <!-- ======================= -->
    <!-- Sales Order List Header -->
    <!-- ======================= -->
    <div class="clearfix" v-if="!checkedList.length > 0">
      <div class="pull-left">
        <a href="javascript:void(0);" class="dropdown-toggle page-title" data-toggle="dropdown">
          <h4>{{ currentFilter }} <span class="caret"></span></h4>
        </a>
        <ul class="dropdown-menu" role="menu" style="top: 35px;">
          <li class="dropdown-header">FILTER BY</li>
          <li :class="{ active: filter === 'all' }">
            <a href="javascript:void(0);" @click="getList({ filter: 'all' })">All
            </a>
          </li>
          <li class="divider"></li>
          <li :class="{ active: filter === 'draft' }">
            <a href="javascript:void(0);" @click="getList({ filter: 'draft' })">Draft</a>
          </li>
          <li :class="{ active: filter == 'paid' }">
            <a href="javascript:void(0);" @click="getList({ filter: 'paid' })">Paid</a>
          </li>
          <li :class="{ active: filter == 'unpaid' }">
            <a href="javascript:void(0);" @click="getList({ filter: 'unpaid' })">Unpaid</a>
          </li>
          <li :class="{ active: filter == 'partially_paid' }">
            <a href="javascript:void(0);" @click="getList({ filter: 'partially_paid' })">Partially Paid</a>
          </li>
          <li :class="{ active: filter == 'overdue' }">
            <a href="javascript:void(0);" @click="getList({ filter: 'overdue' })">Overdue</a>
          </li>
          <li :class="{ active: filter == 'void' }">
            <a href="javascript:void(0);" @click="getList({ filter: 'void' })">Void</a>
          </li>
        </ul>
      </div>
      <div class="pull-right">
        <router-link :to="{ name: 'sales.create' }" class="btn btn-info waves-effect waves-light mb-15">
          New <i class="ion-plus"></i>
        </router-link>
        <button class="btn btn-default waves-effect waves-light mb-15" data-toggle="dropdown">
          <i class="fa fa-bars"></i>
        </button>
        <ul class="dropdown-menu" role="menu" style="top: 35px;">
          <li class="dropdown-header">SORT BY</li>
          <li :class="{ active: sort.startsWith('created_at') }">
            <a href="javascript:void(0);" @click="getList({ sort: 'created_at.asc' })">Created Time</a>
          </li>
          <li :class="{ active: sort.startsWith('updated_at') }">
            <a href="javascript:void(0);" @click="getList({ sort: 'updated_at.asc' })">Last Modified Time</a>
          </li>
          <li :class="{ active: sort.startsWith('order_date') }">
            <a href="javascript:void(0);" @click="getList({ sort: 'order_date.asc' })">Date</a></li>
          <li :class="{ active: sort.startsWith('invoice_number') }">
            <a href="javascript:void(0);" @click="getList({ sort: 'invoice_number.asc' })">Invoice#</a></li>
          <li class="divider"></li>
          <li><a href="javascript:void(0);"><i class="md-refresh"></i> Refresh List</a></li>
        </ul>
      </div>
    </div>
    <div class="clearfix" v-if="checkedList.length > 0">
      <div class="pull-left">
        <a href="javascript:void(0);" @click="viewBulkInvoice" class="btn btn-default waves-effect waves-light mb-15">
          Print Invoice
        </a>
        <a href="javascript:void(0);" @click="viewShipmentLabels"
           class="btn btn-default waves-effect waves-light mb-15">
          Print Shipment Labels
        </a>
      </div>
      <div class="pull-right pt-10 pr-15">
        <a href="javascript:void(0);" @click="clearCheckedAll">
          <i class="ion-android-close"></i>
        </a>
      </div>
    </div>
    <!-- =========================== -->
    <!-- END Sales Order List Header -->
    <!-- =========================== -->

    <!-- =========================== -->
    <!-- Sales Order List -->
    <!-- =========================== -->

    <table class="table">
      <tr v-for="salesOrder in salesOrderList" :key="salesOrder.sales_order_id">
        <td width="1%" @click="addCheck">
          <div class="checkbox checkbox-single checkbox-success">
            <input
              type="checkbox"
              :title="salesOrder.sales_order_id"
              v-model="checkedList"
              :value="salesOrder.sales_order_id"
            />
            <label></label>
          </div>
        </td>
        <td @click="showDetail(salesOrder)">
          <div class="clearfix">
            <div class="pull-left">
              <strong style="font-size: 1.1em">{{ salesOrder.contact.display_name }}</strong>
            </div>
            <div class="pull-right">
              <strong>{{ salesOrder.total | money }}</strong>
            </div>
          </div>
          <div class="clearfix">
            <div class="pull-left">
              <small class="text-muted">#{{ salesOrder.sales_order_number }}</small>
            </div>
            <div class="pull-right" style="font-size: 1.1em">
              <div v-if="salesOrder.sales_order_status === 'DRAFT'">
                <span style="color:#C4C4C4; font-size:13px;">{{ salesOrder.sales_order_status }}</span>
              </div>
              <div v-else>
                <div v-if="salesOrder.invoice_status === 'PAID'">
                  <span style="color:#319B31; font-size:13px;">PAID</span>
                </div>
                <div v-else-if="salesOrder.invoice_status === 'UNPAID'">
                  <span style="color:#1C8AD9; font-size:13px;">UNPAID</span>
                </div>
                <div v-else-if="salesOrder.invoices[0].invoice_status === 'PARTIALLY_PAID'">
                  <span style="color:#319B31; font-size:13px;">PARTIALLY PAID</span>
                </div>
                <div v-else-if="salesOrder.invoice_status === 'OVERDUE'">
                  <span style="color:#E33636; font-size:13px;">OVERDUE</span>
                </div>
                <div v-else-if="salesOrder.invoice_status === 'VOID'">
                  <span style="color:#000000; font-size:13px;">VOID</span>
                </div>
              </div>
            </div>
          </div>
          <div class="clearfix">
            <span class="text-muted">{{ salesOrder.invoice_date | date('short') }}</span>
          </div>
        </td>
      </tr>
    </table>

    <!-- =========================== -->
    <!-- END Sales Order List -->
    <!-- =========================== -->

    <div class="row">
      <Pagination :page-context="page_context" :result="salesOrderList" @updated="updatePagination"/>
    </div>
  </div>

</template>

<script>
  import Axios from 'axios'
  import Form from '@/helpers/Form'
  import {mapState} from 'vuex'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'List',

    components: {
      Pagination,
    },

    data () {
      return {
        loaded: false,
        page_context: {},
        checkedList: [],
        // salesOrderList: [],
        filter: 'all',
        sort: 'created_at.desc',
      }
    },

    computed: {
      ...mapState('salesOrders', [
        'salesOrderList',
        'salesOrder',
      ]),

      currentFilter () {
        return this.filter.replace(/_/, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
      }
    },

    async mounted () {
      this.getList()
    },

    methods: {
      async getList (options = {}) {
        this.$store.dispatch('salesOrders/getList', options)
      },

      showDetail (salesOrder) {
        this.$emit('selectSalesOrder', salesOrder.sales_order_id)
      },

      /**
       * View bulk invoice
       */
      async viewBulkInvoice () {

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
       * View Shipment Labels
       */
      async viewShipmentLabels () {
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
       * Print invoice
       */
      printInvoice () {
        const iframePrint = document.getElementById('iframe-print')
        iframePrint.src = 'http://sahito.ontelstudio.com:9000/invoices/pdf'
        iframePrint.contentWindow.document.domain = window.HOSTNAME
        iframePrint.contentWindow.print()
      },

      clearCheckedAll () {
        this.checkedList = []
      },

      addCheck ($event) {
        $($event.target).find('input').trigger('click')
      },

      updatePagination (data) {
        this.page_context = data.page_context
        this.salesOrderList = data.data
      },
    }
  }
</script>

<style scoped lang="scss">
  hr {
    margin: 10px 0;
  }

  table tr td {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }

  table tr td:first-child {
    padding-left: 10px;
  }

  table tr td:last-child {
    padding-right: 10px;
  }

  table tr:hover td {
    background: #f5f5f5;
    cursor: pointer;
  }
</style>
