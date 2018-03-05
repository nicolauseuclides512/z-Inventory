<template>
  <div class="content-page">
    <div class="content full-width sahito-user bgr-white">
      <div class="container">
        <div>
          <div v-if="!list.items.length" class="text-center" style="color: #a9a9a9; padding-top: 60px;">
            <i class="fa fa-5x fa-archive"></i>
            <div class="lead" style="padding: 30px 0 5px;">
              <small>You haven't made any item yet. </small><br>
              Add your first item!
            </div>
            <div>
              <router-link id="create-new-item" :to="{ name: 'item.create' }" class="btn btn-info waves-light m-b-5">
                <i class="ion-plus"></i> <span>Create Item</span>
              </router-link>
              <router-link id="create-new-item-variant" :to="{ name: 'item.create_variant' }"
                           class="btn btn-info waves-light m-b-5">
                <i class="ion-plus"></i> <span>Create Variant Item</span>
              </router-link>
            </div>
          </div>

          <!-- full list -->
          <div id="full-list" v-if="list.items.length">
            <!-- Mark as Active/Inactive -->
            <div class="container full-width-header p-b-10" v-if="checkedItems.length">
              <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <div class="pull-left">
                    <!--<a href="javascript:void(0);" id="mark-as-active" @click="markAsActive" class="btn btn-default waves-effect waves-light m-b-5">Mark as Active</a>-->
                    <div class="btn-group">
                      <button
                        class="btn btn-default waves-effect waves-light m-b-5"
                        id="more-actions"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
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

            <div class="container full-width-header p-b-10" v-if="!checkedItems.length">
              <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <a href="javascript:void(0);" id="filter-by-toggle" class="dropdown-toggle pull-left page-title"
                     data-toggle="dropdown">
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
                      <i class="ion-plus"></i> <span>Create Item</span>
                    </router-link>
                    <router-link id="create-new-item-variant" :to="{ name: 'item.create_variant' }"
                                 class="btn btn-info waves-light m-b-5">
                      <i class="ion-plus"></i> <span>Create Variant Item</span>
                    </router-link>
                    <button id="more-action-list" class="btn btn-default waves-effect waves-light m-b-5"
                            data-toggle="dropdown">
                      <i class="fa fa-bars"></i>
                    </button>
                    <ul class="dropdown-menu" role="menu" style="top: 35px;">
                      <li class="dropdown-header">SORT BY</li>
                      <li :class="{ active: currentSortColumn == 'created_at' }">
                        <a href="javascript:void(0);" id="sort-by-created" @click="sortItemsBy('created_at')">Created Time</a>
                      </li>
                      <li :class="{ active: currentSortColumn == 'item_name' }">
                        <a href="javascript:void(0);" id="sort-by-item_name" @click="sortItemsBy('item_name')">Name</a>
                      </li>
                      <li class="divider"></li>
                      <!--<li><a href="javascript:void(0);" id="item-preferences"><i class="md-settings"></i> Item Preferences</a></li>-->
                      <!--<li><a href="javascript:void(0);" id="pricelist-settings"><i class="md-settings"></i> Pricelist Settings</a></li>-->
                      <!--<li class="divider"></li>-->
                      <li>
                        <a href="javascript:void(0);" id="refresh-list" @click="refreshList">
                          <i class="md-refresh"></i> Refresh List
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="container p-0">
              <div class="row sahito-list">
                <div class="col-md-12 p-0">
                  <div class="sahito-list-item-group border-1 table-responsive">
                     <table class="table table-hover default-table sahito-list-contact--table table-striped">
                      <thead>
                        <tr>
                          <th class="col-checkbox" style="width: 5%">
                            <div class="checkbox checkbox-single checkbox-success">
                              <input type="checkbox" id="checkAll" @click="checkAll">
                              <label></label>
                            </div>
                          </th>
                          <th></th>
                          <th style="width: 25%">
                            <a href="#" @click="sortItemsBy('item_name')" >Name</a>
                            <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'item_name'"></i>
                            <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'item_name'"></i>
                          </th>
                          <th class="text-center" style="width: 10%">
                            <a href="#" @click="sortItemsBy('description')">SKU</a>
                            <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'sku'"></i>
                            <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'sku'"></i>
                          </th>
                          <th style="width: 25%">
                            <a href="#" @click="sortItemsBy('description')">Description</a>
                            <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'description'"></i>
                            <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'description'"></i>
                          </th>
                          <th class="text-center" style="width: 15%">
                            <a href="#" @click="sortItemsBy('inventory_stock')" >Stock Available</a>
                            <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'inventory_stock'"></i>
                            <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'inventory_stock'"></i>
                          </th>
                          <th class="text-left" style="width: 20%">
                            <a href="#" @click="sortItemsBy('sales_rate')">Price</a>
                            <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'sales_rate'"></i>
                            <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'sales_rate'"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody v-for="item in list.items" :key="item.item_id">
                      <tr>
                        <td class="col-checkbox">
                          <span class="checkbox checkbox-single checkbox-success">
                            <input type="checkbox" :id="'list-' + item.item_id" :value="item.item_id" v-model="checkedItems"
                                   class="checkbox">
                            <label></label>
                          </span>
                        </td>
                        <td>
                          <a href="javascript:void(0)" v-if="item.children.length" @click="toggleChildren(item)">
                            <i class="ion-chevron-right" v-if="!item.expanded"></i>
                            <i class="ion-chevron-down" v-if="item.expanded"></i>
                          </a>
                        </td>
                        <td>
                          <router-link v-if="item.children.length"
                                       :to="{ name: 'item.edit_variant', params: { id: item.item_id } }">
                            {{ item.item_name }}
                          </router-link>
                          <router-link v-if="!item.children.length" :to="{ name: 'item.edit', params: { id: item.item_id } }">
                            {{ item.item_name }}
                          </router-link>
                        </td>
                        <td class="text-center">
                          {{ item.code_sku ? item.code_sku : '-' }}
                        </td>
                        <td><span v-if="!item.children.length">{{ item.description }}</span></td>
                        <td class="text-center">
                          <span v-if="!item.children.length && !item.track_inventory">
                            <inline-editable
                              :item="item"
                              name="stock_quantity"
                              :value="item.stock_quantity"
                              :url="`items/${item.item_id}/update_inventory_stock`"
                              type="number"
                            ></inline-editable>
                          </span>
                          <span v-if="item.track_inventory">
                            <inline-editable
                              :item="item"
                              name="stock_quantity"
                              :value="item.stock_quantity"
                              :url="`items/${item.item_id}/update_inventory_stock`"
                              type="number"
                            ></inline-editable>
                          </span>
                        </td>
                        <td class="text-left">
                          <span v-if="!item.children.length">
                            <inline-editable
                              :item="item"
                              name="sales_rate"
                              :value="item.sales_rate | money"
                              :url="'items/' + item.item_id + '/update_price'"
                              type="number"
                            ></inline-editable>
                          </span>
                        </td>
                      </tr>

                      <tr v-if="item.expanded" v-for="child in item.children">
                        <td class="col-checkbox" style="width: 46px">
                          <div class="checkbox checkbox-single checkbox-success">
                          </div>
                        </td>
                        <td class="col-icon_collapse" style="width: 23px">
                        </td>
                        <td class="name">{{ child.item_name }}</td>
                        <td class="sku">{{ child.code_sku }}</td>
                        <td>{{ child.description }}</td>
                        <td class="available">{{ child.stock_quantity }}</td>
                        <td>{{ child.sales_rate | money }}</td>
                      </tr>

                      </tbody>
                    </table>

                    <pagination :page-context="paginate" :result="list.items" @updated="updatePagination"></pagination>

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
import { getParameterByName } from "src/helpers";

