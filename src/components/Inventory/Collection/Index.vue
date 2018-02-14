<template>
  <div class="content-page">
    <div class="content full-width sahito-user bgr-white">
      <div class="container">
        <div id="full-list">
          <div class="container full-width-header bt-1 p-b-10">
            <div class="row">

              <!-- Default bar -->
              <div class="col-md-12 col-sm-12 col-xs-12" v-if="checkedItems.length == 0">
                <a href="javascript:void(0);" id="filter-by-toggle" class="dropdown-toggle pull-left page-title" data-toggle="dropdown" aria-expanded="false">
                  <h4> {{ currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1) }} Collections
                    <span class="caret"></span>
                  </h4>
                </a>
                <ul class="dropdown-menu" role="menu" style="top: 35px;">
                  <li :class="{ active: currentFilter == 'all' }"><a href="javascript:void(0);" id="filter-by-all" @click="filterBy('all')">All Collections</a></li>
                  <li :class="{ active: currentFilter == 'published' }"><a href="javascript:void(0);" id="filter-by-published" @click="filterBy('published')">Published Collections</a></li>
                  <li :class="{ active: currentFilter == 'hidden' }"><a href="javascript:void(0);" id="filter-by-hidden" @click="filterBy('hidden')">Hidden Collections</a></li>
                </ul>

                <div class="pull-right">
                  <router-link :to="{ name: 'collection.create' }" class="btn btn-info waves-effect waves-light m-b-5">
                    <span>New </span> <i class="ion-plus"></i>
                  </router-link>
                </div>
              </div>

              <!-- Show this bar if box checked -->
              <div class="col-md-12 col-sm-12 col-xs-12" v-if="checkedItems.length > 0">
                <div class="pull-left">
                  <div class="btn-group">
                    <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown" aria-expanded="false">
                      Mark As <i class="caret"></i>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                      <li><a href="javascript:void(0);" @click="markAsPublished">Published</a></li>
                      <li><a href="javascript:void(0);" @click="markAsHidden">Hidden</a></li>
                    </ul>
                  </div>
                  <a href="javascript:void(0);" class="btn btn-danger waves-effect waves-light m-b-5" @click="destroy">
                    Delete Collections
                  </a>
                </div>
                <div class="pull-right pt-10">
                  <a href="javascript:void(0);" @click="clearCheckedItems" class="close-btn">
                    <i class="ion-android-close"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>
          <div class="container p-0">
            <div class="row sahito-list">
              <div class="col-md-12">
                <div class="sahito-list-contact border-1 table-responsive">
                  <table class="table table-hover default-table sahito-list-contact--table">
                    <thead>
                    <tr>
                      <th class="col-checkbox">
                        <div class="checkbox checkbox-single checkbox-success">
                          <input type="checkbox" v-model="checkedAll" @click="checkAll">
                          <label></label>
                        </div>
                      </th>
                      <th>Name</th>
                      <th>Conditions</th>
                      <th>Visibility</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="collection in list.collection">
                      <td class="col-checkbox">
                        <div class="checkbox checkbox-single checkbox-success">
                          <input type="checkbox" :value="collection.item_collection_id" v-model="checkedItems">
                          <label></label>
                        </div>
                      </td>
                      <td>
                        <router-link :to="{ name: 'collection.edit', params: { id: collection.item_collection_id } }">
                          {{ collection.name }}
                        </router-link>
                      </td>
                      <td>
                        <div v-for="condition in collection.conditions">
                          <p>
                            {{ displayCondition(condition.type) | capitalize }}
                            {{ displayCondition(condition.rule) | capitalize }}
                            {{ displayCondition(condition.value) | capitalize }}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div v-if="collection.visibility.online_store">
                          <span class="label label-success">Published</span>
                        </div>
                        <div v-if="! collection.visibility.online_store">
                          <p><span class="label label-default">Hidden</span></p>
                          <a href="javascript:void(0);">Will be published on: {{ collection.publish_time | date('short') }}</a>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-md-12 pr-20 text-right">
                <pagination :page-context="page_context" :result="list.collection" @updated="updatePagination"></pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import isEmpty from 'lodash/isEmpty'
  import Pagination from '../../Pagination'

  export default {
    name: 'CollectionList',

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
          collection: []
        }
      }
    },

    mounted() {
      this.getList()
    },


    methods: {

      displayCondition(val) {
        if (! isEmpty(val)) {
          return val.split('_').join(' ')
        }

        return ''
      },

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

        this.$http.get('collections', { params: params })
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) {
              return swal_error(res)
            }

            this.list.collection = res.data.data
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
          _.each(this.list.collection, (item, key) => {
            this.checkedItems.push(item.item_collection_id);
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
       * Mark checked items to published
       */
      markAsPublished() {
        const data = {
          ids: this.checkedItems.join(',')
        }

        this.$http.post('collections/mark_as/publish', data)
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

            this.filterBy(this.currentFilter)
            this.clearCheckedItems()
            swal_success(res)

          }, res => {
            swal_error(res)
          })
      },


      /**
       * Mark checked items to hidden
       */
      markAsHidden() {
        const data = {
          ids: this.checkedItems.join(',')
        }

        this.$http.post('collections/mark_as/hidden', data)
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

            this.filterBy(this.currentFilter)
            this.clearCheckedItems()
            swal_success(res)

          }, res => {
            swal_error(res)
          })
      },


      /**
       * Delete collections
       */
      destroy() {
        Alert.confirm({
          title: 'Are you sure you want to delete this collection?',
          text: 'Deleted collections cannot be recovered. Do you still want to continue?',
        }, () => {

          const ids = this.checkedItems.join(',')

          this.$http.delete('collections', { body: { ids: ids } })
            .then(res => {
              if (res.data.code == 0) {

                this.clearCheckedItems()
                this.getList();

                $('#delete_collection').modal('hide')

                swal_success(res);

              } else {
                swal_error(res);
              }
            }, res => {
              swal_error(res);
            });

        })

      },


      updatePagination(data) {
        this.page_context = data.page_context
        this.list.collection = data.data
      }

    }
  }
</script>
