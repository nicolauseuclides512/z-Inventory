<template>
	<div class="content-page-full content-wrapper">
		<div v-if="checkedList.length > 0 && !loadingSalesOrders" class="float-CheckOpt">
				<div class="container">
					 <div class="clearfix">
							<div class="pull-left">
								<div class="btn-group">
									<a href="javascript:void(0);" @click="viewBulkInvoice"
										 class="btn btn-default waves-effect waves-light m-b-5">Print Invoice</a>
									<a href="javascript:void(0);" @click="viewShipmentLabels"
										 class="btn btn-default waves-effect waves-light m-b-5">Print Shipment Label</a>
								</div>
						</div>
						<div class="pull-right pt-10">
									<a href="javascript:void(0);" @click="clearCheckedAll">
										<i class="ion-android-close"></i>
									</a>
								</div>
					</div>
			</div>
		</div>
		<div class="content full-width sahito-user bgr-white" style="min-height:620px">
			<div class="container">
				<div class="content-list">
					<div class="container full-width-header p-b-10">
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12 title-wrapper" id="mark_default" v-if="!checkedList.length > 0">

								<a href="javascript:void(0);" class="dropdown-toggle pull-left page-title" data-toggle="dropdown"
									 aria-expanded="false">
									<h4><span>Status: </span> {{ displayedActiveStatus }} <span class="caret"></span></h4>
								</a>

								<ul class="dropdown-menu" role="menu" style="top: 117px;left: 210px;position: fixed;">
									<li class="dropdown-header">FILTER BY</li>
									<li :class="{ active: filter === 'all' }">
										<a href="javascript:void(0);" @click="changeFilter('all')">All</a>
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
									<li :class="{ active: filter === 'void' }">
										<a href="javascript:void(0);" @click="changeFilter('canceled')">Void</a>
									</li>
								</ul>

								<div class="pull-right">
									<router-link :to="{ name: 'sales.create' }" href="javascript:void(0);"
															 class="btn btn-info waves-effect waves-light m-b-5">
										<span>New </span> <i class="ion-plus"></i>
									</router-link>
									<button class="btn btn-default waves-effect waves-light m-b-5" data-toggle="dropdown"
													aria-expanded="false">
										<i class="fa fa-bars"></i></button>
									<ul class="dropdown-menu" role="menu" style="top: 125px;position:  fixed;right: 40px;">
										<li class="dropdown-header">SORT BY</li>
										<li :class="{ active: $route.query.sort ? $route.query.sort.startsWith('created_at') : '' }">
											<a href="javascript:void(0);" @click="changeSorter('created_at.asc')">
												Created Time
											</a>
										</li>
										<li :class="{ active: $route.query.sort ? $route.query.sort.startsWith('updated_at') : '' }">
											<a href="javascript:void(0);" @click="changeSorter('updated_at.desc')">
												Last Modified Time
											</a>
										</li>
										<li :class="{ active: $route.query.sort ? $route.query.sort.startsWith('invoice_date') : '' }">
											<a href="javascript:void(0);" @click="changeSorter('invoice_date.asc')">
												Order Date
											</a>
										</li>
										<li :class="{ active: $route.query.sort ? $route.query.sort.startsWith('sales_order_number') : '' }">
											<a href="javascript:void(0);" @click="changeSorter('sales_order_number.desc')">
												Sales Order Number
											</a>
										</li>
										<li class="divider"></li>
										<li><a href="javascript:void(0);" @click="getList"><i class="md-refresh"></i> Refresh List</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div v-if="loadingSalesOrders" class="loading">
						<Spinner></Spinner>
					</div>
					<div class="empty-list d-flex" v-if="!salesList.length && !loadingSalesOrders">
						<i class="fa fa-5x fa-shopping-cart"></i>
						<span class="little-lead">Sales order data not found.</span>
						<span class="lead">Add your sales order!</span>
						<div class="link-wrap">
							<router-link :to="{ name: 'sales.create' }" href="javascript:void(0);"
													class="btn btn-info waves-effect waves-light m-b-5">
								<i class="ion-plus"></i> <span> Create Sales Order </span>
							</router-link>
						</div>
					</div>
					<div v-if="salesList.length && !loadingSalesOrders"  class="container p-0">
						<div class="row sahito-list">
							<div class="col-md-12">
								<div class="sahito-list-contact table-responsive">
									<div class="table table-hover default-table sahito-list-item-group-list--table">
										<div>
											<div v-if="!salesList.length > 0">
												<div class="text-muted text-center lead" style="padding: 30px 0 10px">No data</div>
											</div>
											<div class="sales-table-wrapper" v-else>
												<table
													class="table table-hover default-table sahito-list-item-group-list--table sahito-sales-order-table">
													<thead class="table-header-style">
													<tr>
														<th class="col-checkbox head-check">
															<div class="checkbox checkbox-single checkbox-success">
																<input type="checkbox" v-model="checkedAll" id="all" @click="checkAll">
																<label></label>
															</div>
														</th>
														<th id="icon_collapse" style="padding-top:  15px;padding-bottom:  15px;">
															<div class="placeholder-collapse"></div>
														</th>
														<th style="font-weight:400; padding-top:8px; padding-bottom:8px; font-size: 1.1em; color:#000">Date</th>
														<th style="font-weight:400; padding-top:8px; padding-bottom:8px; font-size: 1.1em;color:#000; width:100px">Order#</th>
														<th class="text-left" style="font-weight:400;padding-top:8px; padding-bottom:8px; font-size: 1.1em;color:#000">Channel</th>
														<th style="font-weight:400; padding-top:8px; padding-bottom:8px; font-size: 1.1em;width: 20%;color:#000">Customer</th>
														<th class="text-left" style="font-weight:400; padding-top:8px; padding-bottom:8px; font-size: 1.1em;color:#000">Total</th>
														<th class="payment-status" style="font-weight:400; padding-top:8px; padding-bottom:8px; font-size: 1.1em;color:#000; width: 106px;">Payment</th>
														<th class="shipment-status text-left" style="font-weight:400; padding-top:8px; padding-bottom:8px; font-size: 1.1em;color:#000; width:100px">Shipment</th>
														<th class="shipment-status" style="font-weight:400; padding-top:8px; padding-bottom:8px; font-size: 1.1em;color:#000; min-width: 146px;">Status</th>
														<th style="width:37px"></th>
													</tr>
													</thead>
													<tbody>
													<template v-for="(sale,i) in salesList" >
														<tr :key="i+'a2'">
															<td class="col-checkbox">
																<div class="checkbox checkbox-single checkbox-success" style="top:4px">
																	<input type="checkbox" v-model="checkedList" :value="sale">
																	<label></label>
																</div>
															</td>
															<td>
																<a href="javascript:void(0);" @click="overviewToggle(sale.sales_order_id)">
																	<i v-if="overview.sales_order_id === sale.sales_order_id"
																		 class="ion-minus-round text-green"></i>
																	<i v-else="" class="ion-plus-round text-green"></i>
																</a>
															</td>
															<td style="cursor: pointer;" @click="showDetail(sale)">
																{{ sale.invoice_date | date('short') }}
															</td>
															<td style="cursor: pointer; font-size: 13px" @click="showDetail(sale)">
																{{ sale.sales_order_number }}
															</td>
															<td class="text-left" style="cursor: pointer; font-size: 1.05em" @click="showDetail(sale)">
																	 {{ (sale.my_sales_channel && sale.my_sales_channel.sales_channel && sale.my_sales_channel.sales_channel.channel_name )?sale.my_sales_channel.sales_channel.channel_name:'-' }}
															</td>
															<td class="text-left" @click="showDetail(sale)" style="cursor:pointer; font-size: 1.05em">
																	{{ sale.contact.display_name }}
															</td>
															<td class="text-left" style="cursor: pointer;" @click="showDetail(sale)">{{ sale.total | money }}</td>
															<td class="shipment-status" style="font-size: 1.05em !important; cursor:pointer" @click="showDetail(sale)">
																	<span v-if="sale.invoice_status === 'DRAFT' || sale.invoice_status === 'VOID'">
																		-
																	</span>
																	<span v-else :class="{
																		'status status-wait-ship': sale.sales_order_status ==='AWAITING_SHIPMENT',
																		'status status-wait-pay': sale.sales_order_status ==='AWAITING_PAYMENT',
																		'status status-info': sale.sales_order_status ==='FULFILLED'
																	}">
																		{{sale.invoice_status | normalizeStatus}}
																	</span>
																</td>
															<td class="shipment-status text-center" style="font-weight:400; font-size: 1.05em!important ;color:#000; cursor:pointer; padding-left:15px" @click="showDetail(sale)">
																<div v-if="sale.shipment_date" style="width:50px">
																	<span><i class="fa fa-circle status status-default" style="font-size:12px"></i></span>
																</div>
																<div v-else style="width:50px">
																	<span><i class="fa fa-circle-thin" style="color:#ddd; font-size:12px"></i></span>
																</div>
																</td>
															<td class="payment-status" style="cursor: pointer; width:126px;" @click="showDetail(sale)">
																<span class="status status-default" v-if="sale.sales_order_status === 'DRAFT'">Open</span>
																<span class="status status-void" v-else-if="sale.sales_order_status === 'CANCELED'">Void</span>
																<span class="status status-wait-ship" v-else-if="sale.sales_order_status === 'AWAITING_SHIPMENT'">{{ sale.sales_order_status | normalizeStatus }}</span>
																<span class="status status-wait-pay" v-else-if="sale.sales_order_status === 'AWAITING_PAYMENT'">{{ sale.sales_order_status | normalizeStatus }}</span>
																<span class="status status-info" v-else>{{ sale.sales_order_status | normalizeStatus }}</span>
															</td>
															<td class="text-center">
																<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"
																	 aria-expanded="false">
																	<span class="ion-ios7-more-outline" style="color:#03a2cd; font-size:1.5em; padding:px"></span>
																</a>
																<ul class="dropdown-menu" role="menu" style="right: 40px;left: initial;top: initial;">
																	<li v-if="sale.invoice_status !== 'VOID' && sale.invoice_status !== 'PAID'">
																		<router-link :to="{ name: 'sales.edit', params: { id: sale.sales_order_id } }"
																								 href="javascript:void(0)">
																			Edit
																		</router-link>
																	</li>
																	<li v-if="(sale.invoice_status === 'UNPAID' || 'OVERDUE'|| 'DRAFT') && sale.sales_order_status !== 'DRAFT' && sale.invoice_status !== 'VOID' && sale.invoice_status !== 'PAID'">
																		<a href="javascript:void(0);" @click="gotoDetailPayment(sale)">
																			Record Payment
																		</a>
																	</li>
																	<li v-if="(sale.invoice_status === 'PAID'||'UNPAID' ||'OVERDUE') && sale.invoice_status !== 'DRAFT' && sale.invoice_status !== 'VOID' && sale.shipment_status !== 'SHIPPED'">
																		<a href="javascript:void(0);" @click="gotoDetailPayment(sale)">
																			Create Shipment
																		</a>
																	</li>
																	<li>
																		<a v-if="sale.invoice_status == 'DRAFT'" href="javascript:void(0);" @click="markAsSentSalesOrder(sale.sales_order_id)">
																			Convert to Invoice
																		</a>
																	</li>
																	<li>
																		<a href="javascript:void(0);" @click="downloadInvoice(sale.sales_order_id)">
																			Print Invoice
																		</a>
																	</li>
																	<li v-if="sale.sales_order_status !== 'DRAFT'">
																		<a href="javascript:void(0);" @click="printShipmentLabel(sale.sales_order_id)">
																			Print Shipment Label
																		</a>
																	</li>
																</ul>
															</td>
														</tr>
														<tr :key="i">
															<td colspan="11" class="p-0 bt-0">
																<table v-if="overview.sales_order_id === sale.sales_order_id"
																			 class="table sales-order-inner-table">
																	<tbody>
																	<tr>
																		<td class="col-checkbox">
																		</td>
																		<td style="width: 220px; vertical-align: top; border-right: 1px solid rgb(222, 222, 222);">
																			<div v-if="sale.contact" style="margin-top:12px">
                                        <table class="table sales-order-inner-table">
																					<thead>
                                            <tr class="inner-tr">
                                              <th class="text-right" style="border: none !important; color:#000000; font-size: 1em; font-weight:400; background-color:#eee;">
                                                <router-link :to="{ name: 'contact.edit', params: {id: sale.contact.contact_id } }" >
                                                  &nbsp; {{ sale.contact.display_name }}
                                                </router-link>
                                              </th>
                                            <tr class="inner-tr">
                                              <td style="border: none !important; color:#000000; font-size: 1em; font-weight:400; background-color:#eee;">
                                                <router-link :to="{ name: 'contact.edit', params: {id: sale.contact.contact_id } }" >
                                                  &nbsp; {{ sale.contact.phone }}
                                                </router-link>
                                              </td>
                                            <tr class="inner-tr">
                                              <td style="color:#000000; font-size: 1em; font-weight:400; background-color:#eee;">
                                                <router-link :to="{ name: 'contact.edit', params: {id: sale.contact.contact_id } }" >
                                                  &nbsp; {{ sale.contact.email }}
                                                </router-link>
                                              </td>
                                            </tr>
																					</thead>
																					<tbody>
																					<tr>
																						<td class="text-left" style="font-size: 1em;">Payment</td>
																					</tr>
																					<tr>
																						<td class="text-left" style="font-size: 1em;">Shipment</td>
																					</tr>
																					</tbody>
                                        </table>
																			</div>
																			<div v-else><span class="text-muted">&mdash;</span></div>
																		</td>
																		<td rowspan="3">
																			<div class="border-1 table-responsive">
																				<table class="table sales-order-inner-table">
																					<thead>
																					<tr class="inner-tr">
																						<th style="color:#000000; width: 330px; font-size: 1em; font-weight:400; background-color:#eee; padding-top: 12px; padding-bottom: 10px">Item</th>
																						<th style="color:#000000; width: 127px; font-size: 1em; font-weight:400; background-color:#eee; padding-top: 12px; padding-bottom: 10px">Qty</th>
																						<th style="color:#000000; width: 114px; font-size: 1em; font-weight:400; background-color:#eee; padding-top: 12px; padding-bottom: 10px">Price</th>
																						<th class="text-left" style="color:#000000; width: 109px; font-size: 1em; font-weight:400; background-color:#eee; padding-top: 12px; padding-bottom: 10px"> Disc</th>
																						<th class="text-right" style="color:#000000; width: 196px; font-size: 1em; font-weight:400; background-color:#eee; padding-top: 12px; padding-bottom: 10px"> Amount </th>
																					</tr>
																					</thead>
																					<tbody>
																					<tr v-for="(order,i) in orderListSO" :key="i">
																						<td class="text-left" style="font-size: 1em;">{{ order.item_name }}</td>
																						<td class="text-left" style="font-size: 1em;">
																							<p class="qty-amount">{{ order.item_quantity }} {{ order.uom }}</p>
																						</td>
																						<td class="text-left" style="font-size: 1em;">{{ order.item_rate | money }}</td>
																						<td class="text-left" style="font-size: 1em;">
																							<span v-if="order.discount_amount_type === 'fixed'">{{ Number(order.discount_amount_value) | money}}</span>
																							<span v-if="order.discount_amount_type === 'percentage'">{{ Number(order.discount_amount_value) }}%</span>
																						</td>
																						<td class="text-right" style="font-size: 1em;">
																							<span class="pull-left">Rp</span>
																							{{ order.amount | moneyNoCurrency }}
																						</td>
																					</tr>
																					<tr class="sub-total">
																						<td class="transfer-detail" colspan="3" style="text-align:left; border-top: 1px solid #dedede"></td>
																						<td colspan="1" style="font-size: 1em; border-top: 1px solid #dedede">Sub Total</td>
																						<td class="text-right" style="font-size: 1em; border-top: 1px solid #dedede">
																							<span class="pull-left">Rp</span>
																							{{ overview.sub_total | moneyNoCurrency }}
																						</td>
																					</tr>
																					<tr class="sub-total">
																						<td colspan="3" class="shipment-detail" style="text-align:left !important"> 22 May 2018, Transfer Bank BCA(static, waiting data from backend)</td>
																						<td colspan="1" style="font-size: 1em;">
                                              <span v-if="sale.invoices[0].shipping_rate > 0" class="kapspul">
                                                {{ sale.invoices[0].shipping_carrier_name || 'Adjustment' }}
                                              </span>&nbsp;
																						</td>
																						<td class="text-right" style="font-size: 1em;">
                                              <span v-if="sale.invoices[0].shipping_rate > 0" class="kapspul">
                                                <span class="pull-left">Rp</span>
                                                {{Number(sale.invoices[0].shipping_rate) | moneyNoCurrency }}
                                              </span>&nbsp;
																						</td>
																					</tr>
																					<tr class="sub-total">
																						<td colspan="3" style="text-align:left !important">{{overview.shipment_date | showShortDate}} - 98767696969</td>
																						<td colspan="1" style="font-size: 1em;">
                                              <span v-if="sale.invoices[0].adjustment_value > 0" class="kapspul">
                                                {{ sale.invoices[0].adjustment_name || 'Adjustment' }}
                                              </span>
																						</td>
																						<td class="text-right" style="font-size: 1em;">
                                              <span v-if="sale.invoices[0].adjustment_value > 0" class="kapspul">
                                                <span class="pull-left">Rp</span>
                                                {{Number(sale.invoices[0].adjustment_value) | moneyNoCurrency }}
                                              </span>&nbsp;
																						</td>
																					</tr>
																					<tr v-if="overview.tax > 0" class="sub-total">
																						<td colspan="3" >
																						<td style="font-size: 1em;">Tax</td>
																						<td class="text-right" style="font-size: 1em;">
																							<span v-if="overview.tax === -1">Included</span>
																							<span v-else>
																								<span class="pull-left">Rp</span>
																								{{ overview.tax | moneyNoCurrency }}
																							</span>
																						</td>
																					</tr>
																					<tr class="balance-due">
																						<td colspan="3" ></td>
																						<td class="text-bold" style="background-color:#e5e5e5; font-size: 1em;">Total
																						</td>
																						<td class="text-right text-bold"
																								style="background-color:#e5e5e5; font-color: #000000; font-size: 1em;">
																								<span class="pull-left">Rp</span>
																								{{overview.total | moneyNoCurrency }}
																						</td>
																					</tr>
																					</tbody>
																				</table>
																			</div>
																		</td>
																	</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</template>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-12 pr-20 text-right">
								<JustPaginate :paginate="paginate"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import difference_in_days from 'date-fns/difference_in_days'
	import store from 'src/store'
	import {getParameterByName, responseOk,swal_error} from 'src/helpers'
	import Spinner from '@/components/Helpers/Spinner'
	import {mapGetters, mapActions} from 'vuex'
	import { format } from 'date-fns'
	import swal from 'sweetalert2'
	export default {
		name: 'List',
		filters: {
			showShortDate(date) {
				return format(date, 'DD MMM YYYY')
			},
			normalizeStatus(text) {
				return text.replace(/_/gi, ' ').toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())
			},
			diffInDays(date) {
				return difference_in_days(new Date(), date)
			},
		},
		data() {
			return {
				currentFilter: 'all',
				currentSortColumn: "created_at",
				checkedAll: false
			}
		},

		components: {
			JustPaginate: () => import('@/components/JustPaginate.vue'),
			Spinner,
    },

		watch: {
			$route(to, from) {
				if (!_.isEqual(to.query,from.query)) {
					this.getList(to.query)
				}
			},
		},

		mounted() {
			this.getList({
				filter: this.$route.query.filter || 'all',
				sort: this.$route.query.sort || 'created_at.desc',
				q: this.$route.query.q || '',
				page: this.$route.query.page || '1',
				per_page: this.$route.query.per_page || '60'
			})
		},

		computed: {
			displayedActiveStatus(){
				return ((this.$route.query.filter == 'canceled')?'Void':(this.$route.query.filter == 'draft')?'Open':(this.$route.query.filter)?this.$route.query.filter.replace(/_/g," "):'All')
			},
			filter: {
				get() {
					return store.state.sales.filter
				},
				set(value) {
					store.commit('sales/FILTER', value)
				},
			},
			sort: {
				get() {
					return store.state.sales.sort
				},
				set(value) {
					store.commit('sales/SORT', value)
				},
			},
			overview: {
				get() {
					return store.state.sales.overview
				},
				set(value) {
					store.commit('sales/OVERVIEW', value)
				},
			},
			...mapGetters({
        orderListSO: 'sales/orderListSO',
				loadingSalesOrders: 'sales/loadingSalesList',
			}),
			checkedList: {
				get() {
					return store.state.sales.checkedList
				},
				set(value) {
					store.commit('sales/CHECKED_LIST', value)
				},
			},

			salesList: {
				get() {
					return _.map(store.state.sales.salesList, function (sale) {
						sale.checked = false
						return sale;
					})
				},
				set(value) {
					store.commit('sales/SALES_LIST')
				},
			},
			paginate: {
				get() {
					return store.state.sales.paginate
				},
				set(value) {
					store.commit('sales/PAGINATE', value)
				},
			},

		},

		methods: {
			...mapActions({
				getList: 'sales/getList',
				overviewToggle: 'sales/overviewToggle',
				invoiceList: 'sales/invoiceList',
				markItemAsChecked:'sales/markItemAsChecked',
				markitemAsUnChecked:'sales/markitemAsUnChecked',
				clearAllCheckedItems:'sales/clearAllCheckedItems',
			}),

			changeFilter(options = {}) {
				this.$router.push({
					query: {
						...this.$route.query,
						page: 1,
						filter: options || this.currentFilter || 'all',

					},
				})
				this.currentFilter = options.filter
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


		newChangeSorter(sort) {
			this.currentSortColumn = sort
			this.ascendingSort = !this.ascendingSort
			let ascendingSort
			if (this.ascendingSort) {
				ascendingSort = 'asc'
			} else {
				ascendingSort = 'desc'
			}
			this.$router.push({
				query: {
					...this.$route.query,
					page: 1,
					filter: this.filter,
					sort: sort+'.'+ascendingSort,
				},
			})
		},

			/**
			 * Show detail of sales order
			 */
			showDetail(item) {
				this.$router.push({
					name: 'sales.detail',
					params: {
						id: item.sales_order_id,
					},
				})
			},

			printInvoice(sales_order_id: number) {
				axios.get(`sales_orders/${sales_order_id}/invoices`).then(res => {
					res.data.data.forEach(invoice => {
						window.open(`sales_orders/${sales_order_id}/invoices/` + invoice.invoice_id)
					})
				}).catch(err => {
					swal_error(err.response)
				})
			},

			async printShipmentLabel(sales_order_id: number) {
				const pdfWindow = window.open()
				const url = window.BASE_URL + `/sales_orders/shipments/bulk-label?ids=` + sales_order_id

				const response = await axios.get(url, {
					responseType: 'arraybuffer',
					headers: {
						'Content-Type': 'application/pdf',
					},
				})

				const file = new Blob([response.data], {type: 'application/pdf'})
				const fileURL = URL.createObjectURL(file)
				pdfWindow.location = fileURL
			},

			async downloadInvoice(sales_order_id) {
				const pdfWindow = window.open()

				await this.invoiceList(parseInt(sales_order_id))
				const invoice_id = store.state.sales.invoiceList[0].invoice_id

				const url = window.BASE_URL + `/sales_orders/${sales_order_id}/invoices/${invoice_id}/pdf`

				const response = await axios.get(url, {
					responseType: 'arraybuffer',
					headers: {
						'Content-Type': 'application/pdf',
					},
				})

				const file = new Blob([response.data], {type: 'application/pdf'})
				const fileURL = URL.createObjectURL(file)
				pdfWindow.location = fileURL
			},

			async viewShipmentLabels() {
				let me = this;

				let soId = _.map(me.checkedList, function (o) {
					return o.sales_order_id
				})

				const pdfWindow = window.open()

				const url = window.BASE_URL + `/sales_orders/shipments/bulk-label?ids=` + soId.join()

				const response = await axios.get(url, {
					responseType: 'arraybuffer',
					headers: {
						'Content-Type': 'application/pdf',
					},
				})

				const file = new Blob([response.data], {type: 'application/pdf'})
				const fileURL = URL.createObjectURL(file)
				pdfWindow.location = fileURL
			},
			async viewBulkInvoice() {

				let ids = _.map(this.checkedList, function (so) {
					return so.sales_order_id
				})

				const pdfWindow = window.open()
				const url = window.BASE_URL + `/sales_orders/invoices/bulk-pdf?ids=${ids.join()}`

				const response = await axios.get(url, {
					responseType: 'arraybuffer',
					headers: {
						'Content-Type': 'application/pdf',
					},
				})

				const file = new Blob([response.data], {type: 'application/pdf'})
				const fileURL = URL.createObjectURL(file)
				pdfWindow.location = fileURL
			},

			checkItem(sale) {
				let me = this;
				sale.checked = !sale.checked

				if (sale.checked === true) {
					this.markItemAsChecked(sale)
					console.info(1)
				} else if (sale.checked === false) {
					this.markitemAsUnChecked(sale)
					console.info(0)
				}

				this.checkedAll = false;
			},
			checkAll(evt) {
				if (!this.checkedAll) {
					_.each(this.salesList, item => {
						item.checked = true
						this.markItemAsChecked(item)
					})
				} else {
					_.each(this.salesList, item => {
						item.checked = false
						this.$store.dispatch('sales/markItemAsUnChecked',item)
					})
					this.clearCheckedAll()
				}
			},
			clearCheckedAll() {
				this.checkedAll = false
				_.each(this.salesList, item => {
					item.checked = false
					this.$store.dispatch('sales/markItemAsUnChecked',item)
				})
				this.clearAllCheckedItems()
			},

			updatePagination(data) {
				console.log(data)
				store.commit('sales/PAGINATE', data.paginate)
			},

			gotoDetailPayment(sale) {
				const routeOptions = {
					name: 'sales.detail',
					params: {id: sale.sales_order_id},
					query: {state: 'pay'},
				}
				this.$router.push(routeOptions)
			},

			gotoDetailShipment(sale) {
				const routeOptions = {
					name: 'sales.detail',
					params: {id: sale.sales_order_id},
					query: {state: 'shipment'},
				}
				this.$router.push(routeOptions)
			},
			async markAsSentSalesOrder(sales_order_id) {
				Alert.confirm({
					title: 'Are you sure convert to invoice?',
					confirmButtonText: 'Confirm',
				}, async () => {
					await this.invoiceList(parseInt(sales_order_id))
					const invoice_id = store.state.sales.invoiceList[0].invoice_id
					const url = `sales_orders/${sales_order_id}/invoices/${invoice_id}/mark_as_sent`
					const res = await axios.get(url)
					if (responseOk(res.data.code)) {
						swal({
							title: "Convert to invoice is success.",
							type: 'success',
							timer: 2000,
							showConfirmButton: false,
						})
						this.getList()
					} else {
						swal_error(res)
					}
				})
			},

		},
	}
</script>

<style lang="scss" scoped>
td.shipment-status {
	font-size: 17px !important;
}
.label-void {
	background: black;
}
.label{
	text-transform: capitalize;
}
.content-wrapper{
	padding:0px
}
.head-check{
	padding-left:5px;
}
.title-wrapper{
	padding-left: 0px;
	padding-right: 0px;
}
.table-header-style{
	box-shadow: rgb(221, 221, 221) 0 4px 2px -2px;
	border-top: 1px solid #ddd
}
.status{
	&.status-danger{
			color: #ef5350;
	}
	&.status-default{
			color: #777;
	}
	&.status-void{
			color: #000;
	}
	&.status-info{
			color: #2FA3E6;
	}
	&.status-wait-ship{
		color: #009933;
	}
	&.status-wait-pay{
		color: #ffc100;
	}
}
span.page-info {
	margin: 0 5px;
}
.empty-list {
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin-bottom: 30px;
	color: darkgrey;
	.little-lead {
		font-size: 18px;
		line-height: 20px;
		margin: 40px auto 10px auto;
	}
	.lead {
		font-size: 21px;
		line-height: 20px;
		margin-bottom: 30px;
	}
}
</style>