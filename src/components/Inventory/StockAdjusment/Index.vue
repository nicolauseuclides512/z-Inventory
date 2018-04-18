<template>
  <div class="content-page-full" style="min-height:350px">
    <div class="content sahito-user">
      <div class="container" style="padding: 0; margin: 0;">
        <div class="row">
          <div class="col-sm-12" style="padding: 0 10px 10px 0;">
            <a class="pull-left page-title" data-toggle="dropdown" aria-expanded="false">
              <h4>Adjustment History</h4>
            </a>
            <div class="pull-right">
              <router-link :to="{ name: 'stock_adjustment.create' }" class="btn btn-info waves-effect waves-light m-b-5">
                <span>New </span><i class="ion-plus"></i>
              </router-link>
              <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-bars"></i>
              </button>
              <ul class="dropdown-menu" role="menu" style="top: 35px;">
                <li class="dropdown-header">SORT BY</li>
                <li :class="{ active: currentSortColumn === 'stock_adjustments.created_at' }">
                  <a href="javascript:void(0);" id="sort-by-stock_adjustments.created_at"
                    @click="sortItemsBy('stock_adjustments.created_at')">Newest</a>
                </li>
                <li :class="{ active: currentSortColumn === 'reference_number' }">
                  <a href="javascript:void(0);" id="sort-by-reference_number" @click="sortItemsBy('reference_number')">Reference Number</a>
                </li>
                <li :class="{ active: currentSortColumn === 'stock_adjustments.updated_at\n' }">
                  <a href="javascript:void(0);" id="sort-by-stock_adjustments.updated_at" @click="sortItemsBy('name')">Last Updated</a>
                </li>
                <li :class="{ active: currentSortColumn === 'stock_adjustment_date' }">
                  <a href="javascript:void(0);" id="sort-by-stock_adjustment_date"
                    @click="sortItemsBy('stock_adjustment_date')">Stock Adjustment Date</a>
                </li>
                <li :class="{ active: currentSortColumn === 'stock_adjustment_number' }">
                  <a href="javascript:void(0);" id="sort-by-stock_adjustment_number"
                    @click="sortItemsBy('stock_adjustment_number')">Stock adjustment Number</a>
                </li>
                <!-- <li class="divider"></li>
                <li><a href="#"><i class="md-file-download"></i> Import Customers</a></li>
                <li><a href="#"><i class="md-file-download"></i> Import Vendors</a></li>
                <li class="divider"></li>
                <li><a href="#"><i class="md-file-upload"></i> Export Customers</a></li>
                <li><a href="#"><i class="md-file-upload"></i> Export Vendors</a></li> -->
                <li class="divider"></li>
                <li><a href="javascript:void(0);" id="refresh-list" @click="refreshList"><i class="md-refresh"></i>
                  Refresh List</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12" style="padding-left: 0;">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <table class="table table-hover table-striped sahito-list-contact--table">
                      <thead>
                      <tr>
                        <th>Date</th>
                        <th>Adjustment ID</th>
                        <th>Reference Number</th>
                        <th>Item Name</th>
                        <th>Reason</th>
                        <th>Qty Adjusted</th>
                        <th>Qty on Hand</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in list.items" v-if="item.reason">
                        <td align="right">{{ item.stock_adjustment_date | date('short') }}</td>
                        <td>
                          <router-link :to="{ name: 'stock_adjustment.edit', params: { id: item.stock_adjustment_id } }">
                            {{ item.stock_adjustment_number }}
                          </router-link>
                        </td>
                        <td>#{{ item.reference_number }}</td>
                        <td>{{ item.item_name }}</td>
                        <td>{{ item.reason }}</td>
                        <td>{{ item.adjust_qty }}</td>
                        <td>{{ item.on_hand_qty }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <pagination :page-context="paginate" :result="list.items" @updated="updatePagination"></pagination>

              </div>
            </div>
          </div>
        </div> <!-- End row -->
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import { getParameterByName } from 'src/helpers'

  export default {
    name: 'StockAdjustmentIndex',

    components: {
      Pagination: () => import('@/components/Pagination'),
    },

    data () {
      return {
        currentSortColumn: 'stock_adjustment.create',
        ascendingSort: 'desc',
        paginate: {},
        list: {
          items: [],
        },
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {

      async initialize () {
        this.getList()
      },

      async getList (params = {}) {
        try {
          const defaultParams = {
            page: 1,
            per_page: 15,
            sort: 'stock_adjustment.create.asc',
            filter_by: '',
            q: getParameterByName('q'),
          }

          params = _.merge(defaultParams, params)

          const res = await Axios.get('stock_adjustments/history/item', {params: params})

          this.list.items = res.data.data
          this.paginate = res.data.paginate

        } catch (err) {
          console.error(err)
        }
      },

      refreshList () {
        this.list.items = []
        this.getList({
          currentFilter: this.currentFilter,
          sort: `${this.currentSortColumn}.${this.ascendingSort ? 'asc' : 'desc' }`,
        })
      },

      async updatePagination (data) {
        this.paginate = data.paginate
        this.list.items = data.data
      },

      sortItemsBy (column) {
        let ascendingSort

        this.currentSortColumn = column
        this.ascendingSort = !this.ascendingSort

        if (this.ascendingSort) {
          ascendingSort = 'asc'
        } else {
          ascendingSort = 'desc'
        }

        this.getList({sort: `${column}.${ascendingSort}`})
      },

    },
  }
</script>
