<template>
  <div>
    <div class="container m-b-20">
      <div class="row">
        <div class="col-md-12">
          <h5 class="title">Variant</h5>
          <div class="form-horizontal">
            <div class="col-md-12">
              <div class="form-group">
                <div class="toggles-dropship">
                  <label>Add Variants?</label>
                  <div @click="toggleVariant"
                       class="toggle toggle-default"
                       id="variant_button"
                       ref="variant_button"
                       style="height: 20px; width: 65px;">
                    <div :class="{ 'toggle-slide': true, active: showVariant }">
                      <div class="toggle-inner" :style="{ width: '80px', 'margin-left': !showVariant ? '-31px' : 0 }">
                        <div :class="{ 'toggle-on': true, active: showVariant }"
                             style="height: 20px; width: 40px; text-align: center; text-indent: -10px; line-height: 20px;">
                          ON
                        </div>
                        <div class="toggle-blob" style="height: 20px; width: 20px; margin-left: -10px;"></div>
                        <div :class="{ 'toggle-off': true, active: !showVariant }"
                             style="height: 20px; width: 40px; margin-left: -10px; text-align: center; text-indent: 10px; line-height: 20px;">
                          OFF
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="showVariant" id="mark_active">

                <div v-if="firstVariant.show">
                  <div class="form-horizontal p-5">
                    <div class="form-group">
                      <div class="col-md-3">
                        <select class="form-control" v-model="firstVariant.name">
                          <option v-for="(v, k) in list.variants" :value="k">{{ v }}</option>
                        </select>
                      </div>
                      <div class="col-md-7">
                        <Vuetagger :value="firstVariant.values" @change="changeFirstVariantValues"></Vuetagger>
                      </div>
                      <div class="col-md-1">
                        <button type="button" @click="hideFirstVariant" class="btn btn-danger btn-custom waves-effect waves-light m-b-5">
                          <i class="md md-delete"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="secondVariant.show">
                  <div class="form-horizontal p-5">
                    <div class="form-group">
                      <div class="col-md-3">
                        <select class="form-control" v-model="secondVariant.name">
                          <option v-for="(v, k) in list.variants" :value="k">{{ v }}</option>
                        </select>
                      </div>
                      <div class="col-md-7">
                        <Vuetagger :value="secondVariant.values" @change="changeSecondVariantValues"></Vuetagger>
                      </div>
                      <div class="col-md-1">
                        <button type="button" @click="hideSecondVariant" class="btn btn-danger btn-custom waves-effect waves-light m-b-5">
                          <i class="md md-delete"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="thirdVariant.show">
                  <div class="form-horizontal p-5">
                    <div class="form-group">
                      <div class="col-md-3">
                        <select class="form-control" v-model="thirdVariant.name">
                          <option v-for="(v, k) in list.variants" :value="k">{{ v }}</option>
                        </select>
                      </div>
                      <div class="col-md-7">
                        <Vuetagger :value="thirdVariant.values" @change="changeThirdVariantValues"></Vuetagger>
                      </div>
                      <div class="col-md-1">
                        <button type="button" @click="hideThirdVariant" class="btn btn-danger btn-custom waves-effect waves-light m-b-5">
                          <i class="md md-delete"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <button type="button" @click="generateVariant" class="btn btn-info waves-effect waves-light">
                    Generate Variants
                  </button>
                </div>


                <!--<div id="mark_hide" v-if="list.currentVariantTypes.length < 3">-->
                  <!--<div class="form-horizontal p-0-10">-->
                    <!--<div class="form-group">-->
                      <!--<div class="col-md-4">-->
                        <!--<button type="button" @click="addMoreVariant" class="btn btn-default waves-effect waves-light">-->
                          <!--<i class="md md-add"></i> Add more variant type-->
                        <!--</button>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->


                <div class="col-md-12 pl-pr-0" style="padding-top: 30px">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <td>Item Name</td>
                        <td>{{ firstVariant.name }}</td>
                        <td>{{ secondVariant.name }}</td>
                        <td>{{ thirdVariant.name }}</td>
                        <td>SKU</td>
                        <td>Price</td>
                        <td></td>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="v in list.items">
                        <td><input type="text" class="form-control form-white" v-model="v.item_name"> </td>
                        <td><input type="text" class="form-control form-white" v-model="v.item_attributes[firstVariant.name]" disabled="disabled"></td>
                        <td><input type="text" class="form-control form-white" v-model="v.item_attributes[secondVariant.name]" disabled="disabled"></td>
                        <td><input type="text" class="form-control form-white" v-model="v.item_attributes[thirdVariant.name]" disabled="disabled"></td>
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
    </div>
  </div>
</template>

