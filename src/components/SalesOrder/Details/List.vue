<template>
	<div class="sales-order-list-left-side">
		<div class="clearfix" v-if="!checkedList.length > 0">
			<div class="pull-left">
				<a href="javascript:void(0);" class="dropdown-toggle page-title" data-toggle="dropdown">
					<h4 class="text-capitalize">{{ displayedActiveFilter }} <span class="caret"></span></h4>
				</a>
				<ul class="dropdown-menu" role="menu" style="top: 35px;">
					<li class="dropdown-header">FILTER BY</li>
					<li :class="{ active: filter === 'all' }">
						<a href="javascript:void(0);" @click="changeFilter('all')">All
						</a>
					</li>
					<li class="divider"></li>
					<li :class="{ active: filter === 'draft' }">
						<a href="javascript:void(0);" @click="changeFilter('draft')">Open</a>
					</li>
					<li :class="{ active: filter === 'paid' }">
						<a href="javascript:void(0);" @click="changeFilter('awaiting_payment')">Awaiting Payment</a>
					</li>
					<li :class="{ active: filter === 'unpaid' }">
						<a href="javascript:void(0);" @click="changeFilter('awaiting_shipment')">Awaiting Shipment</a>
					</li>
					<li :class="{ active: filter === 'partially_paid' }">
						<a href="javascript:void(0);" @click="changeFilter('fulfilled')">Fulfilled</a>
					</li>
					<!-- <li :class="{ active: filter === 'overdue' }">
						<a href="javascript:void(0);" @click="changeFilter('overdue')">Overdue</a>
					</li> -->
					<li :class="{ active: filter === 'void' }">
						<a href="javascript:void(0);" @click="changeFilter('canceled')">Void</a>
					</li>
				</ul>
			</div>
			<div class="pull-right">
				<router-link :to="{ name: 'sales.create' }" class="btn btn-info waves-effect waves-light mb-15 btn-new">
					<i class="ion-plus"></i> New
				</router-link>
				<button class="btn btn-default waves-effect waves-light mb-15" data-toggle="dropdown">
					<i class="fa fa-bars"></i>
				</button>
				<ul class="dropdown-menu" role="menu" style="top: 35px;">
					<li class="dropdown-header">SORT BY</li>
					<li :class="{ active: sort.startsWith('created_at') }">
						<a href="javascript:void(0);" @click="changeSorter('created_at.asc')">Created Time</a>
					</li>
					<li :class="{ active: sort.startsWith('updated_at') }">
						<a href="javascript:void(0);" @click="changeSorter('updated_at.asc')">Last Modified Time</a>
					</li>
					<li :class="{ active: sort.startsWith('order_date') }">
						<a href="javascript:void(0);" @click="changeSorter('order_date.asc')">Date</a></li>
					<li :class="{ active: sort.startsWith('invoice_number') }">
						<a href="javascript:void(0);" @click="changeSorter('invoice_number.asc')">Invoice#</a></li>
					<li class="divider"></li>
					<li><a href="javascript:void(0);"><i class="md-refresh"></i> Refresh List</a></li>
				</ul>
			</div>
		</div>
		<div class="clearfix" v-if="checkedList.length > 0">
			<div class="pull-left">
				<a href="javascript:void(0);" @click="viewBulkInvoice" class="btn btn-default waves-effect waves-light mb-15">
					Print Invoice
				</a>
				<a href="javascript:void(0);" @click="viewShipmentLabels"
					 class="btn btn-default waves-effect waves-light mb-15">
					Print Shipment Labels
				</a>
			</div>
			<div class="pull-right pt-10 pr-15">
				<a href="javascript:void(0);" @click="clearCheckedAll">
					<i class="ion-android-close"></i>
				</a>
			</div>
		</div>
		<div class="min-80vh">
			<Spinner v-if="loadingSOList"/>
			<table class="table" v-if="!loadingSOList">
				<tr v-for="salesOrder in salesOrderList" :key="salesOrder.sales_order_id" :class="{active: parseInt(salesOrder.sales_order_id) === parseInt($route.params.id)}">
					<td width="1%" @click="addCheck">
						<div class="checkbox checkbox-single checkbox-success">
							<input
								type="checkbox"
								:title="salesOrder.sales_order_id"
								v-model="checkedList"
								:value="salesOrder.sales_order_id"
							/>
							<label></label>
						</div>
					</td>
					<td @click="showDetail(salesOrder)">
						<div class="clearfix">
							<div class="pull-left">
								<span style="font-size: 1.1em">{{ salesOrder.contact.display_name }}</span>
							</div>
							<div class="pull-right">
								<span>{{ salesOrder.total | money }}</span>
							</div>
						</div>
						<div class="clearfix">
							<div class="pull-left">
								<div class="text-muted">{{ salesOrder.sales_order_number }} | {{ salesOrder.invoice_date | date('short') }}</div>
							</div>
							<div class="pull-right payment-status">
								<!-- <span class="label label-danger" v-if="salesOrder.is_overdue" :title="salesOrder.due_date | date('short')">Overdue in {{ salesOrder.due_date | diffInDays }} day(s)</span> -->
								<span class="label label-default" v-if="salesOrder.sales_order_status === 'DRAFT'">Open</span>
								<span class="label label-void" v-else-if="salesOrder.sales_order_status === 'CANCELED'">Void</span>
								<span class="label label-wait-ship" v-else-if="salesOrder.sales_order_status === 'AWAITING_SHIPMENT'">{{ salesOrder.sales_order_status | normalizeStatus }}</span>
								<span class="label label-wait-pay" v-else-if="salesOrder.sales_order_status === 'AWAITING_PAYMENT'">{{ salesOrder.sales_order_status | normalizeStatus }}</span>
								<span class="label label-info" v-else>{{ salesOrder.sales_order_status | normalizeStatus }}</span>
							</div>
						</div>
						<!-- <div class="clearfix">
							<div class="pull-left"><span class="text-muted">{{ salesOrder.invoice_date | date('short') }}</span></div>
							<div class="pull-right shipment-status label" :class="{'label-info': salesOrder.shipment_status == 'NOT_YET_SHIPPED'}">
								{{ salesOrder.shipment_status | normalizeStatus }}
							</div>
						</div> -->
					</td>
				</tr>
			</table>
		</div>
		<div class="row">
			<JustPaginate :paginate="paginate"/>
		</div>
	</div>

