<template>
  <div id="payment-modal" class="modal fade" tabindex="-1" role="dialog">
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
                      <vue-numeric
                        v-model.number="form.amount"
                        required
                        class="form-control"
                        :min="0"
                        separator="."
                      />
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
                    <select
                      v-model="form.payment_mode_id"
                      @change="changePaymentMode(form.payment_mode_id)"
                      class="form-control"
                    >
                      <option v-for="p in paymentMethodList" :value="p.mode_id">
                        {{ p.mode_name }}
                      </option>
                    </select>
                  </div>
                  <small v-if="!paymentMethodList" class="col-md-11 col-md-offset-1 alert-warning"
                         style="padding: 3px;">
                    You don't have any payment method.
                    <a href="#" @click.prevent="gotoPaymentSettings">Click here to add a payment method</a>.
                  </small>
                </div>
                <div class="form-group row" v-if="form.payment_mode_id === 1">
                  <label class="col-md-3 control-label">Deposit To</label>
                  <div class="col-md-8">
                    <div v-for="p in paymentMethodDetails">
                      <div class="cnt_min">
                        <input type="radio" v-model="form.payment_account_id" :value="p.account_id"/>
                        <div class="selection_bank">
                          <img :src="`/static/images/bank/${p.account_name}.png`" class="img_bank">
                          <div class="text-center">
                            <small style="font-size:.80em">{{ p.account_number }}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <small v-if="!paymentMethodDetails.length" class="col-md-11 col-md-offset-1 alert-warning"
                         style="padding: 3px;">
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
                    <textarea v-model.trim="form.notes" class="form-control" rows="4" maxlength="500"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-info waves-effect waves-light m-t-15">
              Save
            </button>
            <button type="button" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import VueNumeric from 'vue-numeric'
  import Axios from 'axios'
  import Form from '@/helpers/Form'
  import {responseOk} from '@/helpers';
  import {mapState} from 'vuex'

  const Flatpickr = require('flatpickr').default

  export default {
    name: 'PaymentForm',

    components: {
      VueNumeric
    },

    props: {
      invoiceList: {
        type: Array,
        default: () => { return [] }
      }
    },

    watch: {
      '$route.params.id'() {
        this.fetch()
      }
    },

    data () {
      return {
        ui: {
          saving: false,
        },
        paymentMethodDetails: [],
        form: new Form({
          reference_number: '',
          date: new Date().toISOString().split('T')[0],
          currency: 1,
          amount: 0,
          notes: '',
          payment_mode_id: '',
          payment_account_id: '',
          send_receipt: 0,
        }),
      }
    },

    computed: {
      ...mapState('salesOrders', {
        createPayment: 'createPayment',
        paymentMethodList: 'paymentMethodList',
      })
    },

    async mounted () {
      this.fetch()

      $('.flatpickr').flatpickr({
        defaultDate: new Date(),
        dateFormat: 'Y-m-d',
        altFormat: 'j M Y',
        altInput: true,
      })
    },

    methods: {
      fetch() {
        const salesOrderId = parseInt(this.$route.params.id)
        this.$store.dispatch('salesOrders/createPayment', salesOrderId)
          .then(async (createPayment) => {
            this.form.amount = createPayment.due_payment
          })
      },

      /**
       * Change payment mode
       * @param {int} payment_mode_id
       */
      changePaymentMode (payment_mode_id) {
        this.payment_account_id = ''
        this.paymentMethodDetails = this.paymentMethodList.find((p) => p.mode_id === payment_mode_id).details
      },

      gotoPaymentSettings () {
        $('#payment-modal').modal('hide')
        this.$router.push({name: 'settings.payment'})
      },

      async save() {
        try {
          this.ui.saving = true

          const salesOrderId = this.$route.params.id
          const invoiceId = this.invoiceList[this.invoiceList.length - 1].invoice_id

          const url = `sales_orders/${salesOrderId}/invoices/${invoiceId}/payments`
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

    }
  }
</script>

<style scoped lang="scss">
  .cnt_min {
    display: inline-block;
    width: 95px;
    height: 56px;
    position: relative;
    border: solid 2px #eee;
    border-radius: 5px;
    margin: 5px;
    float: left;
  }

  .cnt_min input[type="radio"] {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    border-radius: 5px;
  }

  .img_bank {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .selection_bank {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: solid 1px #eee;
  }

  .cnt_min input[type="radio"]:checked ~ .selection_bank {
    border: solid 1px #1c8ad9;
    box-shadow: 0px 1px 4px 0px #ccc;
    border-radius: 5px;
  }
</style>
