<template>
	<fieldset>
				<div class="panel panel-default">
						<div class="panel-body">
								<div class="row">
										<div class="col-md-12 col-sm-12 col-xs-12">
												<div id="report-contacts">
														<div v-if="items.length > 0">
																<table class="table">
																		<thead>
																				<tr class="header-row">
																						<th style=" width: 80%;" class="text-left display-name">Customer Name</th>
																						<th class="amount text-left">Amount</th>
																				</tr>
																		</thead>
																		<tbody class="content-table">
																				<tr v-for="(item, idx) in items" :key="idx">
																						<td style=" width: 80%;" lass="text-left display-name">{{ item.customer_name }}</td>
																						<td class="amount  text-right"><span class="pull-left">Rp</span>{{ item.sales_amount | moneyNoCurrency }}</td>
																				</tr>
																				<tr>
																						<td style=" width: 80%;" class="text-left row-total">Total</td>
																						<td class="row-total  text-right"><span class="pull-left">Rp</span>{{ total | moneyNoCurrency }}</td>
																				</tr>
																		</tbody>
																</table>
														</div>
														<div v-else>
																<div class="lead text-center text-muted">No data</div>
														</div>
												</div>
										</div>
								</div>
						</div>
				</div>
	</fieldset>
</template>

<script>
	import Axios from 'axios';

	export default {
		name: 'Contacts',

		props: ['start_date', 'end_date'],

		watch: {
			start_date() {
				this.getCustomerReport();
			},
			end_date() {
				this.getCustomerReport();
			}
		},
		// components:{
		// 	JustPaginate: ()=> import('@/components/JustPaginate')
		// },
		computed: {
			total() {
				return this.items.map(item => item.sales_amount)
					.reduce((a, b) => a + b, 0);
			}
		},

		data() {
			return {
				items: [],
			}
		},

		mounted() {
			this.getCustomerReport();
		},

		methods: {

			async getCustomerReport() {
				const res = await Axios.get(`report/salesorder/by-customer`, {
					params: {
						start_date: this.start_date,
						end_date: this.end_date,
					}
				});
				this.items = res.data.data.items;
			},

		}
	}
</script>

<style lang="scss" scoped>
	#report-contacts {
		min-height: auto;
		max-height: 400px;
		overflow: auto;
	}
	.panel-default{
		border:none !important;
		box-shadow:none !important;
	}
	.header-row{
		border-top: 1px solid #ddd;
		th{
			font-weight: 400;
			font-size: 1.2em;
			color:#000
		}
	}

	.content-table{
td.amount.text-left .pull-left {
    margin-right: 20px;
}
		tr{
			.amount{
				width:50%;
				color:#000;
				padding-top: 12px;
				padding-bottom: 12px;
			}
			.display-name{
				width:50%;
				color:#000;
				padding-top: 12px;
				padding-bottom: 12px;
			}
			.row-total{
				background-color: #eee;
				color:#000;
				padding-top: 16px;
				padding-bottom: 16px;
				font-size: 1.2em
			}
		}
	}
</style>
