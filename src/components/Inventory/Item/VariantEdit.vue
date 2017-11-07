<template>
  <div>
    <div class="container m-b-20">
      <div class="row">
        <div class="col-md-12">
          <h5 class="title">Variant</h5>
          <div class="form-horizontal">
            <div class="col-md-12">

              <div v-if="showVariant" id="mark_active">

                <div class="col-md-12 pl-pr-0" style="padding-top: 30px">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <td>Item Name</td>
                        <!--<td v-for="attribute in attributes">-->
                          <!--{{ value }}-->
                        <!--</td>-->
                        <td>Stock</td>
                        <td>SKU</td>
                        <td>Price</td>
                        <td></td>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in items">
                        <td>
                          <!--<pre v-text="item"></pre>-->
                          <input type="text" class="form-control form-white" v-model="item.item_name">
                        </td>
                        <td v-for="(value, key) in item.item_attributes">
                          <input type="text" class="form-control form-white" v-model="value[0]">
                        </td>
                        <td><input type="number" class="form-control form-white" v-model="item.inventory_stock"></td>
                        <td><input type="text" class="form-control form-white" v-model="item.code_sku"></td>
                        <td><input type="number" class="form-control form-white" v-model="item.sales_rate"></td>
                        <td>
                          <button v-if="items.length > 1" @click="removeVariantItem(item)" type="button" class="btn btn-danger btn-custom waves-effect">
                            <i class="ion-trash-b"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="10">
                          <button type="button" @click="add" class="btn btn-default waves-effect waves-light">
                            <i class="md md-add"></i> Add more variant type
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
    </div>
  </div>
</template>

<script>
  import Vuetagger from '../../Vuetagger'

  export default {
    name: 'VariantItem',

    props: {
      items: {
        type: Array,
        default: [],
      },
    },

    components: {
      Vuetagger,
    },

    data () {
      return {
        showVariant: true,
        list: {
          currentVariantTypes: [{
            name: 'color',
            values: [],
          }],
          variants: {
            size: 'Size',
            color: 'Color',
            flavour: 'Flavour',
            material: 'Material',
          },
        },
      }
    },

    mounted () {
    },

    methods: {
      toggleVariant () {
        this.showVariant = !this.showVariant
      },

      add () {
        const newItem = _.cloneDeep(this.items[0])
        newItem.item_name = ''
        this.items.push(newItem)
      },

      addVariantTypeValue (value) {
        this.list.currentVariantTypes
      },

      removeVariantType (variant) {
        const index = this.list.currentVariantTypes.indexOf(variant)
        this.list.currentVariantTypes.splice(index, 1)
      },


      removeVariantItem(item) {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      }

    },
  }
</script>

<style>

</style>
