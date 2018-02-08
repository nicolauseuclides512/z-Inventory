<template>
  <form method="POST" id="form" @submit.prevent="validate">

    <div class="container full-width-header bt-1 p-b-10 m-b-20">
      <div class="row">
        <div class="col-md-12">
          <h4 class="pull-left page-title">Create Item</h4>
        </div>
      </div>
    </div>


    <div class="container bt-1 m-b-20">
      <div class="row">
        <div class="col-md-12 p-b-20">
          <h5 class="title">Info</h5>
          <div class="form-horizontal">
            <div class="form-group form-general m-b-20">
              <label class="col-md-2 control-label text-left text-danger">Item Name</label>
              <div class="col-md-9">
                <input type="text"
                       v-model="form.item_name"
                       placeholder="Name of item"
                       class="form-control"
                       required
                />
              </div>
            </div>


            <div class="form-group form-general m-b-20">
              <label class="col-md-2 control-label text-left">Images</label>
              <div class="col-md-9">
                <ImageUpload
                  :images="form.images"
                  @add="addImage"
                  @clear="clearImages"
                ></ImageUpload>
              </div>
            </div>


            <div class="form-group form-general m-b-20">
              <label class="col-md-2 control-label text-left">Description</label>
              <div class="col-md-9 custom-summernote">
                <textarea v-model="form.description" class="form-control" rows="3" style="max-width: 796px; max-height: 500px; min-width: 550px; min-height: 110px;" ></textarea>
              </div>
            </div>
            <div class="form-group form-general m-b-20">
              <label class="col-md-2 control-label text-left text-danger">SKU</label>
              <div class="col-md-3">
                <input v-model="form.code_sku" type="text" min="0" placeholder="" required="required"
                       class="form-control" maxlength="15">
              </div>
            </div>
            <div class="form-group form-general m-b-20">
              <label class="col-md-2 control-label text-left text-danger">Price</label>
              <div class="col-md-2">
                <div class="input-group">
                  <div class="input-group-addon">Rp</div>
                  <input
                    v-model="form.sales_rate"
                    type="number"
                    min="1"
                    placeholder=""
                    class="form-control custom"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="form-group form-general m-b-20">
              <div class="col-md-12 control-label text-left">
                <div class="checkbox checkbox-success checkbox-inline">
                  <input
                    v-model="form.track_inventory"
                    type="checkbox"
                    id="track-inventory"
                    true-value="true"
                    false-value="false"
                    checked="checked"
                  />
                  <label for="track-inventory">Track Inventory for this item</label>
                </div>
              </div>
            </div>
            <div id="show-stock" v-if="form.track_inventory == 'true'">
              <div class="form-group form-general m-b-20">
                <label class="col-md-2 control-label text-left">Stock</label>
                <div class="col-md-3">
                  <input v-model="form.inventory_stock" type="number" min="0" placeholder="" class="form-control">
                </div>
              </div>
            </div>
            <!--<div class="form-group form-general m-b-20">-->
              <!--<div class="toggles-dropship">-->
                <!--<label class="col-md-3 control-label text-left">Syncronize stock to Lazada</label>-->
                <!--<input type="checkbox" title="Syncronize stock to Lazada">-->
              <!--</div>-->
            <!--</div>-->

            <!--<div>-->
              <!--<div class="form-horizontal p-5">-->
                <!--<div class="form-group form-general m-b-20">-->
                  <!--<div class="col-md-1"></div>-->
                  <!--<div class="col-md-3 pl-pr-0">-->
                    <!--<input type="text" placeholder="Seller SKU in Lazada" required="required" class="form-control">-->
                  <!--</div>-->
                  <!--<div class="col-md-1">-->
                    <!--<button type="button" class="btn btn-danger btn-custom waves-effect"><i class="ion-trash-b"></i></button>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

          </div>
        </div>
      </div>
    </div>


    <!-- Shipping -->

    <div class="container m-b-20">
      <div class="row">
        <div class="col-md-12 p-b-20">
          <h5 class="title">Shipping</h5>
          <div class="form-horizontal">
            <div class="col-md-6">
              <div class="form-group form-general m-b-20">
                <label class="col-md-4 control-label text-left text-danger">UOM</label>
                <div class="col-md-8 pl-pr-0">
                  <select id="uom_id" v-model="form.uom_id" class="form-control">
                    <option v-for="uom in list.uoms" :value="uom.uom_id" v-text="uom.name"></option>
                  </select>
                </div>
              </div>
              <div class="form-group form-general m-b-20">
                <label class="col-md-4 control-label text-left">Dimension (cm)</label>
                <div class="col-md-2 pl-pr-0">
                  <input v-model="form.dimension_l" type="number" min="1" placeholder="L" class="form-control">
                </div>
                <div class="col-md-1 pl-pr-0 text-center form-custom-link">x</div>
                <div class="col-md-2 pl-pr-0">
                  <input v-model="form.dimension_w" type="number" min="1" placeholder="W" class="form-control">
                </div>
                <div class="col-md-1 pl-pr-0 text-center form-custom-link">x</div>
                <div class="col-md-2 pl-pr-0">
                  <input v-model="form.dimension_h" type="number" min="1" placeholder="H" class="form-control">
                </div>
              </div>
              <div class="form-group form-general m-b-20">
                <label class="col-md-4 control-label text-left text-danger">Weight</label>
                <div class="col-md-4 pl-pr-0">
                  <div class="input-group">
                    <input v-model="form.weight" type="number" min="1" placeholder="" required class="form-control">
                    <span class="input-group-addon">gram</span>
                  </div>
                </div>
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
            <button class="btn btn-default waves-effect" type="button" @click="$router.push({name: 'item.index'})">
              <i class="fa fa-chevron-left"></i> Cancel
            </button>
          </div>

          <div class="pull-right">
            <div class="btn-group dropup">
              <button class="btn btn-primary waves-effect waves-light"
                      id="save"
                      @click="saveType = 'save'"
                      data-name="save"
              >
                      <!--@click="save"-->
                Save
              </button>
              <button type="button" id="cancel" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <li><a href="#" id="save-and-new" @click="saveType = 'save-and-new'" data-name="save-and-new">Save and New</a></li>
                <li><a href="#" id="save-and-clone" @click="saveType = 'save-and-clone'" data-name="save-and-clone">Save and Clone</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>

  </form>
