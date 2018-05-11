<template>
  <div class="invoice-wrap">

    <Spinner v-if="loadingSOData || loadingBuyer"/>


    <div class="sahito-invoice" v-if="value && !loadingBuyer && !loadingSOData" style="min-height: 842px; box-shadow: 0 3px 5px 0 rgba(0, 0, 0, .2);">
      <!-- <pre>{{value}}</pre> -->
      <!--
      <div v-if="value.invoice_status === 'DRAFT'">
        <div class="ribbon-draft"><span class="ribbon-text">{{ value.invoice_status }}</span></div>
      </div>
      <div v-else-if="salesOrder.invoice_status === 'UNPAID'">
        <div class="ribbon-unpaid"><span class="ribbon-text">{{ value.sales_order.invoice_status }}</span></div>
      </div>
      <div v-else-if="value.sales_order.invoice_status === 'OVERDUE'">
        <div class="ribbon-overdue"><span class="ribbon-text">{{ value.sales_order.invoice_status }}</span></div>
      </div>
      <div v-else-if="value.invoice_status === 'PARTIALLY_PAID'">
        <div class="ribbon-partially"><span class="ribbon-text">{{ value.invoice_status.replace(/_/, ' ') }}</span></div>
      </div>
      <div v-else-if="value.invoice_status === 'VOID'">
        <div class="ribbon-void"><span class="ribbon-text">{{ value.invoice_status }}</span></div>
      </div>
      <div v-else>
        <div class="ribbon"><span class="ribbon-text">{{ salesOrder.invoice_status }}</span></div>
      </div>
       -->
      <div v-if="value.invoice_status && !salesOrder.invoice_status" class="ribbon-wrapper">
        <div
          class="ribbon-payment"
          :class="{
          'unpaid': value.invoice_status == 'UNPAID',
          'partial': value.invoice_status == 'PARTIALLY_PAID',
          'void': value.invoice_status == 'VOID',
          'draft': value.invoice_status == 'DRAFT',
          'sent': value.invoice_status == 'SENT',
          }" >
          {{ value.invoice_status }}
        </div>
      </div>

      <div v-if="salesOrder.invoice_status" class="ribbon-wrapper">
        <div
          class="ribbon-payment shipment"
          :class="{
            'unpaid': value.invoice_status == 'UNPAID',
            'overdue': salesOrder.invoice_status == 'OVERDUE',
            'partial': salesOrder.invoice_status == 'PARTIALLY_PAID',
            'void': salesOrder.invoice_status == 'VOID',
            'draft': salesOrder.invoice_status == 'DRAFT',
            'sent': salesOrder.invoice_status == 'SENT',
          }" >
          {{ (salesOrder.invoice_status == 'DRAFT')?'OPEN':salesOrder.invoice_status }}
        </div>
      </div>

      <!-- <div v-if="salesOrder.shipment_status" class="ribbon-wrapper shipment">
        <div class="ribbon-payment " :class="{
          'not-shipped': salesOrder.shipment_status == 'NOT_YET_SHIPPED',
          'shipped': salesOrder.shipment_status == 'SHIPPED',
          'draft': salesOrder.shipment_status == 'DRAFT',
          }" >
          {{ salesOrder.shipment_status.split("_").join(" ")}}
        </div>
      </div> -->

      <div class="row sahito-invoice-content" style="padding: 67px 25px 0 45px;margin-left:0; margin-right:0; margin-bottom: 30px;">
        <div class="col-md-8 pull-left" >
            <div class="media m-b-30">
                <a v-show="logo != null" class="pull-left">
                    <img alt="" :src="logo" class="media-object thumb-sm" style="width: auto; height: auto; max-width: 240px; max-height: 100px;">
                </a>
                <div class="media-body" style="padding-top: 15px;">
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
          <h1 v-if="salesOrder.invoice_status == 'DRAFT'" class="page-title text-right" style="font-size: 32pt; font-weight: normal; margin-bottom: 0;">ORDER</h1>
          <h1 v-else class="page-title text-right" style="font-size: 32pt; font-weight: normal; margin-bottom: 0;">INVOICE</h1>
          <p class="inv-code">{{ value.invoice_number }}</p>
          <span v-if="value.balance_due > 0" class="balance-due">
            <p class="inv-balance">Balance Due</p>
            <h4 v-if="value.invoice_status === 'PAID'">0</h4>
            <h4 v-else >{{ value.balance_due | money }}</h4>
          </span>
        </div>
      </div>
      <div class="row sahito-invoice-content " v-if="value.contact" style="padding:0 25px 0 45px; margin-left: 0; margin-right:0;">
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
        <div class="col-md-8" style="padding-right: 0">
          <div class="col-md-9 col-md-offset-3 invoice-date" style="margin-top: 0; top: 35px;">
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
      <div class="row sahito-invoice-content pt-0" style="padding:0 25px 0 45px; margin-left: 0; margin-right: 0;">

        <div class="col-md-12">
          <div class="border-1 table-responsive mt-20">
            <table class="table sahito-invoice-table-inside" style="margin-bottom: 0;">
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
              <tr v-for="(item, index) in value.invoice_details" :key="index+item.uom">
                <!-- <td>{{ index +1 }}</td> -->
                <td style="font-weight: 400;">{{ item.item_name }}</td>
                <td>
                  <p class="qty-amount" style="font-weight: normal; margin-bottom: 0;">{{ item.item_quantity }}</p>
                  <p class="qty-type text-muted" style="font-weight: normal; margin-bottom: 0;">{{ item.uom }}</p>
                </td>
                <td class="text-left" style="font-weight: normal;">{{ parseInt(item.item_rate) | money }}</td>
                <td class="text-left" style="font-weight: normal;">
                  <span v-if="item.discount_amount_type === 'fixed'">{{ Number(item.discount_amount_value) | money }}</span>
                  <span v-else>{{ Number(item.discount_amount_value) }}%</span>
                </td>
                <td class="text-left" style="font-weight: 400;"><span>Rp</span><span>{{ item.amount | decimalformat }}</span></td>
              </tr>
              <tr class="sub-total">
                <td colspan="3"></td>
                <td colspan="1" class="text-left">Sub Total</td>
                <td colspan="1" class="text-left"><span>Rp</span><span>{{ value.sub_total | decimalformat }}</span></td>
              </tr>
              <!-- <tr class="sub-total">
                <td colspan="3"></td>
                <td colspan="1">Shipping Charge</td>
                <td colspan="2">{{ value.shipping_charge | money }}</td>
              </tr> -->
              <tr class="sub-total" v-if="value.tax  > 0">
                <td colspan="3"></td>
                <td class="text-left" colspan="1">Tax</td>
                <td colspan="1">
                    <span v-if="!value.tax">Included</span>
                    <span v-else>Rp</span><span>{{ value.tax | decimalformat }}</span>
                </td>
              </tr>
              <tr class="sub-total" v-if="value.adjustment_value > 0">
                <td colspan="3"></td>
                <td colspan="1" class="text-left">{{ value.adjustment_name || 'Adjustment' }}</td>
                <td colspan="1"><span>Rp</span><span>{{ Number(value.adjustment_value) | decimalformat }}</span></td>
              </tr>
              <tr class="total">
                <td colspan="3"></td>
                <td class="text-left" colspan="1" style="font-weight: 400; border-bottom: 1px solid rgb(221, 221, 221);">Total</td>
                <td colspan="1" style="font-weight: 400; border-bottom: 1px solid rgb(221, 221, 221);"><span>Rp</span><span>{{ value.total | decimalformat }}</span></td>
              </tr>
              <tr class="sub-total" v-for="(item, index) in paymentList" :key="index+item.amount+item.date">
                <td colspan="3"></td>
                <td class="text-left" colspan="1">Paid at {{ item.date | date('short') }}</td>
                <td colspan="1"><span>Rp</span><span>{{ item.amount | decimalformat }}</span></td>
              </tr>
              <tr class="sub-total" style="border-bottom-color: white;">
                <td colspan="3"></td>
                <td class="text-left" colspan="1" style="background: rgb(240, 240, 240);">Balance Due</td>
                <td colspan="1" style="background: rgb(240, 240, 240);"><span>Rp</span><span>{{ value.balance_due | decimalformat }}</span></td>
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

    components: {
      Spinner: () => import('@/components/Helpers/Spinner'),
    },

    props: [
      'loadingSOData',
      'value',
      'salesOrder',
      'paymentList'
    ],

    watch: {
      value() {
        this.getBuyerinfo()
      }
    },

    data() {
      return {
        loadingBuyer: false,
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
      this.getOrganizationInfo()
      this.getBuyerinfo()

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
        this.loadingBuyer = true
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

        this.loadingBuyer = false
      }
    }
  };
