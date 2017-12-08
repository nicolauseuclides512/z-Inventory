<template>
  <div id="payment-modal-add" class="modal fade" tabindex="-1" role="dialog">
    <form method="POST" @submit.prevent="save" class="form-horizontal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">Add Payment</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-3 control-label">Amount Receive</label>
                  <div class="col-md-6">
                    <div class="input-group">
                      <span class="input-group-addon">Rp</span>
                      <input type="number" v-model="form.amount" required class="form-control" min="0">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Payment Date</label>
                  <div class="col-md-6">
                    <input type="text" v-model="form.date" class="flatpickr">
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-3 control-label">Payment Mode</label>
                  <div class="col-md-4">
                    <select v-model="form.payment_mode_id" class="form-control"
                            @change="changePaymentMode(form.payment_mode_id)">
                      <option v-for="p in payment_method_list" :value="p.mode_id">
                        {{ p.mode_name }}
                      </option>
                    </select>
                  </div>
                  <small v-if="!payment_method_list" class="col-md-11 col-md-offset-1 alert-warning" style="padding: 3px;">
                    You don't have any payment method.
                    <a href="#" @click.prevent="gotoPaymentSettings">Click here to add a payment method</a>.
                  </small>
                </div>
                <div class="form-group row" v-if="form.payment_mode_id === 1">
                  <label class="col-md-3 control-label">Deposit To</label>
                  <div class="col-md-6">
                    <select v-model="form.payment_account_id" class="form-control">
                      <option value="" disabled selected></option>
                      <option v-for="p in payment_method_details" :value="p.account_id">
                        {{ p.account_name }} - {{ p.account_number }}
                      </option>
                    </select>
                  </div>
                  <small v-if="!payment_method_details.length" class="col-md-11 col-md-offset-1 alert-warning" style="padding: 3px;">
                    You don't have any bank on the list.
                    <a href="#" @click.prevent="gotoPaymentSettings">Click here to add a bank</a>.
                  </small>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Reference#</label>
                  <div class="col-md-4">
                    <input type="text" v-model="form.reference_number" class="form-control form-trans"
                           id="reference">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Notes</label>
                  <div class="col-md-8">
                    <textarea v-model="form.notes" class="form-control" rows="4" maxlength="500"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <span v-if="!ui.saving">
              <button type="submit" :disabled="!isValidPaymentData" class="btn btn-info waves-effect waves-light m-t-15">
                Save
              </button>
            </span>
            <span v-else>
              <button type="button" class="btn btn-info waves-effect waves-light m-t-15" disabled>
                <i class="fa fa-spin fa-spinner"></i>
              </button>
            </span>
            <button type="button" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Cancel</button>

            <!--<label class="checkbox-inline m-t-15">-->
              <!--<input type="checkbox" v-model="payment.send_receipt" :true-value="1" :false-value="0" :disabled="true">-->
              <!--<span class="disabled text-muted">Send payment receipt to customer</span>-->
            <!--</label>-->
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Axios from 'axios'
  import dateFormat from 'date-fns/format'
  import store from 'src/store'
  import {responseOk, swal_error, swal_success} from "../../../helpers";
  import PaymentMethodList from '../../../helpers/PaymentMethodList'
  import Form from '../../../helpers/Form'

  const Flatpickr = require('flatpickr').default

  export default {
    name: 'SalesOrderModalPayment',

    data() {
      return {
        ui: {
          saving: false
        },
        form: new Form({
          date: dateFormat(new Date(), 'YYYY-MM-DD'),
          notes: '',
          currency: 1,
          amount: 0,
          reference_number: '',
          payment_mode_id: 1,
          payment_account_id: null,
          send_receipt: 0,
        }),

        sales_order_id: null,
        invoice_id: null,

        payment_method_list: [],
        payment_method_details: [],
      }
    },


    computed: {
      /**
       * Check validation of payment data
       * @return {boolean}
       */
      isValidPaymentData() {
        if (this.form.payment_mode_id === 1) {
          return this.form.date
            && this.form.amount
            && this.form.payment_mode_id
            && this.form.payment_account_id
        }

        return this.form.date
          && this.form.amount
          && this.form.payment_mode_id
      },

      paymentMethodModeList: {
        get() { return store.state.sales.payment.paymentMethodModeList },
        set(value) { store.commit('sales/payment/PAYMENT_METHOD_MODE_LIST', value) }
      },
    },


    mounted() {
      this.initialize()
//      store.dispatch('sales/payment/getPaymentMethodModeList')

      $('.flatpickr').flatpickr({
        defaultDate: new Date(),
        dateFormat: 'Y-m-d',
        altFormat: 'j M Y',
        altInput: true,
      })
    },


    methods: {
      async initialize() {
        try {
          const sales_order_id = this.sales_order_id = parseInt(this.$route.params.id)

          const invoiceList = await store.dispatch('sales/invoiceList', sales_order_id, {root: true})

          const invoice = await store.dispatch('sales/invoice', {
            sales_order_id,
            invoice_id: invoiceList[0].invoice_id
          })

          const invoice_id = this.invoice_id = invoice.invoice_id

          const res = await Axios.get(`sales_orders/${sales_order_id}/invoices/${invoice_id}/payments/create`)

          if (!responseOk(res.data.code)) {
            throw new Error(`I got code: ${res.data.code} from server.`)
          }

          this.payment_method_list = res.data.data.payment_method

          this.form.amount = res.data.data.total_payment

          // ----------------------------
          // --- SEARCH BANK TRANSFER ---
          // ----------------------------

          let banks = []
          if (Array.isArray(res.data.data.payment_method)) {
            banks = res.data.data.payment_method.find(item => {
              return item.mode_name === 'Bank Transfer'
            })

            if (banks && banks.hasOwnProperty('details')) {
              this.payment_method_details = banks.details
            }
          }

//          store.commit('sales/PAYMENT_METHOD_LIST', res.data.data.payment_method, {root: true})
//
//          console.log(_.cloneDeep(rootState.sales.paymentMethodList), 'methodlist')
//
//          commit('PAYMENT_METHOD_DETAIL',
//            // state.paymentMethodDetail.filter(item => {
//            //   return item.mode_id === 1
//            // })
//          )
//
//          console.log('NAH', _.cloneDeep(state.paymentMethodDetail))

          // this.form.payment.currency = res.data.data.currencies.currency_id
          // this.form.payment.amount = res.data.data.amount

          // if (_.isEmpty(state.paymentMethodList)) {
          //   Alert.error('You must set payment method on settings page.')
          //   this.$router.push({name: 'settings'})
          // }

        } catch (err) {
          console.log(err)
          if (err && err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }

      },

      async save() {
        try {
          this.ui.saving = true

          const url = `sales_orders/${this.sales_order_id}/invoices/${this.invoice_id}/payments`
          const res = await this.form.post(url)

          if (!responseOk(res.data.code)) {
            throw new Error(`I got code: ${res.data.code} from server.`)
          }

          this.$emit('success', res.data.data)

          swal_success(res)

          $('#payment-modal-add').modal('hide')

          this.ui.saving = false

        } catch (err) {
          this.ui.saving = false
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          } else {
            Alert.error('Can not save the payment')
          }
        }
      },

      /**
       * Change payment mode
       * @param {int} payment_mode_id
       */
      changePaymentMode(payment_mode_id) {
        const details = _(this.paymentMethodList)
          .filter(p => p.mode_id === payment_mode_id)
          .map(p => p.details)
          .value()

        if (details.length > 0) {
          this.paymentMethodList_details = details[0]
        }
      },

      gotoPaymentSettings () {
        $('#payment-modal-add').modal('hide')
        this.$router.push({ name: 'settings.payment' })
      }

    }
  }
</script>
