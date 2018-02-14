<template>
  <div class="content-page-full">
    <div class="content full-width sahito-user bgr-white">
      <div class="container">

        <div class="container p-0">
          <div class="row">
            <div class="col-md-4 col-sm-4 col-xs-4 left-side">

              <div class="container full-width-header bt-1 p-b-10">

                <!-- Hide when one or more checkboxes are checked -->
                <div class="row" v-if="!isChecked">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <a href="javascript:void(0);" class="dropdown-toggle pull-left page-title" data-toggle="dropdown">
                      <h4 :title="'Filter by ' + displayActiveCurrentFilter">
                        {{ displayActiveCurrentFilter }} Contacts <span class="caret"></span>
                      </h4>
                    </a>
                    <ul class="dropdown-menu" role="menu" style="top: 35px;">
                      <li class="dropdown-header">FILTER BY</li>
                      <li :class="{ active: currentFilter == 'all' }">
                        <a href="javascript:void(0);" @click="filterContact('all')">All</a>
                      </li>
                      <li :class="{ active: currentFilter == 'customer' }">
                        <a href="javascript:void(0);" @click="filterContact('customer')">Customers</a>
                      </li>
                      <li :class="{ active: currentFilter == 'vendor' }">
                        <a href="javascript:void(0);" @click="filterContact('vendor')">Vendors</a>
                      </li>
                      <li :class="{ active: currentFilter == 'dropshipper' }">
                        <a href="javascript:void(0);" @click="filterContact('dropshipper')">Dropshippers</a>
                      </li>
                      <li class="divider"></li>
                      <li :class="{ active: currentFilter == 'active' }">
                        <a href="javascript:void(0);" @click="filterContact('active')">Active</a>
                      </li>
                      <li :class="{ active: currentFilter == 'inactive' }">
                        <a href="javascript:void(0);" @click="filterContact('inactive')">Inactive</a>
                      </li>
                    </ul>
                    <div class="pull-right">
                      <router-link :to="{ name: 'contact.create' }" class="btn btn-info waves-effect waves-light m-b-5">
                        <span>New </span> <i class="ion-plus"></i>
                      </router-link>
                      <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown">
                        <i class="fa fa-bars"></i>
                      </button>
                      <ul class="dropdown-menu" role="menu" style="top: 35px;">
                        <li class="dropdown-header">SORT BY</li>
                        <li :class="{ active: currentSortColumn == 'display_name' }">
                          <a href="javascript:void(0);" @click="sortContactsBy('display_name')">Name</a>
                        </li>
                        <li :class="{ active: currentSortColumn == 'company_name' }">
                          <a href="javascript:void(0);" @click="sortContactsBy('company_name')">Company Name</a>
                        </li>
                        <li :class="{ active: currentSortColumn == 'created_at' }">
                          <a href="javascript:void(0);" @click="sortContactsBy('created_at')">Created Time</a>
                        </li>
                        <li :class="{ active: currentSortColumn == 'updated_at' }">
                          <a href="javascript:void(0);" @click="sortContactsBy('updated_at')">Last Modified Time</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="javascript:void(0);"><i class="md-file-download"></i> Import Customers</a></li>
                        <li><a href="javascript:void(0);"><i class="md-file-download"></i> Import Vendors</a></li>
                        <li class="divider"></li>
                        <li><a href="javascript:void(0);"><i class="md-file-upload"></i> Export Customers</a></li>
                        <li><a href="javascript:void(0);"><i class="md-file-upload"></i> Export Vendors</a></li>
                        <li class="divider"></li>
                        <li><a href="javascript:void(0);"><i class="md-refresh"></i> Refresh List</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Show when one or more checkboxes are checked -->
                <div class="col-md-12 col-sm-12 col-xs-12" v-show="isChecked" style="display: none;">
                  <div class="pull-left">
                    <div class="btn-group">
                      <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown"
                              aria-expanded="false">
                        More Actions <i class="caret"></i>
                      </button>
                      <ul class="dropdown-menu" role="menu">
                        <!--<li><a href="javascript:void(0)" @click="markAsActive(checkedContacts)">Mark as Active</a></li>-->
                        <!--<li><a href="javascript:void(0)" @click="markAsInactive(checkedContacts)">Mark as Inactive</a></li>-->
                        <li><a href="javascript:void(0)" @click="destroy(checkedContacts)">Delete</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="pull-right pt-10">
                    <a href="javascript:void(0)" @click="clearCheckedContacts()" id="close-btn" class="close-btn">
                      <i class="ion-android-close"></i>
                    </a>
                  </div>
                </div>

              </div>

              <div class="container p-0">
                <div class="row sahito-list">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="sahito-list-contact table-responsive">
                      <table class="table table-hover default-table sahito-list-contact--table table-striped">
                        <tbody>
                        <tr v-for="(c, index) in contacts" :class="{ active: currentContact.contact_id == c.contact_id }">
                          <td class="col-checkbox">
                            <div class="checkbox checkbox-single checkbox-success">
                              <input type="checkbox" :id="'list-' + index" :value="c.contact_id"
                                    v-model="checkedContacts">
                              <label></label>
                            </div>
                          </td>
                          <td>
                            <router-link :to="{ name: 'contact.show', params: {id: c.contact_id }}">
                              {{ c.display_name }}
                            </router-link>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div class="col-md-8 col-sm-8 col-xs-8 right-side">

              <div class="row" style="padding: 2px 10px;">
                <div class="col-md-12">
                  <h3 class="pull-left page-title">{{ currentContact.display_name }}</h3>

                  <!-- Show only when user active -->
                  <div v-if="currentContact.contact_status">
                    <div class="pull-right">
                      <router-link :to="{ name: 'contact.edit', params: { id: currentContact.contact_id }}"
                                  class="btn btn-default waves-effect waves-light m-b-5">
                        <span>Edit </span>
                      </router-link>

                      <div class="btn-group">
                        <button class="btn btn-info waves-effect waves-light m-b-5" data-toggle="dropdown">
                          New Transaction <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu" style="top: 35px;">
                          <li><a href="javascript:void(0);">Sales Order</a></li>
                          <li><a href="javascript:void(0);">Invoice</a></li>
                          <li><a href="javascript:void(0);">Credit Note</a></li>
                          <li><a href="javascript:void(0);">Invoice Payment</a></li>
                        </ul>
                      </div>

                      <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown">
                        More <span class="caret"></span>
                      </button>

                      <ul class="dropdown-menu" role="menu" style="top: 35px;right: 15px;">
                        <!--<li><a href="javascript:void(0)" @click="markAsInactive(currentContact.contact_id)">Mark as Inactive</a></li>-->
                        <li><a href="javascript:void(0)" @click="destroy(currentContact.contact_id)">Delete</a></li>
                      </ul>

                      <router-link :to="{ name: 'contact.index' }" class="close-btn">
                        <i class="ion-android-close"></i>
                      </router-link>
                    </div>
                  </div>

                  <!-- Show when user inactive -->
                  <div v-if="!currentContact.contact_status">
                    <div class="pull-right">
                      <!--<a href="javascript:void(0);" -->
                      <!--@click="markAsActive(currentContact.contact_id)"-->
                      <!--class="btn btn-default waves-effect waves-light m-b-5"-->
                      <!--&gt;-->
                      <!--Mark as Active-->
                      <!--</a>-->
                      <a href="javascript:void(0);" @click="destroy(currentContact.contact_id)"
                        class="btn btn-default waves-effect waves-light m-b-5">
                        Delete
                      </a>

                      <router-link :to="{ name: 'contact.index' }" class="close-btn">
                        <i class="ion-android-close"></i>
                      </router-link>

                    </div>

                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 p-0">
                    <ul class="nav nav-tabs nav-tabs-clear btp-1 tabs" style="width: 100%;">
                      <li class="active tab" style="width: 33.3333%;">
                        <a href="#overview" data-toggle="tab" class="active">
                          <span class="hidden-xs">Overview</span>
                        </a>
                      </li>
                      <li class="tab" style="width: 33.3333%;">
                        <a href="#transactions" data-toggle="tab">
                          <span class="hidden-xs">Transactions</span>
                        </a>
                      </li>
                      <li class="tab" style="width: 33.3333%;">
                        <a href="#recent" data-toggle="tab">
                          <span class="hidden-xs">Recent History</span>
                        </a>
                      </li>
                      <div class="indicator" style="right: 461px; left: 0px;"></div>
                    </ul>

                    <div class="tab-content p-0 tab-content-clear tab-content--contact">
                      <div class="tab-pane active" id="overview">
                        <div class="container p-25">
                          <div class="row p-0">
                            <div class="col-md-3 r-pl-pr left-overview">
                              <!--<img :src="'https://api.adorable.io/avatars/300/' + currentContact.contact_id + '.png' ">-->
                              <div class="left-overview--content">
                                <span>PRIMARY DETAILS</span>
                                <h4>{{ currentContact.company_name }}</h4>
                                <div class="row">
                                  <div class="col-md-1">
                                    <i class="ion-person"></i>
                                  </div>
                                  <div class="col-md-10">
                                    {{ currentContact.display_name }}
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-1">
                                    <i class="ion-ios7-email-outline"></i>
                                  </div>
                                  <div class="col-md-10">
                                    {{ currentContact.email }}
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-1">

                                    <i class="ion-ios7-telephone-outline"></i>
                                  </div>
                                  <div class="col-md-10">
                                    {{ currentContact.phone }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-9 pl-20 pr-0 right-overview">
                              <div class="row">
                                <div class="col-md-12">
                                  <table class="table table-overview">
                                    <tbody>
                                    <!--<tr>-->
                                    <!--<td rowspan="3" class="receivable">-->
                                    <!--<h4>Receivables</h4>-->
                                    <!--<h2 class="text-orange">IDR30,000.00</h2>-->
                                    <!--<p>Unused Credits: <span class="text-primary">IDR14,157.00</span></p>-->
                                    <!--</td>-->
                                    <!--<td class="receivable-list">-->
                                    <!--Items to be packed-->
                                    <!--<span class="pull-right text-orange">2.00</span>-->
                                    <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                    <!--<td class="receivable-list">-->
                                    <!--Items to be shipped-->
                                    <!--<span class="pull-right text-orange">1.00</span>-->
                                    <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                    <!--<td class="receivable-list">Items to be invoiced <span-->
                                    <!--class="pull-right text-orange">5.00</span>-->
                                    <!--</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12">
                                  <table class="table table-recent-shipment">
                                    <tbody>
                                    <tr>
                                      <td colspan="3" style="border-top: 0"><strong>RECENT SHIPMENTS</strong></td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p>Package# <span class="text-primary"><strong> 001</strong></span></p>
                                        <p>Shipment Date <strong> 19 Feb 2016</strong></p>
                                      </td>
                                      <td>
                                        <p>Quantitiy</p>
                                        <p><strong>2.00</strong></p>
                                      </td>
                                      <td>
                                        <span class="label label-success">Shipping in Progress</span>
                                      </td>
                                    </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12 billing-address">
                                  <div class="col-md-6 br-1">
                                    <h5>BILLING ADDRESS</h5>
                                    <div v-text="currentContact.billing_address"></div>
                                    <div
                                      v-text="currentContact.billing_region ? currentContact.billing_region.region_name : ''"></div>
                                    <div
                                      v-text="currentContact.billing_district ? currentContact.billing_district.district_name : ''"></div>
                                    <div
                                      v-text="currentContact.billing_province ? currentContact.billing_province.province_name : ''"></div>
                                    <span v-text="currentContact.billing_zip"></span>
                                    <div
                                      v-text="currentContact.billing_country ? currentContact.billing_country.country_name : ''"></div>
                                  </div>
                                  <div class="col-md-6">
                                    <h5>SHIPPING ADDRESS</h5>
                                    <div v-text="currentContact.shipping_address"></div>
                                    <div
                                      v-text="currentContact.shipping_region ? currentContact.shipping_region.region_name : ''"></div>
                                    <div
                                      v-text="currentContact.shipping_district ? currentContact.shipping_district.district_name : ''"></div>
                                    <div
                                      v-text="currentContact.shipping_province ? currentContact.shipping_province.province_name : ''"></div>
                                    <span v-text="currentContact.shipping_zip"></span>
                                    <div
                                      v-text="currentContact.shipping_country ? currentContact.shipping_country.country_name : ''"></div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="tab-pane" id="transactions" style="display: none;">
                        <div class="container">
                          <div class="row">
                            <div class="col-md-12 pt-pb-20">
                              <div class="btn-group">
                                <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown">
                                  <span class="text-light-gray"> Filter By : </span>
                                  Sales Orders <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" role="menu" style="top: 35px;">
                                  <li><a href="javascript:void(0);">Sales Orders</a></li>
                                  <li><a href="javascript:void(0);">Invoices</a></li>
                                  <li><a href="javascript:void(0);">Packages</a></li>
                                  <li><a href="javascript:void(0);">Payment Received</a></li>
                                </ul>
                              </div>
                              <div class="btn-group">
                                <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown">
                                  <span class="text-light-gray"> Status By : </span>
                                  All <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" role="menu" style="top: 35px;">
                                  <li><a href="javascript:void(0);">All</a></li>
                                  <li><a href="javascript:void(0);">Draft</a></li>
                                  <li><a href="javascript:void(0);">Confirmed</a></li>
                                  <li><a href="javascript:void(0);">Partially Shipped</a></li>
                                  <li><a href="javascript:void(0);">Shipped</a></li>
                                  <li><a href="javascript:void(0);">Drop Shipped</a></li>
                                  <li><a href="javascript:void(0);">Fulfilled</a></li>
                                  <li><a href="javascript:void(0);">Void</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="container p-0">
                          <div class="row sahito-list">
                            <div class="col-md-12">
                              <div class="sahito-list-contact border-1 table-responsive">
                                <table class="table table-hover default-table sahito-list-contact-transaction--table">
                                  <thead>
                                  <tr>
                                    <th>SALES ORDER# <i class="fa fa-sort"></i></th>
                                    <th>REFERENCE</th>
                                    <th>DATE</th>
                                    <th>EXPECTED SHIPMENT...</th>
                                    <th>AMOUNT</th>
                                    <th>STATUS</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                    <td>SO-00006</td>
                                    <td></td>
                                    <td>04 May 2016</td>
                                    <td></td>
                                    <td class="text-right">Rp 0</td>
                                    <td><span class="text-info">Confirmed</span></td>
                                  </tr>
                                  <tr>
                                    <td>SO-00004</td>
                                    <td>Test</td>
                                    <td>24 May 2016</td>
                                    <td></td>
                                    <td class="text-right">Rp 60,000</td>
                                    <td><span class="text-success">Fulfilled</span></td>
                                  </tr>

                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="tab-pane" id="recent" style="display: none;">
                        <div class="container p-0">
                          <div class="row sahito-list">
                            <div class="col-md-12">
                              <div class="sahito-list-contact border-1 table-responsive">
                                <table class="table table-hover default-table sahito-list-contact-recent--table">
                                  <thead>
                                  <tr>
                                    <th>DATE <i class="fa fa-sort"></i></th>
                                    <th>DETAILS</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                    <td>04 May 2016 01:55 PM</td>
                                    <td>Marked as active - <span class="recent-user">Shinta Maharkesti</span></td>
                                  </tr>
                                  <tr>
                                    <td>04 May 2016 01:55 PM</td>
                                    <td>Marked as inactive - <span class="recent-user">Shinta Maharkesti</span></td>
                                  </tr>
                                  <tr>
                                    <td>04 May 2016 01:55 PM</td>
                                    <td>Purchase Order of amount Rp 120 converted as bill 123 - <span
                                      class="recent-user">Shinta Maharkesti</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>04 May 2016 01:55 PM</td>
                                    <td>Purchase Order of amount Rp 120 converted as bill 123 - <span
                                      class="recent-user">Shinta Maharkesti</span>
                                    </td>
                                  </tr>

                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <pagination :page-context="page_context" :result="contacts" @updated="updatePagination"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'ContactDetail',

    components: {
      Pagination: () => import('../Pagination'),
    },


    data () {
      return {
        contacts: [],
        page_context: {},
        currentContact: {},
        checkedContacts: [],
        checkedAll: false,
        currentSortColumn: 'display_name',
        ascendingSort: true,
        currentFilter: 'all',
      }
    },


    watch: {
      '$route': 'showDetail',
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


    mounted () {
      this.getList()
      this.showDetail()
    },


    methods: {
      getList (options) {
        const defaultOptions = {
          page: 1,
          per_page: 15,
          sort_column: 'display_name',
          sort_order: 'ASC',
          filter_by: 'all',
        }

        options = _.merge(defaultOptions, options)

        this.$http.get('contacts', {params: options}).then(res => {
          if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

          this.contacts = res.data.data
          this.page_context = res.data.page_context

        }, res => {
          return swal_error(res)
        })
      },


      /**
       * Show the contact detail
       * @param  {Object} contact
       */
      showDetail () {
        const contactId = this.$route.params.id

        this.$http.get(`contacts/${contactId}`)
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

            this.currentContact = res.data.data
          }, res => {
            swal_error(res)
          })
      },


      /**
       * Delete multiple contacts
       * @param  {string|number} ids  Separate id by comma (e.g ids=2,4,5)
       */
      destroy (ids) {
        Alert.confirm({
          title: 'Do you really want to delete this contact(s)?',
          text: '',
        }, () => {
          const queryString = _.isArray(ids) ? ids.join(',') : ids

          this.$http.delete('contacts?ids=' + queryString)
            .then(res => {
              if (res.data.code == 0) {
                swal_success(res)
                this.$router.replace({name: 'contact.index'})
              } else {
                swal_error(res)
              }
            }, res => {
              swal_error(res)
            })
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
            if (res.data.code == 0) {
              this.contacts = []
              this.getList()
              this.clearCheckedContacts()
              this.currentContact.contact_status = true
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
            if (res.data.code == 0) {
              this.contacts = []
              this.getList()
              this.clearCheckedContacts()
              this.currentContact.contact_status = false
              swal_success(res)
            } else {
              swal_error(res)
            }
          }, res => {
            swal_error(res)
          })
      },


      sortContactsBy (column) {
        let ascendingSort

        this.currentSortColumn = column
        this.ascendingSort = !this.ascendingSort

        if (this.ascendingSort) {
          ascendingSort = 'ASC'
        } else {
          ascendingSort = 'DESC'
        }

        this.getList({sort_column: column, sort_order: ascendingSort})
      },


      filterContact (filter) {
        this.getList({filter_by: filter})
        this.currentFilter = filter
      },


      clearCheckedContacts () {
        $('#checkAll').prop('checked', false)
        this.checkedAll = false
        this.checkedContacts = []
      },


      updatePagination (data) {
        this.page_context = data.page_context
        this.contacts = data.data
      },


    },
  }
</script>
