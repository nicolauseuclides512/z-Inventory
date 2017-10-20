<template>
  <div>
    <form method="POST" @submit.prevent>
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
                    <div class="col-md-3">
                      <input v-model="form.stock_adjustment_id" disabled required type="text" placeholder=""
                             class="form-control">
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
                                <th>SKU</th>
                                <th>Item Name</th>
                                <th>Quantity in Database</th>
                                <th>Adjust</th>
                                <th>Quantity on Hand</th>
                                <th>Reason</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="detail in form.details">
                                <td>{{ detail.item_id }}</td>
                                <td>
                                  <div class="col-md-12 pl-pr-0">
                                    <select class="form-control" v-model="detail.item_id" required title="Item name">
                                      <option v-for="item in list.items" :value="item.item_id">
                                        {{ item.item_name }}
                                      </option>
                                    </select>
                                  </div>
                                </td>
                                <td align="center">
                                  {{ detail.database_qty }}
                                </td>
                                <td>
                                  <input
                                    v-model="detail.adjust_qty"
                                    @keyup="changeOnHandValue(detail)"
                                    required
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
                                    title="On hand quantity"
                                    class="vertical-spin form-control"
                                    type="number"
                                    name="vertical-spin"
                                    data-bts-button-down-class="btn btn-primary"
                                    data-bts-button-up-class="btn btn-primary">
                                </td>
                                <td>
                                  <select required title="Reason" class="form-control" v-model="detail.reason_id">
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
  import Axios from 'axios'
  import Form from 'src/helpers/Form'
  import flatpickr from 'flatpickr'
  import Str from '@/helpers/Str'
  import { Alert } from 'src/helpers'

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
        this.form.adjustment_id = Str.random()
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
        detail.adjust_qty =  parseInt(detail.on_hand_qty) - parseInt(detail.database_qty)
      },

      changeOnHandValue (detail) {
        detail.on_hand_qty = parseInt(detail.database_qty) + parseInt(detail.adjust_qty)
      },

    },
  }
</script>
