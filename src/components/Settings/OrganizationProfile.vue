<template>
	<section id="organization" class="content sahito-user full-width" style="box-shadow:none!important; top:30px">

		<div v-if="loading" class="lead text-muted text-center">
			<i class="fa fa-spin fa-spinner fa-lg"></i> Loading Checkout Detail
		</div>

		<div>
			<form method="POST" @submit.prevent="save">
				<div class="inner-form">
					<div class="container bt-1 p-b-10">
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<h4 class="title">Company Profile</h4>
							</div>
						</div>
					</div>
					<div class="container setting-page-right-content">
						<div class="row">
							<div class="col-md-12 pt-20 m-b-20 pl-pr-15">
								<div class="form-horizontal">
									<div class="form-group form-general m-b-20">
										<div class="col-md-4">

											<div v-if="!uploading && !removing">
												<div class="custom-dropzone">
													<div class="message" v-show="!image_logo_medium">
														Click here to select new image logo
													</div>
													<img
														v-if="image_logo_medium"
														:src="image_logo_medium"
														alt=""
														class=""
														style="width: auto; height: auto; max-width: 240px; max-height: 100px;"
													/>
													<input
														v-if="!image_logo_medium"
														ref="logo"
														@change="uploadLogo"
														name="file"
														type="file"
														accept="image/png,image/jpg,image/jpeg"
														style="opacity: 0;"
														size="1000000"
													/>
												</div>
												<a
													@click="removeLogo"
													v-show="image_logo_medium"
													href="javascript:void(0)"
													style="display: block; padding: 5px 10px; text-align: center; background: #515151; color: white; font-size: 12px;"
												>
													Remove logo
												</a>
											</div>
											<div v-if="uploading || removing" class="lead d-flex">
												<SpinnerSmall></SpinnerSmall>
											</div>
										</div>
										<div class="col-md-8">
											<p class="note-text">
												This logo will appear on the documents such as sales order and purchase order that you created.
											</p>
											<span class="help-text">Preferred Image Size: 240px x 240px @ 72 DPI Maximum size of 1MB.</span> <br>
											<span class="help-text">Supported types : .PNG, .JPG, .JPEG</span>
										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<label class="col-md-3 control-label text-left">Business Name *</label>
										<div class="col-md-5">
											<input type="text" name="name" id="name" placeholder="Name" v-model="form.name" v-validate="'required'" v-bind:class="{'form-control': true, 'error': errors.has('name') }" />
											<span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>

										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<label class="col-md-3 control-label text-left">Phone</label>
										<div class="col-md-5">
											<input type="text" name="phone" id="phone" placeholder="Phone" v-model="form.phone" v-validate="'min:9|max:15'" v-bind:class="{'form-control': true, 'error': errors.has('phone') }" />
											<span v-show="errors.has('phone')" class="text-danger">{{ errors.first('phone') }}</span>
										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<label class="col-md-3 control-label text-left"></label>
										<div class="col-md-8">
											<div class="alert alert-danger" v-if="phoneAlert">Please type a correct phone number</div>
										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<label class="col-md-3 control-label text-left" style="padding-top:0px">Email</label>
										<div class="col-md-5 primary-contact">
											{{ primary_contact_email }}
										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<label class="col-md-3 control-label text-left">Company Address</label>
										<div class="col-md-5">
											<select v-model.trim="form.country_id" @change="onCountryChange" id="country"
															class="form-control" data-placeholder="Country" title="Country">
												<option value="" disabled hidden>-- Select your country --</option>
												<option v-for="country in list.country_list" :value="country.id" :key="country.id">{{ country.name }}</option>
											</select>
										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<div class="col-md-5 col-md-offset-3">
											<select v-model.trim="form.province_id" @change="onProvinceChange" id="province"
															class="form-control" data-placeholder="Province" title="Province">
												<option value="" disabled hidden>-- Select your province --</option>
												<option v-for="p in list.province_list" :value="p.id" :key="p.id">{{ p.name }}</option>
											</select>
										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<div class="col-md-5 col-md-offset-3">
											<select v-model.trim="form.district_id" @change="onDistrictChange" id="district"
															class="form-control" data-placeholder="District" title="District">
												<option value="" disabled hidden>-- Select your district --</option>
												<option v-for="d in list.district_list" :value="d.id" :key="d.id">{{ d.name }}</option>
											</select>
										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<div class="col-md-5 col-md-offset-3">
											<select v-model.trim="form.region_id" id="region" class="form-control" data-placeholder="Region"
															title="Region">
												<option value="" disabled hidden>-- Select your region --</option>
												<option v-for="r in list.region_list" :value="r.id" :key="r.id">{{ r.name }}</option>
											</select>
										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<label class="col-md-3 control-label text-left">Address</label>
										<div class="col-md-5">
											<textarea
												id="address"
												v-model.trim="form.address"
												style="min-width: 100%; max-width: 100%;"
												class="form-control"
												placeholder="" rows="3"
											></textarea>
										</div>
									</div>
									<div class="form-group form-general m-b-20">
										<label class="col-md-3 control-label text-left">Zip/Postal Code</label>
										<div class="col-md-5">
											<input type="text" name="zip" id="zip" placeholder="Zip/Postal Code" v-model="form.zip" v-validate="'min:5|max:5'" v-bind:class="{'form-control': true, 'error': errors.has('zip') }" />
											<span v-show="errors.has('zip')" class="text-danger">{{ errors.first('zip') }}</span>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="container p-b-10 m-b-20">
						<div class="row">
							<div class="col-md-12 text-center">
								<button type="reset" @click="resetForm" class="btn btn-default waves-effect" :disabled="loading" >
									Cancel
								</button>
								<button :disabled="errors.any() || loading" type="submit" class="btn btn-info waves-effect waves-light">Save</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</section>
