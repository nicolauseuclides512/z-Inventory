<template>
  <div class="content-page">
    <div class="content full-width sahito-user bgr-white">
      <div class="container">

        <form method="POST" @submit.prevent>
          <div class="content full-width sahito-user bgr-white">
            <div class="container">
              <div class="container full-width-header bt-1 p-b-10 m-b-20">
                <div class="row">
                  <div class="col-md-12">
                    <h4 class="pull-left page-title" v-if="$route.name == 'stock_adjustment.edit'">Edit Stock Adjusment</h4>
                    <h4 class="pull-left page-title" v-else>Add Stock Adjusment</h4>
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
                        <div class="col-md-3">
                          <input v-model="form.stock_adjustment_id"
                                disabled
                                required
                                type="text"
                                placeholder=""
                                class="form-control"
                          />
                        </div>
                      </div>
                      <div class="form-group form-general m-b-20">
                        <label class="col-md-2 control-label text-left">Adjustment Date</label>
                        <div class="col-md-3">
                          <div class="input-group">
                            <span class="input-group-addon">
                              <i class="fa fa-fw fa-calendar"></i>
                            </span>
                            <input
                              v-model="form.stock_adjustment_date"
                              type="text"
                              required
                              class="form-control bg-white"
                              placeholder="yyyy-mm-dd"
                              id="adjustment_date_picker"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-20">
                        <label class="col-md-2 control-label text-left">Reference Number</label>
                        <div class="col-md-3">
                          <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-fw fa-hashtag"></i></span>
                            <input v-model="form.reference_number" type="text" placeholder="" class="form-control"
                                  id="reference_number">
                          </div>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-20">
                        <label for="notes" class="col-md-2 control-label text-left">Notes</label>
                        <div class="col-md-6">
                          <textarea
                            v-model="form.notes"
                            class="form-control"
                            id="notes"
                            title="notes"
                            style="height: 120px;"
                          ></textarea>
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
                                    <th>No.</th>
                                    <th>SKU</th>
                                    <th>Item Name</th>
                                    <th>Quantity in Database</th>
                                    <th>Quantity on Hand</th>
                                    <th>Adjust</th>
                                    <th>Reason</th>
                                    <td style="box-shadow: none; border: none; width:28px"></td>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr v-for="(detail, index) in form.details">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ detail.code_sku }}</td>
                                    <td>
                                      <div class="col-md-12 pl-pr-0">
                                        <select class="form-control" v-model="detail.item_id" @change="selectItem(detail)" required title="Item name">
                                          <option v-for="item in list.items" :value="item.item_id" v-if="item.track_inventory" >
                                              {{ item.item_name }}
                                          </option>
                                        </select>
                                      </div>
                                    </td>
                                    <td align="center">
                                      <span>{{ detail.database_qty }}</span>
                                    </td>
                                    <td>
                                      <input
                                        v-model.number="detail.on_hand_qty"
                                        @keypress="changeAdjustValue(detail)"
                                        @change="changeAdjustValue(detail)"
                                        required
                                        :disabled="!detail.item_id"
                                        title="On hand quantity"
                                        class="vertical-spin form-control"
                                        type="number"
                                        name="vertical-spin"
                                        data-bts-button-down-class="btn btn-primary"
                                        data-bts-button-up-class="btn btn-primary">
                                    </td>
                                    <td>
                                      <input
                                        v-model.number="detail.adjust_qty"
                                        @keypress="changeOnHandValue(detail)"
                                        @change="changeOnHandValue(detail)"
                                        required
                                        :disabled="!detail.item_id"
                                        title="Adjustment quantity"
                                        class="vertical-spin form-control"
                                        type="number"
                                        name="vertical-spin"
                                        data-bts-button-down-class="btn btn-primary"
                                        data-bts-button-up-class="btn btn-primary">
                                    </td>
                                    <td>
                                      <select required title="Reason" class="form-control" v-model="detail.reason_id" :disabled="!detail.item_id">
                                        <option v-for="reason in list.reasons" :value="reason.reason_id">
                                          {{ reason.reason }}
                                        </option>
                                      </select>
                                    </td>
                                    <td style="vertical-align: middle; background-color:#ffffff; border:0px solid; width:28px" v-if="detail.item_id">
                                      <a @click="removeProduct(product)" href="javascript:void(0);" class="text-danger"><i
                                        class="ion-close-round"></i></a>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                                <button type="button" @click="addNew" class="btn-link">
                                  + Add another line
                                </button>
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
                    <button class="btn btn-default waves-effect" type="button" @click="cancel">Cancel</button>
                  </div>
                  <div class="col-md-6 text-right">
                    <div class="col-md-6 col-md-offset-6">
                      <div class="btn-group dropup">
                        <button @click="save($event)" data-type="save-as-draft" type="submit" class="btn btn-primary waves-effect waves-light">
                          Save as Draft
                        </button>
                        <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light"
                                data-toggle="dropdown" aria-expanded="false"><i class="caret"></i></button>
                        <ul class="dropdown-menu" role="menu">
                          <li>
                            <button
                              @click="save($event)"
                              type="submit"
                              class="btn"
                              style="background: none; border: none; box-shadow: none;"
                              data-type="save-and-close"
                            >
                              Save and Close
                            </button>
                          </li>
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
    </div>
  </div>
