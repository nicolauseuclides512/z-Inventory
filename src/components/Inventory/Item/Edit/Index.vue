<template>

  <form method="POST" novalidate>

    <div class="container full-width-header bt-1 p-b-10 m-b-20">
      <div class="row">
        <div class="col-md-12">
          <h4 class="pull-left page-title">Edit Item</h4>
        </div>
      </div>
    </div>

    <Info
      :name="form.item_name"
      @change:name="form.item_name = form.item_name"

      :description="form.description"
      @change:description="form.description = form.description"

      :sku="form.code_sku"
      @change:sku="form.code_sku = form.code_sku"

      :price="form.sales_rate"
      @change:price="form.sales_rate = form.sales_rate"
    ></Info>

    <!--<Pricing></Pricing>-->
    <Shipping></Shipping>
    <!--<inventory></inventory>-->
    <!--<group></group>-->
    <!--<seo></seo>-->
    <!--<Variant-->
    <!--:items="form.children"-->
    <!--:attributes="form.item_attributes"-->
    <!--&gt;</Variant>-->

    <VariantEdit
      :name="form.item_name"
      :items="form.children"
    ></VariantEdit>

    <hr>

    <div class="container m-b-20">
      <div class="row">
        <div class="col-md-12">
          <h5 class="title">Syncronization</h5>
          <div class="form-horizontal">
            <div class="col-md-12">
              <div class="form-group form-general m-b-20">
                <button class="btn btn-default waves-effect" type="button" data-toggle="modal" data-target="#lazada">
                  Syncronize Stock &amp; Price to Lazada
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="float-save">
      <div class="container">

        <div class="clearfix">
          <div class="pull-left">
            <button class="btn btn-default waves-effect" type="button" @click="cancel">
              <i class="fa fa-chevron-left"></i> Cancel
            </button>
          </div>

          <div class="pull-right">
            <div class="btn-group dropup">
              <button class="btn btn-primary waves-effect waves-light"
                      id="save"
                      @click.prevent="save"
                      data-name="save">Save
              </button>
              <button type="button" id="cancel" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <li><a href="#" id="save-and-new" @click.prevent="save" data-name="save-and-new">Save and New</a></li>
                <li><a href="#" id="save-and-clone" @click.prevent="save" data-name="save-and-clone">Save and Clone</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <!--<h5>Published</h5>-->
        <!--<div class="checkbox checkbox-inline checkbox-success ">-->
        <!--<input type="checkbox" v-model="form.visibility.online_store" id="online_store">-->
        <!--<label for="online_store"> Online Store </label>-->
        <!--</div>-->

      </div>
    </div>

  </form>

</template>

<script>
  import Axios from 'axios'
  import store from 'src/store'
  import Form from 'src/helpers/Form'

  export default {

    name: 'ItemEdit',

    components: {
      Info: require('./Info'),
      Pricing: require('./Pricing'),
      Shipping: require('./Shipping'),
      Inventory: require('./Inventory'),
      Variant: require('../Variant'),
      VariantEdit: require('../VariantEdit'),
//      group: require('./Group'),
//      seo: require('./Seo'),
    },

    data () {
      return {
        dirtyForm: false,

        default_weight_unit: 'gram',
        show_variant: true,

        item_attributes: [
          // { 'name': '', option: '' }
        ],
        item_variants: [
          // {
          //   item_name: '',
          //   item_attributes: {
          //     color: [ 'red', 'green', 'blue' ],
          //     size: [ 'S', 'M', 'L', 'XL' ],
          //   },
          //   sales_rate: '',
          //   code_sku: '',
          //   barcode: '',
          //   inventory_stock_warning: '',
          // }
        ],

        list: {
          uoms: [],
          accounts: [],
          taxes: [],
          attributes: [],
          brands: [],
          categories: [],
          manufactures: [],
          weight_units: [],
        },

        form: new Form({

          // Inventory
          track_inventory: true,
          code_sku: null,
          inventory_stock_warning: null,
          inventory_stock: null,
          barcode: '',

          // Publish status
          visibility: {
            online_store: false,
          },

          item_status: null,
          tax_id: 1,
          item_attributes: {
            // "key": "value",
            // color: [
            //   'white',
            //   'black'
            // ],
            // size: [
            //   '13"',
            //   '15"',
            // ]
          },

          parent_id: null,
          children: [
            // {
            //   item_name: '',
            //   item_attributes: {
            //     color: [ 'red', 'green', 'blue' ],
            //     size: [ 'S', 'M', 'L', 'XL' ],
            //   },
            //   sales_rate: '',
            //   code_sku: '',
            //   barcode: '',
            //   inventory_stock_warning: '',
            // }
          ],

        }),
      }
    },

    computed: {
      isValidForm () {
        return Boolean(store.state.itemForm.item_name) && Boolean(store.state.itemForm.sales_rate)
      },

      url: {
        get () { return store.state.itemForm.url },
        set (value) { store.commit('itemForm/changeUrl', value) },
      },
      accountList: {
        get () { return store.state.itemForm.accountList },
        set (value) { store.commit('itemForm/changeAccountList', value) },
      },
      taxList: {
        get () { return store.state.itemForm.taxList },
        set (value) { store.commit('itemForm/changeTaxList', value) },
      },
      attributeList: {
        get () { return store.state.itemForm.attributeList },
        set (value) { store.commit('itemForm/changeAttributeList', value) },
      },
      categoryList: {
        get () { return store.state.itemForm.categoryList },
        set (value) { store.commit('itemForm/changeCategoryList', value) },
      },
    },

    beforeRouteLeave (to, from, next) {
      if (this.dirtyForm) {
        const leave = confirm('Are you sure leave this page?')
        if (!leave) return next(false)
      }
      return next()
    },

    mounted () {
      $('input').on('change', (event) => {
        this.dirtyForm = true
      })

      this.init()
    },


    methods: {

      async init () {
        const item_id = this.$route.params.id
        const res = await Axios.get(`items/${item_id}/edit`)
        this.form = new Form(res.data.data.item)
      },

      /**
       * Save item
       */
      async save (evt) {
        if (!store.state.itemForm.item_name) {
          Alert.error('Please fill the item name')
          return
        }

        if (!store.state.itemForm.sales_rate) {
          Alert.error('Please fill the price')
          return
        }

        const button = evt.target
        const clickedButton = button.dataset.name

        const item_id = this.$route.params.id

        if (clickedButton === 'save-and-new') {
          await store.dispatch('itemForm/update', item_id)
          await store.dispatch('itemForm/clear')
          await store.dispatch('itemForm/create')
        }

        if (clickedButton === 'save-and-clone') {
          await store.dispatch('itemForm/update', item_id)
        }

        if (clickedButton === 'save') {
          await store.dispatch('itemForm/update', item_id)
          this.dirtyForm = false
          this.$router.push({name: 'item.index'})
        }
      },


      /**
       * Cancel and back to item list
       */
      cancel () {
        this.$router.push('/inventory/items')
      },


      changeName (value) {
        this.form.item_name = value
      },

      changeDescription (value) {
        this.form.description = value
      },

      changeSKU (value) {
        this.form.SKU = value
      },

      changePrice (value) {
        this.form.sales_rate = value
      },

    },

  }
</script>

<style scoped>
</style>
