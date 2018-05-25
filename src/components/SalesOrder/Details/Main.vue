<template>
	<div class="content-page" style="padding: 0px;">

		<iframe id="iframe-print" src="about:blank" style="display: none"></iframe>

		<div class="content bgr-white" style="padding: 20px;">
			<div class="row">
				<div class="col-md-4 side-list-sales">
					<List @selectSalesOrder="selectSalesOrder($event)" />
				</div>
				<div class="col-md-8 main-detail-sales" style="border-left: 1px solid #f0f0f0;">
					<Detail />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios'
	import Form from '@/helpers/Form'
	import List from './List'
	import Detail from './Detail'
	import {
		mapState,
		// mapGetters
	} from 'vuex'
	export default {
		name: 'SalesOrderDetail',

		components: {
			List,
			Detail,
		},

		data () {
			return {
				salesOrderRoute: this.$route.params.id
			}
		},

		// computed: {
		//   ...mapGetters({
		//     salesOrders: 'salesOrders/salesOrderData'
		//   })
		// },

		async mounted () {
			//load content if users directly hit url
			// this.selectSalesOrder(this.salesOrderRoute)
		},

		methods: {
			async selectSalesOrder (salesOrderId) {
				this.$store.dispatch('salesOrders/selectSalesOrder', salesOrderId)
					.then(() => {
						this.$router.push({
							path: `/sales/${salesOrderId}/detail`,
							// replace: true,
							query: this.$route.query
						})
					})
			}
		}
	}
</script>

<style scoped lang="scss">
.side-list-sales,
.main-detail-sales {
	height: calc(100vh - 50px);
	overflow-y: scroll;
}

</style>
