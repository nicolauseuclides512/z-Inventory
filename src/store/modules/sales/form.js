import axios from 'axios'
import Router from 'src/router'
import { responseOk, regional } from 'src/helpers'
import { format as dateFormat } from 'date-fns'
import Carrier from "../../../helpers/Carrier";
import Regional from "../../../helpers/regional";

const state = {
  salesOrderItems: [],

  paymentList: [],
  carrierList: [],
  contact: {},
  invoice: [],
  invoiceList: [],

  invoice_date: '',
  due_date: '',

  shippingCountryList: [],
  shippingProvinceList: [],
  shippingDistrictList: [],
  shippingRegionList: [],

  billingCountryList: [],
  billingProvinceList: [],
  billingDistrictList: [],
  billingRegionList: [],

  contactList: [],
  productList: [],
  discountUnitList: [],

  selectedContact: null,
  company_name: '',
  company_title: '',
  display_name: '',
  email: '',
  phone: '',
  mobile: '',

  selectedProduct: null,

  tax_included: null,

  organization_id: null,
  contact_id: null,
  reference_number: '',
  sales_order_status: '',
  sales_order_date: '',
  shipment_date: '',
  carrier_id: null,

  // Courier services
  carrier_code: null,
  carrier_service: null,
  carrier_name: null,
  carrier_service_list: [],

  discount_contact_id: null,
  discount_amount_type: null,
  discount_amount_value: 0,
  shipping_weight: 0,
  shipping_weight_unit: 'gr',
  shipping_rate: 0,
  shipping_charge: 0,
  adjustment_name: '',
  adjustment_value: 0,
  internal_notes: '',
  customer_notes: '',
  term_date: '',
  invoice_email: '',
  billing_address: '',
  billing_region: null,
  billing_district: null,
  billing_province: null,
  billing_country: null,
  billing_zip: '',
  billing_fax: '',

  billing_country_detail: null,
  billing_province_detail: null,
  billing_district_detail: null,
  billing_region_detail: null,

  shipping_address: '',
  shipping_region: null,
  shipping_district: null,
  shipping_province: null,
  shipping_country: null,
  shipping_zip: '',
  shipping_fax: '',

  shipping_country_detail: null,
  shipping_province_detail: null,
  shipping_district_detail: null,
  shipping_region_detail: null,

  details: [],
}

