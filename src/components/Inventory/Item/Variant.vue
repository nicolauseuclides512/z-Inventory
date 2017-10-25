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

                <div id="mark_show2">
                  <div class="form-horizontal p-5" v-for="variantTypes in list.currentVariantTypes">
                    <div class="form-group">
                      <div class="col-md-3">
                        <select v-model="variantTypes.name" class="form-control">
                          <option v-for="(variant, key) in list.variants" :value="variant">
                            {{ variant }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-7">
                        <Vuetagger
                          :value="variantTypes.values"
                          @change="addVariantTypeValue(variantTypes.name)"
                        ></Vuetagger>
                      </div>
                      <div class="col-md-1">
                        <button type="button" class="btn btn-info waves-effect waves-light">Add</button>
                      </div>
                      <div class="col-md-1">
                        <button type="button"
                                @click="removeVariant(variantTypes)"
                                class="btn btn-danger btn-custom waves-effect waves-light m-b-5">
                          <i class="md md-delete"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="mark_hide" v-if="this.list.currentVariantTypes.length < 3">
                  <div class="form-horizontal p-0-10">
                    <div class="form-group">
                      <div class="col-md-4">
                        <button type="button" @click="addVariant" class="btn btn-default waves-effect waves-light">
                          <i class="md md-add"></i> Add more variant type
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 pl-pr-0" style="padding-top: 30px">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <td>Item Name</td>
                        <td>Size</td>
                        <td>Color</td>
                        <td>Stock</td>
                        <td>SKU</td>
                        <td>Price</td>
                        <td></td>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td><input type="text" class="form-control form-white" value="T-Shirt-XS-White"></td>
                        <td><input type="text" class="form-control form-white" value="XS" disabled="disabled"></td>
                        <td><input type="text" class="form-control form-white" value="White" disabled="disabled"></td>
                        <td><input type="number" class="form-control form-white" value="7"></td>
                        <td><input type="text" class="form-control form-white" value="SK893002UX"></td>
                        <td><input type="number" class="form-control form-white" value="45.000"></td>
                        <td>
                          <button type="button" class="btn btn-danger btn-custom waves-effect">
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

  export default {
    name: 'VariantItem',

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

    methods: {
      toggleVariant () {
        this.showVariant = !this.showVariant
      },

      addVariant () {
        if (this.list.currentVariantTypes.length <= 3) {
          this.list.currentVariantTypes.push({})
        }
      },

      addVariantTypeValue (value) {
        this.list.currentVariantTypes
      },

      removeVariant (variant) {
        const index = this.list.currentVariantTypes.indexOf(variant)
        this.list.currentVariantTypes.splice(index, 1)
      },
    },
  }
</script>

<style>

</style>
