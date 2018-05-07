<template>
  <div class="content-page-full content-wrapper" style="min-height:350px">
    <div class="content sahito-user inner-content-wrapper">
      <div class="container" style="padding: 0; margin: 0;">
        <div class="row">
          <div class="col-md-12" style="padding-left: 0;">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row">
                <div class="col-sm-12" style="padding: 0 10px 10px 0;">
                  <a class="pull-left page-title" data-toggle="dropdown" aria-expanded="false">
                    <h4 class="title-wrapper">Stock Adjustment</h4>
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
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <table class="table table-hover sahito-list-contact--table">
                      <thead>
                      <tr>
                        <th>Date</th>
                        <th></th>
                        <th>Adjustment ID</th>
                        <th>Reference Number</th>
                        <th>Status</th>
                        <th class="outer-head-reason">Reason</th>
                      </tr>
                      </thead>
                      <tbody>
                        <template v-for="groupItem in list.stockAdj">
                            <tr>
                              <td>{{ groupItem.stock_adjustment_date | date('short') }}</td>
                              <td>
                                <a href="javascript:void(0);" @click="expandGroup(groupItem.stock_adjustment_id)">
                                  <i v-if="groupExpanded == groupItem.stock_adjustment_id" class="ion-minus-round text-green"></i>
                                  <i v-else class="ion-plus-round text-green"></i>
                                </a>
                              </td>
                              <td v-if="groupItem.reason_summary.reason_description">
                                <router-link :to="{ name: 'stock_adjustment.edit', params: { id: groupItem.stock_adjustment_id } }">
                                    {{ groupItem.stock_adjustment_number }}
                                </router-link></td>
                              <td v-if="!groupItem.reason_summary.reason_description">{{ groupItem.stock_adjustment_number }}</td>
                              <td v-if="groupItem.reference_number">#{{ groupItem.reference_number }}</td>
                              <td v-if="!groupItem.reference_number">-</td>
                              <td>{{ groupItem.status }}</td>
                              <td v-if="groupItem.reason_summary[0].reason_description">
                                <span v-for="(groupItem,index) in groupItem.reason_summary" v-if="groupItem.reason_description" class="label label-info" style="margin-right: 5px;" :key="index">
                                  {{ groupItem.line_count }} {{ groupItem.reason_description }}
                                </span>
                              </td>
                              <td v-if="!groupItem.reason_summary[0].reason_description">
                                <span class="label label-default" style="margin-right: 5px;">Free Adjust to add stock</span></td>
                            </tr>
                            <tr class="expandable" v-if="groupExpanded == groupItem.stock_adjustment_id">
                              <td colspan="6" class="p-0 bt-0">
                                  <table class="table sales-order-inner-table">
                                      <tbody>
                                          <tr>
                                              <td style="width: 230px; vertical-align:top;">
                                              </td>
                                              <td rowspan="3">
                                                  <div class="border-1 table-responsive">
                                                      <table class="table sales-order-inner-table">
                                                          <thead>
                                                              <tr>
                                                                  <th class="text-left inner-head-name">Item</th>
                                                                  <th class="text-left inner-head-qty">Qty Adjusted</th>
                                                                  <th class="text-left inner-head-qty2">Qty on Hand</th>
                                                                  <th class="text-left inner-head-reason"> Reason</th>
                                                              </tr>
                                                          </thead>
                                                          <tbody>
                                                              <tr v-for="(itm, index) in groupItem.stock_adjustment_details" :key="index">
                                                                  <td>{{itm.item.item_name}}</td>
                                                                  <td>{{itm.adjust_qty}}</td>
                                                                  <td>{{itm.on_hand_qty}}</td>
                                                                  <td>{{itm.reason.reason}}</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </div>
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
import Axios from "axios";
import { getParameterByName } from "src/helpers";

export default {
  name: "StockAdjustmentIndex",

  components: {
    Pagination: () => import("@/components/Pagination")
  },
  data() {
    return {
      groupExpanded: 0,
      currentSortColumn: "created_at",
      ascendingSort: "asc",
      paginate: {},
      list: {
        items: [],
        stockAdj:[]
      }
    };
  },

  mounted() {
    this.initialize();
  },
  methods: {

    expandGroup(id){
      if( id == this.groupExpanded){
        this.groupExpanded = 0
      }else{
        this.groupExpanded = id
      }
    },

    async initialize() {
      this.getList();
    },

    async getList(params = {}) {
      try {
        const defaultParams = {
          page: 1,
          per_page: 15,
          sort: "created_at.asc",
          filter_by: "all",
          q: getParameterByName("q")
        };

        params = _.merge(defaultParams, params);

        for (let key in params) {
          if (params.hasOwnProperty(key) && !params[key]) {
            delete params[key];
          }
        };
        const res = await Axios.get('stock_adjustments', {
          params: params
        });
        this.list.stockAdj = res.data.data;
        this.paginate = res.data.paginate;
      } catch (err) {
        console.error(err);
      }
    },

    refreshList() {
      this.list.items = [];
      this.getList({
        currentFilter: this.currentFilter,
        sort: `${this.currentSortColumn}.${this.ascendingSort ? "asc" : "desc"}`
      });
    },

    async updatePagination(data) {
      this.paginate = data.paginate;
      this.list.items = data.data;
    },

    sortItemsBy(column) {
      let ascendingSort;

      this.currentSortColumn = column;
      this.ascendingSort = !this.ascendingSort;

      if (this.ascendingSort) {
        ascendingSort = "asc";
      } else {
        ascendingSort = "desc";
      }

      this.getList({ sort: `${column}.${ascendingSort}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.expandable-wrapper{
  font-size:1em;
  background-color: #eee
}
.content-wrapper {
  padding: 0px;
}
.inner-content-wrapper{
  padding:0px;
}
.title-wrapper {
  padding-left: 12px;
}
.outer-head-reason{
  width:280px
}
.inner-head-name{
  color:#000000;
  font-size: 1em;
  font-weight:400;
  background-color:#eee;
  padding-top: 12px;
  padding-bottom: 10px;
  width: 300px
}
.inner-head-qty{
  color:#000000;
  font-size: 1em;
  font-weight:400;
  background-color:#eee;
  padding-top: 12px;
  padding-bottom: 10px
}
.inner-head-qty2{
  color:#000000;
  font-size: 1em;
  font-weight:400;
  background-color:#eee;
  padding-top: 12px;
  padding-bottom: 10px
}
.inner-head-reason{
  color:#000000;
  font-size: 1em;
  font-weight:400;
  background-color:#eee;
  padding-top: 12px;
  padding-bottom: 10px;
  width:280px
}
</style>
