<template>
	<div class="sales-order-details">
		<div v-if="loading || !Object.keys(salesOrder).length" style="height: 100vh; display: flex; align-items: center; justify-content: center;">
			<Spinner></Spinner>
		</div>
			<!-- Quick Overview  -->
		<div v-if="!loading && Object.keys(salesOrder).length">
			<div class="row top-detail-row">
				<div class="col-md-12">
					<div class="clearfix m-b-30">
						<h4 class="pull-left page-title m-0 left-detail-title">
							<span style="margin-right:15px" class="SO-id">{{salesOrder.sales_order_number}}</span>
						</h4>
						<div class="pull-right">
						<div class="pull-left" style="margin-right: 10px;">
							<div class="btn-group" role="group">
								<button
									type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top"
									title="View as PDF" @click="viewInvoice"
									><i class="fa fa-file-pdf-o"></i></button>
								<button
									type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top"
									title="Print" @click="viewInvoice"
									><i class="fa fa-print" ></i></button>
								<button
									type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top"
									title="Print Shipping Label" @click="viewShipmentLabels"
									><i class="fa fa-tags" ></i></button>
								<button
									type="button"
									class="btn btn-default"
									data-toggle="tooltip"
									data-placement="top"
									title="Send as mail"
									:disabled="sendingEmail"
									@click="sendInvoiceAsMail"
									>
									<i class="fa fa-envelope-o" v-if="!sendingEmail"></i>
									<i class="fa fa-spin fa-spinner" v-else></i>
								</button>
							</div>
						</div>
						<div class="pull-left" style="margin-right: 10px;">
							<router-link
								:to="{ name: 'sales.edit', param: { id: salesOrderId } }"
								v-if="(salesOrder.invoice_status !== 'VOID') && (salesOrder.invoice_status !== 'PAID')"
								class="btn btn-default waves-effect waves-light m-b-5"
								>Edit
							</router-link>
						</div>
						<div class="dropdown pull-left" style="margin-right: 10px;">
							<button
								class="btn btn-info dropdown-toggle"
								type="button"
								v-if="createablePayment"
								@click="showModalPayment()"
								>
								Record Payment
							</button>
							<button
								class="btn btn-default dropdown-toggle"
								type="button"
								v-if="createableShipment"
								@click="showModalShipment()"
								>
								Create Shipment
							</button>
							<button
								class="btn btn-info dropdown-toggle"
								type="button"
								v-if="salesOrder.invoice_status === 'DRAFT'"
								@click="markAsSentSalesOrder(salesOrder)"
								>
								Convert to Invoice
							</button>
						</div>
						<div class="pull-left" style="margin-right: 10px;">
							<button
								class="btn btn-default dropdown-toggle"
								type="button"
								v-if="(salesOrder.invoice_status == 'UNPAID' || salesOrder.invoice_status == 'OVERDUE')"
								data-toggle="dropdown"
								>
								More
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu dropdown-menu-right more-dropdown" aria-labelledby="dropdownMenu1">
								<li v-if="(salesOrder.invoice_status == 'UNPAID' || salesOrder.invoice_status == 'OVERDUE')">
									<a
										class="clickable"
										@click="cancelSalesOrder(salesOrder)"
										data-toggle="dropdown"
										aria-expanded="false"
										>
										Mark as Void
									</a>
								</li>
							</ul>
						</div>

					</div>
					</div>
				</div>
			</div>
		</div>
			<!-- END Quick Overview          -->

			<!-- Detail Body                 -->
		<div class="row" v-if="!loading && Object.keys(salesOrder).length">
			<div class="col-md-12">
				<ul class="nav nav-tabs navtab-bg nav-justified" style="margin-left: 5px;">
					<li :class="{ tab: true, active: currentTab == 'invoice' }" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;">
						<a @click="switchTab('invoice')">
							<span class="hidden-xs">INVOICE</span>
						</a>
					</li>
					<li :class="{ tab: true, active: currentTab == 'payment' }" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;">
						<a @click="switchTab('payment')">
							<span class="hidden-xs">PAYMENT</span>
						</a>
					</li>
					<li :class="{ tab: true, active: currentTab == 'shipment' }" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;">
						<a @click="switchTab('shipment')">
							<span class="hidden-xs">SHIPMENT</span>
						</a>
					</li>
				</ul>

				<div class="tab-content p-0 tab-content-clear tab-content--contact">
					<div :class="{ 'tab-pane': true, active: currentTab == 'invoice' }" id="invoice" v-if="currentTab == 'invoice'">
						<div class="row p-15" style="padding:20px 15px 15px 15px;">
							<div v-for="(invoice,index) in invoiceList" :key="index">
								<Invoice
									:loadingSOData="loadingSOData"
									:value="invoice"
									:salesOrder="salesOrder"
									:paymentList="paymentList"
									/>
							</div>
						</div>
					</div>

					<div
						id="payment"
						:class="{ 'tab-pane': true, active: currentTab === 'payment'}"
						v-if="currentTab === 'payment'"
					>
						<div class="row p-15">
							<div class="border-1 table-responsive mt-20" v-if="!loadingPayment">
								<table class="table sahito-invoice-table">
									<caption><h3>Payment Receival</h3></caption>
									<thead>
									<tr class="grey-background">
										<th>Date</th>
										<th>Reference</th>
										<th>Payment Mode</th>
										<th class="text-right">Amount</th>
										<th></th>
									</tr>
									</thead>
									<tbody>
									<tr v-show="!paymentList.length > 0">
										<td colspan="5" class="text-muted text-center">No payment received</td>
									</tr>
									<tr v-for="(payment, index) in paymentList" v-show="paymentList.length > 0" :key="index">
										<!-- <td>
											{{payment.payment_id}}
										</td> -->
										<td style="padding: 12px 8px;">
											{{ payment.date | date('short') }}
										</td>
										<td style="padding: 12px 8px;">
											<span class="text-muted">#</span> {{ payment.reference_number }}
										</td>
										<td style="padding: 12px 8px;">
											{{ payment.payment_mode_name }}<span v-if="payment.payment_mode_name !== 'Cash'">:</span>
											{{ payment.payment_account_name }}
										</td>
										<td class="text-right" style="padding: 12px 8px;">
											{{ payment.amount | money }}
										</td>
										<td>
											<div class="clearfix">
												<div class="pull-left">
													<!--<span class="btn btn-default btn-sm" onclick="alert('API not available')" title="Send payment receipt to customer">-->
													<!--<i class="fa fa-envelope"></i>-->
													<!--</span>-->
												</div>
												<div class="pull-right">
													<!-- <a class="btn btn-default btn-sm" title="Edit this payment" @click="updatePayment(payment)"> -->
													<span class="btn btn-default btn-sm" title="Edit this payment" @click="editPayment(payment.payment_id)">
														<!-- <i class="fa fa-pencil"></i> -->
														{{payment.payment_id}}
													</span>
													<span class="btn btn-default btn-sm"
														 title="Delete this payment" @click="deletePayment(payment)">
														<i class="fa fa-trash"></i>
													</span>
												</div>
											</div>
										</td>
									</tr>

									</tbody>
								</table>
							</div>
							<div class="loading-payment" v-if="loadingPayment">
								<Spinner/>
							</div>
						</div>
					</div>

					<div
						:class="{ 'tab-pane': true, active: currentTab == 'shipment' }"
						id="shipment"
						v-if="currentTab == 'shipment'"
						>
						<DetailShipment
							:loadingShipmentData="loadingShipmentData"
							:shipmentList="shipmentList"
							:salesOrder="salesOrder"
							@editShipment="editShipment"
							@deleteShipment="deleteShipment"
							/>
					</div>
				</div>
			</div>
		</div>
		<!-- END Detail Body  -->

		<!-- Payment & Shipment Record Modal -->
		<ModalPayment
			:editPaymentId="editPaymentId"
			v-if="modalPayment"
			:invoiceList="invoiceList"
			@close="closeModalPayment"
		/>
		<ModalShipment
			v-if="modalShipment"
			@close="closeModalShipment"
			:editShipment="formEditShipment"
		/>
		<!-- END Payment & Shipment Record Form Modal -->
	</div>