</script>

<style scoped lang="scss">
pre{
  font-family: 'Proxima Nova', Georgia, sans-serif;
  border:none;
  box-shadow: none;
  padding: 0;
  background: transparent;
}
td span{
    float:right;
}
td span:first-child{ /* compatible to >=IE7 */
    float:left;
}

// .ribbon-payment,
// .ribbon-salesorder,
// .ribbon-shipment{
//   font-size: 10px;
//   font-weight: 700;
//   color: #fff;
//   text-transform: uppercase;
//   text-align: center;
//   line-height: 20px;
//   transform: rotate(-45deg);
//   width: 100px;
//   display: block;
//   background: #45a9e7;
//   box-shadow: 0 3px 10px -5px #000;
//   position: absolute;
//   top: 19px;
//   left: -21px;
//   &:before{
//     content: "";
//     position: absolute;
//     left: 0;
//     top: 100%;
//     z-index: -1;
//     border-right: 3px solid #45a9e7;
//     border-left: 3px solid transparent;
//     border-bottom: 3px solid transparent;
//     border-top: 3px solid #45a9e7;
//   }
// }

// .ribbon-payment{
//   top: -8px;
// }
// .ribbon-salesorder{
//   top: 20px;
// }

.ribbon-wrapper{
    position: absolute;
    left: -5px;
    top: -5px;
    z-index: 1;
    overflow: hidden;
    width: 75px;
    height: 75px;
    text-align: right;
}
.ribbon-payment{
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  width: 100px;
  display: block;
  background: #1C8AD9;
  background: linear-gradient(#1C8AD9, #1C8AD9);
  box-shadow: 0 3px 10px -5px #000;
  position: absolute;
  top: 19px;
  left: -21px;
  &:before{
    content: "";
    position: absolute;
    left: 0;
    top: 100%;
    z-index: -1;
    border-left: 3px solid #1C8AD9;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #1C8AD9;
  }
  &:after{
    content: "";
    position: absolute;
    right: 0;
    top: 100%;
    z-index: -1;
    border-left: 3px solid transparent;
    border-right: 3px solid #1C8AD9;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #1C8AD9;
  }
  &.shipped {
    background: #77a800;
    &:before{
      border-left: 3px solid darken(#77a800,20);
      border-top: 3px solid darken(#77a800,20);
    }
    &:after{
      border-right: 3px solid darken(#77a800,20);
      border-top: 3px solid darken(#77a800,20);
    }
  }
  &.draft{
    background: #767676;
    background: linear-gradient(#767676, #767676);
    &:before{
      border-left: 3px solid darken(#767676,20);
      border-top: 3px solid darken(#767676,20);
    }
    &:after{
      border-right: 3px solid darken(#767676,20);
      border-top: 3px solid darken(#767676,20);
    }
  }
  &.overdue{
    background: #E33636;
    background: linear-gradient(#E33636, #E33636);
    &:before{
      border-left: 3px solid darken(#E33636,20);
      border-top: 3px solid darken(#E33636,20);
    }
    &:after{
      border-right: 3px solid darken(#E33636,20);
      border-top: 3px solid darken(#E33636,20);
    }
  }
  &.void{
    background: #000000;
    background: linear-gradient(#000000, #000000);
    &:before{
      border-left: 3px solid lighten(#000,20);
      border-top: 3px solid lighten(#000,20);
    }
    &:after{
      border-right: 3px solid lighten(#000,20);
      border-top: 3px solid lighten(#000,20);
    }
  }
  &.unpaid{
    background: #1C8AD9;
    background: linear-gradient(#1C8AD9, #1C8AD9);
    &:before{
      border-left: 3px solid darken(#1C8AD9,20);
      border-top: 3px solid darken(#1C8AD9,20);
    }
    &:after{
      border-right: 3px solid darken(#1C8AD9,20);
      border-top: 3px solid darken(#1C8AD9,20);
    }
  }
  &.partial{
    background: #E6E600;
    background: linear-gradient(#E6E600, #E6E600);
    &:before{
      border-left: 3px solid dakren(#E6E600, 20);
      border-top: 3px solid dakren(#E6E600, 20);
    }
    &:after{
      border-right: 3px solid dakren(#E6E600, 20);
      border-top: 3px solid dakren(#E6E600, 20);
    }
  }
}
.ribbon-wrapper.shipment {
  width: 130px;
  left: -5px;
  height: 131px;
  top: -5px;
  background: #ff000000;
  .ribbon-payment {
    width: 212px;
    left: -56px;
    top: 30px;
    text-indent: -18px;
    &:after{
      right: 41px !important;
      top: 20px !important;
    }
    &:before{
      left: 26px;
      top: 19px;
    }
  }
}
</style>