</template>

<script>
  import Str from '@/helpers/Str'
  import Axios from 'axios'
  import { Alert } from 'src/helpers'
  import Form from 'src/helpers/Form'
  import {responseOk, swal_error, swal_success} from 'helpers'

  export default {
    name: 'StockAdjustmentForm',

    watch: {
      'form.details.adjust_qty': {
        handler (val, oldVal) {
          console.log(_.cloneDeep(val))
        },
        deep: true,
      },
      'form.details.on_hand_qty': {
        handler (val, oldVal) {
          console.log(_.cloneDeep(val))
        },
        deep: true,
      },
    },

    data () {
      return {
        dirtyForm: false,

        list: {
          items: [],
          reasons: [],
        },
        form: new Form({
          stock_adjustment_id: null,
          stock_adjustment_date: new Date().toISOString().substr(0, 10),
          reference_number: '',
          is_applied: false,
          is_void: false,
          notes: '',
          details: [{
            item_id: null,
            reason_id: null,
            database_qty: null,
            adjust_qty: null,
            on_hand_qty: null,
          }],
        }),
      }
    },

    beforeRouteLeave(to, from, next) {
      if (this.dirtyForm) {
        const leave = confirm('Are you sure leave this page?')
        if (!leave) return next(false)
      }
      return next()
    },

    async mounted () {
      // Edit mode
      const stockId = this.$route.params.id
      if (!stockId) {
        // this.form.stock_adjustment_id = Str.random()
      } else {
        this.getDetails(stockId)
      }

      const [createResponse, itemsResponse] = await Promise.all([
        this.initialize(),
        this.getItems(),
      ])

      this.list.items = itemsResponse.data.data

      this.list.reasons = createResponse.data.data.reasons;
      if (!this.$route.params.id) {
        this.form.stock_adjustment_id = createResponse.data.data.next_stock_adjustment_number
      }

      this.dirtyForm = true
      $('#adjustment_date_picker').flatpickr({
        altInput: true,
      })
    },

    methods: {

      async initialize () {
        return await Axios.get(`stock_adjustments/create`);
      },

      async getItems () {
        return await Axios.get(`items`, {
          params: {
            page: 1,
            per_page: 100,
            sort: "created_at.desc",
            filter: "all",
            q: "",
            leaf_only: true
          },
        })
      },

      async getDetails (stockId) {
        const res = await Axios.get(`stock_adjustments/${stockId}`);
        this.form.details = res.data.data.details;
        this.form.details[0].database_qty = 129;
        if (this.$route.params.id){
          this.form.stock_adjustment_id = res.data.data.stock_adjustment_number;
        }
      },

      addNew () {
        this.form.details.push({})
      },

      async selectItem(item) {
        const res = await Axios.get(`items/${item.item_id}`)
        item.database_qty = res.data.data.stock_quantity
        item.code_sku = res.data.data.code_sku
        item.track_inventory = res.data.data.track_inventory
      },

      async save (ev) {
        try {
          const data = {
            stock_adjustment_id: this.form.stock_adjustment_id,
            stock_adjustment_date: this.form.stock_adjustment_date,
            reference_number: this.form.reference_number,
            notes: this.form.notes,
            details: this.form.details,
          }

          if (ev.target.dataset.type === 'save-as-draft') {
            data.is_applied = 'false'
            data.is_void = 'false'
            this.dirtyForm = false
          } else {
            data.is_applied = 'true'
            data.is_void = 'false'
            this.dirtyForm = false
          }

          let counter_null = 0

          for (let counter = 0; counter < data.details.length; counter++){
            if (!data.details[counter].reason_id){
                counter_null++
            }
          }

          if (counter_null == 0){
            const res = await Axios.post(`stock_adjustments`, data)

            if (!responseOk(res.data.code)) {
              return swal_error(res)
            }else{
              swal_success(res)
              this.$router.push({ name: 'stock_adjustment.index' })
            }

          }
        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('message')) {
            swal_error(err.response)
          }
        }
      },

      changeAdjustValue (detail) {
        let on_hand_qty = 0
        let database_qty = 0

        if (detail.on_hand_qty) {
          on_hand_qty = parseInt(detail.on_hand_qty)
        } else {
          on_hand_qty = 0
        }

        if (detail.database_qty) {
          database_qty = parseInt(detail.database_qty)
        } else {
          database_qty = 0
        }

        detail.adjust_qty = on_hand_qty - database_qty
      },

      changeOnHandValue (detail) {
        let database_qty = 0
        let adjust_qty = 0

        if (detail.database_qty) {
          database_qty = parseInt(detail.database_qty)
        } else {
          database_qty = 0
        }

        if (detail.adjust_qty) {
          adjust_qty = parseInt(detail.adjust_qty)
        } else {
          adjust_qty = 0
        }

        detail.on_hand_qty = database_qty + adjust_qty
      },

      removeProduct(product) {
        const index = this.form.details.indexOf(product);
        this.form.details.splice(index, 1);
      },

    cancel() {
        this.$router.push('/items/stock_adjustment')
      },

    },
  }
</script>
