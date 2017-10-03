<template>

  <!-- full list -->
  <div id="full-list">

    <!-- Mark as Active/Inactive -->
    <div class="container full-width-header p-b-10" v-if="checkedItems.length > 0">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="pull-left">
            <!--<a href="javascript:void(0);" id="mark-as-active" @click="markAsActive" class="btn btn-default waves-effect waves-light m-b-5">Mark as Active</a>-->
            <div class="btn-group">
              <button class="btn btn-default waves-effect waves-light m-b-5" id="more-actions" data-toggle="dropdown" aria-expanded="false">
                More Actions <i class="caret"></i>
              </button>
              <ul class="dropdown-menu" role="menu">
                <!--<li><a href="javascript:void(0);" id="mark-as-inactive" @click="markAsInactive">Mark as Inactive</a></li>-->
                <li><a href="javascript:void(0);" id="delete" @click="destroy">Delete</a></li>
              </ul>
            </div>
          </div>
          <div class="pull-right pt-10">
            <a href="javascript:void(0);" @click="clearCheckedItems" id="close-btn" class="close-btn">
              <i class="ion-android-close"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Mark as Active/Inactive END -->

    <div class="container full-width-header p-b-10" v-if="!checkedItems.length > 0">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <a href="javascript:void(0);" id="filter-by-toggle" class="dropdown-toggle pull-left page-title" data-toggle="dropdown">
            <h4>{{ displayCurrentFilter }} Items <span class="caret"></span></h4>
          </a>
          <ul class="dropdown-menu" role="menu" style="top: 35px;">
            <li class="dropdown-header">FILTER BY</li>
            <li :class="{ active: currentFilter == 'status_all' }">
              <a href="javascript:void(0);" id="filter-by-all" @click="filterItem('status_all')">All Item</a>
            </li>
            <!--<li :class="{ active: currentFilter == 'status_active' }">-->
              <!--<a href="javascript:void(0);" id="filter-by-active" @click="filterItem('status_active')">Active Item</a>-->
            <!--</li>-->
            <!--<li :class="{ active: currentFilter == 'status_inactive' }">-->
              <!--<a href="javascript:void(0);" id="filter-by-inactive" @click="filterItem('status_inactive')">Inactive Item</a>-->
            <!--</li>-->
          </ul>
          <div class="pull-right">
            <router-link id="create-new-item" :to="{ name: 'item.create' }" class="btn btn-info waves-light m-b-5">
              <span>New </span> <i class="ion-plus"></i>
            </router-link>
            <button id="more-action-list" class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown">
              <i class="fa fa-bars"></i>
            </button>
            <ul class="dropdown-menu" role="menu" style="top: 35px;">
              <li class="dropdown-header">SORT BY</li>
              <li :class="{ active: currentSortColumn == 'created_at' }"><a href="javascript:void(0);" id="sort-by-created" @click="sortItemsBy('created_at')">Created Time</a></li>
              <li :class="{ active: currentSortColumn == 'item_name' }"><a href="javascript:void(0);" id="sort-by-item_name" @click="sortItemsBy('item_name')">Name</a></li>
              <li class="divider"></li>
              <!--<li><a href="javascript:void(0);" id="item-preferences"><i class="md-settings"></i> Item Preferences</a></li>-->
              <!--<li><a href="javascript:void(0);" id="pricelist-settings"><i class="md-settings"></i> Pricelist Settings</a></li>-->
              <!--<li class="divider"></li>-->
              <li><a href="javascript:void(0);" id="refresh-list" @click="refreshList"><i class="md-refresh"></i> Refresh List</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container p-0">
      <div class="row sahito-list">
        <div class="col-md-12">
          <div class="sahito-list-item-group">



            <header class="table__header">
              <div class="row">
                <div class="col-xs-1">
                  <div class="checkbox checkbox-single checkbox-success">
                    <input type="checkbox" v-model="checkedAll" @click="checkAll" class="checkbox">
                    <label></label>
                  </div>
                </div>
                <div class="col-xs-4">
                  <a href="#" @click="sortItemsBy('item_name')">Name</a>
                  <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'item_name'"></i>
                  <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'item_name'"></i>
                </div>
                <div class="col-xs-2">
                  <a href="#" @click="sortItemsBy('description')">Description</a>
                  <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'description'"></i>
                  <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'description'"></i>
                </div>
                <div class="col-xs-2">
                  <a href="#" @click="sortItemsBy('sales_rate')">Price</a>
                  <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'sales_rate'"></i>
                  <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'sales_rate'"></i>
                </div>
                <!--<div class="col-xs-2">-->
                  <!--<a href="#" @click="sortItemsBy('inventory_stock')">Qty Available</a>-->
                  <!--<i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'inventory_stock'"></i>-->
                  <!--<i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'inventory_stock'"></i>-->
                <!--</div>-->
              </div>
            </header>



            <div class="table__body">
              <div class="table__item row" v-for="list in list.items" :key="list.item_id">

                <!-- Parent -->
                <div class="col-xs-1">
                  <div class="checkbox checkbox-single checkbox-success">
                    <input type="checkbox" :id="'list-' + list.item_id" :value="list.item_id" v-model="checkedItems" class="checkbox">
                    <label></label>
                  </div>
                </div>
                <div class="col-xs-4">

                  <a data-toggle="collapse" role="button" :href="'#item_list-' + list.item_id" class="collapsed" v-if="list.children.length > 0">
                    <i class="ion-chevron-right"></i>
                  </a>

                  <router-link :to="{ name: 'item.edit', params: { id: list.item_id } }">
                    {{ list.item_name }}
                  </router-link>
                </div>
                <div class="col-xs-2">
                  <div v-if="!list.children.length > 0">
                    {{ list.description }}
                  </div>
                  <div v-else>
                    &nbsp;
                  </div>
                </div>
                <div class="col-xs-2">

                  <!-- Price -->
                  <div v-if="!list.children.length > 0">

                    <inline-editable
                      :item="list"
                      name="sales_rate"
                      :value="list.sales_rate"
                      :url="'items/' + list.item_id + '/update_price'"
                      type="number"
                    ></inline-editable>

                  </div>
                  <div v-else>
                    &nbsp;
                  </div>
                  <!-- Price END -->

                </div>
                <!--<div class="col-xs-2">-->

                  <!--&lt;!&ndash; Quantity &ndash;&gt;-->
                  <!--<div v-if="!list.children.length > 0 && list.track_inventory">-->

                    <!--<inline-editable-->
                      <!--:item="list"-->
                      <!--name="inventory_stock"-->
                      <!--:value="list.inventory_stock"-->
                      <!--:url="`items/${list.item_id}/update_inventory_stock`"-->
                      <!--type="number"-->
                    <!--&gt;</inline-editable>-->

                  <!--</div>-->
                  <!--<div v-else>-->
                    <!--&nbsp;-->
                  <!--</div>-->
                  <!--&lt;!&ndash; Quantity END &ndash;&gt;-->

                <!--</div> &lt;!&ndash; .col-xs-2 &ndash;&gt;-->



                <!-- Children/Variants -->
                <div v-if="list.children.length > 0">
                  <div class="collapse" :id="'item_list' + list.item_id">
                    <div v-for="child in list.children" class="table__item table__item--children row">
                      <div class="row">
                        <div class="col-xs-1 text-center">
                          &nbsp;
                        </div>
                        <div class="col-xs-4">
                          <router-link :to="{ name: 'item.edit', params: { id: list.item_id } }">
                            {{ child.item_name }}
                          </router-link>
                        </div>
                        <div class="col-xs-2">
                          {{ child.code_sku }}
                        </div>
                        <div class="col-xs-2">

                          <!-- Price -->
                          <inline-editable
                            :item="child"
                            name="sales_rate"
                            :value="child.sales_rate"
                            :url="'items/' + child.item_id + '/update_price'"
                            type="number"
                          ></inline-editable>
                          <!-- Price END -->

                        </div>
                        <div class="col-xs-2">

                          <!-- Quantity -->
                          <div v-if="child.track_inventory">
                            <inline-editable
                              :item="child"
                              name="inventory_stock"
                              :value="child.inventory_stock"
                              :url="`items/${child.item_id}/update_inventory_stock`"
                              type="number"
                            ></inline-editable>
                          </div>
                          <!-- Quantity END -->

                        </div> <!-- .col-xs-2 -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Children/Variants END -->






              </div> <!-- .table__item.row -->
            </div> <!-- .table__body -->


            <pagination :page-context="paginate" :result="list.items" @updated="updatePagination"></pagination>


          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { getParameterByName } from 'src/helpers'

  export default {

    components: {
      'inline-editable': require('../../Helpers/InlineEditable.vue'),
      Pagination: require('../../Pagination'),
    },

    watch: {
      '$route' (to, from) {
        if (to.query.q) {
          this.getList({ q: to.query.q})
        } else {
          this.getList()
        }
      }
    },

    data() {
      return {
        list: {
          items: []
        },
        paginate: {},
        selectedItem: {},
        checkedAll: false,
        checkedItems: [],
        currentSortColumn: 'item_name',
        ascendingSort: true,
        currentFilter: 'status_all',
      };
    },

    mounted() {
      this.getList()
    },

    computed: {
      isChecked() {
        if (_.isEmpty(this.checkedItems)) {
          return false
        }
        return true
      },

      displayCurrentFilter() {
        if (this.currentFilter === 'status_all') return 'All';
        if (this.currentFilter === 'status_active') return 'Active';
        if (this.currentFilter === 'status_inactive') return 'Inactive';
      }
    },

    methods: {

      /**
       * Check all items
       */
      checkAll() {
        if (this.checkedItems.length < this.list.items.length) {
          this.checkedAll = true
          this.list.items.map(item => {
            this.checkedItems.push(item.item_id)
          })
        } else {
          this.checkedAll = false
          this.checkedItems = []
        }
      },


      /**
       * Clear all checked items
       */
      clearCheckedItems() {
        this.checkedAll = false
        this.checkedItems = []
      },


      refreshList() {
        this.list.items = []
        this.getList({
          currentFilter: this.currentFilter,
          sort: `${this.currentSortColumn}.${this.ascendingSort ? 'asc' : 'desc' }`
        })
      },


      /**
       * Get item list
       * @param  {Object} params  Custom query string parameters
       */
       getList(params) {
         const defaultParams = {
           page: 1,
           per_page: 30,
           sort: 'item_name.asc',
           filter_by: 'status_all',
           q: getParameterByName('q'),
         }

         params = _.merge(defaultParams, params)

         this.$http.get('items', { params: params }).then(res => {
           if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

           this.list.items = res.data.data
           this.paginate = res.data.paginate

         }, res => {
           return swal_error(res)
         })
       },


      /**
       * Delete multiple items
       * @param  {string|number} ids  Separate id by comma (e.g ids=2,4,5)
       */
       destroy() {
         Alert.confirm({
           title: 'Do you really want to delete this item?',
           text: 'The item will be deleted permanently.',
         }, () => {
           const ids = this.checkedItems.join(',')

           this.$http.delete(`items?ids=${ids}`).then(res => {
             if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

             this.clearCheckedItems()
             this.list.items = []
             this.refreshList()
             Alert.success(res.data.message)

           }, res => {
             return swal_error(res)
           })
         })
       },


      /**
       * Mark all checked items status to active
       */
       markAsActive() {
         const payload = this.checkedItems.join(',')

         this.$http.post('items/mark_as/active', { ids: payload })
         .then(res => {
           if (res.data.code == 0) {
             this.list.items = []
             this.getList()
             this.clearCheckedItems()
             this.selectedItem.item_status = 1
             swal_success(res)
           } else {
             swal_error(res)
           }
         }, res => {
           swal_error(res)
         })
       },


      /**
       * Mark multiple items status to inactive
       */
       markAsInactive() {
         const payload = this.checkedItems.join(',')

         this.$http.post('items/mark_as/inactive', { ids: payload })
         .then(res => {
           if (res.data.code == 0) {
             this.list.items = []
             this.getList()
             this.clearCheckedItems()
             this.selectedItem.item_status = 0
             swal_success(res)
           } else {
             swal_error(res)
           }
         }, res => {
           swal_error(res)
         })
       },


       sortItemsBy(column) {
         let ascendingSort

         this.currentSortColumn = column
         this.ascendingSort = !this.ascendingSort

         if (this.ascendingSort) {
           ascendingSort = 'asc'
         } else {
           ascendingSort = 'desc'
         }

         this.getList({ sort: `${column}.${ascendingSort}` })
       },


       filterItem(filter) {
         this.getList({ filter_by: filter })
         this.currentFilter = filter
       },


      updatePagination(data) {
        this.paginate = data.paginate
        this.list.items = data.data
      }


     },


     events: {


       listenSearch(search) {
         this.getList({
           q: search.text,
         })
       },


     },
   }
 </script>


<style scoped>
  .table__header {
    font-weight: bold;
    font-size: 0.9em;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 4px 0;
    color: #666;
  }

  .table__body {
  }

  .table__item {
    border-bottom: 1px solid #ddd;
    padding: 12px 0;
  }

  .table__item--children {
    border-bottom: 1px solid #ddd;
    padding: 12px 0 12px;
  }

  .table__item--children:first-child {
    border-top: 1px solid #ddd;
    margin-top: 40px;
  }

  [data-toggle="collapse"].collapsed i {
    transform: rotate(0deg);
    margin-right: 10px;
  }

  [data-toggle="collapse"] i {
    transform: rotate(90deg);
    margin-right: 10px;
  }
</style>
