<template>
  <div>

    <h5 class="title">Conditions</h5>
    <div class="form-horizontal">
      <div class="form-group form-general m-b-20">
        <label class="col-md-2 control-label text-left">Product must match:</label>
        <div class="col-md-9">
          <div class="radio radio-info radio-inline">
            <input type="radio" v-model="match" name="conditions" id="all_condition" :value="1">
            <label for="all_condition">
              All Conditions
            </label>
          </div>
          <div class="radio radio-info radio-inline">
            <input type="radio" v-model="match" name="conditions" id="any_condition" :value="0">
            <label for="any_condition">
              Any Condition
            </label>
          </div>
        </div>
      </div>

      <div v-for="condition in conditions">
        <div class="form-group form-general m-b-20">
          <div class="col-md-3">
            <select class="form-control" v-model="condition.type">
              <option v-for="(value, key) in types" :value="key">{{ value }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-control" v-model="condition.rule">
              <option v-for="(value, key) in rules" :value="key">{{ value }}</option>
            </select>
          </div>
          <div class="col-md-5">
            <input type="text" class="form-control" placeholder="" v-model="condition.value">
          </div>
          <div class="col-md-1">
            <a href="javascript:void(0)" @click="removeCondition(condition)" v-show="conditions.length > 1">
              <i class="ion-trash-a text-danger pt-5" style="font-size: 1.5em"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="form-group form-general m-b-20">
        <div class="col-md-12">
          <a href="javascript:void(0)"
             @click="addCondition"
             class="btn btn-primary waves-effect waves-light"
          >
            Add another condition
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {

    props: {
      match: {
        type: [Number, Boolean],
        default: 1
      },
      conditions: {
        type: Array,
        default: []
      }
    },

    data() {
      return {
        types: [],
        rules: [],
      }
    },


    mounted() {
      // Add 1 row condition
      if (!this.conditions.length > 0) {
        this.addCondition();
      }

      this.initialize();
    },

    methods: {

      /**
       * Initialize data
       */
      initialize() {
        this.$http.get('collections/create')
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) {
              return swal_error(res)
            }

            this.types = res.data.data.types
            this.rules = res.data.data.rules

          }, res => {
            return swal_error(res)
          })
      },


      /**
       * Add more condition
       */
      addCondition() {
        this.conditions.push({ type: null, rule: null, value: null })
      },


      /**
       * Remove condition
       *
       * @param {string} condition
       */
      removeCondition(condition) {
        const index = this.conditions.indexOf(condition);
        this.conditions.splice(index, 1)
      },


    }
  }
</script>
