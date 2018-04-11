<template>
  <!-- Inventory -->
  <div class="container bt-1 ">
    <div class="row">
      <div class="col-md-12 p-b-20">
        <h5 class="title">Inventory</h5>
        <div class="form-horizontal">
          <!--<div class="form-group form-general m-b-20">-->
            <!--<label class="col-md-4 control-label text-left">Track Inventory</label>-->
            <!--<div class="col-md-7">-->
              <!--<div class="radio radio-info radio-inline">-->
                <!--<input v-model="form.track_inventory" type="radio" name="quantity_zero" id="yes_val" :value="true">-->
                <!--<label for="yes_val"> Yes </label>-->
              <!--</div>-->
              <!--<div class="radio radio-info radio-inline">-->
                <!--<input v-model="form.track_inventory" type="radio" name="quantity_zero" id="no_val" :value="false">-->
                <!--<label for="no_val"> No </label>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div v-show="!show_variant">-->

            <!--<div class="form-group form-general m-b-20">-->
              <!--<label class="col-md-4 control-label text-left">Does this product come with variants?</label>-->
              <!--<div class="col-md-7">-->
                <!--<a href="javascript:void(0);" @click="showVariant" class="btn btn-primary waves-effect waves-light">Add Variants</a>-->
              <!--</div>-->
            <!--</div>-->

          <!--</div>-->

          <div id="attribut-row" v-show="!show_variant">
            <div class="form-group form-general m-b-20">

              <label class="col-md-2 control-label text-left">SKU</label>
              <div class="col-md-3">
                <input type="text" v-model="code_sku" class="form-control" placeholder="" maxlength="15">
              </div>

              <div v-show="form.track_inventory">
                <label class="col-md-2 col-md-offset-1 control-label text-left">Quantity</label>
                <div class="col-md-3">
                  <input
                    type="number"
                    class="vertical-spin form-control"
                    name="vertical-spin"
                    min="0"
                    data-bts-button-down-class="btn btn-primary"
                    data-bts-button-up-class="btn btn-primary">
                </div>
              </div>

            </div>
            <div class="form-group form-general m-b-20">

              <div v-if="form.track_inventory">
                <label class="col-md-2 control-label text-left">Stock Warning</label>
                <div class="col-md-3">
                  <input type="number" v-model="form.inventory_stock_warning" min="0" class="form-control" placeholder="">
                </div>
              </div>

              <div class="hidden">
                <label class="col-md-2 col-md-offset-1 control-label text-left">Barcode</label>
                <div class="col-md-3">
                  <input type="text" v-model="form.barcode" class="form-control" placeholder="">
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="row" v-show="show_variant">
      <div class="col-md-12 pnb-20">
        <div class="form-group form-general m-b-20">
          <div class="bgr-border p-20">

            <!-- Attributes -->
            <div v-for="(attr, index) in item_attributes" class="row mt-20">
              <div class="col-md-4">
                <div class="form-group r-ml-mt">
                  <label for="attributes" class="text-danger pl-0">Attribute {{ index+1 }}</label>
                  <input type="text"
                         v-model="attr.name"
                         name="attributes[]"
                         class="form-control form-white"
                         placeholder=""
                         required
                  >
                </div>
              </div>
              <div class="col-md-7">
                <div class="form-group r-ml-mt custom-tags">
                  <label for="options" class="text-danger pl-0">Options {{ index+1 }}</label>
                  <input type="tags" v-model="attr.option" @change="attributeChanged(attr, index, $event)" name="tags[]" class="form-control">
                </div>
              </div>
              <div class="col-md-1 r-ml-mt" v-show="item_attributes.length > 1">
                <a href="javascript:void(0);" @click="removeAttribute(attr)">
                  <i class="ion-trash-a text-danger pt-25" style="font-size: 1.5em"></i>
                </a>
              </div>
            </div>

            <div class="row p-b-20" v-show="item_attributes.length < 3">
              <div class="col-md-12">
                <a href="javascript:void(0);" @click="addAttribute">
                  <i class="ion-plus-round"></i> Add more attribute
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- table attribute -->
    <div class="row sahito-list bt-1" v-show="show_variant">
      <div class="col-md-12 m-b-20">
        <div class="sahito-list-item-group border-1 table-responsive">
          <table class="table default-table sahito-list-item-group--table">
            <thead>
              <tr>
                <th id="item_name" class="text-danger">ITEM NAME</th>
                <th v-for="attr in item_attributes">{{ attr.name }}</th>
                <th v-show="form.track_inventory">QTY</th>
                <th>Price</th>
                <th>SKU</th>
                <th>BARCODE</th>
                <th>STOCK WARNING</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              <tr v-show="item_variants.length <= 0">
                <td colspan="11" class="text-center">
                  Please enter attributes
                </td>
              </tr>

              <tr v-for="variant in item_variants">
                <td>
                  <input type="text" class="form-control form-white" v-model="variant.item_name">
                </td>
                <td v-for="attr in item_attributes">
                  <input type="text" class="form-control form-white" v-model="variant.item_attribute">
                </td>
                <td v-show="form.track_inventory">
                  <input type="number" min="0" class="form-control form-white" v-model="variant.inventory_stock">
                </td>
                <td><input type="number" min="0" class="form-control form-white" v-model="variant.sales_rate"></td>
                <td v-show="form.track_inventory"><input type="text" v-model="variant.code_sku" class="form-control form-white"></td>
                <td><input type="text" class="form-control form-white" v-model="variant.barcode"></td>
                <td><input type="number" min="0" class="form-control form-white" v-model="variant.inventory_stock_warning"></td>
                <td class="text-right" v-show="item_variants.length <= 0">
                  <a href="javascript:void(0);" @click="removeVariant(variant)">
                    <i class="ion-trash-a text-danger pt-10" style="font-size: 1.5em"></i>
                  </a>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from 'src/store'

  export default {

    name: 'ItemCreateInventory',

    data() {
      return {
        show_variant: false,
        item_variants: [],
        item_attributes: [],

        form: {
          track_inventory: false,
          code_sku: '',
          barcode: '',
          inventory_stock: null,
          inventory_stock_warning: null,
          item_attributes: [],
          parent_id: null,
          item_status: null,
        }
      }
    },


    mounted() {
      this.form.track_inventory = false
    },


    computed: {
      code_sku: {
        get() { return store.state.itemForm.code_sku },
        set(value) { store.commit('itemForm/CODE_SKU', value) },
      },

      children() {
        const attrs = this.item_attributes

        const that = this

        _.map(attrs, (attr) => {
          _.map(attrs, (option) => {

            const obj = {
              item_name: '',
              item_attributes: {
                color: [ 'red', 'green', 'blue' ],
                size: [ 'S', 'M', 'L', 'XL' ],
              },
              sales_rate: '',
              code_sku: '',
              barcode: '',
              inventory_stock_warning: '',
            }

            that.item_variants.push(obj)

          })
        })
      }
    },


    methods: {

      /**
       * Initialize
       */
      initialize() {
        const that = this

        $('input[type="tags"]').tagsInput({
          onAddTag(value) {
            that.list.tags.push(value)
          },
          onRemoveTag(value) {
            const index = that.list.tags.indexOf(value)
            that.list.tags.splice(index, 1)
          },
        })
      },


      /**
       * Add more attribute
       */
      addAttribute() {
        this.item_attributes.push({})
      },


      /**
       * Remove selected attribute
       * @param  {Object} attribute
       */
      removeAttribute(attribute) {
        const index = this.item_attributes.indexOf(attribute)
        this.item_attributes.splice(index, 1)
      },


      /**
       * Add an option
       */
      addOption(newTag) {
        alert('add')
        const tag = {
          name: newTag,
          // Just for example needs as we use Array of Objects that should have other properties filled.
          // For primitive values you can simply push the tag into options and selected arrays.
          code: Math.floor((Math.random() * 10000000))
        }
        this.options.push(tag)
        this.selected.push(tag)
      },

      changeOption() {
        alert('chagned')
      },


      /**
       * When option in attribute has changed
       */
      attributeChanged(attribute, indexOfAttribute, ev) {
        const options = ev.target.value.split(/[\s,]+/)

        console.log(attribute.name)

        this.item_variants[indexOfAttribute] = []

        for (var option of options) {
          if (_.isEmpty(option) === false) {

            let variant = {
              item_name: `${this.form.item_name} - ${option}`,
              item_attributes: {},
              sales_rate: null,
              code_sku: null,
              barcode: null,
              inventory_stock_warning: null,
            }

            variant.item_attributes[attribute] = options

            this.item_variants[indexOfAttribute].push(variant)

          }
        }
      },


      /**
       * Show variant form
       */
      showVariant() {
        this.show_variant = true
        // this.delete(this.form, 'item_attributes')
      },


      /**
       * Remove variant from list
       * @param  {[type]} item [description]
       */
      removeVariant(item) {
        const index = this.form.children.indexOf(item)
        this.form.children.splice(index, 1)
      },


      /**
       * Update option values of current attribute
       * @param  {Object} attribute
       */
      onChangeAction(attribute) {

        Vue.set(this.options, 0, {'makannasi': 'udang'})

        console.log(this.options)

        // this.form.item_attributes.push({
        //   name: attribute.name,
        //   option: attribute.option,
        // })

        return function() {} // hack!
      },
    },
  }
</script>
