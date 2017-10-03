<template>
  <div>
    <div>
      <div id="taxes">
        Tax
        <div class="container">
          <div class="row">
            <div class="col-md-10 col-sm-10 col-xs-12 p-b-20 pl-pr-15">
              <div class="form-horizontal">
                <div class="form-group form-general m-b-20">
                  <label class="col-md-5 control-label text-left">
                    <p style="font-size:.95em">
                      Change the way taxes are calculated on your store.
                      To see what you've collected
                      <a href="#">view your tax report.</a>
                    </p>
                  </label>
                  <div class="col-md-6 col-md-offset-1">
                    <div class="checkbox checkbox-success">
                      <input type="checkbox"
                             id="tax_included"
                             name="tax_included"
                             v-model="tax_included">
                      <label for="tax_included"> All taxes are included in my prices </label>
                    </div>
                    <br/>
                    <p class="help-text">
                      If selected, all taxes will be calculated using this formula: <br/>
                      <strong>tax = (tax rate * price).</strong>
                      For Example: Rp 1.000.000,- at 10% VAT will be Rp 100.000,-
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../store'

  export default {
    name: 'Tax',

    data() {
      return {
        loading: false,
      }
    },


    computed: {
      tax_included: {
        get() {
          return store.state.settings.tax.taxIncluded
        },
        set(value) {
          store.commit('settings/tax/TAX_INCLUDED', value)
        }
      }
    },


    methods: {

      /**
       * Save tax data
       */
      save() {
        store.dispatch('settings/tax/save')
      },


      /**
       * Reset to original form state
       */
      resetForm() {
        store.dispatch('settings/initialize')
      },

    },

  }
</script>
