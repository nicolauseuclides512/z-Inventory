<template>
  <!-- Shipping -->
  <div class="container bt-1 ">
    <div class="row">
      <div class="col-md-12 p-b-20">
        <h5 class="title">Shipping</h5>
        <div class="form-horizontal">
          <div class="col-md-4">
            <div class="form-group form-general m-b-20">
              <label class="col-md-6 control-label text-left">UOM</label>
              <div class="col-md-6 pl-pr-0">
                <select v-model.number="form.uom_id" id="uom" class="form-control">
                  <option v-for="u in list.uom_list" :value="u.uom_id">{{ u.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-md-offset-1">
            <div class="form-group form-general m-b-20">
              <label class="col-xs-12 col-md-4 control-label text-left">Dimension (cm)</label>
              <div class="col-xs-2 col-md-2 pl-pr-0">
                <input v-model.number="form.dimension_l" type="number" min="1" class="form-control" placeholder="L">
              </div>
              <div class="col-xs-2 col-md-1 pl-pr-0 text-center form-custom-link">x</div>
              <div class="col-xs-2 col-md-2 pl-pr-0">
                <input v-model.number="form.dimension_w" type="number" min="1" class="form-control" placeholder="W">
              </div>
              <div class="col-xs-2 col-md-1 pl-pr-0 text-center form-custom-link">x</div>
              <div class="col-xs-2 col-md-2 pl-pr-0">
                <input v-model.number="form.dimension_h" type="number" min="1" class="form-control" placeholder="H">
              </div>
            </div>
            <div class="form-group form-general m-b-20">
              <label class="col-md-4 control-label text-left text-danger">
                Weight
                <div><small class="text-muted">This field is required</small></div>
              </label>
              <div class="col-md-4 pl-pr-0">
                <div class="input-group">
                  <input type="number" v-model="form.weight" min="0" class="form-control" placeholder="" required>
                  <span class="input-group-addon">gram</span>
                </div>
              </div>
              <!--<div class="col-md-3 col-md-offset-1 pl-pr-0">-->
                <!--<select v-model="form.weight_unit" class="form-control">-->
                  <!--<option v-for="(name, id) in weight_unit_list" :value="id">{{ name }} ({{ id }})</option>-->
                <!--</select>-->
              <!--</div>-->

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Shipping END -->
</template>

<script>
  import store from 'src/store'
  import Form from 'src/helpers/Form'

  export default {

    name: 'ItemShipping',

    data () {
      return {
        list: {
          uom_list: [],
          weight_unit_list: [],
        },
        form: new Form({
          uom_id: '',
          dimension_l: '',
          dimension_w: '',
          dimension_h: '',
          weight: 0,
          weight_unit: 'gr',
        }),
      }
    },

  }
</script>
