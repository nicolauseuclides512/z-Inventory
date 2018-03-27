<template>
  <div style="box-shadow: 0 3px 5px 0 rgba(0, 0, 0, .2);">

    <div class="sahito-invoice" v-if="value" style="min-height:842px">
      <div v-if="value.invoice_status === 'DRAFT'">
        <div class="ribbon-draft"><span>{{ value.invoice_status }}</span></div>
      </div>
      <div v-else-if="salesOrder.invoice_status === 'UNPAID'">
        <div class="ribbon-unpaid"><span>{{ value.sales_order.invoice_status }}</span></div>
      </div>
      <div v-else-if="value.sales_order.invoice_status === 'OVERDUE'">
        <div class="ribbon-overdue"><span>{{ value.sales_order.invoice_status }}</span></div>
      </div>
      <div v-else-if="value.invoice_status === 'PARTIALLY_PAID'">
        <div class="ribbon-partially"><span>{{ value.invoice_status }}</span></div>
      </div>
      <div v-else-if="value.invoice_status === 'VOID'">
        <div class="ribbon-void"><span>{{ value.invoice_status }}</span></div>
      </div>
      <div v-else>
        <div class="ribbon"><span>{{ salesOrder.invoice_status }}</span></div>
      </div>

      <div class="row sahito-invoice-content" style="padding:67px 25px 0px 45px;margin-left:0px;margin-right:0px;margin-bottom:30px;">
        <div class="col-md-8 pull-left" >
            <div class="media m-b-30">
                <a v-show="logo != null" class="pull-left">
                    <img alt="" :src="logo" class="media-object thumb-sm" style="width: auto; height: auto; max-width: 240px; max-height: 100px;">
                </a>
                <div class="media-body" style="padding-top:15px;">
                    <h4>{{ company_name }}</h4>
                    <small>{{ company_address }}</small>
                    <br>
                    <small>
                      {{ company_region }},
                      {{ company_district }},
                      {{ company_province }},
                      {{ company_country }}
                      {{ company_zip }}
                    </small>
                    <br>
                    <small>{{ company_phone }} | </small>
                    <small>{{ company_email }}</small>
                </div>
            </div>
        </div>
        <div class="col-md-4 text-right pull-right">
          <h1 class="page-title text-right" style="font-size: 32pt; font-weight: normal; margin-bottom: 0px;">INVOICE</h1>
          <p class="inv-code">{{ value.invoice_number }}</p>
          <p class="inv-balance">Balance Due</p>
          <h4 v-if="value.invoice_status === 'PAID'">0</h4>
          <h4 v-else >{{ value.balance_due | money }}</h4>
        </div>
      </div>
      <div class="row sahito-invoice-content " v-if="value.contact" style="padding:0px 25px 0px 45px;margin-left:0px;margin-right:0px">
        <div class="col-md-4">
          <!-- <div class="office-desc">
            <h4>{{ company_name }}</h4>
            <p>{{ company_address }}</p>
            <p>{{ company_region }}</p>
            <p>{{ company_district }}</p>
            <p>{{ company_province }}</p>
            <p>{{ company_zip }}</p>
            <p>{{ company_country }}</p>
          </div> -->
          <div class="billto" style="min-height:144px">
            <p>Bill to</p>
            <h4 style="color: black;">{{ buyer_name }}</h4>
            <p style="color: black;">{{ buyer_phone }}</p> 
            <p style="color: black;">{{ buyer_mobile }}</p> 
            <p style="color: black;">{{ buyer_address }}</p>
            <p style="color: black;">{{ buyer_region }}</p>
            <p style="color: black;">{{ buyer_district }}</p>
            <p style="color: black;">{{ buyer_province }}</p>
            <p style="color: black;">{{ buyer_zip }} {{ buyer_country }}</p>
          </div>
        </div>
        <div class="col-md-8" style="padding-right:0px">
          <div class="col-md-9 col-md-offset-3 invoice-date" style="margin-top: 0px; top: 35px;">
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
      <div class="row sahito-invoice-content pt-0" style="padding:0px 25px 0px 45px;margin-left:0px;margin-right:0px">

        <div class="col-md-12">
          <div class="border-1 table-responsive mt-20">
            <table class="table sahito-invoice-table-inside" style="margin-bottom:0px">
              <thead>
              <tr class="grey-background">
                <!-- <th>#</th> -->
                <th id="item" width="40%">Item</th>
                <th id="qty" class="text-left" width="8.75%">Qty</th>
                <th id="rate" class="text-left" width="15%">Rate</th>
                <th id="discount" class="text-left" width="20%">Discount</th>
                <th id="amount" width="26.25%">Amount</th>
              </tr>
              </thead>
              <tbody v-if="value.invoice_details">
              <tr v-for="(item, index) in value.invoice_details">
                <!-- <td>{{ index +1 }}</td> -->
                <td style="font-weight:400">{{ item.item_name }}</td>
                <td>
                  <p class="qty-amount" style="font-weight: normal; margin-bottom:0px">{{ item.item_quantity }}</p>
                  <p class="qty-type text-muted" style="font-weight: normal;margin-bottom:0px">{{ item.uom }}</p>
                </td>
                <td class="text-left" style="font-weight: normal">{{ parseInt(item.item_rate) | money }}</td>
                <td class="text-left" style="font-weight: normal">
                  <span v-if="item.discount_amount_type === 'fixed'">{{ Number(item.discount_amount_value) | money }}</span>
                  <span v-else>{{ Number(item.discount_amount_value) }}%</span>
                </td>
                <td class="text-right" style="font-weight:400">{{ item.amount | money }}</td>
              </tr>
              <tr class="sub-total">
                <td colspan="3"></td>
                <td colspan="1" class="text-left">Sub Total</td>
                <td colspan="1" class="text-right">{{ value.sub_total | money }}</td>
              </tr>
              <!-- <tr class="sub-total">
                <td colspan="3"></td>
                <td colspan="1">Shipping Charge</td>
                <td colspan="2">{{ value.shipping_charge | money }}</td>
              </tr> -->
              <tr class="sub-total" v-if="value.tax">
                <td colspan="3"></td>
                <td class="text-left" colspan="1">Tax</td>
                <td colspan="1">
                    <span v-if="!value.tax">Included</span>
                    <span v-else>{{ value.tax | money }}</span>
                </td>
              </tr>
              <tr class="sub-total" v-if="value.adjustment_value">
                <td colspan="3"></td>
                <td colspan="1" class="text-left">{{ value.adjustment_name || 'Adjustment' }}</td>
                <td colspan="1">{{ Number(value.adjustment_value) | money }}</td>
              </tr>
              <tr class="total">
                <td colspan="3"></td>
                <td class="text-left" colspan="1" style=" font-weight:400; border-bottom: 1px solid rgb(221, 221, 221);">Total</td>
                <td colspan="1" style=" font-weight:400; border-bottom: 1px solid rgb(221, 221, 221);">{{ value.total | money }}</td>
              </tr>
              <tr class="sub-total" v-for="(item, index) in paymentList">
                <td colspan="3"></td>
                <td class="text-left" colspan="1">Paid at {{ item.date | date('short') }}</td>
                <td colspan="1">{{ item.amount | money }}</td>
              </tr>
              <tr class="sub-total" style="border-bottom-color:  white;">
                <td colspan="3"></td>
                <td class="text-left" colspan="1" style="background: rgb(240, 240, 240);">Balance Due</td>
                <td colspan="1" style="background: rgb(240, 240, 240);">{{ value.balance_due | money }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      <div class="row p-15 pt-0">
        Customer notes
        <div><pre>{{ value.customer_notes}}</pre></div>
      </div>
      <div class="row p-15 pt-0">
        Terms & Conditions
        <div><pre>{{value.term_and_condition}}</pre></div>
      </div>
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
      //logo: "http://placehold.it/250?text=No+Logo",
      logo:null,
      company_name: "",
      company_address: "",
      company_zip: "",
      company_country: "",
      company_province: "",
      company_district: "",
      company_region: "",
      company_phone: '',
      company_email: '',

      buyer_name: "",
      buyer_address: "",
      buyer_region: "",
      buyer_district: "",
      buyer_province: "",
      buyer_zip: "",
      buyer_country: "", 
      buyer_phone: "", 
      buyer_mobile: ""
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
        : null

      this.company_name = res.data.data.name;
      this.company_address = res.data.data.address;
      this.company_zip = res.data.data.zip;
      this.company_phone = res.data.data.phone
      this.company_email = res.data.data.primary_contact.email

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

      this.buyer_phone = this.value.contact.phone; 
      this.buyer_mobile = this.value.contact.mobile; 

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
 <style scoped>
pre{
  font-family: 'Proxima Nova', Georgia, sans-serif;
  border:none;
  box-shadow: none;
  padding: 0px;
  background: transparent;
}
 </style>
 