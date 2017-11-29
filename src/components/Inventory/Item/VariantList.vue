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
                    <!--<td v-if="firstVariant.show">{{ firstVariant.name }}</td>-->
                    <!--<td v-if="secondVariant.show">{{ secondVariant.name }}</td>-->
                    <!--<td v-if="thirdVariant.show">{{ thirdVariant.name }}</td>-->
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
                    <td>
                      <input
                        type="text"
                        class="form-control form-white"
                        disabled="disabled"
                        title=""
                      />
                    </td>
                    <td>
                      <pre v-text="list.items"></pre>
                      <input
                        type="text"
                        class="form-control form-white"
                        disabled="disabled"
                        title=""
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control form-white"
                        disabled="disabled"
                        title=""
                      />
                    </td>
                    <td><input type="number" class="form-control form-white" v-model="v.code_sku"></td>
                    <td><input type="text" class="form-control form-white" v-model="v.sales_rate"></td>
                    <td>
                      <button type="button" @click="removeItem(v)" class="btn btn-danger btn-custom waves-effect">
                        <i class="ion-trash-b"></i>
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
          items: []
        }
      }
    },

    async mounted () {
      this.list.items = await this.item.children
    },

    methods: {
      //
    },
  }
</script>

<style scoped lang="scss">

</style>