const mutations = {
  PAYMENT_LIST(state, payload) { state.paymentList = payload },
  INVOICE(state, payload) { state.invoice = payload },
  INVOICE_LIST(state, payload) { state.invoiceList = payload },
  CARRIER_LIST(state, payload) { state.carrierList = payload },
  SALES_ORDER_ITEMS(state, payload) { state.salesOrderItems = payload },

  INVOICE_DATE(state, payload) { state.invoice_date = payload },
  DUE_DATE(state, payload) { state.due_date = payload },

  CONTACT_LIST(state, payload) { state.contactList = payload },

  CONTACT(state, payload) {
    if (payload) {
      state.selectedContact = true

      state.contact = payload

      state.company_name = payload.company_name
      state.company_title = payload.company_title
      state.display_name = payload.display_name
      state.email = payload.email
      state.phone = payload.phone
      state.mobile = payload.mobile
      state.contact_id = payload.contact_id
      state.invoice_email = payload.invoice_email
      state.shipping_address = payload.shipping_address
      state.shipping_region = payload.shipping_region
      state.shipping_district = payload.shipping_district
      state.shipping_province = payload.shipping_province
      state.shipping_country = payload.shipping_country
      state.shipping_zip = payload.shipping_zip
      state.billing_address = payload.billing_address
      state.billing_region = payload.billing_region
      state.billing_district = payload.billing_district
      state.billing_province = payload.billing_province
      state.billing_country = payload.billing_country
      state.billing_zip = payload.billing_zip
    }
  },

  DISCOUNT_UNIT_LIST(state, payload) { state.discountUnitList = payload },

  SHIPPING_COUNTRY_LIST(state, payload) { state.shippingCountryList = payload },
  SHIPPING_PROVINCE_LIST(state, payload) { state.shippingProvinceList = payload },
  SHIPPING_DISTRICT_LIST(state, payload) { state.shippingDistrictList = payload },
  SHIPPING_REGION_LIST(state, payload) { state.shippingRegionList = payload },

  BILLING_COUNTRY_LIST(state, payload) { state.billingCountryList = payload },
  BILLING_PROVINCE_LIST(state, payload) { state.billingProvinceList = payload },
  BILLING_DISTRICT_LIST(state, payload) { state.billingDistrictList = payload },
  BILLING_REGION_LIST(state, payload) { state.billingRegionList = payload },

  CARRIER_LIST(state, payload) { state.carrierList = payload },
  CONTACT_LIST(state, payload) { state.contactList = payload },
  PRODUCT_LIST(state, payload) { state.productList = payload },
  DISCOUNT_UNIT_LIST(state, payload) { state.discountUnitList = payload },

  SELECTED_CONTACT(state, payload) { state.selectedContact = payload },
  COMPANY_NAME(state, payload) { state.company_name = payload },
  COMPANY_TITLE(state, payload) { state.company_title = payload },
  DISPLAY_NAME(state, payload) { state.display_name = payload },
  EMAIL(state, payload) { state.email = payload },
  PHONE(state, payload) { state.phone = payload },
  MOBILE(state, payload) { state.mobile = payload },

  SELECTED_PRODUCT(state, payload) { state.selectedProduct = payload },
  TAX_INCLUDED(state, payload) { state.tax_included = payload },

  ORGANIZATION_ID(state, payload) { state.organization_id = payload },
  // CONTACT_ID(state, payload) { state.contact_id = payload },
  REFERENCE_NUMBER(state, payload) { state.reference_number = payload },
  SALES_ORDER_STATUS(state, payload) { state.sales_order_status = payload },
  SALES_ORDER_DATE(state, payload) { state.sales_order_date = payload },
  SHIPMENT_DATE(state, payload) { state.shipment_date = payload },
  CARRIER_ID(state, payload) { state.carrier_id = payload },

  // Courier services
  CARRIER_CODE(state, payload) { state.carrier_code = payload },
  CARRIER_NAME(state, payload) { state.carrier_name = payload },
  CARRIER_SERVICE(state, payload) { state.carrier_service = payload },
  CARRIER_SERVICE_LIST(state, payload) { state.carrier_service_list = payload },

  DISCOUNT_CONTACT_ID(state, payload) { state.discount_contact_id = payload },
  DISCOUNT_AMOUNT_TYPE(state, payload) { state.discount_amount_type = payload },
  DISCOUNT_AMOUNT_VALUE(state, payload) { state.discount_amount_value = payload },
  SHIPPING_WEIGHT(state, payload) { state.shipping_weight = payload },
  SHIPPING_WEIGHT_UNIT(state, payload) { state.shipping_weight_unit = payload },
  SHIPPING_RATE(state, payload) { state.shipping_rate = payload },
  SHIPPING_CHARGE(state, payload) { state.shipping_charge = payload },
  ADJUSTMENT_NAME(state, payload) { state.adjustment_name = payload },
  ADJUSTMENT_VALUE(state, payload) { state.adjustment_value = payload },
  INTERNAL_NOTES(state, payload) { state.internal_notes = payload },
  CUSTOMER_NOTES(state, payload) { state.customer_notes = payload },
  TERM_DATE(state, payload) { state.term_date = payload },
  INVOICE_EMAIL(state, payload) { state.invoice_email = payload },
  BILLING_ADDRESS(state, payload) { state.billing_address = payload },
  BILLING_REGION(state, payload) { state.billing_region = payload },
  BILLING_DISTRICT(state, payload) { state.billing_district = payload },
  BILLING_PROVINCE(state, payload) { state.billing_province = payload },
  BILLING_COUNTRY(state, payload) { state.billing_country = payload },
  BILLING_ZIP(state, payload) { state.billing_zip = payload },
  BILLING_FAX(state, payload) { state.billing_fax = payload },

  BILLING_COUNTRY_DETAIL(state, payload) { state.billing_country_detail = payload },
  BILLING_PROVINCE_DETAIL(state, payload) { state.billing_province_detail = payload },
  BILLING_DISTRICT_DETAIL(state, payload) { state.billing_district_detail = payload },
  BILLING_REGION_DETAIL(state, payload) { state.billing_region_detail = payload },

  SHIPPING_ADDRESS(state, payload) { state.shipping_address = payload },
  SHIPPING_REGION(state, payload) { state.shipping_region = payload },
  SHIPPING_DISTRICT(state, payload) { state.shipping_district = payload },
  SHIPPING_PROVINCE(state, payload) { state.shipping_province = payload },
  SHIPPING_COUNTRY(state, payload) { state.shipping_country = payload },
  SHIPPING_ZIP(state, payload) { state.shipping_zip = payload },
  SHIPPING_FAX(state, payload) { state.shipping_fax = payload },

  SHIPPING_COUNTRY_DETAIL(state, payload) { state.shipping_country_detail = payload },
  SHIPPING_PROVINCE_DETAIL(state, payload) { state.shipping_province_detail = payload },
  SHIPPING_DISTRICT_DETAIL(state, payload) { state.shipping_district_detail = payload },
  SHIPPING_REGION_DETAIL(state, payload) { state.shipping_region_detail = payload },

  DETAILS(state, payload) { state.details = payload },

}