</template>

<script>
	import Axios from 'axios'
	import difference_in_days from 'date-fns/difference_in_days'
	import Form from '@/helpers/Form'
	import {mapState, mapGetters} from 'vuex'
	import Pagination from '@/components/Pagination'

	export default {
		name: 'List',

		components: {
			Pagination,
			JustPaginate: () => import('@/components/JustPaginate'),
			Spinner: () => import('@/components/Helpers/Spinner')
		},

		filters: {
			normalizeStatus(text) {
				return text.replace(/_/gi, ' ').toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())
			},
			diffInDays(date) {
				return difference_in_days(new Date(), date)
			}
		},

		data () {
			return {
				loaded: false,
				page_context: {},
				checkedList: [],
				filter: 'all',
				sort: 'created_at.desc',
			}
		},

		watch: {
			'$route.query'(to, from) {
				if (to) {
					this.getList(to)
				} else {
					this.getList(form)
				}
			},
		},

		computed: {
			displayedActiveFilter(){
				return ((this.$route.query.filter == 'canceled')?'Void':(this.$route.query.filter == 'draft')?'Open':(this.$route.query.filter)?this.$route.query.filter.replace(/_/g," "):'All')
			},
			...mapState('salesOrders', [
				'salesOrderList',
				'salesOrder',
			]),
			...mapGetters('salesOrders',[
				'paginate',
				'loadingSOList'
			]),
		},

		async mounted () {
			this.getList()
		},

		methods: {
			changeFilter(filter){
				this.$router.push({
					query: {
						...this.$route.query,
						page: 1,
						filter: filter
					}
				})
			},
			changeSorter(sort) {
				this.$router.push({
					query: {
						...this.$route.query,
						page: 1,
						sort: sort,
					},
				})
			},
			async getList (options = {}) {
				this.$store.dispatch('salesOrders/getList', options)
			},
			showDetail (salesOrder) {
				this.$emit('selectSalesOrder', salesOrder.sales_order_id)
			},
			async viewBulkInvoice () {
				let ids = this.checkedList
				const pdfWindow = window.open()
				const url = window.BASE_URL + `/sales_orders/invoices/bulk-pdf?ids=${ids.join()}`
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
			async viewShipmentLabels () {
				let soId = this.checkedList
				const pdfWindow = window.open()
				const url = window.BASE_URL + `/sales_orders/shipments/bulk-label?ids=` + soId.join()
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
			printInvoice () {
				const iframePrint = document.getElementById('iframe-print')
				iframePrint.src = 'http://sahito.ontelstudio.com:9000/invoices/pdf'
				iframePrint.contentWindow.document.domain = window.HOSTNAME
				iframePrint.contentWindow.print()
			},
			clearCheckedAll () {
				this.checkedList = []
			},
			addCheck ($event) {
				$($event.target).find('input').trigger('click')
			},
		}
	}
</script>

<style scoped lang="scss">
	hr{
		margin: 10px 0;
	}
	table tr td{
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		padding: 10px 0;
	}
	table tr:hover td{
		cursor: pointer;
		background: #f6f6f6;
	}
	table tr:hover td:first-child{
		border-left: 2px solid #3fb8e6;
	}
	table tr td:first-child{
		padding-left: 10px;
		border-left: 2px solid transparent;
	}
	table tr.active td{
		background: #f9f9f9;
	}
	table tr.active:hover td{
		background: #f6f6f6;
	}
	table tr.active td:first-child{
		border-left: 2px solid #2FA3E6;
	}
	table tr td:last-child{
		padding-right: 10px;
	}
	.shipment-status.label{
		line-height: 17px;
		margin-top: 5px;
		padding: 0 5px;
	}
	.label{
		text-transform: capitalize;
	}
	.btn-new{
		width:80px;
	}
	.label{
		display: inline-block;
		padding: .2em .6em .3em;
		font-size: 75%;
		font-weight: 700;
		line-height: 1;
		background-color: transparent;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: .5em;
		min-width: 110px;
		&.label-danger{
			color: #ef5350;
			border: 1.5px solid #ef5350;
		}
		&.label-default{
			color: #777;
			border: 1.5px solid #777;
		}
		&.label-void{
				background-color: #444 !important;
				color: #fff;
				border: 1.5px solid #444;
		}
		&.label-info{
			color: #2FA3E6;
			border: 1.5px solid #2FA3E6;
		}
		&.label-wait-ship{
			color: #009933;
			border: 1.5px solid #009933;
		}
		&.label-wait-pay{
			color: #ffc100;
			border: 1.5px solid #ffc100;
		}
	}
</style>