</template>

<script>
	import Axios from 'axios'
	import {mapState, mapGetters} from 'vuex'
	import Form from '@/helpers/Form'
	import Invoice from '@/components/Sales/Invoice'
	import ModalPayment from './ModalPayment'
	import ModalShipment from './ModalShipment'
	import DetailShipment from './DetailShipment.vue'
	import Spinner from '@/components/Helpers/Spinner'
	import { swal_error, swal_success, responseOk, swal_mapError } from '../../../helpers'
	import swal from 'sweetalert2';


	export default {
		name: 'Detail',

		components: {
			Spinner,
			Invoice,
			ModalShipment,
			ModalPayment,
			DetailShipment,
		},

		data () {
			return {
				packageNotFound: false,
				modalShipment: false,
				modalPayment: false,
				loadingShipmentData: false,
				shipmentList: [],
				invoiceComponent: false,
				loading: false,
				sendingEmail: false,
				currentTab: 'invoice',
				salesOrderId: this.$route.params.id,
				formEditShipment:{},
				editPaymentId: 0,
			}
		},

		computed: {
			...mapState('salesOrders', {
				salesOrder: 'salesOrder',
				invoiceList: 'invoices',
				paymentList: 'payments',
				createPayment: 'createPayment',
			}),
			...mapGetters({
				loadingPayment: 'salesOrders/loadingPayment',
				loadingSOData: 'salesOrders/loadingSOData',
			}),
			createablePayment() {
				if(this.salesOrder){
					return (this.salesOrder.invoice_status !== 'PAID' && this.salesOrder.invoice_status !== 'DRAFT' && this.salesOrder.invoice_status !== 'VOID')?true:false
				}
			},
			createableShipment(){
				if(this.salesOrder){
					return (this.salesOrder.invoice_status !== 'VOID' && this.salesOrder.invoice_status !== 'DRAFT' && this.salesOrder.shipment_status !== 'SHIPPED')?true:false
				}
			}
		},

		async mounted () {
			this.loadDetail()
			this.$store.dispatch('salesOrders/getInvoices', this.salesOrderId)
		},

		watch: {
			$route(to,form){
				this.fetchShipmentData()
				this.fetchPaymentData()
			}
		},

		methods: {
			async viewShipmentLabels() {
				const pdfWindow = window.open()
				const salesOrderId = parseInt(this.$route.params.id)
				const url = window.BASE_URL + `/sales_orders/shipments/bulk-label?ids=` + salesOrderId
				const response = await Axios.get(url, {
					responseType: 'arraybuffer',
					headers: {
						'Content-Type': 'application/pdf',
					},
				})
				const file = new Blob([response.data], {type: 'application/pdf'})
				const fileURL = URL.createObjectURL(file)
				pdfWindow.location = fileURL
			},
			async deletePayment(payment) {
				Alert.confirm({
					title: 'Do you really want to delete this payment?',
					text: 'Delete this payment and your data payment will be lost.',
				}, async () => {
					try {
						const sales_order_id = this.$route.params.id
						const invoice_id = payment.invoice_id
						const payment_id = payment.payment_id
						const url = `sales_orders/${sales_order_id}/invoices/${invoice_id}/payments?ids=${payment_id}`
						const res = await Axios.delete(url)
						if (!responseOk(res.data.code)) {
							return swal_error(res)
						}
						// Refresh payment list data
						this.fetchPaymentData()
						swal_success(res)
					} catch (err) {
						console.error(err)
						if (err.hasOwnProperty('response')) {
							swal_error(err.response)
						}
					}
				})
			},
			markAsSentSalesOrder(salesOrder) {
				Alert.confirm({
					title: 'Are you sure convert to invoice?',
					confirmButtonText: 'Confirm',
				}, async () => {
					const sales_order_id = this.salesOrderId
					const invoice_id =  this.invoiceList[0].invoice_id
					const url = `sales_orders/${sales_order_id}/invoices/${invoice_id}/mark_as_sent`
					const res = await Axios.get(url)
					if (responseOk(res.data.code)) {
						swal({
							title: "Convert to invoice is success.",
							type: 'success',
							timer: 2000,
							showConfirmButton: false,
						})
						this.refreshCurrentSalesOrderData()
						this.$store.dispatch('salesOrders/getList', {})
					} else {
						swal_error(res)
					}
				})
			},
			async refreshCurrentSalesOrderData() {
				const sales_order_id = this.salesOrderId
				this.$store.dispatch('salesOrders/selectSalesOrder', sales_order_id)
			},
			loadDetail(){
				this.loading = true
				this.salesOrderId = this.$route.params.id
				this.$store.dispatch('salesOrders/selectSalesOrder', this.salesOrderId)
					.then(() => {
						this.loading = false
					}).catch(err => {
						this.loading = false
						console.error('error! ', err)
					})
			},
			cancelSalesOrder(salesOrder) {
				Alert.confirm({
					title: 'Are you sure?',
					confirmButtonText: 'Mark as void',
				}, async () => {
					const sales_order_id = this.salesOrderId
					const invoice_id = this.invoiceList[0].invoice_id
					const url = `sales_orders/${sales_order_id}/invoices/${invoice_id}/mark_as_void`
					await Axios.get(url).then(res => {
						if (responseOk(res.data.code)) {
							swal_success(res)
							this.loadDetail()
							this.$store.dispatch('salesOrders/getList', {})
						} else {
							swal_error('Error! ', res)
						}
					}).catch(err => {
						swal_error(err.response)
					})
				})
			},
			closeModalPayment(){
				this.fetchPaymentData()
				this.refreshCurrentSalesOrderData()
				this.modalPayment = false
				console.log('status modalPayment', this.modalPayment)
				$('#payment-modal').modal('hide')
			},
			closeModalShipment(){
				this.fetchShipmentData()
				this.refreshCurrentSalesOrderData()
				this.modalShipment = false
				$('#shipment-modal-add').modal('hide')
			},
			async fetchShipmentData() {
				this.loadingShipmentData = true
				try {
					const sales_order_id = parseInt(this.$route.params.id)
					const res = await Axios.get(`sales_orders/${sales_order_id}/shipments`)
					this.shipmentList = res.data.data
					this.loadingShipmentData = false
				} catch (err) {
					this.loadingShipmentData = false
					console.error(err)
					if (err.hasOwnProperty('response')) {
						swal_error(err.response)
					}
				}
				this.loadingShipmentData = false
			},
			async fetchPaymentData() {
				const sales_order_id = parseInt(this.$route.params.id)
				this.$store.dispatch('salesOrders/getPayments', sales_order_id)
			},
			async deleteShipment() {
				Alert.confirm({
					title: 'Do you really want to delete this shipment?',
					text: 'Deleted this shipment cannot be recovered. Do you still want to continue?',
				}, async () => {
					try {
						const sales_order_id = this.salesOrderId
						this.fetchShipmentData()
						const shipment_ids = []
						this.shipmentList.forEach(item => {
							shipment_ids.push(item.shipment_id)
						})
						const delete_ids = shipment_ids.join(',')
						const url = `sales_orders/${sales_order_id}/shipments?ids=${delete_ids}`
						const res = await Axios.delete(url)
						if(res.data.code == 200){
							this.fetchShipmentData()
							return swal_success(res)
						}else{
							return swal_error(res)
						}
					}catch (err) {
						console.error(err)
						if (err.hasOwnProperty('response')) {
							swal_error(err.response)
						}
					}
				})
			},
			editShipment() {
				try {
					const sales_order_id = this.salesOrderId
					const shipment_id = this.shipmentList[0].shipment_id
					Axios.get(`sales_orders/${sales_order_id}/shipments/${shipment_id}/edit`).then(
						res => {
							this.formEditShipment = res.data.data.shipment
							this.showModalShipment(true)
						}
					).catch(
						err => {
							console.errror(err)
						}
					)
					$('#shipment-modal-edit').modal('show')
				}catch (err) {
					if (err.hasOwnProperty('response')) {
						swal_error(err.response)
					}
				}
			},
			editPayment(paymentId) {
				this.editPaymentId = paymentId
				this.showModalPayment(true)
			},
			switchTab (tabName) {
				this.currentTab = tabName
				if (tabName == 'shipment') {
					this.fetchShipmentData()
				}else if(tabName == 'payment'){
					this.$store.dispatch('salesOrders/getPayments', this.salesOrderId)
				}else {
					this.$store.dispatch('salesOrders/getInvoices', this.salesOrderId)
				}
			},

			async viewInvoice () {
				this.loading = true
				const pdfWindow = window.open()
				const salesOrderId = this.$route.params.id

				const invoiceId = this.invoiceList[0].invoice_id

				const url = window.BASE_URL + `/sales_orders/${salesOrderId}/invoices/${invoiceId}/pdf`

				const response = await Axios.get(url, {
					responseType: 'arraybuffer',
					headers: {
						'Content-Type': 'application/pdf',
					},
				})

				const file = new Blob([response.data], {type: 'application/pdf'})
				const fileURL = URL.createObjectURL(file)
				pdfWindow.location = fileURL
				this.loading = false
			},

			async sendInvoiceAsMail () {
				const sales_order_id = parseInt(this.$route.params.id)
				const invoice_id = parseInt(this.invoiceList[0].invoice_id)
				this.$router.push({name: 'sales.email', params: {sales_order_id, invoice_id}})
			},
			showModalPayment (isEdit) {
				if(isEdit == true){
					this.modalPayment = true
					$('#payment-modal').modal('show')
				}else{
					this.modalPayment = true
					this.editPaymentId = 0
					$('#payment-modal').modal('show')
				}
			},
			showModalShipment(editData) {
				if(editData == true){
					this.modalShipment = true
					$('#shipment-modal-add').modal('show')
				}else{
					this.modalShipment = true
					this.formEditShipment= {}
					let sales_order_id = parseInt(this.$route.params.id)
					this.$store.dispatch('sales/shipment/create', sales_order_id)
					$('#shipment-modal-add').modal('show')
				}

			},

		}
	}
</script>

<style scoped lang="scss">
	.label {
		font-size: 11px;
		vertical-align: middle;
	}

	.nav-tabs > li.active > a,
	.nav-tabs > li.active > a:focus,
	.nav-tabs > li.active > a:hover,
	.tabs-vertical > li.active > a,
	.tabs-vertical > li.active > a:focus,
	.tabs-vertical > li.active > a:hover {
		color: white;
		border-top: 1px solid #03a2cd;
		border-left: 1px solid #03a2cd;
		border-right: 1px solid #03a2cd;
		border-bottom: 1px solid #03a2cd;
	}
	.more-dropdown{
		top:35px
	}
</style>
