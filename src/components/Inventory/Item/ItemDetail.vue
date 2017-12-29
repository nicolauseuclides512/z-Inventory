<template>
  <div id="half-list">

    <div class="container p-0">
      <div class="row">
        <div class="col-md-4 col-sm-4 col-xs-12 left-side">

          <div class="container full-width-header bt-1 p-b-10">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <a href="javascript:void(0);" class="dropdown-toggle pull-left page-title" data-toggle="dropdown" aria-expanded="false">
                  <h4> All Items <span class="caret"></span></h4>
                </a>
                <ul class="dropdown-menu" role="menu" style="top: 35px;">
                  <li class="active"><a href="javascript:void(0);">Active Items</a></li>
                  <li><a href="javascript:void(0);">Low Stock Items</a></li>
                  <li><a href="javascript:void(0);">Inactive Items</a></li>
                  <li><a href="javascript:void(0);">Ungrouped Items</a></li>
                  <li><a href="javascript:void(0);">Sales</a></li>
                  <li><a href="javascript:void(0);">Purchases</a></li>
                  <li class="divider"></li>
                  <li><a href="javascript:void(0);">Inventory Items</a></li>
                  <li><a href="javascript:void(0);">Non-Inventory Items</a></li>

                </ul>
                <div class="pull-right">
                  <a href="item-new-add.html" class="btn btn-info waves-effect waves-light m-b-5">
                    <span>New </span> <i class="ion-plus"></i>
                  </a>
                  <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-bars"></i>
                  </button>
                  <ul class="dropdown-menu" role="menu" style="top: 35px;">
                    <li class="dropdown-header">SORT BY</li>
                    <li class="active"><a href="javascript:void(0);">Created Time</a></li>
                    <li><a href="javascript:void(0);">Name</a></li>
                    <li class="divider"></li>
                    <li><a href="javascript:void(0);"><i class="md-file-download"></i> Import Items</a></li>
                    <li><a href="javascript:void(0);"><i class="md-file-upload"></i> Export Items</a></li>
                    <li class="divider"></li>
                    <li><a href="javascript:void(0);"><i class="md-refresh"></i> Refresh List</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="container p-0">
            <div class="row sahito-list">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="sahito-list-contact table-responsive">
                  <table class="table table-hover default-table sahito-list-item-group-list--table table-half">
                    <tbody>

                    <!-- Parent -->
                    <tr class="active" v-for="list in lists">
                      <td class="col-checkbox">
                        <div class="checkbox checkbox-single checkbox-success">
                          <input type="checkbox" :id="'list-' + list.item_id">
                          <label></label>
                        </div>
                      </td>
                      <td class="col-collapse">
                        <a data-toggle="collapse" :href="'#item_list_half' + list.item_id" aria-expanded="false"class="collapsed">
                          <i class="ion-chevron-right"></i>
                        </a>
                      </td>
                      <td><a href="javascript:void(0);">{{ list.item_name }}</a></td>
                    </tr>
                    <!-- /Parent -->

                    <!-- Children -->
                    <tr v-for="list in lists" :id="'item_list_half' + list.item_id" class="panel-collapse collapse">
                      <td colspan="3" class="p-0 bt-0">
                        <table class="table table-hover list-inner">
                          <tr v-for="child in list.children">
                            <td class="col-checkbox"></td>
                            <td id="icon_collapse">
                                <div class="placeholder-collapse"></div>
                            </td>
                            <td>{{ child.item_name }}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- /Children -->

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Item detail non-variant -->
        <div class="col-md-8 col-sm-8 col-xs-12 right-side">

          <div class="row p-20">
            <div class="col-md-12">
              <h3 class="pull-left page-title">{{ item.item_name }}</h3>

              <div class="pull-right">
                <a href="item_edit.html" class="btn btn-default waves-effect waves-light m-b-5"> <span>Edit </span></a>
                <div class="btn-group">
                  <button class="btn btn-info waves-effect waves-light m-b-5"> New Transaction</button>
                </div>

                <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown"aria-expanded="false"> More </button>

                <ul class="dropdown-menu" role="menu" style="top: 35px;right: 15px;">
                  <li><a href="javascript:void(0);">Mark as Inactive</a></li>
                  <li><a href="javascript:void(0);">Delete</a></li>
                </ul>

                <a href="javascript:void(0);" id="close-btn" class="close-btn" @click="closeDetail">
                  <i class="ion-android-close"></i>
                </a>
              </div>

            </div>
          </div>

          <div class="row">
            <div class="col-md-12 p-0">
              <ul class="nav nav-tabs nav-tabs-clear btp-1 tabs">
                <li class="active tab">
                  <a href="#overview" data-toggle="tab" aria-expanded="false">
                    <span class="hidden-xs">Overview</span>
                  </a>
                </li>
                <li class="tab">
                  <a href="#purchases" data-toggle="tab" aria-expanded="false">
                    <span class="hidden-xs">Purchases</span>
                  </a>
                </li>
                <li class="tab">
                  <a href="#transactions" data-toggle="tab" aria-expanded="false">
                    <span class="hidden-xs">Transactions</span>
                  </a>
                </li>
                <li class="tab">
                  <a href="#recent" data-toggle="tab" aria-expanded="true">
                    <span class="hidden-xs">Recent History</span>
                  </a>
                </li>
              </ul>

              <div class="tab-content p-0 tab-content-clear tab-content--contact">
                <div class="tab-pane active" id="overview">
                  <div class="container p-25">
                    <div class="row r-ml-mt items-details-overview-tab">

                      <div class="col-md-8 items-details-overview-tab-left">
                        <div class="form-horizontal m-b-20">
                          <h4>Primary Details</h4>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">Item Group Name</label>
                            <div class="col-md-8 pt-7">
                              <strong>{{ item.item_name }}</strong>
                            </div>
                          </div>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">Item Type</label>
                            <div class="col-md-8 pt-7">
                              <strong>Inventory Items</strong>
                            </div>
                          </div>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">Size</label>
                            <div class="col-md-8 pt-7">
                              <strong>L</strong>
                            </div>
                          </div>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">SKU</label>
                            <div class="col-md-8 pt-7">
                              <strong>8</strong>
                            </div>
                          </div>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">UOM</label>
                            <div class="col-md-8 pt-7">
                              <strong>pcs</strong>
                            </div>
                          </div>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">Created Source</label>
                            <div class="col-md-8 pt-7">
                              <strong>User</strong>
                            </div>
                          </div>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">Inventory Account</label>
                            <div class="col-md-8 pt-7">
                              <strong>Inventory Asset</strong>
                            </div>
                          </div>
                        </div>

                        <div class="form-horizontal mbt-20 pt-25">
                          <h4>Purchase Information</h4>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">Purchase Cost</label>
                            <div class="col-md-8 pt-7">
                              <strong>Rp 0</strong>
                            </div>
                          </div>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">Purchase Account</label>
                            <div class="col-md-8 pt-7">
                              <strong>Cost of Goods Sold</strong>
                            </div>
                          </div>
                        </div>

                        <div class="form-horizontal mbt-20 pt-25">
                          <h4>Sales Information</h4>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">Selling Price</label>
                            <div class="col-md-8 pt-7">
                              <strong>Rp 0</strong>
                            </div>
                          </div>
                          <div class="form-group form-general m-b-5">
                            <label class="col-md-4 control-label text-left">Sales Account</label>
                            <div class="col-md-8 pt-7">
                              <strong>Sales</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-4 items-details-overview-tab-right">
                        <form action="#" class="dropzone custom-dropzone" id="dropzone">
                          <div class="fallback">
                            <input name="file" type="file" multiple="multiple">
                          </div>
                        </form>

                        <div class="row mt-25 p-10 right-side--stock">
                          <div class="col-md-12 bgr-grey p-15">
                            <div class="form-group form-general mb-25">
                              <label class="control-label pl-0 text-left">Initial Stock</label>
                              <p class="form-control-static">0.00</p>
                            </div>
                            <div class="form-group form-general mb-25">
                              <label class="control-label pl-0 text-left">Available</label>
                              <p class="form-control-static">9.00</p>
                            </div>
                            <div class="form-group form-general mb-25">
                              <label class="control-label pl-0 text-left">Quantity to be Shipped</label>
                              <p class="form-control-static">0.00</p>
                            </div>
                            <div class="form-group form-general mb-25">
                              <label class="control-label pl-0 text-left">Quantity to be Received</label>
                              <p class="form-control-static">0.00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row r-ml-mt items-details-overview-tab">
                      <div class="col-md-12">
                        <div class="border-chart">
                          <div class="top-chart text-center">
                            <p>Sales Order Summary (in Rp)</p>
                          </div>
                          <div class="ct-chart ct-perfect-fifth" id="chart1"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="tab-pane" id="purchases">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-12 pt-pb-20">

                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane" id="transactions">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-12 pt-pb-20">

                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane" id="recent">
                  <div class="container p-0">
                    <div class="row sahito-list">
                      <div class="col-md-12">

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

</template>

<script>
  export default {

    props: ['itemid'],

    data() {
      return {
        item: {},
      }
    },

    mounted() {
      this.$http.get('items/' + itemid)
        .then(res => {
          this.item = res.body;
        }, res => {
          swal_error(res)
        })
    },

    computed: {

    },

    methods: {

    },

  }
</script>

<style scoped>

</style>
