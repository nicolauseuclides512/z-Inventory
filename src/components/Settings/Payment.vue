<template>
  <section id="payment" class="content sahito-user full-width bgr-white">

    <div class="container bt-1 bgr-white p-b-10">
      <div class="row">
        <div class="col-md-12">
          <h4 class="title">Payment</h4>
        </div>
      </div>
    </div>
    <div class="container setting-page-right-content">
      <div class="row" style="margin-top: 20px;">
        <div v-for="payment_method in list.payment_methods">
          <div class="col-md-12 col-sm-12 col-xs-12 p-b-20 pl-pr-15">
            <div class="clearfix">
              <div class="pull-left" style="margin-right: 10px;">
                <input
                  type="checkbox"
                  :id="payment_method.name"
                  :value="payment_method.id"
                  @change="update_payment_method"
                  ref="payment_method"
                >
              </div>
              <div class="pull-left">
                <label :for="payment_method.name">{{ payment_method.name }}</label>
                <!--<div class="help-block text-muted">{{ payment_method.description }}</div>-->
              </div>
            </div>

          </div>
        </div>

      </div>

      <div v-if="ui.show_bank_form">
        <div class="row">
          <div class="col-md-12">
            <div class="form-horizontal p-10">
              <form method="POST" @submit.prevent="add">
                <div class="form-group">
                  <div class="col-md-4">
                    <vuelist placeholder="Bank name..."
                             @change="updateBank"
                             @search="searchBank"
                             :options="list.banks"
                             label="name"
                             key="id"
                             :value="bank_form.account_name"
                    ></vuelist>
                  </div>
                  <div class="col-md-4">
                    <input
                      type="text"
                      id="account_number"
                      v-model="bank_form.account_number"
                      class="form-control form-white"
                      placeholder="Account number"
                      required
                    />
                  </div>
                  <div class="col-md-4">
                    <input
                      type="text"
                      id="account_holder"
                      v-model="bank_form.account_holder"
                      class="form-control form-white"
                      placeholder="Account holder name"
                      required
                    />
                  </div>
                  <div class="col-md-12">
                    <button
                      type="submit"
                      class="btn btn-info waves-effect waves-light"
                      :disabled="!account_name"
                    >Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div>
          <h4>Your current payment method list</h4>
          <div v-for="bank in list.my_banks">
            <div class="row" style="padding: 8px; margin: 4px 0; background: #f9f9f9;">
              <div class="col-md-9">
                {{ bank.account_name }} <br>
                {{ bank.account_holder }} <br>
                {{ bank.account_number }}
              </div>
              <div class="col-md-3 text-right">
                <button type="button" @click="remove(bank)" class="btn btn-default btn-xs waves-effect">
                  <i class="ion-trash-b"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Axios from 'axios'
  import Vuelist from '../Vuelist'
  import store from '../../store'
  import Form from 'helpers/Form'
  import {responseOk} from "../../helpers";

  export default {
    name: 'Payment',

    components: {
      Vuelist
    },

    computed: {
      cash: {
        get() { return store.state.settings.payment.cash },
        set(value) { store.commit('settings/payment/CASH', value) }
      },
      bank: {
        get() { return store.state.settings.payment.bank },
        set(value) { store.commit('settings/payment/BANK', value) }
      },
      bankList() {
        return store.state.settings.bankList
      },
      payment_methods_list() {
        return store.state.settings.payment.payment_method_list
      },
      payments() {
        return store.state.settings.payment.payments
      },
      selected_payment_method: {
        get() { return store.state.settings.payment.selected_payment_method },
        set(value) { commit('settings/payment/SELECTED_PAYMENT_METHOD', value) }
      },
      account_name: {
        get() { return store.state.settings.payment.account_name },
        set(value) { store.commit('settings/payment/ACCOUNT_NAME', value) }
      },
      account_number: {
        get() { return store.state.settings.payment.account_number },
        set(value) { store.commit('settings/payment/ACCOUNT_NUMBER', value) }
      },
      account_holder: {
        get() { return store.state.settings.payment.account_holder },
        set(value) { store.commit('settings/payment/ACCOUNT_HOLDER', value) }
      },

      bankSelected() {
        return this.bank_form.payment_method.find(method => method === 1);
      }
    },

    data() {
      return {
        list: {
          payment_methods: [],
          my_banks: [],
          banks: [],
        },
        ui: {
          show_bank_form: false
        },
        bank_form: new Form({
          account_holder: null,
          account_number: null,
          account_name: null,
        })
      }
    },

    async mounted() {
      await this.get_payment_methods()
      await this.get_my_banks()
      await this.get_bank_list()
      await this.get_checked_payment_methods()
    },

    methods: {

      async get_payment_methods() {
        const response = await Axios.get(`payment_methods`);
        this.list.payment_methods = response.data.data;
      },

      async get_my_banks() {
        const response = await Axios.get(`settings/edit`);
        const payment_methods = response.data.data.settings['web.payments']

        let my_banks = []

        if (payment_methods && Array.isArray(payment_methods)) {
          my_banks = payment_methods.find(method => method.mode_name === 'Bank Transfer')
        } else {
          return
        }

        if (my_banks !== undefined && my_banks.details.length > 0) {
          this.list.my_banks = my_banks.details;
        }
      },

      async get_bank_list() {
        const response = await Axios.get(`banks/list`);
        this.list.banks = response.data.data;
      },

      async searchBank(val) {
        // Weird, search works even this method is empty
      },

      /**
       * Add payment detail
       */
      async add() {
//        store.dispatch('settings/payment/add')

        // Get payment_method_id for bank transfer
        const payment = await this.list.payment_methods.find(payment => payment.name.toLowerCase() === 'bank transfer');

        const res = await this.bank_form.post(`settings/payments/${payment.id}/add_detail`);
        this.bank_form.account_holder = null;
        this.bank_form.account_number = null;
        swal_success(res);
        await this.get_my_banks();
      },

      /**
       * Remove payment detail
       * @param payment_detail
       */
      async remove(payment_detail) {
        await store.dispatch('settings/payment/remove', payment_detail)
        await this.get_my_banks();
      },

      /**
       * Update payment method
       */
      updatePaymentMethod(val) {
        store.commit('settings/payment/SELECTED_PAYMENT_METHOD', val)
      },

      /**
       * Update bank
       */
      async updateBank(val) {
        await store.commit('settings/payment/ACCOUNT_NAME', val.name)
        this.bank_form.account_name = val.name;
      },

      async update_payment_method($event) {
        const el = $event.target;
        $event.preventDefault();

        // FIXME: Ugly nested if-else
        if (el.id.toLowerCase() === 'cash')  {
          if (el.checked) {

            const res = await Axios.post(`settings/payments`, {mode_id: el.value});

            if (!responseOk(res.data.code)) {
              swal_error(res)
              return;
            }

            swal_success(res)
            return;

          } else {
            const res = await Axios.delete(`settings/payments?id=${el.value}`);

            if (!responseOk(res.data.code)) {
              swal_error(res)
              return;
            }

            swal_success(res)
            return;
          }

          return;
        }

        // ------------------------------------------------
        // --------- Bank transfer payment method ---------
        // ------------------------------------------------
        if (el.id.toLowerCase() === 'bank transfer' && el.checked) {
          await Axios.post(`settings/payments`, { mode_id: el.value});
          this.ui.show_bank_form = true;
        }

        if (el.id.toLowerCase() === 'bank transfer' && !el.checked) {
          // Don't pemits uncheck if use still have my bank list.
          if (this.list.my_banks.length > 0) {
            el.checked = true;
            Alert.error('You need to remove all your bank accounts before uncheck this.');
            return;
          }

          const res = await Axios.delete(`settings/payments?id=${el.value}`);
          this.ui.show_bank_form = false;
          swal_success(res)
        }
      },


      async get_checked_payment_methods() {
        const res = await Axios.get(`settings/edit`);
        const payments = res.data.data.settings['web.payments'];

        if (!payments) return

        const self = this;

        payments.find(payment_method => {
          // FIXME: Ugly code
          if (payment_method.mode_name === self.$refs.payment_method[0].id) {
            self.$refs.payment_method[0].checked = true;
            if (self.$refs.payment_method[0].id.toLowerCase() === 'bank transfer') {
              self.ui.show_bank_form = true;
            } else {
              self.ui.show_bank_form = false;
            }
          }
          if (payment_method.mode_name === self.$refs.payment_method[1].id) {
            self.$refs.payment_method[1].checked = true;
            if (self.$refs.payment_method[1].id.toLowerCase() === 'bank transfer') {
              self.ui.show_bank_form = true;
            } else {
              self.ui.show_bank_form = false;
            }
          }
        })

      },

    },

  }
</script>