</template>


<script>
	import Vue from 'vue'
	import Axios from 'axios'
	import Cookie from 'js-cookie'
	import Form from 'src/helpers/Form'
	import { responseOk, swal_error, swal_success } from 'src/helpers'
	import Regional from 'src/helpers/regional'
	import VeeValidate from 'vee-validate';

	Vue.use(VeeValidate);

	const orgId = Cookie.get('organization_id')

	export default {
		name: 'OrganizationProfile',

		components: {
			SpinnerSmall: () => import('@/components/Helpers/SpinnerSmall'),
		},

		data () {
			return {
				zipAlert: false,
				loading: false,
				uploading: false,
				removing: false,
				originalForm: [],
				originalContactList: [],
				organization_id: null,
				awsBaseUrl: '',
				new_contact: {
					name: '',
					email: '',
					show: false,
				},
				primary_contact_email: '',
				primary_contact_issues_count: 0,
				image_logo_medium: '',
				list: {
					country_list: [],
					province_list: [],
					district_list: [],
					region_list: [],
				},
				form: new Form({
					name: '',
					portal: '',
					country_id: '',
					province_id: '',
					district_id: '',
					region_id: '',
					address: '',
					zip: '',
					phone: '',
					fax: '',
					currency_id: '',
					timezone_id: '',
					organization_status: '',
				}),
				phoneAlert: false,
				zipcodeAlert: false
			}
		},

		async mounted () {
			try {
				const organization_id = Cookie.get('organization_id')

				const res = await Axios.get(`organizations/${organization_id}`)

				this.image_logo_medium = res.data.data.logo

				this.form.name = res.data.data.name
				this.form.portal = res.data.data.portal
				this.form.country_id = res.data.data.country_id
				this.form.province_id = res.data.data.province_id
				this.form.district_id = res.data.data.district_id
				this.form.region_id = res.data.data.region_id
				this.form.address = res.data.data.address
				this.form.zip = res.data.data.zip
				this.form.phone = res.data.data.phone
				this.form.fax = res.data.data.fax
				this.form.currency_id = res.data.data.currency_id
				this.form.timezone_id = res.data.data.timezone_id
				this.form.organization_status = res.data.data.organization_status
				this.primary_contact_email = res.data.data.primary_contact ? res.data.data.primary_contact.email : ''


				const countries = await Regional.countryList()
				this.list.country_list = countries.filter(country => country.name === 'Indonesia')
				const indonesia = countries.find(country => country.name === 'Indonesia')

				this.list.province_list = await Regional.provinceList(indonesia.id)

				if (this.form.province_id) {
					this.list.district_list = await Regional.districtList(this.form.province_id)
				}

				if (this.form.district_id) {
					this.list.region_list = await Regional.regionList(this.form.district_id)
				}
			}
			catch (err) {
				console.error(err)
			}
		},

		methods: {
			resetForm () {
				this.form.reset()
			},
			/**
			 * Save organization profile
			 */
			// inputZip ($event) {
			//   $event.target.value = $event.target.value.replace(/\D/g, '')

			//   if (($event.target.value.length < 5 && $event.target.value.length > 0) || $event.target.value.length > 5){
			//     this.zipAlert = true
			//     return
			//   } else {
			//     this.zipAlert = false
			//     return
			//   }
			//   store.commit('settings/organization/ZIP', $event.target.value)
			// },

			// async phoneCheck(){
			//   if ((this.form.phone.length < 9 && this.form.phone.length > 0) || this.form.phone.length > 15){
			//     this.phoneAlert = true
			//     return
			//   } else {
			//     this.phoneAlert = false
			//     return
			//   }
			// },

			// async zipCheck(){
			//   if ((this.form.zip.length > 0 && this.form.zip.length < 5) || this.form.zip.length > 5){
			//     this.zipAlert = true
			//     return
			//   } else {
			//     this.zipAlert = false
			//     return
			//   }
			// },
			async save () {
				this.loading = true
				this.$validator.validateAll().then((result) => {
					if (result) {
							const data = {
								name: this.form.name,
								phone: '' + this.form.phone,
								country_id: this.form.country_id,
								province_id: this.form.province_id,
								district_id: this.form.district_id,
								region_id: this.form.region_id,
								address: '' + this.form.address,
								zip: '' + this.form.zip,
							}
							const organization_id = Cookie.get('organization_id')
							Axios.put(`organizations/${organization_id}`, data).then(
								res =>{
									if (responseOk(res.status)) {
										swal_success(res)
										this.loading = false
										this.$store.commit('settings/organization/ZIP', this.form.zip)
									}
								}
							)
							.catch(err => {
								this.loading = false
								console.error(err)
								swal_error(err.response)
							})
					}else{
						this.loading = false
						Alert.error('Company profile form is not valid!');
					}
				});
			},
			async onCountryChange () {
				this.list.province_list = await Regional.provinceList(this.form.country_id)
				this.list.district_list = []
				this.list.region_list = []
			},
			async onProvinceChange () {
				this.list.district_list = await Regional.districtList(this.form.province_id)
				this.list.region_list = []
			},
			async onDistrictChange () {
				this.list.region_list = await Regional.regionList(this.form.district_id)
			},
			/**
			 * Upload logo
			 */
			async uploadLogo () {
				try {
					this.uploading = true
					const image = this.$refs.logo.files[0]
					const formData = new FormData()
					formData.append('logo', image)

					const organization_id = Cookie.get('organization_id')
					const res = await Axios.post(`organizations/${organization_id}/upload_logo`, formData)

					this.uploading = false
					this.image_logo_medium = res.data.data.logo

					this.uploading = false

				}
				catch (err) {
					alert("Image too large / Not supported format.")
					console.error(err)
					this.uploading = false
				}
			},
			/**
			 * Remove logo
			 */
			async removeLogo () {
				try {
					this.removing = true
					const res = await Axios.delete(`organizations/${orgId}/remove_logo`)
					this.image_logo_medium = null
					this.removing = false
					swal_success(res)
				}
				catch (err) {
					console.error(err)
					this.removing = false
					swal_error(err.response)
				}
			},
		},

	}
</script>

<style scoped>
	.d-flex{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	fieldset {
		margin-top: 20px;
	}

	.show_button > a {
		visibility: hidden;
	}

	.row:hover .show_button > a {
		visibility: visible;
	}

	.btn-link {
		padding: 14px 20px;
		color: #999;
	}

	.btn-link:hover {
		color: #333;
		background: #f0f0f0;
	}

	.contact-row {
		padding: 4px 0;
	}

	.modal-body hr {
		margin: 10px 0;
	}

	.custom-dropzone {
		justify-content: center;
		align-items: center;
		padding: 0;
		position: relative;
		background-color: transparent;
		display: flex;
	}

	.custom-dropzone input[type="file"] {
		opacity: 0;
		border: 1px solid red;
		width: 100%;
		height: 140px;
	}

	.custom-dropzone .message {
		color: #999;
		padding: 20px;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: absolute;
	}
</style>
