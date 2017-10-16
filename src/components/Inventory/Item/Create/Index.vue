<template>

  <form method="POST" id="form" novalidate>

    <div class="container full-width-header bt-1 p-b-10 m-b-20">
      <div class="row">
        <div class="col-md-12">
          <h4 class="pull-left page-title">New Item</h4>
        </div>
      </div>
    </div>

    <info></info>
    <pricing></pricing>
    <!--<shipping></shipping>-->
    <!--<inventory></inventory>-->
    <!--<group></group>-->
    <!--<seo></seo>-->

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

  import store from 'src/store'

  export default {

    name: 'ItemCreate',

    components: {
      info: require('./Info'),
      pricing: require('./Pricing'),
      shipping: require('./Shipping'),
      inventory: require('./Inventory'),
//      group: require('./Group'),
//      seo: require('./Seo'),
    },

    data() {
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

        form: {

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

        },
      }
    },

    computed: {
      isValidForm() {
        return Boolean(store.state.itemForm.item_name) && Boolean(store.state.itemForm.sales_rate)
      },

      url: {
        get() { return store.state.itemForm.url },
        set(value) { store.commit('itemForm/changeUrl', value) }
      },
      accountList: {
        get() { return store.state.itemForm.accountList },
        set(value) { store.commit('itemForm/changeAccountList', value) }
      },
      taxList: {
        get() { return store.state.itemForm.taxList },
        set(value) { store.commit('itemForm/changeTaxList', value) }
      },
      attributeList: {
        get() { return store.state.itemForm.attributeList },
        set(value) { store.commit('itemForm/changeAttributeList', value) }
      },
      categoryList: {
        get() { return store.state.itemForm.categoryList },
        set(value) { store.commit('itemForm/changeCategoryList', value) }
      },
    },

    beforeRouteLeave(to, from, next) {
      if (this.dirtyForm) {
        const leave = confirm('Are you sure leave this page?')
        if (!leave) return next(false)
      }
      return next()
    },

    async mounted() {
      $('input').on('change', (event) => {
        this.dirtyForm = true
      })

      if (typeof this.$route.query.clone === 'undefined') {
        await store.dispatch('itemForm/clear')
      }
      await store.dispatch('itemForm/create')
    },


    methods: {

      /**
       * Save item
       */
      async save(evt) {
        if (!store.state.itemForm.item_name) {
          Alert.error('Please fill the item name')
          return;
        }

        if (!store.state.itemForm.sales_rate) {
          Alert.error('Please fill the price')
          return;
        }

        const button = evt.target
        const clickedButton = button.dataset.name

        if (clickedButton === 'save-and-new') {
          await store.dispatch('itemForm/save')
          await store.dispatch('itemForm/clear')
          await store.dispatch('itemForm/create')
        }

        if (clickedButton === 'save-and-clone') {
          await store.dispatch('itemForm/save')
        }

        if (clickedButton === 'save') {
          await store.dispatch('itemForm/save')
          this.dirtyForm = false
          this.$router.push({name: 'item.index'})
        }
      },


      /**
       * Cancel and back to item list
       */
      cancel() {
        this.$router.push('/inventory/items')
      },

    },

  }
</script>

<style scoped>
</style>
