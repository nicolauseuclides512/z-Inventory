<template>
  <div>
    <form method="POST">
      <div class="content full-width sahito-user bgr-white">
        <div class="container">
          <div class="container full-width-header bt-1 p-b-10 m-b-20">
            <div class="row">
              <div class="col-md-12">
                <h4 class="pull-left page-title">Stock</h4>
              </div>
            </div>
          </div>
          <div class="container bt-1 m-b-20">
            <div class="row">
              <div class="col-md-12 p-b-20">
                <h5 class="title">Info</h5>
                <div class="form-horizontal">
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left">Adjustment ID</label>
                    <div class="col-md-2">
                      <input type="text" disabled="true" placeholder="" class="form-control">
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left">Adjustment Date</label>
                    <div class="col-md-2">
                      <input type="text" class="form-control" placeholder="mm/dd/yyyy" id="adjustmentdatepicker">
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left">Reference Number</label>
                    <div class="col-md-2">
                      <input type="text" placeholder="#779001" class="form-control">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container bt-1 m-b-20">
            <div class="row">
              <div class="col-md-12 p-b-20">
                <h5 class="title">Adjustment Details</h5>
                <div class="form-horizontal">
                  <div class="col-md-12">
                    <div class="panel panel-default">
                      <div class="panel-body">
                        <div class="row">
                          <div class="col-md-12 col-sm-12 col-xs-12">
                            <table class="table table-striped">
                              <thead>
                              <tr>
                                <th>SKU</th>
                                <th>Item Name</th>
                                <th>Quantity in Database</th>
                                <th>Adjust</th>
                                <th>Quantity on Hand</th>
                                <th>Reason</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="item in items">
                                <td>{{ item.item_id }}</td>
                                <td>
                                  <div class="col-md-12 pl-pr-0">
                                    <select class="form-control">
                                      <option>Products 1</option>
                                      <option selected="true">Products 2</option>
                                      <option>Products 3</option>
                                    </select>
                                  </div>
                                </td>
                                <td align="center">
                                  {{ item.database_qty }}
                                </td>
                                <td>
                                  <input
                                    v-model="item.adjust_qty"
                                    class="vertical-spin"
                                    type="number"
                                    value=""
                                    name="vertical-spin"
                                    data-bts-button-down-class="btn btn-primary"
                                    data-bts-button-up-class="btn btn-primary">
                                </td>
                                <td>
                                  <input
                                    v-model="item.on_hand_qty"
                                    class="vertical-spin"
                                    type="number"
                                    name="vertical-spin"
                                    data-bts-button-down-class="btn btn-primary"
                                    data-bts-button-up-class="btn btn-primary">
                                </td>
                                <td>
                                  <select class="form-control" v-model="item.reason_id">
                                    <option v-for="reason in list.reasons" :value="reason.reason_id">
                                      {{ reason.reason }}
                                    </option>
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  <button type="button" @click="addNew" class="btn btn-primary">+ Add another line</button>
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

          <div class="float-save">
            <div class="row">
              <div class="col-md-6 text-left">
                <button class="btn btn-default waves-effect" type="button">Cancel</button>
              </div>
              <div class="col-md-6 text-right">
                <div class="col-md-6 col-md-offset-6">
                  <div class="btn-group dropup">
                    <button type="button" class="btn btn-primary waves-effect waves-light">Save as Draft</button>
                    <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light"
                            data-toggle="dropdown" aria-expanded="false"><i class="caret"></i></button>
                    <ul class="dropdown-menu" role="menu">
                      <li><a href="#">Save and Close</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    name: 'StockAdjustmentForm',

    data () {
      return {
        list: {
          reasons: [],
        },
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        const res = await Axios.get(`stock_adjustments/create`)

        this.list.reasons = res.data.data.reasons
      },

      addNew() {
        this.items.push({

        })
      }
    },
  }
</script>
