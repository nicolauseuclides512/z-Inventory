<template>
  <div class="content-page">
    <div class="content" style="padding-left: 0px; padding-right: 0px">
        <form method="POST" id="form" @submit.prevent="validate">
          <div class="col-md-12" style="padding-left:0px">
                <h4 v-if="$route.params.id" class="pull-left page-title">Edit Item</h4>
                <h4 v-if="!$route.params.id" class="pull-left page-title">Create Item</h4>
              </div>
          <div class="row">
            <div class="col-md-4">
              <div class="panel panel-default" style="background-color:transparent; box-shadow:none">
                <div class="panel-body" style="padding:0px">
                  <div class="form-group form-general">
                    <div class="col-md-12 pl-pr-0">
                      <ImageUpload
                        :limit="5"
                        :uploading="uploading"
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
              <div class="panel panel-default">
                  <div class="panel-body">
                    <div class="form-horizontal">
                    <div class="form-group form-general m-b-10">
                    <label class="col-md-2 control-label text-left">Item Name *</label>
                    <div class="col-md-9">
                      <input type="text"
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
                      <textarea v-model="form.description" class="form-control" rows="3"
                                style="resize:vertical"></textarea>
                    </div>
                  </div>

                  </div>
                  </div>
              </div>
              <div class="panel panel-default" >
                  <div class="panel-body" >
                    <div class="form-horizontal">
                      <div class="form-group form-general m-b-10">
                    <label class="col-md-2 control-label text-left">Price *</label>
                    <div class="col-md-4">
                      <div class="input-group">
                        <div class="input-group-addon">Rp</div>
                        <money
                            v-model="form.sales_rate"
                            placeholder="Price"
                            class="form-control custom"
                            required
                            v-bind="money"
                            />
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
              </div>
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
                        <select v-model="form.track_inventory" class="form-control" @change="changeTrackInventoryStatus">
                          <option value="false">Do not track</option>
                          <option value="true">Track inventory for this item</option>
                        </select>
                      </div>
                    </div>
                  <div id="stock-quantity" v-if="typeof form.track_inventory === 'boolean' && form.track_inventory === true || typeof form.track_inventory === 'string' && form.track_inventory === 'true'">
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left">Stock</label>
                      <div class="col-md-4">
                        <input v-model.number="form.stock_quantity" type="number" min="0" placeholder="" class="form-control" @blur="saveStockQuantity($event)">
                      </div>
                    </div>
                  </div>
                  <div id="show-stock" v-if="form.track_inventory == true">
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left"></label>
                      <div class="col-md-8">
                        <div class="alert alert-danger" v-if="stockAlert">New value must be greater than original value!</div>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
              </div>
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
                      <div class="col-md-3 pl-pr-0">
                        <input v-model="form.dimension_w" type="number" min="1" placeholder="W" class="form-control" style="font-size:12px; padding:6px">
                      </div>
                      <div class="col-md-3 pl-pr-0 text-center form-custom-link" style="width:25px">x</div>
                      <div class="col-md-3 pl-pr-0">
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
            </div>
          </div>
          <div class="float-save">
            <div class="container" style="padding-left:20px">

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
                            @click="saveType = 'save'"
                            data-name="save"
                    >
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
    </div>
  </div>
</template>

<script>
	import {Money} from 'v-money'
	import Axios from 'axios'
	import {responseOk, swal_error, swal_success} from 'helpers'
	import ImageUpload from './ImageUpload'
	import Form from 'src/helpers/Form'
	import store from 'src/store'
	import {format} from 'date-fns';

	export default {
		name: 'Form',

		components: {
			ImageUpload,
		},

		data() {
			return {
				money: {
					thousands: '.',
					prefix: '',
					precision: 0,
					masked: false
				},
				uploading: false,
				dirtyForm: false,
				stockAlert: false,
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
					dimension_l: 1,
					dimension_w: 1,
					dimension_h: 1,
					weight: 0,
					weight_unit: 'gr',
					code_sku: '',
					barcode: '',
					track_inventory: true,
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
					item_attributes: '',
					parent_id: null,
					item_status: '',
					item_medias: [],
					images: [],
				})
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
				} else {
					res = await Axios.get(`items/create`)
					this.form.uom_id = res.data.data.uoms[0].uom_id
				}

				if (!this.form.images) {
					this.form.images = []
				}

				this.list.uoms = res.data.data.uoms
				this.list.accounts = res.data.data.accounts
				this.list.taxes = res.data.data.taxes
				this.list.attributes = res.data.data.attributes
				this.list.categories = res.data.data.categories
				this.list.weight_units = res.data.data.weight_units
				this.form.default_weight_unit = res.data.data.default_weight_unit
				this.url = res.data.data.url
				this.form.oldStockValue = (res.data.data.item && res.data.data.item.stock_quantity) ? res.data.data.item.stock_quantity : 0
			},

			async validate() {

				if (this.form.images.length < 6){
					this.save()
				} else {
					Alert.error('Uploaded images must be less than 6')
				}
			},

			async saveStockQuantity() {
				if (this.form.oldStockValue >= this.form.stock_quantity) {
					this.stockAlert = true;
					return
				} else {
					this.stockAlert = false;
					return
				}
			},

			async save($event) {
				try {
					this.form.weight = parseInt(this.form.weight)

					let res
					if (this.$route.params.id) {
						if (this.stockAlert) {
							Alert.error('New value must be greater than original value')
							return
						} else {
							res = await Axios.post(`items/${this.$route.params.id}/update`, this.form)
						}
					} else {
						res = await Axios.post(`items`, this.form)
					}

					swal_success(res)

					if (this.saveType === 'save-and-new') {
						this.dirtyForm = false
						this.$data.form = this.$options.data().form
					}

					if (this.saveType === 'save-and-clone') {
						this.dirtyForm = false
					}

					if (this.saveType === 'save') {
						this.dirtyForm = false
						this.$router.push({name: 'item.index'})
					}
				}
				catch (err) {
					const errorMessage = _.first(Object.values(err.response.data.data)[0])
					if (err.response && err.response.data) {
						Alert.error(errorMessage)
					}
				}
			},

			cancel() {
				this.$router.push('/inventory/items')
			},

			async addImage(image) {
				this.uploading = true;
				try {
					const itemId = this.$route.params.id

					if (itemId) {
						const addResponse = await Axios.post(`items/${itemId}/images/add`, image)
						const editResponse = await Axios.get(`items/${itemId}/edit`)
						this.form.item_medias = editResponse.data.data.item.item_medias

						swal_success(addResponse)
					} else {
						this.form.item_medias.push(image)
					}
					this.uploading = false
				}
				catch (err) {
					this.uploading = false
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
						const res = await Axios.delete(`items/${itemId}/images/remove/${image.item_media_id}`)

						if (!responseOk(res.data.code)) {
							swal_error(res)
						}

						swal_success(res)
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

			changeTrackInventoryStatus() {
				this.form.children.map(item => item.track_inventory = this.form.track_inventory)
			},

		},
	}
</script>

<style scoped>
	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: textfield;
		margin: 0;
	}
</style>
