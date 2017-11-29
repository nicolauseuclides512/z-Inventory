<template>
  <div class="container m-b-20">
    <div class="row">
      <div class="col-md-12">
        <h5 class="title">Variant</h5>
        <div class="form-horizontal">
          <div class="col-md-12">
            <div class="col-md-12 pl-pr-0" style="padding-top: 30px">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                  <tr>
                    <td>Item Name</td>
                    <td v-if="Object.keys(item.item_attributes)[0]">{{ Object.keys(item.item_attributes)[0] }}</td>
                    <td v-if="Object.keys(item.item_attributes)[1]">{{ Object.keys(item.item_attributes)[1] }}</td>
                    <td v-if="Object.keys(item.item_attributes)[2]">{{ Object.keys(item.item_attributes)[2] }}</td>
                    <td>SKU</td>
                    <td>Price</td>
                    <td></td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="v in list.items">
                    <td>
                      <input type="text" class="form-control form-white" v-model="v.item_name" title="">
                    </td>
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
                    <td><input type="number" class="form-control form-white" v-model="v.code_sku" title=""></td>
                    <td><input type="text" class="form-control form-white" v-model="v.sales_rate" title=""></td>
                    <td>
                      <button type="button" @click="removeItem(v)" class="btn btn-danger btn-custom waves-effect">
                        <i class="ion-trash-b"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="10">
                      <button type="button" @click="addMoreVariant" class="btn btn-default btn-custom waves-effect">
                        Add more variant
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

      addMoreVariant () {
        this.list.items.push({
          item_name: this.item.item_name,
          code_sku: this.item.code_sku,
          sales_rate: this.item.sales_rate,
        })
      },

      async removeItem (item) {
        this.$emit('remove', item)
      },

    },
  }
</script>

<style scoped lang="scss">

</style>
