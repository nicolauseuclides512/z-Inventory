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

                <div>
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
                        <button type="button" class="btn btn-info waves-effect waves-light">Add</button>
                      </div>
                      <div class="col-md-1">
                        <button type="button" @click="hideFirstVariant" class="btn btn-danger btn-custom waves-effect waves-light m-b-5">
                          <i class="md md-delete"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
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
                        <button type="button" class="btn btn-info waves-effect waves-light">Add</button>
                      </div>
                      <div class="col-md-1">
                        <button type="button" @click="hideSecondVariant" class="btn btn-danger btn-custom waves-effect waves-light m-b-5">
                          <i class="md md-delete"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
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
                        <button type="button" class="btn btn-info waves-effect waves-light">Add</button>
                      </div>
                      <div class="col-md-1">
                        <button type="button" @click="hideThirdVariant" class="btn btn-danger btn-custom waves-effect waves-light m-b-5">
                          <i class="md md-delete"></i>
                        </button>
                      </div>
                    </div>
                  </div>
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
        },
      }
    },

    methods: {
      toggleVariant () {
        this.showVariant = !this.showVariant
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