const actions = {

  calculateShippingFee() {
    axios.get(`/`, res => {
      // Do something
    })
  },

  getCarrierList({commit}) {
    Carrier.get().then(carriers => {
      const carrierList = carriers.map(carrier => {
        return {
          id: carrier.id,
          name: carrier.name,
          display: carrier.code.toUpperCase(),
          code: carrier.code,
          logo: carrier.logo,
        }
      })
      carrierList.unshift({name: 'None', id: null, code: 'none', display: 'None', logo: ''})
      carrierList.push({name: 'Custom', id: 0, code: 'custom', display: 'Custom', logo: ''})
      commit('CARRIER_LIST', carrierList)
    })
  },

  async create({commit, dispatch}) {
    try {
      // Emptying states
      dispatch('clear')
      dispatch('removeSelectedContact')

      const res = await axios.get('sales_orders/create')
      if (!responseOk(res.data.code)) return swal_error(res)

      dispatch('getCountryList')

      commit('DISCOUNT_UNIT_LIST', res.data.data.discount_unit)
      commit('TAX_INCLUDED', res.data.data.tax_included)

      // Shipping Carrier
      dispatch('getCarrierList')

    } catch (err) {
      swal_error(err.response)
    }
  },


  async edit({state, commit, dispatch}, salesOrderId) {

    try {
      const res = await axios.get(`sales_orders/${salesOrderId}/edit`)

      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      // Set current contact
      await dispatch('selectContact', res.data.data.sales_order.contact)

      commit('TAX_INCLUDED', res.data.data.tax_included)

      commit('DISCOUNT_UNIT_LIST', res.data.data.discount_unit)

      commit('SALES_ORDER_DATE', res.data.data.sales_order.sales_order_date)
      commit('SALES_ORDER_STATUS', res.data.data.sales_order.sales_order_status)

      commit('INVOICE_DATE', res.data.data.sales_order.invoice_date.substr(0, 10));
      commit('DUE_DATE', res.data.data.sales_order.due_date.substr(0, 10));

      // Shipping Carrier
      await dispatch('getCarrierList')

      await dispatch('getCountryList')
      await dispatch('getProvinceList')

      let sales_order_data = res.data.data.sales_order

      // Fetch invoice/item details
      await dispatch('salesOrderItems', salesOrderId)

      commit('BILLING_COUNTRY_DETAIL', res.data.data.sales_order.billing_country_detail)
      commit('BILLING_PROVINCE_DETAIL', res.data.data.sales_order.billing_province_detail)
      commit('BILLING_DISTRICT_DETAIL', res.data.data.sales_order.billing_district_detail)
      commit('BILLING_REGION_DETAIL', res.data.data.sales_order.billing_region_detail)
      commit('SHIPPING_COUNTRY_DETAIL', res.data.data.sales_order.shipping_country_detail)
      commit('SHIPPING_PROVINCE_DETAIL', res.data.data.sales_order.shipping_province_detail)
      commit('SHIPPING_DISTRICT_DETAIL', res.data.data.sales_order.shipping_district_detail)
      commit('SHIPPING_REGION_DETAIL', res.data.data.sales_order.shipping_region_detail)

    } catch (err) {
      return swal_error(err.response)
    }

  },


  salesOrderItems({state, commit}, salesOrderId) {
    axios.get(`sales_orders/${salesOrderId}/details`).then(res => {
      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      commit('SALES_ORDER_ITEMS', res.data.data)

    }).catch(err => {
      swal_error(err.response)
    })
  },


  async selectContact({state, commit, dispatch}, val) {
    if (!_.isEmpty(val)) {

      if (val.contact_id === 'undefined') return

      const contactId = parseInt(val.contact_id)
      try {
        const res = await axios.get(`contacts/${contactId}`)
        if (!responseOk(res.data.code)) return swal_error(res)
        if (!_.isEmpty(val)) {
          commit('CONTACT', res.data.data)
        }

      } catch (err) {
        swal_error(err.response)
      }
    }

  },

  getCountryList({commit}) {
    Regional.countryList().then((countries) => {
      commit('BILLING_COUNTRY_LIST', countries)
      commit('SHIPPING_COUNTRY_LIST', countries)
    })
  },

  getProvinceList({commit}, country) {
    Regional.provinceList(country).then((provinces) => {
      commit('SHIPPING_PROVINCE_LIST', provinces)
      commit('BILLING_PROVINCE_LIST', provinces)
    })
  },

  getDistrictList({state, commit}, payload) {
    axios.get(`districts/provinces/${payload}`, { params: {per_page: 9999} }).then(res => {
      commit('SHIPPING_DISTRICT_LIST', res.data.data)
      commit('BILLING_DISTRICT_LIST', res.data.data)
    }).catch(err => {
      throw 'Cannot get district list'
    })
  },

  getRegionList({state, commit}, payload) {
    axios.get(`regions/districts/${payload}`, { params: {per_page: 9999} }).then(res => {
      commit('SHIPPING_REGION_LIST', res.data.data)
      commit('BILLING_REGION_LIST', res.data.data)
    }).catch(err => {
      throw 'Cannot get region list'
    })
  },


  // initializeContact({ commit }) {
  //   axios.get('contacts', { params: { per_page: 10 } }).then(res => {
  //     if (!responseOk(res.data.code)) return swal_error(res)
  //
  //     commit('CONTACT_LIST', res.data.data)
  //
  //   }).catch(err => swal_error(err.response))
  // },


  async getContactList({commit}, search) {
    try {
      const options = {
        params: {
          sort: 'display_name',
          per_page: 9999,
          q: search,
        }
      };

      const res = await axios.get('contacts', options);
      if (!responseOk(res.data.code)) return swal_error(res)
      commit('CONTACT_LIST', res.data.data)
    } catch (err) {
      swal_error(err.response)
    }
  },

  removeSelectedContact({ commit, dispatch }) {
    commit('SELECTED_CONTACT', false)

    // commit('CONTACT_ID', null)
    commit('INVOICE_EMAIL', null)
    commit('SHIPPING_ADDRESS', null)
    commit('SHIPPING_REGION', null)
    commit('SHIPPING_DISTRICT', null)
    commit('SHIPPING_COUNTRY', null)
    commit('SHIPPING_ZIP', null)
    commit('BILLING_ADDRESS', null)
    commit('BILLING_REGION', null)
    commit('BILLING_DISTRICT', null)
    commit('BILLING_COUNTRY', null)
    commit('BILLING_ZIP', '' + null)

    commit('CARRIER_LIST', [])

    dispatch('getContactList')
  },

  selectedProduct({state, commit}, payload) {
    payload.item_quantity = 1
    const details = _.cloneDeep(state.details)
    details.push(payload)
    commit('DETAILS', details)

    // Emptying list
    commit('SELECTED_PRODUCT', null)
    commit('PRODUCT_LIST', [])
  },

  async getProducts({commit}, {search, per_page}) {
    try {

      // Only accept if more than 3 characters
      if (typeof search === 'string' && search.length < 3) return

      const params = {
        page: 1,
        per_page: 9999,
        sort: 'created_at.asc',
        filter: 'all',
        q: search,
      }

      const res = await axios.get('items', {params: params})
      if (!responseOk(res.data.code)) return swal_error(res)

      // TODO: Find unique value only
      const data = _(res.data.data)
        .map(value => {

          // TODO: Simplify this code. We only need to change "item_name", not everything.
          return {
            item_id: value.item_id,
            uom_id: value.uom_id,
            tax_id: value.tax_id,
            invoice_date: value.invoice_date,
            due_date: value.due_date,
            item_name: `${value.item_name} (SKU: ${value.code_sku})`,
            weight: value.weight,
            weight_unit: value.weight_unit,
            dimension_l: value.dimension_l,
            dimension_w: value.dimension_w,
            dimension_h: value.dimension_h,
            sales_checked: value.sales_checked,
            sales_rate: value.sales_rate,
            sales_account: value.sales_account,
            sales_description: value.sales_description,
            compare_rate: value.compare_rate,
            purchase_checked: value.purchase_checked,
            purchase_rate: value.purchase_rate,
            purchase_account: value.purchase_account,
            purchase_description: value.purchase_description,
            track_inventory: value.track_inventory,
            inventory_checked: value.inventory_checked,
            inventory_rate: value.inventory_rate,
            inventory_stock: value.inventory_stock,
            inventory_stock_warning: value.inventory_stock_warning,
            inventory_account: value.inventory_account,
            item_status: value.item_status,
            category_id: value.category_id,
            organization_id: value.organization_id,
            parent_id: value.parent_id,
            item_attributes: value.item_attributes,
            description: value.description,
            code_sku: value.code_sku,
            barcode: value.barcode,
            page_title: value.page_title,
            meta_description: value.meta_description,
            slug: value.slug,
            visibility: value.visibility,
            tags: value.tags,
            item_type: value.item_type,
            asset_tax: value.asset_tax,
            asset_uom: value.asset_uom,
            category: value.category,
            item_medias: value.item_medias,
            children: value.children
          }
        }).value()

      commit('PRODUCT_LIST', data)

    } catch (err) {
      console.log(err)
      if (err.hasOwnProperty('response')) {
        swal_error(err.response)
      }
    }

  },

  addItemToList({state, commit}, item) {
    // FIXME: I think this is a dirty hack, but it works!
    if (!item || item instanceof Event) return


    /**
     * If item already exists, don't push to list. Instead, add more quantity.
     */
    const isAlreadyExists = _(state.salesOrderItems).find((existingItem, key) => {
      if (existingItem.item_id === item.item_id) {
        console.log('found')
        // const quantity = state.salesOrderItems[key].item_quantity = parseInt(state.salesOrderItems[key].item_quantity + 1)
      }
    })

    if (isAlreadyExists) {
      commit('PRODUCT_LIST', [])
      return
    }


    /**
     * Make sure default quantity is 1
     */
    if (!_.isEmpty(item) && _.isEmpty(item.item_quantity)) {
      item.item_quantity = 1
      item.discount_amount_value = 0
      item.discount_amount_type = 'fixed'
    }

    const salesOrderItems = _.cloneDeep(state.salesOrderItems)
    salesOrderItems.push(item)

    commit('SALES_ORDER_ITEMS', salesOrderItems)

    // Emptying product list
    commit('PRODUCT_LIST', [])
  },

  removeItem({ state, commit }, index) {
    const detailList = _.cloneDeep(state.salesOrderItems)
    detailList.splice(index, 1)
    commit('SALES_ORDER_ITEMS', detailList)
  },


  async save({state, dispatch}, evt) {

    let sending_status = 0

    if (evt.target.dataset.value === 'save_and_send_invoice') {
      sending_status = 1
    }

    const items = _(state.salesOrderItems).map(item => {
      return {
        item_id: item.item_id,
        // item_rate: _this.sales_rate(item),
        item_quantity: item.item_quantity,
        discount_contact_id: item.discount_contact_id,
        discount_amount_type: item.discount_amount_type || 'fixed',
        discount_amount_value: item.discount_amount_value || 0,
        tax_id: item.tax_id,
        tax_amount: item.asset_tax ? item.asset_tax.percent : 0,
      }
    }).value()

    const data = {
      invoice_date: state.invoice_date,
      due_date: state.due_date,
      organization_id: state.organization_id,
      contact_id: state.contact_id,
      sales_order_date: state.sales_order_date || dateFormat(new Date()),
      shipment_date: state.shipment_date,
      carrier_id: state.carrier_id,
      discount_contact_id: state.discount_contact_id,
      discount_amount_type: 'fixed',
      discount_amount_value: 0,
      shipping_weight: state.shipping_weight,
      shipping_weight_unit: 'gr',
      shipping_rate: state.shipping_rate,
      adjustment_name: state.adjustment_name,
      adjustment_value: state.adjustment_value,
      internal_notes: state.internal_notes,
      customer_notes: state.customer_notes,
      term_date: state.term_date ? state.term_date : dateFormat(new Date()),
      invoice_email: state.invoice_email,
      billing_address: state.billing_address,
      billing_region: state.billing_region,
      billing_district: state.billing_district,
      billing_province: state.billing_province,
      billing_country: state.billing_country,
      billing_zip: state.billing_zip,
      billing_fax: state.billing_fax,
      shipping_address: state.shipping_address,
      shipping_region: state.shipping_region,
      shipping_district: state.shipping_district,
      shipping_province: state.shipping_province,
      shipping_country: state.shipping_country,
      shipping_zip: state.shipping_zip,
      shipping_fax: state.shipping_fax,
      sending_status: sending_status,
      tax_included: state.tax_included,
      details: items,
    }

    data['is_draft'] = evt.target.dataset.value === 'save_as_draft';

    try {
      const response = await axios.post('sales_orders', data)

      if (!responseOk(response.data.code)) {
        return swal_error(response)
      }

      return response

    } catch(err) {
      console.error(err)
    }
  },


  async update({state, commit}, {salesOrderId, evt}) {
    let sending_status = 0

    if (evt.target.dataset.value === 'save_and_send_invoice') {
      sending_status = 1
    }

    const items = _(state.salesOrderItems).map(item => {
      return {
        item_id: item.item_id,
        // item_rate: _this.sales_rate(item),
        item_quantity: item.item_quantity,
        discount_contact_id: item.discount_contact_id,
        discount_amount_type: item.discount_amount_type || 'fixed',
        discount_amount_value: item.discount_amount_value || 0,
        tax_id: item.tax_id,
        tax_amount: item.asset_tax ? item.asset_tax.percent : 0,
      }
    }).value()

    const data = {
      invoice_date: state.invoice_date,
      due_date: state.due_date,
      organization_id: state.organization_id,
      contact_id: state.contact_id,
      sales_order_date: state.sales_order_date,
      shipment_date: state.shipment_date,
      carrier_id: state.carrier_id,
      carrier_code: state.carrier_code,
      carrier_name: state.carrier_name,
      carrier_service: state.carrier_service,
      discount_contact_id: state.discount_contact_id,
      discount_amount_type: 'fixed',
      discount_amount_value: 0,
      shipping_weight: state.shipping_weight,
      shipping_weight_unit: 'gr',
      shipping_rate: state.shipping_rate,
      adjustment_name: state.adjustment_name,
      adjustment_value: state.adjustment_value,
      internal_notes: state.internal_notes,
      customer_notes: state.customer_notes,
      term_date: state.term_date ? state.term_date : dateFormat(new Date()),
      invoice_email: state.invoice_email,
      billing_address: state.billing_address,
      billing_region: state.billing_region,
      billing_district: state.billing_district,
      billing_province: state.billing_province,
      billing_country: state.billing_country,
      billing_zip: state.billing_zip,
      billing_fax: state.billing_fax,
      shipping_address: state.shipping_address,
      shipping_region: state.shipping_region,
      shipping_district: state.shipping_district,
      shipping_province: state.shipping_province,
      shipping_country: state.shipping_country,
      shipping_zip: state.shipping_zip,
      shipping_fax: state.shipping_fax,
      sending_status: sending_status,
      tax_included: state.tax_included,
      details: items,
    }

    data['is_draft'] = true // Always true

    try {
      const res = await axios.post(`sales_orders/${salesOrderId}/update`, data)

      if (!responseOk(res.data.code)) {
        return swal_error(res)
      }

      swal_success(res)

      const sales_order_id = res.data.data.sales_order_id

      const invoice_id = res.data.data.invoices[0].invoice_id

      console.log(_.cloneDeep(invoice_id))

      switch (evt.target.dataset.value) {

        // TODO: Maybe instead of use Router inside Vuex, we should return a promise. Then the component will handle Router.
        case 'save_and_preview_invoice':
          commit('sales/email/RECIPIENTS', state.invoice_email.split(','), {root: true})
          Router.push({
            name: 'sales.email',
            params: {
              sales_order_id, invoice_id
            }
          })
          break

        case 'save_and_send_invoice':
          Router.push({
            name: 'sales.detail',
            params: {
              id: sales_order_id,
            },
            query: {
              state: 'send_invoice'
            }
          })
          break

        case 'save_and_pay':
          Router.push({
            name: 'sales.detail',
            params: {
              id: sales_order_id,
            },
            query: {
              state: 'pay'
            }
          })
          break

        case 'save_and_close':
          Router.push({name: 'sales.detail', params: {id: sales_order_id}})
          break;

        case 'save_as_draft':
          // Nothing
          break;

        default:
          // Nothing
      }

    } catch (err) {
      return swal_error(err.response)
    }
  },


  setShippingAddress({commit}, payload) {
    commit('SHIPPING_ADDRESS', payload.billing_address)
    commit('SHIPPING_REGION', payload.billing_region)
    commit('SHIPPING_DISTRICT', payload.billing_district)
    commit('SHIPPING_PROVINCE', payload.billing_province)
    commit('SHIPPING_COUNTRY', payload.billing_country)
    commit('SHIPPING_ZIP', payload.billing_zip)
    commit('SHIPPING_FAX', payload.billing_fax)
  },


  setBillingAddress({commit}, payload) {
    commit('BILLING_ADDRESS', payload.billing_address)
    commit('BILLING_REGION', payload.billing_region)
    commit('BILLING_DISTRICT', payload.billing_district)
    commit('BILLING_PROVINCE', payload.billing_province)
    commit('BILLING_COUNTRY', payload.billing_country)
    commit('BILLING_ZIP', payload.billing_zip)
    commit('BILLING_FAX', payload.billing_fax)
  },

  clear({commit}) {
    return new Promise(resolve => {
      commit('CONTACT', null)
      commit('CONTACT_LIST', [])
      commit('SELECTED_CONTACT', null)
      commit('PRODUCT_LIST', [])
      commit('EMAIL', null)
      commit('INVOICE_EMAIL', null)
      commit('INTERNAL_NOTES', null)
      commit('CUSTOMER_NOTES', null)
      commit('DISPLAY_NAME', null)
      commit('PHONE', null)
      commit('MOBILE', null)
      commit('COMPANY_NAME', null)
      commit('COMPANY_TITLE', null)
      commit('SELECTED_PRODUCT', null)
      commit('REFERENCE_NUMBER', null)
      commit('SALES_ORDER_ITEMS', [])
      commit('SHIPPING_COUNTRY_LIST', [])
      commit('SHIPPING_PROVINCE_LIST', [])
      commit('SHIPPING_DISTRICT_LIST', [])
      commit('SHIPPING_REGION_LIST', [])
      commit('BILLING_COUNTRY_LIST', [])
      commit('BILLING_PROVINCE_LIST', [])
      commit('BILLING_DISTRICT_LIST', [])
      commit('BILLING_REGION_LIST', [])
      resolve()
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
