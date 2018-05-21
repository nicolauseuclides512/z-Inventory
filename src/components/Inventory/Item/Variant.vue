<template>
	<div>
		<div class="container m-b-20 pl-pr-0">
			<div class="row">
				<div class="col-md-12">
					<h5 class="title" style="margin-top:0px">Variant</h5>
					<div class="form-horizontal">
						<div class="col-md-12 pl-pr-0">
							<!--<div class="form-group">-->
							<!--<div class="toggles-dropship">-->
							<!--<label>Add Variants?</label>-->
							<!--<div @click="toggleVariant"-->
							<!--class="toggle toggle-default"-->
							<!--id="variant_button"-->
							<!--ref="variant_button"-->
							<!--style="height: 20px; width: 65px;">-->
							<!--<div :class="{ 'toggle-slide': true, active: showVariant }">-->
							<!--<div class="toggle-inner" :style="{ width: '80px', 'margin-left': !showVariant ? '-31px' : 0 }">-->
							<!--<div :class="{ 'toggle-on': true, active: showVariant }"-->
							<!--style="height: 20px; width: 40px; text-align: center; text-indent: -10px; line-height: 20px;">-->
							<!--ON-->
							<!--</div>-->
							<!--<div class="toggle-blob" style="height: 20px; width: 20px; margin-left: -10px;"></div>-->
							<!--<div :class="{ 'toggle-off': true, active: !showVariant }"-->
							<!--style="height: 20px; width: 40px; margin-left: -10px; text-align: center; text-indent: 10px; line-height: 20px;">-->
							<!--OFF-->
							<!--</div>-->
							<!--</div>-->
							<!--</div>-->
							<!--</div>-->
							<!--</div>-->
							<!--</div>-->

							<div v-if="showVariant" id="mark_active">
								<div v-if="firstVariant.show">
									<div class="form-horizontal p-5">
										<div class="form-group">
											<div class="col-md-2 pl-0">
												<select class="form-control" v-model="firstVariant.name" @change="generateVariant">
													<option v-for="(v, k) in firstVariantList" :value="k" :key="k">{{ v }}</option>
												</select>
											</div>
											<div class="col-md-7">
												<Vuetagger
													:value="firstVariant.values"
													@change="changeFirstVariantValues"
												></Vuetagger>
											</div>

											<div class="col-md-1 pl-0"  v-if="secondVariant.show || thirdVariant.show">
												<button type="button" @click="hideFirstVariant"
																class="btn waves-effect waves-light m-b-5"
																style="border:none; box-shadow:none; background:transparent">
													<i class="ion-ios7-trash-outline text-danger" style="font-size:20px"></i>
												</button>
											</div>
										</div>
										<div v-if="!secondVariant.show && !thirdVariant.show">
												<button type="button" @click="addMoreVariant"
																class="btn waves-effect waves-light m-b-5"
																style="border:none; box-shadow:none; background:transparent; padding:0">
													<span style="color:#2FA3E6">+ Add Variant</span>
												</button>
										</div>
									</div>
								</div>

								<div v-if="secondVariant.show">
									<div class="form-horizontal p-5">
										<div class="form-group">
											<div class="col-md-2 pl-0">
												<select class="form-control" v-model="secondVariant.name" @change="generateVariant">
													<option v-for="(v, k) in secondVariantList" :value="k" :key="k">{{ v }}</option>
												</select>
											</div>
											<div class="col-md-7">
												<Vuetagger :value="secondVariant.values" @change="changeSecondVariantValues"></Vuetagger>
											</div>
											<div class="col-md-1 pl-0" v-if="firstVariant.show || thirdVariant.show" style="width:50px">
												<button type="button" @click="hideSecondVariant"
																class="btn waves-effect waves-light m-b-5"
																style="border:none; box-shadow:none; background:transparent">
													<i class="ion-ios7-trash-outline text-danger" style="font-size:20px"></i>
												</button>
											</div>

										</div>
										<div class="col-md-1 pl-0" v-if="(!thirdVariant.show && firstVariant.show) || (!firstVariant.show && !thirdVariant.show )">
												<button type="button" @click="addMoreVariant"
																class="btn waves-effect waves-light m-b-5"
																style="border:none; box-shadow:none; background:transparent; padding:0">
													<span style="color:#2FA3E6">+ Add Variant</span>
												</button>
											</div>
									</div>
								</div>

								<div v-if="thirdVariant.show">
									<div class="form-horizontal p-5">
										<div class="form-group">
											<div class="col-md-2 pl-0">
												<select class="form-control" v-model="thirdVariant.name" @change="generateVariant">
													<option v-for="(v, k) in thirdVariantList" :value="k" :key="k">{{ v }}</option>
												</select>
											</div>
											<div class="col-md-7">
												<Vuetagger :value="thirdVariant.values" @change="changeThirdVariantValues"></Vuetagger>
											</div>

											<div class="col-md-1 pl-0" v-if="firstVariant.show || secondVariant.show">
												<button type="button" @click="hideThirdVariant"
																class="btn waves-effect waves-light m-b-5"
																style="border:none; box-shadow:none; background:transparent">
													<i class="ion-ios7-trash-outline text-danger" style="font-size:20px"></i>
												</button>
											</div>
										</div>
										<div class="col-md-1 pl-0" v-if="(secondVariant.show && !firstVariant.show) || (firstVariant.show && !secondVariant.show ) || (!firstVariant.show && !secondVariant.show )">
												<button type="button" @click="addMoreVariant"
																class="btn waves-effect waves-light m-b-5"
																style="border:none; box-shadow:none; background:transparent; padding:0">
													<span style="color:#2FA3E6">+ Add Variant</span>
												</button>
											</div>
									</div>
								</div>
								<!-- <div class="row">
									<button
										v-if="!firstVariant.show || !secondVariant.show || !thirdVariant.show"
										type="button" @click="addMoreVariant" class="btn btn-info waves-effect waves-light">
										Add more variant
									</button>
									<button type="button" @click="generateVariant" class="btn btn-info waves-effect waves-light">
										Generate Variants
									</button>
								</div> -->


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
								<div v-if="list.items.length" class="col-md-12 pl-pr-0" style="padding-top: 30px" >
									<h5 class="title" style="margin-top:0px">Generated Variant</h5>
									<div class="table-responsive">
										<table class="table">
											<thead>
											<tr>
												<td>Item Name</td>
												<td style="width:152px;">SKU</td>
												<!-- <td v-if="firstVariant.show && firstVariant.values.length">
													{{ firstVariant.name | capitalize }}
												</td>
												<td v-if="secondVariant.show && secondVariant.values.length">
													{{ secondVariant.name | capitalize }}
												</td>
												<td v-if="thirdVariant.show && thirdVariant.values.length">
													{{ thirdVariant.name | capitalize }}
												</td> -->
												<td v-if="item.track_inventory == 'true'" style="width:97px">Stock</td>
												<td style="width:136px">Price</td>
												<td>&nbsp;</td>
											</tr>
											</thead>
											<tbody>
											<tr v-for="(v,k) in list.items" :key="k">
												<td>
													<input type="text" class="form-control form-white" v-model="v.item_name" style="margin-bottom:8px">
													<!-- <div v-if="firstVariant.show && firstVariant.values.length" style="float:left">
														<div class="label label-info m-b-10">
															{{ v.item_attributes[firstVariant.name] | removeNonAlphaNum}}
														</div>
														<input
														type="text"
														class="form-control form-white"
														v-model="v.item_attributes[firstVariant.name]"
														disabled="disabled"
														style="display:none; margin-top:10px">
													</div>
													<div v-if="secondVariant.show && secondVariant.values.length" style="float:left">
														<div class="label label-info m-b-10">
															{{v.item_attributes[secondVariant.name] | removeNonAlphaNum}}
														</div>
														<input
														type="text"
														class="form-control form-white"
														v-model="v.item_attributes[secondVariant.name]"
														disabled="disabled"
														style="display:none; margin-top:10px">
													</div>
													<div v-if="thirdVariant.show && thirdVariant.values.length" style="float:left">
														 <div class="label label-info m-b-10">
															{{v.item_attributes[thirdVariant.name] | removeNonAlphaNum}}
														</div>
														<input
														type="text"
														class="form-control form-white"
														v-model="v.item_attributes[thirdVariant.name]"
														disabled="disabled"
														style="display:none; margin-top:10px">
													</div> -->
												</td>
												<td style="vertical-align:text-top">
													<input type="text" class="form-control form-white" v-model="v.code_sku" style="width:144px">
												</td>
												<!-- <td v-if="firstVariant.show && firstVariant.values.length">
													<input
														type="text"
														class="form-control form-white"
														v-model="v.item_attributes[firstVariant.name]"
														disabled="disabled">
												</td>
												<td v-if="secondVariant.show && secondVariant.values.length">
													<input
														type="text"
														class="form-control form-white"
														v-model="v.item_attributes[secondVariant.name]"
														disabled="disabled">
												</td>
												<td v-if="thirdVariant.show && thirdVariant.values.length">
													<input
														type="text"
														class="form-control form-white"
														v-model="v.item_attributes[thirdVariant.name]"
														disabled="disabled">
												</td> -->
												<td v-if="item.track_inventory == 'true'" style="vertical-align:text-top"><input type="number" min="0" step="1" class="form-control form-white" v-model.number="v.stock_quantity"></td>
												<td style="vertical-align:text-top"><input type="number" step="1" class="form-control form-white" v-model.number="v.sales_rate"></td>
												<td style="vertical-align:text-top">
													<button type="button"
																	@click="removeItem(v)"
																	class="btn waves-effect"
																	style="border:none; box-shadow:none; background:transparent">
														<i class="ion-ios7-trash-outline text-danger" style="font-size:20px"></i>
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
	import _ from 'lodash'
	import Vuetagger from '../../Vuetagger'

	function cartesianProductOf(args) {
		return _.reduce(args, function (a, b) {
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

		watch: {
			'list.items': {
				deep: true,
				handler(value, oldValue) {
					this.updateChildren()
				}
			}
		},

		data() {
			return {
				showVariant: true,

				firstVariant: {name: 'color', show: true, values: []},
				secondVariant: {name: '', show: false, values: []},
				thirdVariant: {name: '', show: false, values: []},
				list: {
					variants: {
						color: 'Color',
						capacity: 'Capacity',
						flavour: 'Flavour',
						model: 'Model',
						series: 'Series',
						size: 'Size',
						material: 'Material',
					},
					items: [],
				},
			}
		},

		computed: {
			firstVariantList() {
				return _.omit(this.list.variants, [this.secondVariant.name, this.thirdVariant.name])
			},
			secondVariantList() {
				return _.omit(this.list.variants, [this.firstVariant.name, this.thirdVariant.name])
			},
			thirdVariantList() {
				return _.omit(this.list.variants, [this.secondVariant.name, this.firstVariant.name])
			}
		},

		created() {
			this.$bus.$on('clear-variant-data', this._resetData)
		},

		async mounted() {
			this.list.items = await this.item.children
		},

		methods: {
			toggleVariant() {
				this.showVariant = !this.showVariant
			},

			_resetData() {
				Object.assign(this.$data, this.$options.data())
			},

			generateVariant() {

				let variants = []

				if (this.firstVariant.values.length && this.firstVariant.show) {
					variants.push(this.firstVariant.values)
				}
				if (this.secondVariant.values.length && this.secondVariant.show) {
					variants.push(this.secondVariant.values)
				}
				if (this.thirdVariant.values.length && this.thirdVariant.show) {
					variants.push(this.thirdVariant.values)
				}

				const cartesian = cartesianProductOf(variants)

				this.list.items = []

				cartesian.map((item) => {

					let string = ''

					for (let i = 0; i < item.length; i++) {
						string = string + item[i]
						if (i < item.length - 1) {
							string = string + '-'
						}
					}

					const firstVariantName = this.firstVariant.name.toLowerCase()
					const secondVariantName = this.secondVariant.name.toLowerCase()
					const thirdVariantName = this.thirdVariant.name.toLowerCase()

					const attributes = {}

					if (this.firstVariant.values.length && this.firstVariant.show) {
						attributes[firstVariantName] = [item[0]]
					}

					if (this.secondVariant.values.length && this.secondVariant.show) {
						attributes[secondVariantName] = [item[1]]
					}

					if (this.thirdVariant.values.length && this.thirdVariant.show) {
						attributes[thirdVariantName] = [item[2]]
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
						stock_quantity: this.item.stock_quantity,
						inventory_stock_warning: this.item.inventory_stock_warning,
						item_status: this.item.item_status,
						category_id: this.item.category_id,
						organization_id: this.item.organization_id,
						parent_id: this.item.parent_id,
						item_attributes: attributes,
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
			},
			changeFirstVariantValues(values) {
				this.firstVariant.values = values
				this.generateVariant()
			},

			changeSecondVariantValues(values) {
				this.secondVariant.values = values
				this.generateVariant()
			},

			changeThirdVariantValues(values) {
				this.thirdVariant.values = values
				this.generateVariant()
			},


			hideFirstVariant() {
				if (!this.secondVariant.show && !this.thirdVariant.show) {
					this.generateVariant()
					return
				}
				this.firstVariant.values = []
				this.firstVariant.show = false
				this.generateVariant()
			},

			hideSecondVariant() {
				if (!this.firstVariant.show && !this.thirdVariant.show) {
					this.generateVariant()
					return
				}
				this.secondVariant.values = []
				this.secondVariant.show = false
				this.generateVariant()
			},

			hideThirdVariant() {
				if (!this.firstVariant.show && !this.secondVariant.show) {
					this.generateVariant()
					return
				}
				this.thirdVariant.values = []
				this.thirdVariant.show = false
				this.generateVariant()
			},

			addMoreVariant() {
				if (!this.firstVariant.show) {
					this.firstVariant.show = true
					this.generateVariant()
					return
				}

				if (!this.secondVariant.show) {
					this.secondVariant.show = true
					this.generateVariant()
					return
				}

				if (!this.thirdVariant.show) {
					this.thirdVariant.show = true
					this.generateVariant()
					return
				}
			},

			addVariant(name, values) {
				if (this.list.currentVariantTypes.length < 3) {
					this.list.currentVariantTypes.push({
						name: name.toLowerCase(),
						values: values,
					})
				}
			},


			addVariantTypeValue(value) {
				this.list.currentVariantTypes[value.toLowerCase()].values.push('shoet')
			},

			async updateChildren() {
				this.$emit('children-updated', this.list.items)

				let variants = {}
				variants[this.firstVariant.name] = this.firstVariant.values
				variants[this.secondVariant.name] = this.secondVariant.values
				variants[this.thirdVariant.name] = this.thirdVariant.values
				this.$emit('variant-type-updated', variants)
			},

			async removeItem(item) {
				this.$emit('remove', item)
			},

			removeVariant(variant) {
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
