<template>
  <div class="content-page">
    <div class="content" style="padding-left: 0px; padding-right: 0px">
      <!-- <div class="container"> -->
        <form method="POST" id="form" @submit.prevent="validate">
          <div class="col-md-12" style="padding-left:0px">
            <h4 v-if="!$route.params.id" class="pull-left page-title">Create Variant Item</h4>
            <h4 v-if="$route.params.id" class="pull-left page-title">Edit Variant Item</h4>
          </div>
          <div class="row">
          <!-- Image Uploader -->
          <div class="col-md-4">
            <div class="panel panel-default" style="background-color:transparent; box-shadow:none">
              <div class="panel-body" style="padding:0px">
                <div class="form-group form-general">
                  <div class="col-md-12 pl-pr-0">
                    <ImageUpload
                        :images="form.item_medias"
                        @add="addImage"
                        @clear="clearImages"
                        @remove="removeImage"
                        @set-as-primary="setAsPrimary"
                      ></ImageUpload>
                  </div>
                  <div class="col-md-12 pl-pr-0">
                    <small>You can upload up to 5 images.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-8">

            <!-- Info -->
            <div class="panel panel-default">
               <div class="panel-body">
                 <div class="form-horizontal">
                   <div class="form-group form-general m-b-10">
                     <label class="col-md-2 control-label text-left">Item Name *</label>
                     <div class="col-md-9">
                       <input
                        type="text"
                        v-model="form.item_name"
                        placeholder="Name of item"
                        class="form-control"
                        required
                      />
                     </div>
                   </div>
                   <div class="form-group form-general m-b-10">
                     <label class="col-md-2 control-label text-left">Description</label>
                     <div class="col-md-9 custom-summernote">
                       <textarea v-model="form.description" class="form-control" rows="3" style="resize:vertical"></textarea>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <!--Price -->
            <div class="panel panel-default" >
               <div class="panel-body" >
                 <div class="form-horizontal">
                   <div class="form-group form-general m-b-10">
                     <label class="col-md-2 control-label text-left">Price *</label>
                     <div class="col-md-4">
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
                 </div>
               </div>
            </div>

            <!--Stock -->
            <div class="panel panel-default" >
              <div class="panel-body" >
                <div class="form-horizontal">
                  <div class="form-group form-general m-b-10">
                    <label class="col-md-2 control-label text-left">SKU</label>
                    <div class="col-md-4">
                      <input v-model="form.code_sku" type="text" min="0" placeholder=""
                       class="form-control" maxlength="15">
                    </div>
                  </div>
                  <div class="form-group form-general m-b-10">
                    <label class="col-md-2 control-label text-left">UOM</label>
                    <div class="col-md-4 ">
                      <select id="uom_id" v-model="form.uom_id" class="form-control">
                          <option v-for="uom in list.uoms" :value="uom.uom_id" v-text="uom.name"></option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-10">
                    <label class="col-md-2 control-label text-left">Inventory Policy</label>
                    <div class="col-md-4">
                      <select v-model="form.track_inventory" class="form-control" >
                        <option value='false'>Do not track</option>
                        <option value='true'>Track inventory for this item</option>
                      </select>
                    </div>
                  </div>
                  <!-- <div id="show-stock" v-if="form.track_inventory == 'true'">
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left">Stock</label>
                      <div class="col-md-4">
                        <input v-model.number="form.stock_quantity" type="number" min="0" placeholder="" class="form-control">
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>

            <!--Shipping -->
            <div class="panel panel-default" >
              <div class="panel-body" >
                <div class="form-horizontal">
                  <div class="col-md-12" style="padding-left: 0px;">
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left">Dimension (cm)</label>
                      <div class="col-md-4 p-0">
                        <div class="col-md-3 pr-0">
                          <input v-model="form.dimension_l" type="number" min="1" placeholder="L" class="form-control" style="font-size:12px; padding:6px">
                        </div>
                        <div class="col-md-3 pl-pr-0 text-center form-custom-link" style="width:25px">x</div>
                        <div class="col-md-3 pr-0">
                          <input v-model="form.dimension_w" type="number" min="1" placeholder="W" class="form-control" style="font-size:12px; padding:6px">
                        </div>
                        <div class="col-md-3 pl-pr-0 text-center form-custom-link" style="width:25px">x</div>
                        <div class="col-md-3 pr-0">
                          <input v-model="form.dimension_h" type="number" min="1" placeholder="H" class="form-control" style="font-size:12px; padding:6px">
                        </div>
                      </div>
                    </div>
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left ">Weight *</label>
                      <div class="col-md-4">
                        <div class="input-group">
                          <input v-model="form.weight" type="number" min="1" placeholder="" required
                                 class="form-control">
                          <span class="input-group-addon">gram</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--Generate Variant -->

            <div class="panel panel-default">
              <div class="panel-body" >
                <div v-if="form.item_id">
                  <a href="javascript:;" class="btn btn-default waves-effect" type="button" @click="toggleVariantListModal">
                    Edit Variant
                  </a>
                  <div v-if="variantListModal" class="modal show" tabindex="-1" role="dialog" data-keyboard="false" style="background: rgba(0, 0, 0, 0.75);">
                    <div class="modal-dialog modal-full" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button @click="toggleVariantListModal" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <h4 class="modal-title">Edit Variant</h4>
                        </div>
                        <div class="modal-body">
                          <VariantList
                            :item="form"
                            @remove="deleteChildrenItem"
                            @children-updated="updateChildren"
                          />
                        </div>
                        <div class="modal-footer" style="padding-top: 10px;">
                          <button @click="toggleVariantListModal" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <Variant
                    v-if="!$route.params.id"
                    :item="form"
                    @remove="deleteChildrenItem"
                    @children-updated="updateChildren"
                  />
                </div>
              </div>
            </div>

          <div class="col-md-10 pull-right">
          <!--Variant List -->
          </div>

          </div>
          </div>


          <!-- <div class="container full-width-header bt-1 p-b-10 m-b-20">
            <div class="row">
              <div class="col-md-12">
                <h4 v-if="!$route.params.id" class="pull-left page-title">Create Variant Item</h4>
                <h4 v-if="$route.params.id" class="pull-left page-title">Edit Variant Item</h4>
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
                      <input
                        type="text"
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
                        :images="form.item_medias"
                        @add="addImage"
                        @clear="clearImages"
                        @remove="removeImage"
                        @set-as-primary="setAsPrimary"
                      ></ImageUpload>
                    </div>
                  </div>


                  <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left">Description</label>
                    <div class="col-md-9 custom-summernote">
                      <textarea v-model="form.description" class="form-control" rows="3"></textarea>
                    </div>
                  </div> -->
                  <!-- <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left">SKU</label>
                    <div class="col-md-3">
                      <input v-model="form.code_sku" type="text" min="0" placeholder=""
                             class="form-control" maxlength="15">
                    </div>
                  </div> -->
                  <!-- <div class="form-group form-general m-b-20">
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
                          type="checkbox"
                          id="track-inventory"
                          v-model="form.track_inventory"
                          @click="changeTrackInventoryStatus"
                          true-value="true"
                          false-value="false"
                        />
                        <label for="track-inventory">Track Inventory for this item</label>
                      </div>
                    </div>
                  </div>
                  <div id="show-stock" v-if="form.track_inventory === 'true'">
                    <div class="form-group form-general m-b-20">
                      <label class="col-md-2 control-label text-left">Stock</label>
                      <div class="col-md-3">
                        <input v-model.number="form.stock_quantity" type="number" min="0" placeholder="" class="form-control">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- Shipping -->
          <!-- <div class="container m-b-20">
            <div class="row">
              <div class="col-md-12 p-b-20">
                <h5 class="title">Shipping</h5>
                <div class="form-horizontal">
                  <div class="col-md-6">
                    <div class="form-group form-general m-b-20">
                      <label class="col-md-4 control-label text-left">UOM</label>
                      <div class="col-md-8 pl-pr-0">
                        <select id="uom_id" v-model="form.uom_id" class="form-control">
                          <option v-for="uom in list.uoms" :value="uom.uom_id" v-text="uom.name"></option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group form-general m-b-20">
                      <label class="col-md-4 control-label text-left text-danger">Dimension (cm)</label>
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
                          <input v-model="form.weight" type="number" min="1" placeholder="" required
                                 class="form-control">
                          <span class="input-group-addon">gram</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="form.item_id">
            <a href="javascript:;" class="btn btn-default waves-effect" type="button" @click="toggleVariantListModal">
              Edit Variant
            </a>
            <div v-if="variantListModal" class="modal show" tabindex="-1" role="dialog" data-keyboard="false" style="background: rgba(0, 0, 0, 0.75);">
              <div class="modal-dialog modal-full" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button @click="toggleVariantListModal" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Edit Variant</h4>
                  </div>
                  <div class="modal-body">
                    <VariantList
                      :item="form"
                      @remove="deleteChildrenItem"
                      @children-updated="updateChildren"
                    />
                  </div>
                  <div class="modal-footer" style="padding-top: 10px;">
                    <button @click="toggleVariantListModal" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div> -->
                <!-- </div>/.modal-content -->
              <!-- </div>/.modal-dialog -->
            <!-- </div>/.modal -->
          <!-- </div>
          <div v-else>
            <Variant
              v-if="!$route.params.id"
              :item="form"
              @remove="deleteChildrenItem"
              @children-updated="updateChildren"
            />
          </div> -->

          <div class="float-save">
            <div class="container">

              <div class="clearfix">
                <div class="pull-left">
                  <button class="btn btn-default waves-effect" type="button"
                          @click="$router.push({name: 'item.index'})">
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
                    <button type="button" id="cancel" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                      <span class="caret"></span>
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <button style="text-decoration: none;color: #1d1d1d"
                                class="btn btn-link waves-effect waves-light btn-block" id="save-and-new"
                                @click="saveType = 'save-and-new'"
                                data-name="save-and-new">Save and New
                        </button>
                      </li>
                      <li>
                        <button style="text-decoration: none;color: #1d1d1d"
                                class="btn btn-link waves-effect waves-light btn-block" id="save-and-clone"
                                @click="saveType = 'save-and-clone'"
                                data-name="save-and-clone">Save and Clone
                        </button>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </form>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import {responseOk} from 'src/helpers';
  import Form from 'src/helpers/Form'
  import ImageUpload from './ImageUpload'
  import Variant from './Variant'
  import VariantList from './VariantList'

  export default {
    name: 'FormVariant',

    components: {
      ImageUpload, Variant, VariantList,
    },

    data() {
      return {
        dirtyForm: false,
        saveType: null,
        variantListModal: false,

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
          item_id: null,
          item_name: '',
          children: [],
          description: '',
          sales_rate: 0,
          compare_rate: 0,
          uom_id: null,
          dimension_l: 1,
          dimension_w: 1,
          dimension_h: 1,
          weight: 0,
          weight_unit: 'gr',
          code_sku: '',
          barcode: '',
          track_inventory: 'true',
          stock_quantity: 0,
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
          item_attributes: [],
          parent_id: null,
          item_status: '',
          item_medias: [],
          images: [],
        }),
      }
    },

    beforeRouteLeave(to, from, next) {
      if (this.dirtyForm) {
        const leave = confirm('Are you sure leave this page?')
        if (!leave) return next(false)
      }
      return next()
    },

    created() {
      // IMPORTANT: Make images and item_medias sync.
      this.form.images = this.form.item_medias
    },

    mounted() {
      $('input, textarea, select').on('change', (event) => {
        this.dirtyForm = true
      })

      this.init()
    },

    methods: {
      async init() {
        const id = this.$route.params.id
        let res
        if (id) {
          res = await Axios.get(`items/${id}/edit`)
          this.form = res.data.data.item
          this.form.track_inventory = String(this.form.track_inventory)
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

      async validate() {
        this.save()
      },

      toggleVariantListModal() {
        this.variantListModal = ! this.variantListModal
      },

      updateChildren(value) {
        // We have issue with weight
        this.form.children = value.map(child => {
          child.weight = this.form.weight
          child.track_inventory = String(this.form.track_inventory)
          return child
        })
      },

      async save($event) {
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
            this.$bus.$emit('clear-variant-data')
            Object.assign(this.$data.form, this.$options.data().form)
          }

          if (this.saveType === 'save-and-clone') {

          }
        }
        catch (err) {
          // Object.values(err.response.data)[0]
          const errorMessage = _.first(Object.values(err.response.data.data)[0])
          if (err.response && err.response.data) {
            Alert.error(errorMessage)
          }
        }

      },

      async addImage(image) {
        try {
          const itemId = this.$route.params.id

          if (itemId) {
            // Edit item
            const addResponse = await Axios.post(`items/${itemId}/images/add`, image)
            const editResponse = await Axios.get(`items/${itemId}/edit`)
            this.form.item_medias = editResponse.data.data.item.item_medias

            swal_success(addResponse)
          } else {
            this.form.item_medias.push(image)
          }
        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      async removeImage(image) {
        try {
          const itemId = this.$route.params.id

          if (itemId) {
            await Axios.delete(`items/${itemId}/images/remove/${image.item_media_id}`).then(res => {
              if(responseOk(res.data.code)){
                swal_success(res)
              }
            }).catch(err =>{
              swal_error(res)
            })
          }

          const index = this.form.item_medias.indexOf(image)
          this.form.item_medias.splice(index, 1)
        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      clearImages() {
        try {
          const itemId = this.$route.params.id
          const promiseList = []

          this.form.item_medias.map((img) => {
            const deleteImage = Axios.delete(`items/${itemId}/images/remove/${img.item_media_id}`)
            promiseList.push(deleteImage)
          })

          Promise.all(promiseList)

          Alert.success('All images has been deleted.')

          this.form.item_medias = []

        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      async setAsPrimary(image) {
        try {
          const itemId = this.$route.params.id

          const primaryImage = this.form.item_medias
            .map(img => {
              img.is_main = false
              return img
            })
            .find(img => {
              if (img === image) {
                img.is_main = true
                return img
              }
            })

          if (itemId) {
            // Edit item
            const res = await Axios.get(`items/${itemId}/images/set_primary/${primaryImage.item_media_id}`)
            swal_success(res)
          }

        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      deleteChildrenItem(item) {
        Alert.confirm('Are you sure want to delete this item?', () => {
          const index = this.form.children.indexOf(this.form.children)
          this.form.children.splice(index, 1)
        })
      },

      changeTrackInventoryStatus() {
        this.form.children.map(item => {
          if (item.track_inventory === 'true') {
            item.track_inventory = 'false'
          } else {
            item.track_inventory = 'true'
          }
          console.log(item.track_inventory)
        })
      },

    },
  }
</script>

<style scoped lang="scss">
  .modal-body {
    max-height: calc(100vh - 212px);
    overflow-y: auto;
  }
  .modal-lg {
    width: 65vw;
  }
</style>
