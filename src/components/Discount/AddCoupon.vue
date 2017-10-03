<template>
  <div>

    <form method="POST" @submit.prevent="save">

      <div class="container full-width-header bt-1 p-b-10 m-b-20">

        <div class="row">
          <div class="col-md-12">
            <h4 class="pull-left page-title">New Coupon</h4>
          </div>
        </div>
      </div>

      <div class="container bt-1 m-b-20">
        <div class="row">
          <div class="col-md-12 p-b-20">
            <div class="form-horizontal">
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Name</label>
                <div class="col-md-9">
                  <input type="text" id="name" v-model="form.name" class="form-control" required>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container bt-1 m-b-20">
        <div class="row">
          <div class="col-md-12 p-b-20">
            <div class="form-horizontal">
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Discount Code</label>
                <div class="col-md-9">
                  <input type="text" id="code" v-model="form.code" class="form-control" placeholder="BIGSALE" required>
                  <span class="help-text">Customers will enter this discount code at checkout.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container bt-1 m-b-20">
        <div class="row">
          <div class="col-md-12 p-b-20">
            <div class="form-horizontal">
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left"><strong>Date Range </strong></label>
              </div>
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Start Date</label>
                <div class="col-md-3">
                  <input type="text" v-model="form.start_date" class="form-control flatpickr" id="start_date" required>
                </div>
                <label class="col-md-2 control-label text-left">End Date</label>
                <div class="col-md-3">
                  <input type="text" v-model="form.end_date" class="form-control" id="end_date" required>
                </div>
              </div>
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Limit per Customer</label>
                <div class="col-md-7">
                  <div class="checkbox checkbox-success">
                    <input
                      id="limit_per_customer"
                      type="checkbox"
                      v-model="form.limit_per_customer"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label for="limit_per_customer"> 1 Use Only <span
                      class="help-text">(tracked by customer's email)</span></label>
                  </div>
                </div>
              </div>
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Total Quantity Available</label>
                <div class="col-md-7">
                  <div class="radio radio-info radio-inline">
                    <input type="radio" id="unlimited" v-model="quantity_type" value="unlimited" name="total-quantity">
                    <label for="unlimited"> Unlimited </label>
                  </div>
                  <div class="radio radio-info radio-inline radio-inline-input ml-20">
                    <input type="radio" id="input-quantity" v-model="quantity_type" value="input-quantity"
                           name="total-quantity">
                    <label for="input-quantity">
                      <input type="number" v-model="form.quantity" class="form-control" min="0"
                             :disabled="quantity_type == 'unlimited'">
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- conditions -->
      <div class="container bt-1 m-b-20">
        <div class="row">
          <div class="col-md-12 p-b-20 bt-1">
            <h5 class="title">Conditions</h5>
            <div class="form-horizontal">
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Take</label>
                <div class="col-md-3">
                  <input type="number" class="form-control" placeholder="Rp" id="amount_value" v-model="form.amount_value" min="0" required>
                </div>
                <div class="col-md-2">
                  <select id="amount_type" v-model="form.amount_type" class="form-control" required>
                    <option v-for="(name, key) in list.amount_type" :value="key"> {{ name }} </option>
                  </select>
                </div>
                <label class="col-md-1 control-label text-left">off</label>
              </div>
              <div class="form-group form-general m-b-20">
                <label class="col-md-3 control-label text-left">Apply to</label>
                <div class="col-md-3">
                  <select id="applied_type" v-model="form.applied_type" class="form-control" required>
                    <option v-for="(name, key) in list.applied_type" :value="key"> {{ name }} </option>
                  </select>
                </div>
                <div class="col-md-3">
                  <vuelist
                    @search="getCollection"
                    @change="changeAppliedValue"
                    :options="list.collection"
                    placeholder="Search for collection..."
                  ></vuelist>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container p-b-10 m-b-20">
        <div class="row">
          <div class="col-md-12 text-center">
            <button type="submit" class="btn btn-info waves-effect waves-light">Save</button>
            <button type="button" @click="backToList" class="btn btn-default waves-effect">Cancel</button>
          </div>
        </div>
      </div>


    </form>

  </div>
</template>

<script>

  const Flatpickr = require("flatpickr")
  import Vuelist from '../Vuelist'

  export default {
    name: 'AddCoupon',

    components: {
      Vuelist
    },

    data() {
      return {
        quantity_type: 'unlimited',
        list: {
          amount_type: [],
          applied_type: [],
          collection: [],
        },
        form: {
          name: '',
          code: '',
          start_date: '',
          end_date: '',
          no_expiry: false,
          quantity: 0,
          limit_per_customer: 0,
          amount_type: 'percentage',
          amount_value: 10000,
          applied_type: 'product',
          applied_value: null,
          discount_status: 1,
        }
      }
    },


    mounted() {

      $('#start_date').flatpickr()
      $('#end_date').flatpickr()

      this.$http.get('discounts/create')
        .then(res => {
          if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

          this.list.amount_type = res.data.data.amount_type
          this.list.applied_type = res.data.data.applied_type

        }, res => {
          return swal_error(res)
        })
    },

    methods: {


      /**
       * Save data
       */
      save() {

        if (this.quantity_type === 'unlimited') {
          this.form.quantity = -1
        }

        this.$http.post('discounts/promo', this.form)
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

            this.$router.push({name: 'discount.index'})

            return swal_success(res)

          }, res => {
            return swal_error(res)
          })
      },


      /**
       * Back to list
       */
      backToList() {
        this.$router.push({name: 'discount.index'})
      },


      /**
       * Get collection
       */
      getCollection(search) {
        // Minimum 3 chars to search
        if (search.length < 3) return

        const options = {
          page: 1,
          sort_column: 'name',
          sort_order: 'asc',
          filter_by: 'publish',
          per_page: 25,
          q: search,
        }

        this.$http.get('collections', { params: options }).then(res => {
          this.list.collection = res.data.data.map(item => {
            return {
              label: item.name,
              value: item.item_collection_id,
            }
          })
        }, res => {

        })
      },


      /**
       * When applied value has changed
       */
      changeAppliedValue(search) {
        if (search) {
          this.form.applied_value = search.value
        }
      },


    }
  }
</script>
