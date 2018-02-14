<template>
  <div class="content-page">
    <div class="content full-width sahito-user bgr-white">
      <div class="container">
      <div id="full-list">
        <div class="container full-width-header bt-1 p-b-10">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12" id="mark_default">
              <a href="javascript:void(0);" class="dropdown-toggle pull-left page-title" data-toggle="dropdown" aria-expanded="false"><h4>All Contacts <span class="caret"></span></h4> </a>
              <ul class="dropdown-menu" role="menu" style="top: 35px;">
                <li class="active"><a href="javascript:void(0);">All</a></li>
                <li><a href="javascript:void(0);">Customers</a></li>
                <li><a href="javascript:void(0);">Vendors</a></li>
                <li><a href="javascript:void(0);">CRM Contacts</a></li>
                <li class="divider"></li>
                <li><a href="javascript:void(0);">Active</a></li>
                <li><a href="javascript:void(0);">Inactive</a></li>
              </ul>

              <div class="pull-right">
                <router-link :to="{ name: 'contact.create' }" class="btn btn-info waves-effect waves-light m-b-5" > <span>New </span> <i class="ion-plus"></i> </router-link>
                <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown" aria-expanded="false"> <i class="fa fa-bars"></i> </button>
                <ul class="dropdown-menu" role="menu" style="top: 35px;">
                  <li class="dropdown-header">SORT BY</li>
                  <li class="active"><a href="javascript:void(0);">Name</a></li>
                  <li><a href="javascript:void(0);">Company Name</a></li>
                  <!--<li><a href="javascript:void(0);">Receivables</a></li>-->
                  <!--<li><a href="javascript:void(0);">Payables</a></li>-->
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
            <div class="col-md-12 col-sm-12 col-xs-12" id="mark_active" style="display: none;">
              <div class="pull-left">
                <a href="item_add.html" class="btn btn-default waves-effect waves-light m-b-5">Mark as Active</a>
                <div class="btn-group">
                  <button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown" aria-expanded="false"> More Actions <i class="caret"></i> </button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a href="javascript:void(0);">Merge</a></li>
                    <li><a href="javascript:void(0);">Mark as Inactive</a></li>
                    <li><a href="javascript:void(0);">Delete</a></li>
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
        <div class="container p-0 bgr-light-grey" id="search-page-block">
          <div class="col-md-12 p-20 search-page-block">
            <div class="pull-right">
              <a href="javascript:void(0);" id="close-block-btn" class="close-btn">
                <i class="ion-android-close"></i>
              </a>
            </div>
            <p class="text-green"><i class="fa fa-search"></i> Search Criteria</p>

            <p class="pl-10" id="notes"><i class="ion-arrow-right-a text-green"></i> Notes contains <strong>{{ searchText }}</strong> (or) </p>
            <p class="pl-10" id="display_name"><i class="ion-arrow-right-a text-green"></i> Display Name contains <strong>{{ searchText }}</strong> (or) </p>
            <p class="pl-10" id="company_name"><i class="ion-arrow-right-a text-green"></i> Company Name contains <strong>{{ searchText }}</strong>(or) </p>
          </div>
        </div>
        <div class="container p-0">
          <div class="row sahito-list">
            <div class="col-md-12 p-0">
              <div class="sahito-list-contact border-1 table-responsive">
                <table class="table table-hover default-table sahito-list-contact--table">
                  <thead>
                    <tr>
                      <th class="col-checkbox">
                        <div class="checkbox checkbox-single checkbox-success">
                          <input type="checkbox" id="all">
                          <label></label>
                        </div>
                      </th>
                      <th>Name <i class="fa fa-sort"></i></th>
                      <th>Company Name</th>
                      <th>Email</th>
                      <th>Work Phone</th>
                      <!--<th>Receivables</th>-->
                      <!--<th>Payables</th>-->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(search, index) in searchResult">
                      <td class="col-checkbox">
                        <div class="checkbox checkbox-single checkbox-success">
                          <input type="checkbox" :id="'list-' + index">
                          <label></label>
                        </div>
                      </td>
                      <td><a href="javascript:void(0);" onclick="vendor()">{{ search.display_name }}</a></td>
                      <td>{{ search.company_name }}</td>
                      <td>{{ search.text }}</td>
                      <td>{{ search.phone }}</td>
                      <!--<td>-</td>-->
                      <!--<td>-</td>-->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-md-12 pr-20 text-right">
              <pagination></pagination>
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
  name: 'ContactSearch',

  components: {
    'pagination': require('../Pagination'),
  },


  data() {
    return {
      searchResult: [],
      searchText: '',
    };
  },


  mounted() {
    this.searchText = this.$route.query.q;

    if (_.isEmpty(this.searchText)) {
      swal({
        title: 'You need provide any text to search',
        type: 'warning',
      });
    } else {
      this.search(this.searchText);
    }
  },


  methods: {

  }
}
</script>
