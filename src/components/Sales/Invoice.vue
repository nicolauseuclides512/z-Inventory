<template>
  <div>

    <div class="sahito-invoice" v-if="value">
      <div v-if="value.invoice_status === 'DRAFT'">
        <div class="ribbon-draft"><span>{{ value.invoice_status }}</span></div>
      </div>
      <div v-else-if="salesOrder.invoice_status === 'UNPAID'">
        <div class="ribbon-overdue"><span>{{ value.sales_order.invoice_status }}</span></div>
      </div>
      <div v-else-if="value.sales_order.invoice_status === 'OVERDUE'">
        <div class="ribbon-overdue"><span>{{ value.sales_order.invoice_status }}</span></div>
      </div>
      <div v-else-if="value.invoice_status === 'PARTIALLY_PAID'">
        <div class="ribbon"><span>{{ value.invoice_status }}</span></div>
      </div>
      <div v-else-if="value.invoice_status === 'VOID'">
        <div class="ribbon-void"><span>{{ value.invoice_status }}</span></div>
      </div>
      <div v-else>
        <div class="ribbon"><span>{{ salesOrder.invoice_status }}</span></div>
      </div>

      <div class="row sahito-invoice-content p-15">
        <div class="col-md-4 pt-20">
          <img class="img-responsive" :src="logo"
               style="width: auto; height: auto; max-width: 160px; max-height: 120px; object-fit: cover;">
        </div>
        <div class="col-md-8 text-right">
          <h1>INVOICE</h1>
          <p class="inv-code">{{ value.invoice_number }}</p>
          <p class="inv-balance" style="font-size: 18px">Balance Due</p>
          <h4 v-if="value.invoice_status === 'PAID'" style="font-size: 28px">0</h4>
          <h4 v-else style="font-size: 28px">{{ value.balance_due | money }}</h4>
        </div>
      </div>
      <div class="row sahito-invoice-content p-15" v-if="value.contact">
        <div class="col-md-4">
          <div class="office-desc">
            <h4>{{ company_name }}</h4>
            <p>{{ company_address }}</p>
            <p>{{ company_region }}</p>
            <p>{{ company_district }}</p>
            <p>{{ company_province }}</p>
            <p>{{ company_zip }}</p>
            <p>{{ company_country }}</p>
          </div>
          <div class="billto">
            <p>Bill to</p>
            <h4 style="color: black;">{{ buyer_name }}</h4>
            <p style="color: black;">{{ buyer_address }}</p>
            <p style="color: black;">{{ buyer_region }}</p>
            <p style="color: black;">{{ buyer_district }}</p>
            <p style="color: black;">{{ buyer_province }}</p>
            <p style="color: black;">{{ buyer_zip }}</p>
            <p style="color: black;">{{ buyer_country }}</p>
          </div>
        </div>
        <div class="col-md-8">
          <div class="col-md-9 col-md-offset-3 invoice-date">
            <div class="form-group">
              <div class="col-md-6">Invoice Date:</div>
              <div class="col-md-6 invoice-date-term">
                {{ value.invoice_date | date('long') }}
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">Terms:</div>
              <div class="col-md-6 invoice-date-term">
                Due on Receipt
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">Due Date:</div>
              <div class="col-md-6 invoice-date-term">
                {{ salesOrder ? salesOrder.due_date : '' | date('long') }}
              </div>
            </div>
            <!--<div class="form-group">-->
              <!--<div class="col-md-6">P.O.#:</div>-->
              <!--<div class="col-md-6 invoice-date-term">-->
                <!--{{ value.sales_order_number }}-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="row sahito-invoice-content p-15 pt-0">

        <div class="col-md-12">
          <div class="border-1 table-responsive mt-20">
            <table class="table sahito-invoice-table-inside">
              <thead>
              <tr class="dark-grey-background">
                <th>#</th>
                <th id="item">Item & Description</th>
                <th id="qty" class="text-left">Qty</th>
                <th id="rate">Rate</th>
                <th id="discount" class="text-right">Discount</th>
                <th id="amount">Amount</th>
              </tr>
              </thead>
              <tbody v-if="value.invoice_details">
              <tr v-for="(item, index) in value.invoice_details">
                <td>{{ index +1 }}</td>
                <td>{{ item.item_name }}</td>
                <td>
                  <p class="qty-amount">{{ item.item_quantity }}</p>
                  <p class="qty-type text-muted" style="font-weight: normal;">{{ item.uom }}</p>
                </td>
                <td class="text-right">{{ item.item_rate | money }}</td>
                <td class="text-right">
                  <span v-if="item.discount_amount_type === 'fixed'">{{ item.discount_amount_value | money }}</span>
                  <span v-else>{{ item.discount_amount_value }}%</span>
                </td>
                <td class="text-right">{{ item.amount | money }}</td>
              </tr>
              <tr class="sub-total">
                <td colspan="3"></td>
                <td colspan="1">Sub Total</td>
                <td colspan="2">{{ value.sub_total | money }}</td>
              </tr>
              <tr class="sub-total">
                <td colspan="3"></td>
                <td colspan="1">Shipping Charge</td>
                <td colspan="2">{{ value.shipping_charge | money }}</td>
              </tr>
              <tr class="sub-total">
                <td colspan="3"></td>
                <td colspan="1">Tax</td>
                <td colspan="1">10%</td>
                <td colspan="1">
                    <span v-if="!value.tax">Included</span>
                    <span v-else>{{ value.tax | money }}</span>
                </td>
              </tr>
              <tr class="sub-total" v-if="value.adjustment_value">
                <td colspan="3"></td>
                <td colspan="1">{{ value.adjustment_name || 'Adjustment' }}</td>
                <td colspan="2">{{ value.adjustment_value | money }}</td>
              </tr>
              <tr class="total">
                <td colspan="3"></td>
                <td colspan="1">Total</td>
                <td colspan="2">{{ value.total | money }}</td>
              </tr>
              <tr class="text-right" v-for="(item, index) in paymentList">
                <td colspan="3"></td>
                <td colspan="1">Paid at {{ item.date | date('short') }}</td>
                <td colspan="2">{{ item.amount | money }}</td>
              </tr>
              <tr class="text-right" style="border-bottom-color:  white;">
                <td colspan="3"></td>
                <td colspan="1" style="background: #f0f0f0;">Balance Due</td>
                <td colspan="2" style="background: #f0f0f0;">{{ value.balance_due | money }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row p-15 pt-0">
        <strong>Cutomer notes</strong>
        <div>{{ value.customer_notes }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import Axios from "axios";
import Regional from "helpers/regional";
import has from "has";

export default {
  name: "Invoice",

  props: {
    value: {
      type: [Object, Array],
      required: true
    },
    salesOrder: {
      type: [Object, Array],
      required: true
    },
    paymentList: {
      type: [Object, Array],
      required: true
    }
  },

  data() {
    return {
      invoice: {},
      logo: "http://placehold.it/250?text=No+Logo",

      company_name: "",
      company_address: "",
      company_zip: "",
      company_country: "",
      company_province: "",
      company_district: "",
      company_region: "",

      buyer_name: "",
      buyer_address: "",
      buyer_region: "",
      buyer_district: "",
      buyer_province: "",
      buyer_zip: "",
      buyer_country: ""
    };
  },

  mounted() {
    this.getOrganizationInfo();
    this.getBuyerinfo();
  },

  methods: {
    async getOrganizationInfo() {
      const orgId = Cookie.get("organization_id");
      const url = `organizations/${orgId}`;
      const res = await Axios.get(url);
      this.logo = res.data.data.multi_res_logo
        ? res.data.data.multi_res_logo.small
        : this.logo;

      this.company_name = res.data.data.name;
      this.company_address = res.data.data.address;
      this.company_zip = res.data.data.zip;

      const countries = await Regional.countryList();
      const country = await countries.find(
        item => item.id === res.data.data.country_id
      );
      this.company_country =
        country && has(country, "name") ? country.name : "";

      const provinces = await Regional.provinceList(res.data.data.country_id);
      const province = await provinces.find(
        item => item.id === res.data.data.province_id
      );
      this.company_province =
        province && has(province, "name") ? province.name : "";

      const districts = await Regional.districtList(res.data.data.province_id);
      const district = await districts.find(
        item => item.id === res.data.data.district_id
      );
      this.company_district =
        district && has(district, "name") ? district.name : "";

      const regions = await Regional.regionList(res.data.data.district_id);
      const region = await regions.find(
        item => item.id === res.data.data.region_id
      );
      this.company_region = region && has(region, "name") ? region.name : "";
    },

    async getBuyerinfo() {
      this.buyer_name = this.value.contact.display_name;

      this.buyer_address = this.value.billing_address
        ? this.value.billing_address
        : this.value.contact.billing_address;
      this.buyer_zip = this.value.billing_zip
        ? this.value.billing_zip
        : this.value.contact.billing_zip;

      const countries = await Regional.countryList();
      const buyer_country_id = this.value.billing_country
        ? this.value.billing_country
        : this.value.contact.billing_country;
      if (buyer_country_id) {
        const country = await countries.find(
          item => item.id === buyer_country_id
        );
        this.buyer_country = has(country, "name") ? country.name : "";
      }

      const provinces = await Regional.provinceList(buyer_country_id);
      const buyer_province_id = this.value.billing_province
        ? this.value.billing_province
        : this.value.contact.billing_province;
      if (buyer_province_id) {
        const province = await provinces.find(
          item => item.id === buyer_province_id
        );
        this.buyer_province = has(province, "name") ? province.name : "";
      }

      const districts = await Regional.districtList(buyer_province_id);
      const buyer_district_id = this.value.billing_district
        ? this.value.billing_district
        : this.value.contact.billing_district;
      if (buyer_district_id) {
        const district = await districts.find(
          item => item.id === buyer_district_id
        );
        this.buyer_district = has(district, "name") ? district.name : "";
      }

      const regions = await Regional.regionList(buyer_district_id);
      const buyer_region_id = this.value.billing_region
        ? this.value.billing_region
        : this.value.contact.billing_region;
      if (buyer_region_id) {
        const region = await regions.find(item => item.id === buyer_region_id);
        this.buyer_region = has(region, "name") ? region.name : "";
      }
    }
  }
};
</script>
