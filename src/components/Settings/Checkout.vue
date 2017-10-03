<template>
  <div>
    <div v-if="loading" class="lead text-muted text-center">
      <i class="fa fa-spin fa-spinner fa-lg"></i> Loading Checkout Detail
    </div>
    <div v-else>
      <form method="POST" @submit.prevent="save">
        <div id="checkout">
          <div class="container full-width-header bttop-1 pt-pb-10 m-b-20">
            <div class="row">
              <div class="col-md-12">
                <h4 class="pull-left page-title">Checkout Detail</h4>
              </div>
            </div>
          </div>
          <div class="container setting-page-right-content">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12 p-b-20">
                <div class="form-horizontal form-shipping">
                  <h5>Rerserved orders for</h5>

                  <div class="form-group form-general m-b-20">
                    <label class="col-md-5 control-label text-left">
                      Customer can still buy even the quantity is zero
                    </label>
                    <div class="col-md-7">
                      <div class="radio radio-info">
                        <input type="radio" name="web.checkout.allow_out_of_stock_order"
                               id="allow_out_of_stock_order_yes"
                               v-model="allow_out_of_stock_order"
                               :value="1"
                        />
                        <label for="allow_out_of_stock_order_yes"> Yes </label>
                      </div>
                      <div class="radio radio-info">
                        <input type="radio" name="web.checkout.allow_out_of_stock_order"
                               id="allow_out_of_stock_order_no"
                               v-model="allow_out_of_stock_order"
                               :value="0"
                        />
                        <label for="allow_out_of_stock_order_no"> No </label>
                      </div>
                    </div>
                  </div>

                  <div class="form-group form-general m-b-20">
                    <label class="col-md-5 control-label text-left">Hold unpair orders for</label>
                    <div class="col-md-7">
                      <div class="radio radio-info">
                        <input type="radio" name="expired"
                               id="never_expired_yes"
                               v-model="never_expired"
                               :value="true"
                        />
                        <label for="never_expired_yes"> Never Expired </label>
                      </div>
                      <div class="radio radio-info">
                        <input type="radio" name="expired"
                               id="never_expired_no"
                               v-model="never_expired"
                               :value="false"
                        />
                        <label for="never_expired_no">
                          <span class="col-md-4 p-0"> Make it expired after</span>
                          <span class="col-md-8">
                            <span class="input-group">
                              <input type="number" class="form-control" min="1"
                                     id="order_reserved_hours"
                                     v-model="order_reserved_hours"
                                     :disabled="never_expired"
                              />
                              <span class="input-group-addon">hour(s)</span>
                            </span>
                          </span>
                        </label>

                      </div>
                    </div>
                  </div>

                  <div class="form-group form-general m-b-20 form-general form-have-title bgr-grey form-shipping-from p-15">
                    <label class="col-md-5 control-label text-left p-0" style="font-size:.9em;">
                      <h5>Refund, Privacy, and TOS Statements</h5>
                      <p>These statements appear in the footer of your checkout page.<br/><br/>You can generate these
                        policies using a sample template. These sample templates are not legal advice and by using them
                        you <br/><a href="#">agree to this disclaimer.</a>
                      </p>
                    </label>
                    <div class="col-md-7 checkout-policy bgr-white p-15">
                      <div class="checkout-policy-content">
                        <h5><label for="refund_policy">Refund Policy</label></h5>
                        <span class="pull-right"><a href="javascript:void(0)" @click.prevent="generateSample('refund_policy')" class="btn btn-default btn-custom waves-effect mb-15">Generate sample refund policy</a></span>
                        <textarea class="form-control" rows="6" style="resize: none" id="refund_policy" v-model="refund_policy" title="Refund Policy"></textarea>
                      </div>
                      <div class="checkout-policy-content">
                        <h5><label for="privacy_policy">Privacy Policy</label></h5>
                        <span class="pull-right"><a href="javascript:void(0)" @click.prevent="generateSample('privacy_policy')" class="btn btn-default btn-custom waves-effect mb-15">Generate sample privacy policy</a></span>
                        <textarea class="form-control" rows="6" style="resize: none" id="privacy_policy" v-model="privacy_policy" title="Privacy Policy"></textarea>
                      </div>
                      <div class="checkout-policy-content">
                        <h5><label for="terms_of_service">Terms of Service</label></h5>
                        <span class="pull-right"><a href="javascript:void(0)" @click.prevent="generateSample('terms_of_service')" class="btn btn-default btn-custom waves-effect mb-15">Generate sample terms of service</a></span>
                        <textarea class="form-control" rows="6" style="resize: none" id="terms_of_service" v-model="terms_of_service"></textarea>
                      </div>
                    </div>
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
              <button type="button" @click="resetForm" class="btn btn-default waves-effect">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import store from '../../store'

  export default {
    name: 'Checkout',

    data() {
      return {
        loading: false,
      }
    },


    computed: {
      allow_out_of_stock_order: {
        get() { return store.state.settings.checkout.allow_out_of_stock_order },
        set(value) { store.commit('settings/checkout/ALLOW_OUT_OF_STOCK_ORDER', value) }
      },
      never_expired: {
        get() { return store.state.settings.checkout.never_expired },
        set(value) { store.commit('settings/checkout/NEVER_EXPIRED', value) }
      },
      order_reserved_hours: {
        get() { return store.state.settings.checkout.order_reserved_hours },
        set(value) { store.commit('settings/checkout/ORDER_RESERVED_HOURS', value) }
      },
      refund_policy: {
        get() { return store.state.settings.checkout.refund_policy },
        set(value) { store.commit('settings/checkout/REFUND_POLICY', value) }
      },
      privacy_policy: {
        get() { return store.state.settings.checkout.privacy_policy },
        set(value) { store.commit('settings/checkout/PRIVACY_POLICY', value) }
      },
      terms_of_service: {
        get() { return store.state.settings.checkout.terms_of_service },
        set(value) { store.commit('settings/checkout/TERMS_OF_SERVICE', value) }
      },
    },


    methods: {

      /**
       * Generate sample text
       * @param  {string} type
       */
      generateSample(type) {
        if (type === 'refund_policy') {
          console.log(_.cloneDeep(store.state.settings.checkout.samples.refund_policy))
          store.commit('settings/checkout/REFUND_POLICY', store.state.settings.checkout.samples.refund_policy)
        }
        if (type === 'privacy_policy') {
          store.commit('settings/checkout/PRIVACY_POLICY', store.state.settings.checkout.samples.privacy_policy)
        }
        if (type === 'terms_of_service') {
          store.commit('settings/checkout/TERMS_OF_SERVICE', store.state.settings.checkout.samples.terms_of_service)
        }
      },


      /**
       * Save checkout data
       */
      save() {
        store.dispatch('settings/checkout/save')
      },


      /**
       * Reset to original form state
       */
      resetForm() {
        store.dispatch('settings/initialize')
      },


    }
  }
</script>
