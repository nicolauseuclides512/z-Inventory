<template>
  <div>
    <!-- Full list -->
    <div>
      <div class="container full-width-header bt-1 p-b-10">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">

            <!-- Hide when one or more checkboxes are checked -->
            <div v-show="!isChecked">
              <a href="javascript:void(0);" id="filter-menu" class="dropdown-toggle pull-left page-title"
                 data-toggle="dropdown" aria-expanded="false">
                <h4 :title="'Filter by ' + displayActiveCurrentFilter">
                  {{ displayActiveCurrentFilter }} Contacts <span class="caret"></span>
                </h4>
              </a>
              <ul class="dropdown-menu" role="menu" style="top: 35px;">
                <li class="dropdown-header">FILTER BY</li>
                <li :class="{ active: currentFilter == 'all' }">
                  <a href="javascript:void(0);" id="filter-by-all" @click="filterContact('all')">All</a>
                </li>
                <li :class="{ active: currentFilter == 'customer' }">
                  <a href="javascript:void(0);" id="filter-by-customer" @click="filterContact('customer')">Customers</a>
                </li>
                <!--<li :class="{ active: currentFilter == 'vendor' }">-->
                <!--<a href="javascript:void(0);" id="filter-by-vendor" @click="filterContact('vendor')">Vendors</a>-->
                <!--</li>-->
                <!--<li :class="{ active: currentFilter == 'dropshipper' }">-->
                <!--<a href="javascript:void(0);" id="filter-by-dropshipper" @click="filterContact('dropshipper')">Dropshippers</a>-->
                <!--</li>-->
                <li class="divider"></li>
                <!--<li :class="{ active: currentFilter == 'active' }">-->
                <!--<a href="javascript:void(0);" id="filter-by-active" @click="filterContact('active')">Active</a>-->
                <!--</li>-->
                <!--<li :class="{ active: currentFilter == 'inactive' }">-->
                <!--<a href="javascript:void(0);" id="filter-by-inactive" @click="filterContact('inactive')">Inactive</a>-->
                <!--</li>-->
              </ul>
              <div class="pull-right">
                <router-link :to="{ name: 'contact.create' }" href="javascript:void(0);"
                             class="btn btn-info waves-light m-b-5" id="create-new">
                  <span>New </span> <i class="ion-plus"></i>
                </router-link>
                <button id="sort-menu" class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown"
                        aria-expanded="false">
                  <i class="fa fa-bars"></i>
                </button>
                <ul class="dropdown-menu" role="menu" style="top: 35px;">
                  <li class="dropdown-header">SORT BY</li>
                  <li :class="{ active: currentSortColumn == 'display_name' }">
                    <a href="javascript:void(0);" id="sort-by-name" @click="sortContactsBy('display_name')">Name</a>
                  </li>
                  <li :class="{ active: currentSortColumn == 'company_name' }">
                    <a href="javascript:void(0);" id="sort-by-company" @click="sortContactsBy('company_name')">Company Name</a>
                  </li>
                  <li :class="{ active: currentSortColumn == 'created_at' }">
                    <a href="javascript:void(0);" id="sort-by-created" @click="sortContactsBy('created_at')">Created Time</a>
                  </li>
                  <li :class="{ active: currentSortColumn == 'updated_at' }">
                    <a href="javascript:void(0);" id="sort-by-updated" @click="sortContactsBy('updated_at')">Last Modified Time</a>
                  </li>
                  <!--<li class="divider"></li>-->
                  <!--<li><a href="javascript:void(0);"><i class="md-file-download"></i> Import Customers</a></li>-->
                  <!--<li><a href="javascript:void(0);"><i class="md-file-download"></i> Import Vendors</a></li>-->
                  <!--<li class="divider"></li>-->
                  <!--<li><a href="javascript:void(0);"><i class="md-file-upload"></i> Export Customers</a></li>-->
                  <!--<li><a href="javascript:void(0);"><i class="md-file-upload"></i> Export Vendors</a></li>-->
                  <li class="divider"></li>
                  <li><a href="javascript:void(0);" @click="refresh"><i class="md-refresh"></i> Refresh List</a></li>
                </ul>
              </div>
            </div>

            <!-- Show when one or more checkboxes are checked -->
            <div class="col-md-12 col-sm-12 col-xs-12" id="mark_active" v-show="isChecked" style="display: none;">
              <div class="pull-left">
                <!--<a href="javascript:void(0);"-->
                <!--id="mark-as-active"-->
                <!--class="btn btn-default waves-effect waves-light m-b-5"-->
                <!--@click="markAsActive(checkedContacts)"-->
                <!--&gt;-->
                <!--Mark as Active-->
                <!--</a>-->
                <div class="btn-group">
                  <button id="more-actions" class="btn btn-default waves-effect waves-light m-b-5"
                          data-toggle="dropdown" aria-expanded="false">
                    More Actions <i class="caret"></i>
                  </button>
                  <ul class="dropdown-menu" role="menu">
                    <!--<li><a href="javascript:void(0);" id="mark-as-inactive" @click="markAsInactive(checkedContacts)">Mark as Inactive</a></li>-->
                    <li><a href="javascript:void(0);" id="destroy" @click="destroy(checkedContacts)">Delete</a></li>
                  </ul>
                </div>
              </div>
              <div class="pull-right pt-10">
                <a href="javascript:void(0);" id="close-action-bar" @click="clearCheckedContacts()" class="close-btn">
                  <i class="ion-android-close"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="container p-0">
        <div class="row sahito-list">
          <div class="col-md-12 p-0">
            <div class="sahito-list-contact border-1 table-responsive">
              <table class="table table-hover default-table sahito-list-contact--table table-striped">
                <thead>
                <tr>
                  <th class="col-checkbox">
                    <div class="checkbox checkbox-single checkbox-success">
                      <input type="checkbox" id="checkAll" @click="checkAll">
                      <label></label>
                    </div>
                  </th>
                  <th>
                    <a href="#" id="sort-title-name" @click="sortContactsBy('display_name')">Name</a>
                    <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'display_name'"></i>
                    <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'display_name'"></i>
                  </th>
                  <th>
                    <a href="#" id="sort-title-company" @click="sortContactsBy('company_name')">Company Name</a>
                    <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'company_name'"></i>
                    <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'company_name'"></i>
                  </th>
                  <th>
                    <a href="#" id="sort-title-email" @click="sortContactsBy('email')">Email</a>
                    <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'email'"></i>
                    <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'email'"></i>
                  </th>
                  <th>
                    <a href="#" id="sort-title-work-phone" @click="sortContactsBy('phone')">Work Phone</a>
                    <i class="fa fa-sort-asc" v-if="ascendingSort && currentSortColumn === 'phone'"></i>
                    <i class="fa fa-sort-desc" v-if="! ascendingSort && currentSortColumn === 'phone'"></i>
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(c, index) in contacts" :class="{ active: isChecked }">
                  <td class="col-checkbox">
                    <div class="checkbox checkbox-single checkbox-success">
                      <input type="checkbox" :id="'list-' + index" :value="c.contact_id" v-model="checkedContacts">
                      <label></label>
                    </div>
                  </td>
                  <td>
                    <router-link :to="{ name: 'contact.edit', params: {id: c.contact_id }}">
                      <span v-if="c.display_code === 1 || !c.display_code">
                        {{ c.salutation_id | display_salutation }} {{ c.first_name }} {{ c.last_name }}
                      </span>
                      <span v-if="c.display_code === 2">
                        {{ c.company_name }}
                      </span>
                    </router-link>
                  </td>
                  <td>{{ c.company_name }}</td>
                  <td>{{ c.email }}</td>
                  <td>{{ c.phone == 'null' ? '' : c.phone }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <pagination :page-context="paginate" :result="contacts" @updated="updatePagination"></pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import Axios from 'axios'
  import { getParameterByName } from 'src/helpers'
  import _ from 'lodash'
  import { responseOk } from '../../helpers'
  import Salutation from '../../helpers/Salutation'

  export default {
    name: 'ContactList',

    components: {
      Pagination: () => import('../Pagination'),
    },

    watch: {
      '$route' (to, from) {
        if (to.query.q) {
          this.getList({q: to.query.q})
        } else {
          this.getList()
        }
      },
    },

    data () {
      return {
        contacts: [],
        paginate: {},
        selectedContact: {},
        checkedContacts: [],
        checkedAll: false,
        currentSortColumn: 'display_name',
        ascendingSort: true,
        currentFilter: 'all',
      }
    },


    mounted () {
      this.getList()
    },


    computed: {

      isChecked () {
        if (_.isEmpty(this.checkedContacts)) {
          return false
        }
        return true
      },

      displayActiveCurrentFilter () {
        return this.currentFilter.charAt(0).toUpperCase() + this.currentFilter.slice(1)
      },

    },

    methods: {
      checkAll () {
        if (this.checkedAll === false) {
          this.checkedAll = true
          _.each(this.contacts, (item, key) => {
            this.checkedContacts.push(item.contact_id)
          })
        } else {
          this.clearCheckedContacts()
        }
      },

      clearCheckedContacts () {
        document.querySelector('#checkAll').checked = false
        this.checkedAll = false
        this.checkedContacts = []
      },


      /**
       * Get contacts
       * @param  {Object} options  Custom options
       */
      getList (options = {}) {
        const defaultOptions = {
          page: 1,
          per_page: 15,
          sort: 'display_name.asc',
          filter: 'all',
          q: getParameterByName('q'),
        }

        options = _.merge(defaultOptions, options)

        this.$http.get('contacts', {params: options}).then(res => {
          if (!responseOk(res.data.code)) return swal_error(res)

          this.contacts = res.data.data
          this.paginate = res.data.paginate

        }, res => {
          return swal_error(res)
        })
      },


      refresh () {
        this.getList({
          sort: `${this.currentSortColumn}.${this.ascendingSort ? 'asc' : 'desc' }`,
          filter: this.currentFilter,
        })
      },


      /**
       * Delete multiple contacts
       * @param  {string|number} ids  Separate id by comma (e.g ids=2,4,5)
       */
      async destroy (ids) {
        Alert.confirm({
          title: 'Do you really want to delete this contact(s)?',
          text: 'Please don\'t delete us :\'( ',
        }, async () => {
          const queryString = _.isArray(ids) ? ids.join(',') : ids

          try {
            const res = await Axios.delete('contacts?ids=' + queryString)
            swal_success(res)
            this.clearCheckedContacts()
            this.contacts = []
            this.getList()
          } catch (e) {
            console.error(e)
            Alert.error('Failed to delete this contact. Delete all sales orders that contain this contact first.')
          }
        })
      },


      /**
       * Mark multiple contacts status to active
       * @param  {string|number} ids  Separate id by comma (e.g ids=2,4,5)
       */
      markAsActive (ids) {
        const payload = _.isArray(ids) ? ids.join(',') : ids

        this.$http.post('contacts/mark_as/active', {ids: payload})
          .then(res => {
            if (responseOk(res.data.code)) {
              this.contacts = []
              this.getList()
              this.clearCheckedContacts()
              this.selectedContact.contact_status = true
              swal_success(res)
            } else {
              swal_error(res)
            }
          }, res => {
            swal_error(res)
          })
      },


      /**
       * Mark multiple contacts status to inactive
       * @param  {string|number} ids  Separate id by comma (e.g ids=2,4,5)
       */
      markAsInactive (ids) {
        const payload = _.isArray(ids) ? ids.join(',') : ids

        this.$http.post('contacts/mark_as/inactive', {ids: payload})
          .then(res => {
            if (responseOk(res.data.code)) {
              this.contacts = []
              this.getList()
              this.clearCheckedContacts()
              this.selectedContact.contact_status = false
              swal_success(res)
            } else {
              swal_error(res)
            }
          }, res => {
            swal_error(res)
          })
      },


      sortContactsBy (column) {
        this.currentSortColumn = column
        this.ascendingSort = !this.ascendingSort

        let ascendingSort
        if (this.ascendingSort) {
          ascendingSort = 'asc'
        } else {
          ascendingSort = 'desc'
        }

        this.getList({
          sort: `${column}.${ascendingSort}`,
          filter: this.currentFilter,
        })
      },


      filterContact (filter) {
        this.getList({filter: filter})
        this.currentFilter = filter
      },


      updatePagination (data) {
        this.paginate = data.paginate
        this.contacts = data.data
      },

    },

    filters: {
      display_salutation (salutationId) {
        const salutation = Salutation.byId(salutationId)
        if (typeof salutation !== 'undefined') {
          return salutation.name
        }
      },
    },

    events: {

      listenSearch (search) {
        this.getList({
          q: search.text,
        })
      },


    },
  }
</script>
