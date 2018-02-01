<template>
  <div>
    <form method="POST" @submit.prevent>
      <div class="content full-width sahito-user bgr-white">
        <div class="container">
          <div class="container full-width-header bt-1 p-b-10 m-b-20">
            <div class="row">
              <div class="col-md-12">
                <h4 class="pull-left page-title" v-if="!form.stock_adjustment_id">Add Stock Adjusment</h4>
                <h4 class="pull-left page-title" v-if="form.stock_adjustment_id">Edit Stock Adjusment</h4>
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
                        <input v-model="form.reference_number" type="text" placeholder="779001" class="form-control"
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
                                <th>Adjust</th>
                                <th>Quantity on Hand</th>
                                <th>Reason</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="(detail, index) in form.details">
                                <td>{{ index+1 }}</td>
                                <td>{{ detail.item_id }}</td>
                                <td>
                                  <div class="col-md-12 pl-pr-0">
                                    <select class="form-control" v-model="detail.item_id" @change="selectItem(detail)" required title="Item name">
                                      <option v-for="item in list.items" :value="item.item_id">
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
                                    v-model.number="detail.adjust_qty"
                                    @keyup="changeOnHandValue(detail)"
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
                                  <input
                                    v-model.number="detail.on_hand_qty"
                                    @keyup="changeAdjustValue(detail)"
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
                                  <select required title="Reason" class="form-control" v-model="detail.reason_id" :disabled="!detail.item_id">
                                    <option v-for="reason in list.reasons" :value="reason.reason_id">
                                      {{ reason.reason }}
                                    </option>
                                  </select>
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
                <button class="btn btn-default waves-effect" type="button">Cancel</button>
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
</template>

<script>
  import Str from '@/helpers/Str'
  import Axios from 'axios'
  import { Alert } from 'src/helpers'
  import Form from 'src/helpers/Form'

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

    mounted () {
      // Edit mode
      const stockId = this.$route.params.id
      if (!stockId) {
        // this.form.stock_adjustment_id = Str.random()
      } else {
        this.getDetails(stockId)
      }

      this.initialize()
      this.getItems()

      $('#adjustment_date_picker').flatpickr({
        altInput: true,
      })
    },

    methods: {

      async initialize () {
        const res = await Axios.get(`reasons`)
        this.list.reasons = res.data.data
      },

      async getItems () {
        const res = await Axios.get(`items`, {
          params: {
            per_page: 9999,
          },
        })
        this.list.items = res.data.data
      },

      async getDetails (stockId) {
        const res = await Axios.get(`stock_adjustments/${stockId}`)
        this.form.details = res.data.data.details
        this.form.details[0].database_qty = 129
        this.form.stock_adjustment_id = res.data.data.stock_adjustment_id
      },

      addNew () {
        this.form.details.push({})
      },

      async selectItem(item) {
        const res = await Axios.get(`items/${item.item_id}`)
        item.database_qty = res.data.data.inventory_stock
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
            data.is_applied = true
            data.is_void = false
          } else {
            data.is_applied = true
            data.is_void = false
          }

          const res = await Axios.post(`stock_adjustments`, data)

          Alert.success('Stock adjustment has been added')

          this.$router.push({ name: 'stock_adjustment.index' })
        }
        catch (err) {
          console.error(err)
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

    },
  }
</script>
