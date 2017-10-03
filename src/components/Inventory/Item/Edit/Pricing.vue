<template>
  <!-- Pricing -->
  <div class="container bt-1 ">
    <div class="row">
      <div class="col-md-12 p-b-20">
        <h5 class="title">Pricing</h5>
        <div class="form-horizontal">
          <div class="form-group form-general m-b-20">
            <label class="col-md-2 control-label text-left text-danger">Price
              <!--<div><small class="text-muted">This field is required</small></div>-->
            </label>
            <div class="col-md-2">
              <input type="text" v-model.trim="computed_sales_rate" maxlength="20" class="form-control" placeholder="" required>
              <!--<div v-show="!sales_rate" class="help-text">Please fill this field</div>-->
            </div>
            <!--<div class="col-md-2">-->
              <!--<a href="javascript:void(0);" class="form-custom-link">Set Wholesale Price</a>-->
            <!--</div>-->
            <!--<div>-->
              <!--<label class="col-md-2 col-md-offset-1 control-label text-left">Compare at Price</label>-->
              <!--<div class="col-md-2">-->
                <!--<input type="number" v-model="compare_rate" min="0" class="form-control" placeholder="">-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Pricing END -->
</template>

<script>
  import numeral from 'numeral'
  import store from 'src/store'

  export default {

    name: 'ItemCreatePricing',

    computed: {
      sales_rate: {
        get () { return store.state.itemForm.sales_rate },
        set (value) { store.commit('itemForm/SALES_RATE', value) },
      },

      computed_sales_rate: {
        get () {return numeral(this.sales_rate).format('0,0')},
        set (value) {this.sales_rate = value.replace(/\./g, '').replace(/,/g, '')}
      },

      compare_rate: {
        get () { return store.state.itemForm.compare_rate },
        set (value) { store.commit('itemForm/COMPARE_RATE', value) },
      }
    },

  }
</script>