export default {
  components: {
    "inline-editable": () => import("../../Helpers/InlineEditable.vue"),
    Pagination: () => import("../../Pagination")
  },

  watch: {
    $route(to, from) {
      if (to.query.q) {
        this.getList({ q: to.query.q });
      } else {
        this.getList();
      }
    }
  },

  data() {
    return {
      itemChildren: null,
      list: {
        items: []
      },
      paginate: {},
      selectedItem: {},
      checkedAll: false,
      checkedItems: [],
      currentSortColumn: "item_name",
      ascendingSort: true,
      currentFilter: "status_all"
    };
  },

  mounted() {
    this.getList();
  },

  computed: {
    isChecked() {
      if (_.isEmpty(this.checkedItems)) {
        return false;
      }
      return true;
    },

    displayCurrentFilter() {
      if (this.currentFilter === "status_all") return "All";
      if (this.currentFilter === "status_active") return "Active";
      if (this.currentFilter === "status_inactive") return "Inactive";
    }
  },

  methods: {
    /**
       * Check all items
       */
    checkAll() {
      if (this.checkedItems.length < this.list.items.length) {
        this.checkedAll = true;
        this.list.items.map(item => {
          this.checkedItems.push(item.item_id);
        });
      } else {
        this.checkedAll = false;
        this.checkedItems = [];
      }
    },

    /**
       * Clear all checked items
       */
    clearCheckedItems() {
      this.checkedAll = false;
      this.checkedItems = [];
    },

    refreshList() {
      this.list.items = [];
      this.getList({
        currentFilter: this.currentFilter,
        sort: `${this.currentSortColumn}.${this.ascendingSort ? "asc" : "desc"}`
      });
    },

    /**
       * Get item list
       * @param  {Object} params  Custom query string parameters
       */
    getList(params) {
      const defaultParams = {
        page: 1,
        per_page: 30,
        sort: "item_name.asc",
        filter_by: "status_all",
        q: getParameterByName("q")
      };

      params = _.merge(defaultParams, params);

      this.$http.get("items", { params: params }).then(
        res => {
          if ([0, 200, 201].indexOf(res.data.code) === -1)
            return swal_error(res);

          this.list.items = res.data.data;
          this.paginate = res.data.paginate;
        },
        res => {
          return swal_error(res);
        }
      );
    },

    /**
       * Delete multiple items
       * @param  {string|number} ids  Separate id by comma (e.g ids=2,4,5)
       */
    destroy() {
      Alert.confirm(
        {
          title: "Do you really want to delete this item?",
          text: "The item will be deleted permanently."
        },
        () => {
          const ids = this.checkedItems.join(",");

          this.$http.delete(`items?ids=${ids}`).then(
            res => {
              if ([0, 200, 201].indexOf(res.data.code) === -1)
                return swal_error(res);

              this.clearCheckedItems();
              this.list.items = [];
              this.refreshList();
              Alert.success(res.data.message);
            },
            res => {
              return swal_error(res);
            }
          );
        }
      );
    },

    toggleChildren(item) {
      if (item.hasOwnProperty("expanded")) {
        return this.$set(item, "expanded", !Boolean(item.expanded));
      }

      this.$set(item, "expanded", true);
    },

    /**
       * Mark all checked items status to active
       */
    markAsActive() {
      const payload = this.checkedItems.join(",");

      this.$http.post("items/mark_as/active", { ids: payload }).then(
        res => {
          if (res.data.code == 0) {
            this.list.items = [];
            this.getList();
            this.clearCheckedItems();
            this.selectedItem.item_status = 1;
            swal_success(res);
          } else {
            swal_error(res);
          }
        },
        res => {
          swal_error(res);
        }
      );
    },

    /**
       * Mark multiple items status to inactive
       */
    markAsInactive() {
      const payload = this.checkedItems.join(",");

      this.$http.post("items/mark_as/inactive", { ids: payload }).then(
        res => {
          if (res.data.code == 0) {
            this.list.items = [];
            this.getList();
            this.clearCheckedItems();
            this.selectedItem.item_status = 0;
            swal_success(res);
          } else {
            swal_error(res);
          }
        },
        res => {
          swal_error(res);
        }
      );
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
    },

    filterItem(filter) {
      this.getList({ filter_by: filter });
      this.currentFilter = filter;
    },

    updatePagination(data) {
      this.paginate = data.paginate;
      this.list.items = data.data;
    }
  },

  events: {
    listenSearch(search) {
      this.getList({
        q: search.text
      });
    }
  }
};
</script>


<style scoped>
tbody {
  border: 0 !important;
}

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