<script>
  import Vuetagger from '../../Vuetagger'

  function cartesianProductOf () {
    return _.reduce(arguments, function (a, b) {
      return _.flatten(_.map(a, function (x) {
        return _.map(b, function (y) {
          return x.concat([y])
        })
      }), true)
    }, [[]])
  }

  //  function cartesian () {
//    let r = [], arg = arguments, max = arg.length - 1
//
//    function helper (arr, i) {
//      for (let j = 0, l = arg[i].length; j < l; j++) {
//        let a = arr.slice(0) // clone arr
//        a.push(arg[i][j])
//        if (i === max)
//          r.push(a)
//        else
//          helper(a, i + 1)
//      }
//    }
//
//    helper([], 0)
//    return r
//  }

  export default {
    name: 'VariantItem',

    components: {
      Vuetagger,
    },

    props: {
      item: {
        type: Object
      }
    },

    data () {
      return {
        showVariant: true,

        firstVariant: { name: 'color', values: ['red', 'green', 'blue'], show: true },
        secondVariant: { name: 'size', values: ['M', 'L', 'XL'], show: true },
        thirdVariant: { name: 'material', values: ['Wood', 'Steel'], show: true },

        list: {
          variants: {
            size: 'Size',
            color: 'Color',
            flavour: 'Flavour',
            material: 'Material',
          },
          items: [],
        },
      }
    },

    async mounted () {
      this.list.items = await this.item.children
    },

    methods: {
      toggleVariant () {
        this.showVariant = !this.showVariant
      },

      generateVariant () {
        const cartesian = cartesianProductOf(this.firstVariant.values, this.secondVariant.values, this.thirdVariant.values)

        this.list.items = []

        cartesian.map((item) => {

          let string = ''

          for (let i = 0; i < item.length; i++) {
            string = string + item[i]
            if (i < item.length - 1) {
              string = string + '-'
            }
          }

          this.list.items.push({
            item_name: this.item.item_name + ' ' + string,
            code_sku: this.item.code_sku,
            sales_rate: this.item.sales_rate,
            item_id: this.item.item_id,
            uom_id: this.item.uom_id,
            tax_id: this.item.tax_id,
            weight: this.item.weight,
            weight_unit: this.item.weight_unit,
            dimension_l: this.item.dimension_l,
            dimension_w: this.item.dimension_w,
            dimension_h: this.item.dimension_h,
            compare_rate: this.item.compare_rate,
            track_inventory: this.item.track_inventory,
            inventory_stock: this.item.inventory_stock,
            inventory_stock_warning: this.item.inventory_stock_warning,
            item_status: this.item.item_status,
            category_id: this.item.category_id,
            organization_id: this.item.organization_id,
            parent_id: this.item.parent_id,
            item_attributes: {
              color: [item[0]],
              size: [item[1]],
              material: [item[2]],
            },
            description: this.item.description,
            barcode: this.item.barcode,
            page_title: this.item.page_title,
            meta_description: this.item.meta_description,
            slug: this.item.slug,
            visibility: [
              {
                online_store: this.item.visibility.online_store
              }
            ],
            tags: "computer",
            item_type: null
          })



        })

        const items = [

        ]
      },

      changeFirstVariantValues (values) {
        this.firstVariant.values = values
      },

      changeSecondVariantValues (values) {
        this.secondVariant.values = values
      },

      changeThirdVariantValues (values) {
        this.thirdVariant.values = values
      },

      hideFirstVariant () {
        Alert.confirm('Are you sure delete this variant?', () => {
          this.firstVariant.show = false
        })
      },

      hideSecondVariant () {
        Alert.confirm('Are you sure delete this variant?', () => {
          this.secondVariant.show = false
        })
      },

      hideThirdVariant () {
        Alert.confirm('Are you sure delete this variant?', () => {
          this.thirdVariant.show = false
        })
      },

      addMoreVariant () {
        if (this.list.currentVariantTypes.length < 3) {
          this.list.currentVariantTypes.push({name: '', values: []})
        }
      },

      addVariant (name, values) {
        if (this.list.currentVariantTypes.length < 3) {
          this.list.currentVariantTypes.push({
            name: name.toLowerCase(),
            values: values,
          })
        }
      },

      addVariantValues (variant, halo) {
        console.log(variant, halo, 'sdsds')
      },

      addVariantTypeValue (value) {
        this.list.currentVariantTypes[value.toLowerCase()].values.push('shoet')
      },

      async removeItem(item) {
        this.$emit('remove', item)
      },

      removeVariant (variant) {
        Alert.confirm('Are you sure?', () => {
          const index = this.list.currentVariantTypes.indexOf(variant)
          this.list.currentVariantTypes.splice(index, 1)
        })
      },
    },
  }
</script>

<style>

</style>
