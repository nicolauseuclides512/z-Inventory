import Axios from 'axios'
import paymentMethodList from 'src/helpers/PaymentMethodList'
// import shipment from './shipment';

const state = {
	salesOrderList: [],
	salesOrder: {},
	invoices: [],
	payments: [],
	createPayment: {},
	paymentMethodList: {},
	shipmentList: [],
	loadingPayment:false,
	loadingShipment:false,
	loadingSOData: false
}

const mutations = {
	SHIPMENT_LIST (state, value) {
		state.shipmentList = value
	},
	SALES_ORDER_LIST (state, value) {
		state.salesOrderList = value
	},
	SALES_ORDER (state, value) {
		state.salesOrder = value
	},
	INVOICES (state, value) {
		state.invoices = value
	},
	PAYMENTS (state, value) {
		state.payments = value
	},
	CREATE_PAYMENT (state, value) {
		state.createPayment = value
	},
	PAYMENT_METHOD_LIST (state, value) {
		state.paymentMethodList = value
	},
	LOADING_PAYMENT(state, value){
		state.loadingPayment = value
	},
	LOADING_SO_DATA(state, value){
		state.loadingSOData = value
	},
}

const actions = {

	async saveShipment({state}, sales_order_id: number) {
		const data = {
			shipment_order_number: null,
			date: dateFormat(new Date(), 'YYYY-MM-DD'),
			carrier_id: null,
			carrier_name: null, // This field only for view, not send to server.
			tracking_number: null,
			notes: '',
		}

		try {
			const res = axios.post(`sales_orders/${sales_order_id}/shipments`, data)

			commit('SHIPMENT')
			this.form.shipment.date = dateFormat(new Date(), 'YYYY-MM-DD')
			this.form.shipment.shipment_order_number = ''
			this.form.shipment.tracking_number = ''
			this.form.shipment.carrier_id = ''
			this.form.shipment.carrier_name = ''
			this.form.shipment.notes = ''

			this.currentTab = 'shipment'

			swal_success(res)

			$('#shipment').modal('hide')

		} catch (err) {
			console.error(err)
			if (err.hasOwnProperty('response')) {
				swal_error(err.response)
			}
		}
	},

	async getList ({state, commit}, options) {
		try {
			const defaultParams = {
				page: 1,
				per_page: 20,
				sort: 'created_at.desc',
				filter: 'all',
				q: '',
			}

			const params = Object.assign({}, defaultParams, options)

			const response = await Axios.get(`sales_orders`, {params})
			commit('SALES_ORDER_LIST', response.data.data)
			return state.salesOrderList
		}
		catch (err) {
			console.error(err)
			if (err.hasOwnProperty('response')) {
				//
			}
		}
	},

	async selectSalesOrder ({dispatch}, salesOrderId) {
		return Promise.all([
			// commit('LOADING_SO_DATA', true),
			dispatch('getSalesOrder', salesOrderId),
			// commit('LOADING_SO_DATA', false)
			// dispatch('getPayments', salesOrderId),
		])
	},

	async getSalesOrder ({state, commit}, salesOrderId) {
		try {
			commit('LOADING_SO_DATA', true)
			const {data} = await Axios.get(`sales_orders/${salesOrderId}`)
			commit('SALES_ORDER', data.data)
			commit('LOADING_SO_DATA', false)
			return state.salesOrder
		}
		catch (err) {
			commit('LOADING_SO_DATA', false)
			console.error(err)
			if (err.hasOwnProperty('response')) {
				//
			}
		}
	},

	async getInvoices ({state, commit}, salesOrderId) {
		try {
			return Axios.get(`sales_orders/${salesOrderId}/invoices`)
				.then(({data}) => {
					commit('INVOICES', data.data)
					return state.invoices
				})
		}
		catch (err) {
			console.error(err)
			if (err.hasOwnProperty('response')) {
				//
			}
		}
	},

	async getPayments ({state, commit, dispatch}, salesOrderId) {
		commit('LOADING_PAYMENT', true)
		try {
			return dispatch('getInvoices', salesOrderId)
				.then(async (invoices) => {
					const lastInvoice = invoices[invoices.length - 1]
					const paymentsResponse = await Axios.get(`sales_orders/${salesOrderId}/invoices/${lastInvoice.invoice_id}/payments`)
					commit('PAYMENTS', paymentsResponse.data.data)
					commit('LOADING_PAYMENT', false)
					return state.payments
				})
		}
		catch (err) {
			commit('LOADING_PAYMENT', false)
			console.error(err)
			if (err.hasOwnProperty('response')) {
				//
			}
		}
	},

	async createPayment ({state, commit, dispatch}, {salesOrderId, invoiceId}) {
		// return dispatch('getInvoices', salesOrderId)
			// .then(async (invoices) => {
				try {
					// let invoicesId = payload.invoicesId
					// const salesOrderId = payload.salesOrderId
					// console.log('invoicesId',invoicesId)
					// console.log('salesOrderId',salesOrderId)
					// const firstInvoice = invoices[0]
					const createPaymentResponse = await Axios.get(`sales_orders/${salesOrderId}/invoices/${firstInvoice}/payments/create`)
					commit('CREATE_PAYMENT', createPaymentResponse.data.data)
					commit('PAYMENT_METHOD_LIST', createPaymentResponse.data.data.payment_method)
					throw state.createPayment
					// return state.createPayment
					// await Axios.get(`sales_orders/${salesOrderId}/invoices/${invoiceId}/payments/create`)
					// .then(
					//   res => {
					//     const createPaymentResponse = res.data.data
					//     commit('CREATE_PAYMENT', createPaymentResponse.data.data)
					//     commit('PAYMENT_METHOD_LIST', createPaymentResponse.data.data.payment_method)
					//     console.log(createPaymentResponse)
					//   }
					// ).catch(err => {
					//     if (err.response){
					//       // console.log(err.response)
					//     }else return //console.error(err)
					//   }
					// )
				}
				catch (err){
					if(err.response){
						// console.log(err.response)
					}else return //console.error(err)
				}

				return state.createPayment
			// }
		// )
	}

}

const getters = {
	salesOrderData(state) {
		return state.salesOrder
	},

	loadingSOData(state){
		return state.loadingSOData
	},

	loadingPayment(state){
		return state.loadingPayment
	}
	// paymentList(state){
	//   return state.payments
	// }
}


export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
