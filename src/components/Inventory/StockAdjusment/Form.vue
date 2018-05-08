<template>
  <div class="content-page">
    <div class="content" style="padding-left: 0px; padding-right: 0px">
      <!-- <div class="container"> -->

        <form method="POST" @submit.prevent>
          <div class="col-md-12" style="padding-left:0px">
            <h4 class="pull-left page-title" v-if="$route.name == 'stock_adjustment.edit'">Edit Stock Adjusment</h4>
            <h4 class="pull-left page-title" v-else>Add Stock Adjusment</h4>
          </div>
          <!-- Row 1 : INFO -->
          <div class="row">
            <div class="col-md-2">
              <!-- Adjustment info guide-->
              <div class="panel panel-default" style="background-color:transparent; box-shadow:none">
                <div class="panel-body" style="padding:0px">
                  Information <br>
                  <small class="text-muted">This section contain the overview of your stock adjustment.</small>
                </div>
              </div>
            </div>

            <div class="col-md-9">
              <!-- Adjustment info -->
              <div class="panel panel-default">
                <div class="panel-body">
                  <div class="form-horizontal">
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left">Adjustment ID</label>
                      <div class="col-md-4">

                          <input v-model="form.stock_adjustment_id"
                                disabled
                                required
                                type="text"
                                placeholder=""
                                class="form-control"
                          />

                      </div>
                    </div>
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left">Adjustment date</label>
                      <div class="col-md-4">
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
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left">Reference No.</label>
                      <div class="col-md-4">

                          <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-fw fa-hashtag"></i></span>
                            <input v-model="form.reference_number" type="text" placeholder="" class="form-control"
                                  id="reference_number">
                          </div>

                      </div>
                    </div>
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left">Notes</label>
                      <div class="col-md-6">
                         <textarea
                            v-model="form.notes"
                            class="form-control"
                            id="notes"
                            title="notes"
                            rows="4"
                            style="resize:vertical"
                          ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Row 2 : DETAIL -->
          <div class="row">
            <div class="col-md-2">
              <!-- Adjustment details guide-->
              <div class="panel panel-default" style="background-color:transparent; box-shadow:none">
                <div class="panel-body" style="padding:0px">
                  Details <br>
                  <small class="text-muted">This section contain the list of your stock adjustment.</small>
                </div>
              </div>
            </div>

            <div class="col-md-10">
              <!-- Adjustment details -->
              <div class="panel panel-default">
                <div class="panel-body">
                  <div class="form-horizontal">
                    <table class="table table-striped">
                      <thead>
                      <tr>
                        <th class="text-center" style="font-weight:400; color:#000">No.</th>
                        <th style="font-weight:400; color:#000">Item</th>
                        <th class="text-center" style="width:95px; font-weight:400; color:#000">Quantity in Database</th>
                        <th class="text-center" style="width:85px; font-weight:400; color:#000">Quantity on Hand</th>
                        <th class="text-center" style="width:85px; font-weight:400; color:#000">Adjust</th>
                        <th style="font-weight:400; color:#000" >Reason</th>
                        <td style="box-shadow: none; border: none; width:28px"></td>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(detail, index) in form.details">
                        <td class="text-center">{{ index+1 }}</td>
                        <td>
                          <div class="col-md-12 pl-pr-0">
                            <select class="form-control" v-model="detail.item_id" @change="selectItem(detail)" required title="Item name">
                              <option :value="detail.item_id" v-if="detail">
                                {{ detail.item_name }}
                              </option>
                              <option v-for="item in items" :value="item.item_id" v-if="item.track_inventory" >
                                {{ item.item_name }}
                              </option>
                            </select><br>
                            <span v-if="!$route.params.id"  v-show="detail.item_id != null"> <small >SKU Code : {{detail.code_sku }}</small></span>
                          </div>
                        </td>
                        <td align="center">
                          <span>{{ detail.database_qty }}</span>
                        </td>
                        <td>
                          <input
                            v-model.number="detail.on_hand_qty"
                            @keyup="changeAdjustValue(detail)"
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
                            @keyup="changeOnHandValue(detail)"
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
          <!-- <div class="content full-width sahito-user bgr-white">
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
                                        @keyup="changeAdjustValue(detail)"
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
                                        @keyup="changeOnHandValue(detail)"
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
              </div> -->

              <div class="float-save">
                <div class="row">
                  <div class="col-md-6 text-left">
                    <button class="btn btn-default waves-effect" type="button" @click="cancel">Cancel</button>
                  </div>
                  <div class="col-md-6 text-right">
                    <div class="col-md-6 col-md-offset-6">
                      <div class="btn-group dropup">
                        <button
                          data-type="save-and-close"
                          @click="save($event)"
                          type="submit"
                          class="btn btn-primary waves-effect waves-light"
                          >
                          Save and Close
                        </button>
                        <!-- <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light"
                                data-toggle="dropdown" aria-expanded="false"><i class="caret"></i></button>
                        <ul class="dropdown-menu" role="menu">
                          <li>
                            <button
                              @click="save($event)"
                              data-type="save-as-draft"
                              type="submit"
                              class="btn"
                              style="background: none; border: none; box-shadow: none;"
                            >
                              Save and Close
                            </button>
                          </li>
                        </ul> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <!-- </div>
          </div> -->
        </form>

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import Form from '@/helpers/Form'
  import { Alert } from '@/helpers'
  import { swal_error, swal_success } from 'helpers'

  export default {
    name: 'StockAdjustmentForm',

    watch: {
      'form.details.adjust_qty': {
        handler (val, oldVal) {
          console.log(_.cloneDeep(val))
        },
        deep: true
      },
      'form.details.on_hand_qty': {
        handler (val, oldVal) {
          console.log(_.cloneDeep(val))
        },
        deep: true
      }
    },

    data () {
      return {
        dirtyForm: false,

        list: {
          items: [],
          reasons: []
        },
        form: new Form({
          stock_adjustment_id: null,
          stock_adjustment_date: new Date().toISOString().substr(0, 10),
          reference_number: '',
          is_applied: false,
          is_void: false,
          notes: '',
          details: [
            {
              item_id: null,
              reason_id: null,
              database_qty: null,
              adjust_qty: null,
              on_hand_qty: null
            }
          ]
        })
      }
    },

    computed: {
      items() {
        return this.list.items.filter((item) => {
          return ! this.form.details.find((selectedItem) => {
            return selectedItem.item_id === item.item_id
          })
        })
      }
    },

    beforeRouteLeave (to, from, next) {
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
        this.getItems()
      ])

      this.list.items = itemsResponse.data.data

      this.list.reasons = createResponse.data.data.reasons
      if (!this.$route.params.id) {
        this.form.stock_adjustment_id =
          createResponse.data.data.next_stock_adjustment_number
      }

      // For edit: current selected item
      this.list.items.map((item) => {
        this.form.details.map((detail) => {
          if (item.item_id === detail.item_id) {
            detail.item_name = item.item_name
          }
        })
      })

      this.dirtyForm = true
      $('#adjustment_date_picker').flatpickr({
        altInput: true
      })
    },

    methods: {
      async initialize () {
        return await Axios.get(`stock_adjustments/create`)
      },

      async getItems () {
        return await Axios.get(`items`, {
          params: {
            page: 1,
            per_page: 100,
            sort: 'created_at.desc',
            filter: 'all',
            q: '',
            leaf_only: true
          }
        })
      },

      async getDetails (stockId) {
        const res = await Axios.get(`stock_adjustments/${stockId}`)
        this.form = res.data.data
        this.form.details = res.data.data.details
        this.form.details.database_qty = res.data.data.details[0].stock_quantity
        if (this.$route.params.id) {
          this.form.stock_adjustment_id = res.data.data.stock_adjustment_number
        }
      },

      addNew () {
        this.form.details.push({
          adjust_qty: null,
          database_qty: null,
          item_id: null,
          on_hand_qty: null,
          reason_id: null,
        })
      },

      async selectItem (item) {
        const res = await Axios.get(`items/${item.item_id}`)
        item.database_qty = res.data.data.stock_quantity
        item.code_sku = res.data.data.code_sku
        item.item_name = res.data.data.item_name
        item.item_id = res.data.data.item_id
        //item.track_inventory = res.data.data.track_inventory;
      },

      async save (ev) {
        try {
          const data = {
            stock_adjustment_id: this.form.stock_adjustment_id,
            stock_adjustment_date: this.form.stock_adjustment_date,
            reference_number: this.form.reference_number,
            notes: this.form.notes,
            details: this.form.details
          }

          if (ev.target.dataset.type === 'save-as-draft') {
            data.is_applied = false
            data.is_void = false
            this.dirtyForm = false
          } else {
            // I don't know the reason behind of this, but this "boolean" MUST a "string".
            // Or server can't set this as applied.
            data.is_applied = 'true'
            data.is_void = false
            this.dirtyForm = false
          }

          let counter_null = 0

          for (let counter = 0; counter < data.details.length; counter++) {
            if (!data.details[counter].reason_id) {
              counter_null++
            }
          }

          if (counter_null === 0) {
            const stockAdjusmentId = this.$route.params.id
            const url = stockAdjusmentId ? `stock_adjustments/${stockAdjusmentId}` : `stock_adjustments`
            const res = await Axios.post(url, data)
            swal_success(res)
            this.$router.push({ name: 'stock_adjustment.index' })
          }
        }
        catch (err) {
          const errorMessage = _.first(Object.values(err.response.data.data)[0])
          if (err.response && err.response.data) {
            Alert.error(errorMessage)
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

      removeProduct (product) {
        const index = this.form.details.indexOf(product)
        this.form.details.splice(index, 1)
      },

      cancel () {
        this.$router.push('/items/stock_adjustment')
      }
    }
  }
</script>
