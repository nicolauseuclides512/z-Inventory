<template>
  <div>

    <form method="POST">

      <div id="full-list">

        <div class="container full-width-header p-b-10">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12" v-show="!checkedItems.length > 0">
              <a href="javascript:void(0);" id="filter-dropdown" class="dropdown-toggle pull-left page-title" data-toggle="dropdown"
                 aria-expanded="false">
                <h4>{{ getCurrentFilter }} Discounts <span class="caret"></span> </h4>
              </a>
              <ul class="dropdown-menu" role="menu" style="top: 35px;">
                <li><a href="javascript:void(0);" id="filter-by-all" @click="filterBy('all')">All</a></li>
                <li><a href="javascript:void(0);" id="filter-by-sale" @click="filterBy('discount')">Price List Sale</a></li>
                <li><a href="javascript:void(0);" id="filter-by-coupon" @click="filterBy('coupon')">Coupon</a></li>
                <li><a href="javascript:void(0);" id="filter-by-enabled" @click="filterBy('enabled')">Enabled</a></li>
                <li><a href="javascript:void(0);" id="filter-by-disabled" @click="filterBy('disabled')">Disabled</a></li>
                <li><a href="javascript:void(0);" id="filter-by-expired" @click="filterBy('expired')">Expired</a></li>
              </ul>
              <div class="pull-right">
                <router-link id="add-new-discount"
                             :to="{ name: 'discount.add_promo' }"
                             class="btn btn-info waves-effect waves-light m-b-5"
                >
                  Add Promo <i class="ion-plus"></i>
                </router-link>
                <router-link id="add-new-coupon"
                             :to="{ name: 'discount.add_coupon' }"
                             class="btn btn-info waves-effect waves-light m-b-5"
                >
                  Add Coupon <i class="ion-plus"></i>
                </router-link>
              </div>
            </div>

            <div class="col-md-12 col-sm-12 col-xs-12" v-show="checkedItems.length > 0">
              <div class="pull-left">
                <a href="javascript:void(0);" @click="markAsEnabled" class="btn btn-default waves-effect waves-light m-b-5">Mark as Enable</a>
                <div class="btn-group">
                  <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown"
                          aria-expanded="false">
                    More Actions <i class="caret"></i>
                  </button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a href="javascript:void(0);" @click="markAsDisabled">Mark as Disabled</a></li>
                    <li><a href="javascript:void(0);" @click="destroy">Delete</a></li>
                  </ul>
                </div>
              </div>
              <div class="pull-right pt-10">
                <a href="javascript:void(0);" id="close-btn" class="close-btn">
                  <i class="ion-android-close"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="container p-0">
          <div class="row sahito-list">
            <div class="col-md-12">
              <div class="sahito-list-item-group border-1 table-responsive">
                <table class="table table-hover default-table sahito-list-discount-list--table">
                  <thead>
                  <tr>
                    <th class="col-checkbox">
                      <div class="checkbox checkbox-single checkbox-success">
                        <input type="checkbox" v-model="checkedAll" @click="checkAll">
                        <label></label>
                      </div>
                    </th>
                    <th>Promo name</th>
                    <th>Type</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Used</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="discount in list.discounts" :class="{ highlight: checkedItems.indexOf(discount.discount_id) != -1 }">
                    <td class="col-checkbox">
                      <div class="checkbox checkbox-single checkbox-success">
                        <input type="checkbox" :value="discount.discount_id" v-model="checkedItems">
                        <label></label>
                      </div>
                    </td>
                    <td>
                      <div :class="{ 'inactive': showLabel(discount) }">
                        <div class="title">{{ discount.name }}</div>

                        <span class="label label-inactive" v-show="showLabel(discount)">
                          {{ showLabel(discount) }}
                        </span>

                        <p>{{ discount.description }}</p>
                      </div>
                    </td>
                    <td>
                      {{ discount.discount_type }}
                    </td>
                    <td>{{ discount.start_date | date('DD MMM YYYY, hh:mm a') }}</td>
                    <td>{{ discount.end_date | date('DD MMM YYYY, hh:mm a') }}</td>
                    <td>
                      <div v-if="discount.type == 'coupon'">
                        {{ discount.used }} / {{ discount.limit }}
                      </div>
                      <div v-else>
                        {{ discount.used }}
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <pagination :page-context="page_context" :result="list.discounts" @updated="updatePagination"></pagination>

      <div id="delete_discount" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true" style="display: none">
        <div class="modal-dialog sahito-modal">
          <div class="modal-content p-0">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4>Delete Discount "Summer Sale"?</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <p>Are you sure you want to delete the discount "Summer Sale"? This action cannot be reversed.</p>
                </div>
              </div>
            </div>
            <div class="modal-footer p-20 text-center">
              <button type="button" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger waves-effect waves-light m-t-15" @click="destroy(discount)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
  import isAfter from 'date-fns/is_after'
  import Pagination from '../Pagination'

  export default {
    name: 'DiscountList',

    components: {
      Pagination
    },

    data() {
      return {
        page_context: {},
        selectedItem: {},
        checkedAll: false,
        checkedItems: [],
        currentSortColumn: 'name',
        ascendingSort: true,
        currentFilter: 'all',

        list: {
          discounts: []
        }
      }
    },


    computed: {
      getCurrentFilter() {
        const label = "" + this.currentFilter

        return label.charAt(0).toUpperCase() + label.replace(/_/, ' ').slice(1);
      }
    },


    mounted() {
      this.getList();
    },


    methods: {

      /**
       * Get list
       */
      getList(options) {
        const defaultOptions = {
          page: 1,
          sort_column: 'name',
          sort_order: 'asc',
          filter_by: 'all',
          per_page: 25,
        }

        const params = _.merge(defaultOptions, options)

        this.$http.get('discounts', { params: params })
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) {
              return swal_error(res)
            }

            this.list.discounts = res.data.data
            this.page_context = res.data.page_context

          }, res => {
            swal_error(res)
          })
      },


      /**
       * Filter list
       */
      filterBy(filter) {
        this.currentFilter = filter
        this.getList({ filter_by: filter })
      },


      /**
       * Check all items
       */
      checkAll() {
        if (!this.checkedAll) {
          this.checkedAll = true;
          console.log(this.list.discounts)
          _.each(this.list.discounts, (item, key) => {
            this.checkedItems.push(item.discount_id);
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


      /**
       * Mark selected items to enabled
       */
      markAsEnabled() {
        this.$http.post('discounts/mark_as/enabled', { ids: this.checkedItems.join(',') })
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

            this.clearCheckedItems()
            this.getList()

            return swal_success(res)

          }, res => {
            return swal_error(res)
          })
      },


      /**
       * Mark selected items to disabled
       */
      markAsDisabled() {
        this.$http.post('discounts/mark_as/disabled', { ids: this.checkedItems.join(',') })
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

            this.clearCheckedItems()
            this.getList()

            return swal_success(res)

          }, res => {
            return swal_error(res)
          })
      },

      /**
       * Delete selected items
       */
      destroy() {
        Alert.confirm({
          title: 'Are you sure you want to delete all selected discount(s)?',
          text: 'Deleted discount(s) cannot be recovered. Do you still want to continue?',
        }, () => {
          this.$http.delete('discounts', { params: { ids: this.checkedItems.join(',') }})
            .then(res => {
              if (res.data.code == 0) {

                this.clearCheckedItems()
                this.getList();

                swal_success(res);

              } else {
                swal_error(res);
              }
            }, res => {
              swal_error(res);
            });
        })

      },


      /**
       * Show discount label
       * @param  {Object}  discount
       * @return {String}  Expired or disabled
       */
      showLabel(discount) {
        // Expired have higher priority than disabled
        if (isAfter(discount.end_date)) {
          return 'expired'
        }

        if (! discount.discount_status) {
          return 'disabled'
        }

        return ''
      },


      updatePagination(data) {
        this.page_context = data.page_context
        this.list.discounts = data.data
      }

    }
  }
</script>

<style>
  .highlight,
  .highlight:hover {
    background: #e9e9e9 !important;
  }

  .inactive > .title {
    text-decoration: line-through;
    color: #a0a0a0;
    display: inline-block;
  }

  .inactive > label {
    padding: 0;
    line-height: 0;
    vertical-align: top;
    text-transform: capitalize;
  }
</style>
