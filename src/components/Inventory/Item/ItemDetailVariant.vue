<template>
  <div id="half-list-item-group" v-show="showHalfList">

    <div class="container p-0">
      <div class="row">
        <div class="col-md-4 col-sm-4 col-xs-12 left-side">

          <div class="container full-width-header bt-1 p-b-10">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <a href="javascript:void(0);" class="dropdown-toggle pull-left page-title" data-toggle="dropdown" aria-expanded="false"><h4>
                  All Contacts <span class="caret"></span></h4></a>
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
                  <a href="item-new-add.html" class="btn btn-info waves-effect waves-light m-b-5"> <span>New </span> <i
                      class="ion-plus"></i> </a>
                  <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown"
                          aria-expanded="false"><i class="fa fa-bars"></i></button>
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
                  <table class="table table-hover default-table sahito-list-item-group-list--table  table-half">
                    <tbody>
                    <tr class="active">
                      <td class="col-checkbox">
                        <div class="checkbox checkbox-single checkbox-success">
                          <input type="checkbox" id="list-1">
                          <label></label>
                        </div>
                      </td>
                      <td class="col-collapse">
                        <a data-toggle="collapse" href="#item_list5" aria-expanded="false" class="collapsed">
                          <i class="ion-chevron-right"></i>
                        </a>
                      </td>
                      <td><a href="javascript:void(0);">Baju Gwqdwqdwquess</a></td>
                    </tr>
                    <tr id="item_list5" class="panel-collapse collapse">
                      <td colspan="3" class="p-0 bt-0">
                        <table class="table table-hover list-inner">
                          <tr>
                            <td class="col-checkbox">
                            </td>
                            <td id="icon_collapse">
                              <div class="placeholder-collapse"></div>
                            </td>
                            <td><a href="javascript:void(0);" onclick="items()" class="text-grey"> Pencil</a></td>
                          </tr>
                          <tr>
                            <td class="col-checkbox">
                            </td>
                            <td id="icon_collapse">
                              <div class="placeholder-collapse"></div>
                            </td>
                            <td onclick="items()" class="text-grey">Pencil</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td class="col-checkbox">
                        <div class="checkbox checkbox-single checkbox-success">
                          <input type="checkbox" id="list-1">
                          <label></label>
                        </div>
                      </td>
                      <td class="col-collapse"><a data-toggle="collapse" href="#item_list6" aria-expanded="false"
                                                  class="collapsed"><i class="ion-chevron-right"></i></a></td>
                      <td><a href="javascript:void(0);">Baju Guess</a></td>
                    </tr>
                    <tr id="item_list6" class="panel-collapse collapse">
                      <td colspan="3" class="p-0 bt-0">
                        <table class="table table-hover list-inner">
                          <tr>
                            <td class="col-checkbox">
                            </td>
                            <td id="icon_collapse">
                              <div class="placeholder-collapse"></div>
                            </td>
                            <td><a href="javascript:void(0);" onclick="items()" class="text-grey"> Pencil</a></td>
                          </tr>
                          <tr>
                            <td class="col-checkbox">
                            </td>
                            <td id="icon_collapse">
                              <div class="placeholder-collapse"></div>
                            </td>
                            <td onclick="items()" class="text-grey">Pencil</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Variant detail -->
        <div class="col-md-8 col-sm-8 col-xs-12 right-side">

          <div class="row p-20">
            <div class="col-md-12">
              <div class="pull-left">
                <h3 class="pull-left page-title">Baju Guess</h3>
                <p class="text-blue text-small"> 9 item(s)</p>
              </div>

              <div class="pull-right">
                <a href="item_edit.html" class="btn btn-default waves-effect waves-light m-b-5"> <span>Edit </span></a>
                <div class="btn-group">
                  <button class="btn btn-info waves-effect waves-light m-b-5"> New Transaction</button>
                </div>

                <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown"
                        aria-expanded="false"> More
                </button>
                <ul class="dropdown-menu" role="menu" style="top: 35px;right: 15px;">
                  <li><a href="javascript:void(0);">Mark as Inactive</a></li>
                  <li><a href="javascript:void(0);">Delete</a></li>
                </ul>

                <a href="javascript:void(0);" id="close-btn" class="close-btn">
                  <i class="ion-android-close"></i>
                </a>
              </div>

            </div>
          </div>

          <div class="row p-15 pt-0 bt-1">
            <div class="form-horizontal m-b-20">
              <div class="col-md-6">
                <div class="form-group form-general mb-15">
                  <label class="col-md-4 control-label text-left">UOM</label>
                  <div class="col-md-8 pt-7">
                    <strong>Baju Guess</strong>
                  </div>
                </div>
                <div class="form-group form-general mb-15">
                  <label class="col-md-4 control-label text-left">Tax</label>
                  <div class="col-md-8 pt-7">
                    <strong>10%</strong>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group form-general mb-15">
                  <label class="col-md-4 control-label text-left">Brand</label>
                  <div class="col-md-8 pt-7">
                    <strong>Guess</strong>
                  </div>
                </div>
                <div class="form-group form-general mb-15">
                  <label class="col-md-4 control-label text-left">Manufacture</label>
                  <div class="col-md-8 pt-7">
                    <strong>Guest Star</strong>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group form-general mb-15">
                  <label class="col-md-2 control-label text-left">Size</label>
                  <div class="col-md-8 pt-7">
                    <span class="label label-info">Info</span> <span class="label label-info">Info</span> <span
                      class="label label-info">Info</span>
                  </div>
                </div>
                <div class="form-group form-general mb-15">
                  <label class="col-md-2 control-label text-left">Color</label>
                  <div class="col-md-8 pt-7">
                    <span class="label label-info">Info</span> <span class="label label-info">Info</span> <span
                      class="label label-info">Info</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="row">
            <div class="col-md-12 p-0">
              <div class="row sahito-list">
                <div class="col-md-12">
                  <div class="sahito-list-contact border-1 table-responsive">
                    <table class="table table-hover default-table sahito-list-contact-transaction--table">
                      <thead>
                      <tr>
                        <th>NAME# <i class="fa fa-sort"></i></th>
                        <th>PURCHASE COST</th>
                        <th>SELLING PRICE</th>
                        <th>Availability</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td><a href="javascript:void(0);">Baju Guest - M</a></td>
                        <td>IDR0.00</td>
                        <td>IDR20,000.00</td>
                        <td>50.0</td>
                      </tr>
                      <tr>
                        <td><a href="javascript:void(0);">Baju Guest - XL</a></td>
                        <td>IDR0.00</td>
                        <td>IDR10,000.00</td>
                        <td>20.0</td>
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
</template>

<script>
  export default {

    data() {
      return {

      }
    },

    mounted() {

    },

    computed: {

    },

    methods: {

    },

  }
</script>

<style scoped>

</style>
