<template>
  <!--<h5 class="title">Variant</h5>-->
  <table class="table table-bordered">
    <thead>
    <tr>
      <td>Item Name</td>
      <td>SKU</td>
      <td v-if="Object.keys(item.item_attributes)[0]">{{ Object.keys(item.item_attributes)[0] }}</td>
      <td v-if="Object.keys(item.item_attributes)[1]">{{ Object.keys(item.item_attributes)[1] }}</td>
      <td v-if="Object.keys(item.item_attributes)[2]">{{ Object.keys(item.item_attributes)[2] }}</td>
      <td>Stock</td>
      <td>Price</td>
      <td></td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="v in list.items">
      <td>
        <input type="text" class="form-control form-white" v-model="v.item_name" title="">
      </td>
      <td><input type="text" class="form-control form-white" v-model="v.code_sku" title=""></td>
      <td v-if="Object.keys(item.item_attributes)[0]">
        <input
          type="text"
          class="form-control form-white"
          title=""
        />
      </td>
      <td v-if="Object.keys(item.item_attributes)[1]">
        <input
          type="text"
          class="form-control form-white"
          title=""
        />
      </td>
      <td v-if="Object.keys(item.item_attributes)[2]">
        <input
          type="text"
          class="form-control form-white"
          title=""
        />
      </td>
      <td><input type="text" class="form-control form-white" v-model="v.stock_quantity" title="Stock" v-if="v.track_inventory"></td>
      <td><input type="text" class="form-control form-white" v-model="v.sales_rate" title=""></td>
      <td>
        <button type="button" @click="updateItem(v)" class="btn btn-info btn-custom waves-effect">
          <i class="fa fa-check"></i>
        </button>
        <button type="button" @click="removeItem(v)" class="btn btn-danger btn-custom waves-effect">
          <i class="ion-trash-b"></i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import Axios from 'axios'
  import Form from '@/helpers/Form'

  export default {
    name: 'VariantList',

    props: {
      item: {
        type: Object,
      },
      attributes: {
        type: Array,
      },
    },

    data () {
      return {
        list: {
          items: [],
        },
      }
    },

    async mounted () {
      this.list.items = await this.item.children
    },

    methods: {

      async updateItem (item) {
        try {
          const res = await Axios.post(`items/${item.item_id}/update`, item)
          console.log(_.cloneDeep(res))
          Alert.success(res.data.message)
        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            Alert.error(response.message)
          }
        }
      },

      async removeItem (item) {
        this.$emit('remove', item)
      },

    },
  }
</script>

<style scoped lang="scss">

</style>
