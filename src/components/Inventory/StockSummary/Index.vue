/'<template>
  <div class="content-page-full">
    <div class="content sahito-user">
      <div class="container" style="padding:0px; margin:0px">
        <div class="row">
          <div class="col-sm-12" style="padding:0px 10px 10px 0px;">
            <a href="#" class="pull-left page-title" data-toggle="dropdown" aria-expanded="false">
              <h4>Stock Summary</h4>
            </a>
            <div class="pull-right">
              <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-bars"></i>
              </button>
              <ul class="dropdown-menu" role="menu" style="top: 35px;">
                <li class="dropdown-header">SORT BY</li>
                <li :class="{ active: currentSortColumn == 'created_at' }">
                  <a href="javascript:void(0);" id="sort-by-created_at"
                    @click="sortItemsBy('created_at')">Newest</a>
                </li>
                <li :class="{ active: currentSortColumn == 'updated_at' }">
                  <a href="javascript:void(0);" id="sort-by-updated_at"
                    @click="sortItemsBy('updated_at')">Last Update</a>
                </li>
                <li :class="{ active: currentSortColumn == 'stock_adjustment_date' }">
                  <a href="javascript:void(0);" id="sort-by-stock_adjustment_date"
                    @click="sortItemsBy('stock_adjustment_date')">Adjusment date</a>
                </li>
                <li :class="{ active: currentSortColumn == 'reference_number' }">
                  <a href="javascript:void(0);" id="sort-by-reference_number"
                    @click="sortItemsBy('reference_number')">Reference Number</a>
                </li>
                <li :class="{ active: currentSortColumn == 'stock_adjustment_number' }">
                  <a href="javascript:void(0);" id="sort-by-stock_adjustment_number"
                    @click="sortItemsBy('stock_adjustment_number')">Adjusted number</a>
                </li>

              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12" style="padding-left: 0px">
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
                        <th>Status</th>
                        <th>Reason</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="history in list.items">
                        <td align="right">{{ history.stock_adjustment_date | date('short') }}</td>
                        <td>
                          <router-link :to="{ name: 'stock_adjustment.edit', params: { id: history.stock_adjustment_id } }">
                            {{ history.stock_adjustment_number }}
                          </router-link></td>
                        <td>#{{ history.reference_number }}</td>
                        <td>{{ history.status }}</td>
                        <td>
                          <span v-for="value in history.reason_summary" class="label label-info" style="margin-right: 5px;">
                            {{ value.line_count }} {{ value.reason_description }}
                          </span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <pagination :page-context="paginate" :result="list.items" @updated="updatePagination"></pagination>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import { getParameterByName } from 'src/helpers'

  export default {
    name: 'StockSummaryIndex',

    components: {
      Pagination: () => import('@/components/Pagination'),
    },

    data () {
      return {
        currentSortColumn: 'created',
        ascendingSort: 'asc',
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

      async getList (params = {}) {
        try {
          const defaultParams = {
            page: 1,
            per_page: 30,
            sort: 'stock_adjustment.create.asc',
            filter_by: '',
            q: getParameterByName('q'),
          }

          params = _.merge(defaultParams, params)

          const res = await Axios.get('stock_adjustments', {params: params})

          this.list.items = res.data.data
          this.paginate = res.data.paginate

        } catch (err) {
          console.error(err)
        }
      },

    },

  }
</script>
