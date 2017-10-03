<template>
  <tr>
    <td>{{ value.item_name }}</td>
    <td>
      <input type="number"
             class="form-control form-white"
             min="1"
             onfocus="this.oldValue = this.value;"
             v-model="value.item_quantity"
             title="Quantity"
      />
      <!--onblur="validity.valid || (value = this.oldValue);"-->
    </td>
    <td>
      <div class="text-right">{{ sales_rate(value) | money }}</div>
    </td>
    <td>
      <div class="col-md-8">
        <input type="number"
               class="form-control form-white"
               min="0"
               onfocus="this.oldValue = this.value;"
               v-model="value.discount_amount_value"
        />
        <!--@change="validity.valid || (value = this.oldValue);"-->
      </div>
      <div class="col-md-4">
        <select class="form-control" v-model="value.discount_amount_type">
          <!--<option v-for="(value, key) in discountUnitList"-->
          <!--:value="key"-->
          <!--:key="key"-->
          <!--:selected="key === 'fixed'"-->
          <!--&gt;-->
          <!--{{ value }}-->
          <!--</option>-->
        </select>
      </div>
    </td>
    <td>
      <div class="text-right">{{ amount(value) | money }}</div>
    </td>
    <td>
      <a @click="removeDetail(index)" href="javascript:void(0);" class="text-danger"><i
        class="ion-close-circled"></i></a>
    </td>
  </tr>
</template>

<script>
  import store from 'src/store'

  export default {
    name: 'ItemDetail',

    props: ['value', 'index'],

    computed: {

      details: {
        get() { return store.state.salesCreate.details },
        set(value) { store.commit('salesCreate/DETAILS', value) }
      },

      discountUnitList: {
        get() { return store.state.salesCreate.discountUnitList },
        set(value) { commit('salesCreate/DISCOUNT_UNIT_LIST', value) }
      },
    },

    mounted() {

    },

    methods: {

      removeDetail(detail) {
        store.dispatch('salesCreate/removeDetails', detail)
      },


      /**
       * Sales rate + tax
       *
       * @param {Object} item
       * @return {float|int}
       */
      sales_rate(item) {
        return item.sales_rate
      },


      /**
       * Sales rate + discount
       */
      amount(item) {
        const sales_rate = this.sales_rate(item)

        if (! item.discount_amount_value || ! item.discount_amount_type) {
          return parseFloat(sales_rate) * parseInt(item.item_quantity);
        }

        if (item.discount_amount_type == 'fixed') {
          return ( parseFloat(sales_rate) - parseFloat(item.discount_amount_value) ) * parseInt(item.item_quantity);
        }

        if (item.discount_amount_type == 'percentage') {
          const discount = parseFloat(sales_rate) * parseFloat(item.discount_amount_value) / 100;
          return ( parseFloat(sales_rate) - discount ) * parseInt(item.item_quantity);
        }
      }

    }
  }
</script>