</template>

<script>
  import Axios from 'axios'
  import ImageUpload from './ImageUpload'
  import Form from 'src/helpers/Form'

  export default {
    name: 'Form',

    components: {
      ImageUpload,
    },

    beforeRouteLeave (to, from, next) {
      if (this.dirtyForm) {
        const leave = confirm('Are you sure leave this page?')
        if (!leave) return next(false)
      }
      return next()
    },

    data () {
      return {
        dirtyForm: false,
        saveType: null,

        list: {
          uoms: [],
          accounts: [],
          taxes: [],
          attributes: [],
          categories: [],
          weight_units: [],
        },

        url: '',

        form: new Form({
          item_name: '',
          description: '',
          sales_rate: 0,
          compare_rate: 0,
          uom_id: null,
          dimension_l: 0,
          dimension_w: 0,
          dimension_h: 0,
          weight: 0,
          weight_unit: 'gr',
          code_sku: '',
          barcode: '',
          track_inventory: 'true',
          inventory_stock: 0,
          inventory_stock_warning: 0,
          category_id: null,
          tags: '',
          page_title: '',
          meta_description: '',
          slug: '',
          visibility: {
            online_store: true,
          },
          tax_id: 1,
          item_attributes: '',
          parent_id: null,
          item_status: '',
          images: [],
        }),
      }
    },

    mounted () {
      $('input, textarea, select').on('change', (event) => {
        this.dirtyForm = true
      })

      this.init()
    },

    methods: {
      async init () {
        const id = this.$route.params.id
        let res
        if (id) {
          res = await Axios.get(`items/${id}/edit`)
          this.form = res.data.data.item
          this.form.images = res.data.data.item.item_medias
        } else {
          res = await Axios.get(`items/create`)
          this.form.uom_id = res.data.data.uoms[0].uom_id
        }

        this.list.uoms = res.data.data.uoms
        this.list.accounts = res.data.data.accounts
        this.list.taxes = res.data.data.taxes
        this.list.attributes = res.data.data.attributes
        this.list.categories = res.data.data.categories
        this.list.weight_units = res.data.data.weight_units
        this.form.default_weight_unit = res.data.data.default_weight_unit
        this.url = res.data.data.url
      },

      async validate () {
        this.save()
      },

      async save ($event) {
        try {
          this.form.weight = parseInt(this.form.weight)

          let res

          if (this.$route.params.id) {
            res = await Axios.post(`items/${this.$route.params.id}/update`, this.form)
          } else {
            res = await Axios.post(`items`, this.form)
          }

          swal_success(res)

          this.dirtyForm = false

          if (this.saveType === 'save') {
            this.$router.push({name: 'item.index'})
          }

          if (this.saveType === 'save-and-new') {
            this.form = this.$options.data().form
          }

          if (this.saveType === 'save-and-clone') {

          }
        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }

      },

      addImage (value) {
        this.form.images.push(value)
      },

      clearImages (value) {
        this.form.images = []
      },

    },
  }
</script>

<style scoped lang="scss">

</style>
