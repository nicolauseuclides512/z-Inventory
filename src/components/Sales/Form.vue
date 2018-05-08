<template>
  <div class="content-page">
    <!-- <testValidation/> -->
    <div class="content" style="padding-left: 0px; padding-right: 0px">
      <form action="POST" @submit.prevent>

        <!-- Page-Title -->
        <div class="col-md-6" style="padding-left:0px">
          <h4 class="pull-left page-title" v-if="!$route.params.id">Create New Order</h4>
          <h4 class="pull-left page-title" v-if="$route.params.id">Edit Order {{ sales_order_number }}</h4>
        </div>
        <!-- <div class="col-md-3">
          <div class="form-group">
            <label>Sales Order Date</label>
            <div class="input-group">
              <input v-model="form.invoice_date" required class="flatpickr form-control">
              <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label>Due Date</label>
            <div class="input-group">
              <input v-model="form.due_date" class="flatpickr form-control">
              <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
            </div>
          </div>
        </div> -->

        <div class="row">
          <div class="col-md-9" style="margin-left: 0px">
            <div class="header-pannel panel panel-default" style="margin-bottom:10px">
              <div class="panel-body" style="padding:0px">
                <div class="row">
                  <div class="col-xs-12">
                    <vuelist
                      :loading="loadingList"
                      @change="selectProduct"
                      @search="searchProduct"
                      :options="list.product_list"
                      :value="selected_product"
                      placeholder="Select Product"
                      keyid="item_id"
                      label="item_name"
                    ></vuelist>
                  </div>
                </div>
              </div>
            </div>
            <div class="top-pannel panel panel-default">
              <!-- <div class="panel-heading">
                <h3 class="panel-title">Items</h3>
              </div> -->
              <div class="panel-body midd-pannel" style="padding:10px 10px 10px 10px">
                <div class="row">
                  <div class="col-xs-12">
                    <div class="sahito-list-contact table-responsive">
                      <table class="table table-hover default-table sahito-list-contact--table">
                        <thead style="box-shadow: 0 4px 2px -2px #ddd;">
                        <tr style="color:#000;">

                          <td
                            style="padding-top:8px; padding-bottom:8px; font-size:14px;border-bottom: 1.5px solid #ddd"
                            width="40.85%">Item
                          </td>
                          <!--<td
                            style="padding-left: 10px; padding-top:8px; padding-bottom:8px; font-size:14px;border-bottom: 1.5px solid #ddd"
                            width='10%'></td> -->
                          <td
                            style="padding-top:8px; padding-bottom:8px; font-size:14px;border-bottom: 1.5px solid #ddd"
                            width="6.75%">Qty
                          </td>
                          <td
                            style="padding-top:8px; padding-bottom:8px; font-size:14px;border-bottom: 1.5px solid #ddd"
                            width="10.65%">Rate
                          </td>
                          <td
                            style="padding-top:8px; padding-bottom:8px; font-size:14px;border-bottom: 1.5px solid #ddd"
                            width="20.25%">Discount
                          </td>
                          <td
                            style="padding-top:8px; padding-bottom:8px; font-size:14px;border-bottom: 1.5px solid #ddd"
                            class="text-right" width="11.5%">Amount
                          </td>
                          <!-- <td style="box-shadow: 0px solid; border: 0px solid; width:28px"></td> -->
                        </tr>
                        </thead>
                        <tbody style="color:#000;">
                        <tr v-for="product in form.details">
                          <!-- <td width='10%' style="padding: 15px 8px 15px 10px">
                            <a href="#" class="pull-left">
                              <img alt="" :src="tesimgProduct" class="media-object thumb-sm"
                                   style="width: auto; height: auto; max-width: 70px; max-height: 70px;">
                            </a>
                          </td> -->
                          <td v-text="product.item_name" width='40.85%' style="padding-left:10px; size:14px"></td>
                          <!-- <td width='10%' style="padding: 15px 8px 15px 10px"></td> -->
                          <td width="7%">
                            <input
                              @blur="changeProductQty(product)"
                              type="number"
                              v-model.number="product.item_quantity"
                              :min="1"
                              :max="product.stock_quantity"
                              class="form-control"
                              style="padding-left:5px; padding-right:0px">
                          </td>

                          <td width="16.65%">
                            <vue-numeric v-model.number="product.item_rate" :min="0" :max="99999999" separator="."
                                         class="form-control custom" style="padding:6px;"></vue-numeric>
                          </td>

                          <td width="20.25%">
                            <div class="col-md-3" style="padding-right: 0px; padding-left:0px">
                              <select style="padding-left: 0px; font-size:12px; padding-right: 0px;width: 47px;"
                                      v-model="product.discount_amount_type" @change="updateDiscountType(product)"
                                      class="form-control">
                                <option v-for="value, key in list.discount_unit" :value="key" v-text="value"
                                        style="font-size:12px"></option>
                              </select>
                            </div>
                            <div class="col-md-8">
                              <vue-numeric
                                v-model.number="product.discount_amount_value"
                                @change="updateDiscountValue(product)"
                                separator=","
                                class="form-control"
                                style="padding:6px; width:89px">
                              </vue-numeric>
                            </div>
                          </td>

                          <td width="11.5%" class="text-right" style="vertical-align: middle; padding-left:0px">{{
                            amount(product) | money }}
                          </td>

                          <td style="vertical-align: middle; background-color:#ffffff; border:0px solid; width:28px">
                            <a @click="removeProduct(product)" href="javascript:void(0);" class="text-danger"><i
                              class="ion-close-round"></i></a>
                          </td>

                        </tr>
                        </tbody>
                      </table>
                      <table v-if="form.details.length < 1" class="empty-table"></table>
                      <table class="table" style="font-size:1.05em">
                        <thead>
                        <th style="width: 67.6%; border-bottom: 0px"></th>
                        <th style="width: 14%; border-bottom: 0px"></th>
                        <th style="width: 18%; border-bottom: 0px"></th>
                        <th style="width:28px"></th>
                        </thead>
                        <tbody>
                        <tr class="total">
                          <td class="text-right"></td>
                          <td class="text-left" style="padding-left:8px; padding-top:24px; color:#000">Sub total</td>
                          <td class="text-right" style="padding-right:8px; padding-top:24px; color:#000">{{ subtotal |
                            money }}
                          </td>
                          <td style="width:28px; border:0px solid; color:#fff">0</td>
                        </tr>
                        <tr class="total">
                          <td class="text-right"
                              style=" border-top-color: white; padding-bottom: 10px; padding-right: 0px"></td>
                          <td class="text-left" style="padding-left:8px; color:#000">PPN 10%</td>
                          <td class="text-right" style="padding-right:8px; color:#000">{{ tax_value }}</td>
                          <td style="width:28px; border:0px solid; color:#fff">0</td>
                        </tr>
                        <tr class="total">
                          <td style=" border-top-color: white; padding-bottom: 10px; padding-right: 0px">
                          </td>
                          <td class="text-right" style="padding-left: 0px; padding-bottom:24px">
                            <input
                              v-model.trim="form.adjustment_name"
                              type="text"
                              class="form-control form-white"
                              style="max-width: 300px; border: 1px dashed #ddd; padding-left:8px"
                              placeholder="Adjustment"
                            />
                          </td>
                          <td style="padding-right: 0px; padding-bottom:24px">
                            <div class="input-group pull-right">
                              <span class="input-group-addon" style="color:  #666;">Rp</span>
                              <vue-numeric
                                v-model="form.adjustment_value"
                                :minus="true"
                                separator="."
                                style="border: 1px solid #eee"
                                maxlength="20"
                                class="form-control form-white text-right"
                                placeholder=""
                              ></vue-numeric>
                            </div>
                          </td>
                          <td style="width:28px; border:0px solid; color:#fff">0</td>
                        </tr>
                        <tr class="total">
                          <td style=" border-top-color: white; padding-bottom: 10px; padding-right: 0px">
                          </td>
                          <td class="text-right" style="padding-left: 0px; padding-bottom:24px">
                            <span style="white-space: nowrap;"><small>Shipping Charge</small></span>
                          </td>
                          <td style="padding-right: 0px; padding-bottom:24px">
                            <div class="input-group pull-right">
                              <span class="input-group-addon" style="color:  #666;">Rp</span>
                              <vue-numeric
                                v-model="form.shipping_charge"
                                :minus="true"
                                separator="."
                                style="border: 1px solid #eee"
                                maxlength="20"
                                class="form-control form-white text-right"
                                placeholder=""
                              ></vue-numeric>
                            </div>
                          </td>
                          <td style="width:28px; border:0px solid; color:#fff">0</td>
                        </tr>
                        <tr class="total">
                          <td class="no-bgr text-right"
                              style="border-top-color: white; border-bottom-color: white; padding-bottom: 10px; padding-right: 0px"></td>
                          <td class="text-left"
                              style="font-size: 20px; background-color: rgb(240, 240, 240);padding-left:8px; color:#000">
                            Total
                          </td>
                          <td class="text-right"
                              style="padding-right:8px; font-size: 20px; background-color: rgb(240, 240, 240); color:#000">
                            {{ grandTotal | money }}
                          </td>
                          <td style="width:28px; border:0px solid; color:#fff">0</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="panel panel-default bottom-pannel">
              <!-- <div class="panel-heading">
                <h3 class="panel-title">Notes</h3>
              </div> -->
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12">
                    <div class="container">
                      <div class="row m-b-20">
                        <div class="col-md-12 pl-pr-0">
                          <div class="form-group col-md-12 form-general-newOrder m-b-20">
                            <label class="col-md-12 control-label text-left">Customer Notes</label>
                            <textarea
                              class="form-control-invoice"
                              rows="3"
                              v-model="form.customer_notes"
                              maxlength="500"
                              placeholder="Will be displayed in invoice. Maximum characters is 500."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="container">
                      <div class="row m-b-20">
                        <div class="col-md-12 pl-pr-0">
                          <div class="form-group col-md-12 form-general-newOrder m-b-20">
                            <label class="col-md-12 control-label text-left">Terms & Conditions</label>
                            <textarea
                              class="form-control-invoice"
                              rows="3"
                              v-model="form.term_and_condition"
                              maxlength="500"
                              placeholder="Will be displayed in invoice. Maximum characters is 500."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="container">
                      <div class="row m-b-20">
                        <div class="col-md-12 pl-pr-0">
                          <div class="form-group col-md-12 form-general-newOrder m-b-20">
                            <label class="col-md-12 control-label text-left">Internal Notes</label>
                            <textarea
                              class="form-control-invoice"
                              rows="3"
                              v-model="form.internal_notes"
                              maxlength="500"
                              placeholder="Not displayed in invoice."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="container">
                      <div class="row m-b-20">
                        <div class="col-md-12 pl-pr-0">
                          <div class="form-group col-md-12 form-general-newOrder m-b-20">
                            <label class="control-label">Invoice Email</label>
                            <span v-if="ui.invalidInvoiceEmail" style="color: red;">( Invalid email address )</span>
                            <div>
                              <vuetagger
                                :value="invoice_emails"
                                @change="updateEmail"

                                pattern="^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$"
                              ></vuetagger>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 right-pannel">
            <!-- <div class="panel panel-default">
               <div class="panel-heading">
                <h3 class="panel-title">Sales Order Number</h3>
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12">
                    <div class="form-group" style="text-align: center;margin-bottom: 0px">
                      <h4 style="color: #bbb">{{ sales_order_number }}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="panel panel-default" style="box-shadow:none; background-color:#eee; ">
              <!-- <div class="panel-heading">
                <h3 class="panel-title">Contacts</h3>
              </div> -->
              <div class="panel-body" style="padding:0px">
                <div class="row">
                  <div class="col-xs-12">
                    <!-- <div class="form-group" style="margin-bottom: 0px">
                      <label style="font-weight: normal">Invoice to:</label>
                    </div> -->
                    <div class="right-panel-wrap d-flex">
                      <div class="col-md-12" style="padding-left: 0px; padding-right: 0px; padding-bottom: 10px">
                        <div class="button-wrap">
                        </div>
                        <!-- <div v-if="!ui.showAddNewContactField"> -->
                        <div class="customer-list-dropdown">
                          <vuelist
                            v-if="!ui.showAddNewContactField"
                            :loading="loadingContact"
                            @change="selectContact"
                            @search="searchContact"
                            :options="list.contact_list"
                            :value="selected_contact && selected_contact.contact_id"
                            placeholder="Select Customer"
                            keyid="contact_id"
                            label="display_name"
                          ></vuelist>
                          <button class="btn btn-add-customer btn-block" @click="showModalCustomer">
                            Add New Customer
                          </button>
                          <ModalAddCustomer v-if="isShownModalAddCustomer" @selectContact="selectContact($event)" @close="hideModalCustomer" @fetchContactList="fetchContactList"/>
                        </div>
                        <!-- <div v-if="!selected_contact && !ui.showAddNewContactField" @click="toggleAddNewContactField()"
                             class="add-new-contact-btn" style="width:95%">
                          + Add New Contact
                        </div> -->
                        <!-- <div v-if="ui.showAddNewContactField">
                          <div class="form-group" style="">
                            <input
                              type="text"
                              name="name"
                              class="form-control"
                              placeholder="Client's name"
                              v-model="newContact.display_name"
                            />
                          </div>
                          <div class="form-group" style="">
                            <textarea
                              type="text"
                              name="address"
                              class="form-control"
                              placeholder="Client's address"
                              style="resize:vertical"
                              rows="4"
                              v-model="newContact.billing_address"
                            ></textarea>
                          </div>
                          <div class="form-group" style="">
                            <input
                              type="number"
                              name="phone"
                              id="phone"
                              class="form-control"
                              placeholder="Client's phone number"
                              maxlength="15" minlength="9"
                              v-model="newContact.phone"
                            />
                          </div>
                          <div class="form-group" style="">
                            <input type="email" name="email" class="form-control" placeholder="Client's email"
                                   style="text-transform: lowercase;"
                                   v-model="newContact.email">
                          </div>
                        </div> -->
                      </div>
                      <!--<div class="col-md-1" v-if="!selected_contact">-->
                      <!--<a href="javascript:void(0)" onclick="window.open('/contacts/create')" class="btn btn-default"><i class="fa fa-plus"></i></a>-->
                      <!--</div>-->
                    </div>
                    <div class="normal-mode selected-contact" v-if="selected_contact">
                      <div class="col-md-12 contact-wrap" style="padding-left: 8px; margin-bottom:15px">
                        <h4 class="text-bold">{{selected_contact.display_name}}</h4>
                        <div class="contact-list">
                          <div class="billing-wrapper">Billing Address</div>
                          <!-- <span>
                          <a href="javascript:void(0)" @click="editSelectedContact">
                            <i class="fa fa-fw fa-pencil"></i>
                          </a>
                          <a @click="clearSelectedContact" v-if="selected_contact || ui.showAddNewContactField" href="javascript:void(0)" class="text-danger close-button contact-button">
                            <i class="ion-close-round" style="font-size:13.3px"></i>
                          </a>
                          </span> -->

                        </div>
                        <div class="billing-address" v-text="selected_contact.billing_address"></div>
                        <div class="billing-region-detail" v-text="selected_contact.billing_region_detail && selected_contact.billing_region_detail.name"></div>
                        <div class="billing-district-detail"v-text="selected_contact.billing_district_detail && selected_contact.billing_district_detail.name"></div>
                        <div class="billing-province-detail" v-text="selected_contact.billing_province_detail && selected_contact.billing_province_detail.name"></div>
                        <div class="billing-zip" v-text="selected_contact.billing_zip"></div>
                        <div class="billing-country-detail" v-text="selected_contact.billing_country_detail && selected_contact.billing_country_detail.name"></div>
                        <hr/>
                        <div class="contact-phone">Phone: {{ selected_contact.phone ? selected_contact.phone : '-' }}</div>
                        <div class="contact-mobile" >Mobile {{ selected_contact.mobile ? selected_contact.mobile : '-' }}</div>
                      </div>
                    </div>
                    <div v-if="list.channels.length" class="channels-length">
                      <div class="form-group list-wrap" style="margin-bottom:0px">
                        <!-- <div v-if="selected_sales_channel" class="channel-list">
                          <span>
                            <label style="font-weight: normal" >Sales from:</label>
                            <label>{{selected_sales_channel.sales_channel.channel_name }}</label>
                          </span>
                          <a v-if="selected_sales_channel" style="padding-left:0" @click="clearSelectedSalesChannel" href="javascript:void(0)" class="text-danger close-button channel-button">
                            <i class="ion-close-round" style="font-size:13.3px"></i>
                          </a>
                        </div> -->
                      </div>
                      <div class="form-horizontal">
                        <div class="form-group form-general m-b-10">
                          <label class="col-md-3 control-label text-left">Channel</label>
                          <div class="col-md-9">
                            <vuelist
                            @change="selectSalesChannel"
                            :options="list.channels"
                            :value="selected_sales_channel"
                            placeholder="Select Sales Channel"
                            keyid="id"
                            label="store_name"
                          ></vuelist>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div class="d-block channel-info" v-else>
                      <label style="font-weight: normal">Go to <i>Settings</i> >> <i>Sales Channel</i> to add your first
                        sales channel</label>
                    </div>

                    <div class="col-md-12 pl-pr-0">
                      <div class="form-horizontal">
                          <div class="form-group form-general m-b-10">
                            <label class="col-md-3 control-label text-left">Date</label>
                            <div class="col-md-9">
                              <div class="input-group">
                          <input v-model="form.invoice_date" required class="flatpickr form-control">
                          <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                        </div>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-3 control-label text-left">Due Date</label>
                        <div class="col-md-9">
                          <div class="input-group">
                          <input v-model="form.due_date" class="flatpickr-due form-control">
                          <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                        </div>
                          </div>
                        </div>
                    </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Sales Info</h3>
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12">
                    <div v-if="list.channels.length">
                      <div class="form-group" style="margin-bottom: 0px" >
                        <label style="font-weight: normal" v-if="!selected_sales_channel">Sales from:</label>
                        <label style="font-weight: normal" v-if="selected_sales_channel">Sales from: {{ selected_sales_channel.sales_channel.channel_name }}</label>
                      </div>
                      <div class="normal-mode">
                        <div class="col-md-12" style="padding-left: 0px; padding-right: 0px; padding-bottom: 10px">
                          <vuelist
                            @change="selectSalesChannel"
                            :options="list.channels"
                            :value="selected_sales_channel"
                            placeholder="Search a sales channel"
                            keyid="id"
                            label="store_name"
                        ></vuelist>
                        </div>
                        <div class="col-md-1" v-if="selected_sales_channel">
                          <a @click="clearSelectedSalesChannel" href="javascript:void(0)" class="text-danger">
                            <i class="ion-close-circled" style="font-size:12pt"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <label style="font-weight: normal">Go to <i>Settings</i> >> <i>Sales Channel</i> to add your first sales channel</label>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>

        <div class="float-save">
          <div class="row">
            <div class="col-md-6 text-left">
              <router-link :to="{ name: 'sales.index' }" class="btn btn-default waves-effect">
                <i class="fa fa-chevron-left"></i> Cancel
              </router-link>
            </div>
            <div class="col-md-6 text-right">
              <button v-if="!this.$route.params.id" type="button" class="btn btn-default" data-value="save_as_draft" style="margin-right:25px"
                      @click="save($event)">Save as Quote
              </button>
              <div class="btn-group dropup">
                <button type="button" class="btn btn-primary" data-value="save_and_close"
                        @click="save($event)">{{saveOrCreate}}Invoice
                </button>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li>
                    <a href="javascript:void(0);" data-value="save_and_pay" @click="save($event)">
                      {{saveOrCreate}}Invoice then Pay
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" data-value="save_then_create_new" @click="save($event)">
                      {{saveOrCreate}}Invoice and New
                    </a>
                  </li>
                  <!-- <li>
                    <a href="javascript:void(0);" data-value="save_then_duplicate" @click="save($event)">
                      Create Invoice and Duplicate
                    </a>
                  </li> -->
                </ul>
              </div>
            </div>
          </div>
        </div>


      </form>
    </div>
  </div>
</template>

<script>
  const Flatpickr = require("flatpickr");
  import axios from "axios";
  import {responseOk} from 'src/helpers';
  import Vuelist from "../Vuelist";
  import Vuetagger from "../Vuetagger";
  import Router from "src/router";
  import Form from "../../helpers/Form";
  import dateFormat from "date-fns/format";
  import VueNumeric from 'vue-numeric';
  import ModalAddCustomer from '@/components/Sales/Modal/ModalAddCustomer';
  // import testValidation from '@/components/Sales/Modal/testValidation';

  export default {
    name: "SalesOrderForm",

    components: {
      // testValidation,
      ModalAddCustomer,
      Vuelist,
      Vuetagger,
      VueNumeric,
    },

    watch: {
      "form.invoice_date"(val) {
        if (!this.$route.params.id) this.form.due_date = val;
      },
      'newContact.display_name'(val) {
        this.newContact.first_name = val
      }
    },

    computed: {
      saveOrCreate(){
        return (this.$route.params.id)?'Save ':'Create '
      },
      subtotal() {
        let subtotal = 0;

        _.each(this.form.details, item => {
          subtotal = subtotal + this.amount(item);
        });

        return subtotal;
      },

      tax_value() {
        // NOTE: The "tax_included" from "Tax Setting", actually a boolean. But server give us 0 or 1.
        return this.tax_included ? "Included" : this.subtotal * 0.1;
      },

      grandTotal() {
        let taxValue = 0;
        if (_.isNumber(_.toNumber(this.tax_value))) {
          taxValue = _.toNumber(this.tax_value);
          // I know this is weird
          if (isNaN(taxValue)) {
            taxValue = 0;
          }
        }

        let adjustmentValue = 0;
        let shippingCharge = 0;
        if (_.toNumber(this.form.adjustment_value) || _.toNumber(this.form.shipping_charge)) {
          adjustmentValue = _.toNumber(this.form.adjustment_value);
          shippingCharge = _.toNumber(this.form.shipping_charge);
        }

        return this.subtotal + taxValue + adjustmentValue + shippingCharge;
      },

      invoice_emails() {
        return this.form.invoice_email
          ? this.form.invoice_email.split(/\s*,\s*/)
          : [];
      }
    },

    data() {
      return {
        isShownModalAddCustomer: false,
        loadingList: false,
        loadingContact: false,
        dirtyForm: false,
        salesOrderEdit: {},
        ui: {
          adjustment_edit: false,
          invalidInvoiceEmail: false,
          showAddNewContactField: false,
        },
        list: {
          discount_unit: [],
          weight_unit: [],
          contact_list: [],
          product_list: [],
          channels: [],
        },
        selected_contact: null,
        newContact: {
          display_code: 1,
          display_name: '',
          first_name: '',
          billing_address: '',
          phone: '',
          email: '',
        },
        sales_order_number: null,
        selected_product: null,
        selected_sales_channel: null,
        tesimgProduct: "http://placehold.it/70?text=No+image",
        tax_included: 1,
        form: new Form({
          invoice_date: dateFormat(new Date(), "DD MMM YYYY"),
          due_date: dateFormat(new Date(), "DD MMM YYYY"),
          contact_id: null,
          sales_order_date: dateFormat(new Date(), "DD-MMM-YYYY"),
          shipment_date: null,
          carrier_id: null,
          discount_contact_id: null,
          discount_amount_type: "fixed",
          discount_amount_value: 0,
          shipping_weight: 1,
          shipping_weight_unit: "gr",
          shipping_rate: 0,
          adjustment_name: "",
          adjustment_value: 0,
          shipping_charge: 0,
          internal_notes: "",
          customer_notes: "",
          term_and_condition: "",
          term_date: dateFormat(new Date(), "DD-MMM-YYYY"),
          invoice_email: "", // foo@example.com,bar@example.com
          billing_address: "",
          billing_region: null,
          billing_district: null,
          billing_province: null,
          billing_country: null,
          billing_zip: null,
          billing_fax: null,
          shipping_address: "",
          shipping_region: null,
          shipping_district: null,
          shipping_province: null,
          shipping_country: null,
          shipping_zip: null,
          shipping_fax: null,
          tax_included: 1,
          is_draft: 0,
          carrier_code: "",
          carrier_name: "",
          carrier_service: "",
          my_sales_channel_id: null,
          my_sales_channel: null,
          details: []
        })
      };
    },

    beforeRouteLeave (to, from, next) {
      if (this.dirtyForm) {
        const leave = confirm('Are you sure leave this page?')
        if (!leave) return next(false)
      }
      return next()
    },

    mounted() {
      $('input, textarea, select').on('change blur', (event) => {
        this.dirtyForm = true
      })

      this.initialize()
      this.salesChannel()
    },

    methods: {
      showModalCustomer(){
        this.isShownModalAddCustomer = true
        $('#modal-add-customer').modal('show')
      },
      hideModalCustomer(){
        this.isShownModalAddCustomer = false
      },
      async initialize() {
        try {
          if (this.$route.params.id) {
            const sales_order_id = this.$route.params.id;
            const res = await axios.get(`sales_orders/${sales_order_id}/edit`);
            if (!responseOk(res.data.code)) {
              throw new Error(res.data.message)
            }
            this.salesOrderEdit = res.data.data.sales_order;
            this.edit(this.salesOrderEdit);
            this.list.discount_unit = res.data.data.discount_unit;
            this.list.weight_unit = res.data.data.weight_unit;
            this.tax_included = res.data.data.tax_included;
            this.sales_order_number = res.data.data.sales_order.sales_order_number;
            this.dateTime(this.salesOrderEdit.invoice_date);
            this.dueDateTime(this.salesOrderEdit.due_date);
          } else {
            const res = await axios.get("sales_orders/create");
            if (!responseOk(res.data.code)) {
              throw new Error(res.data.message)
            }
            this.list.discount_unit = res.data.data.discount_unit;
            this.list.weight_unit = res.data.data.weight_unit;
            this.tax_included = res.data.data.tax_included;
            this.sales_order_number = res.data.data.next_sales_order_number;
            this.dateTime(new Date());
            this.dueDateTime(new Date());
          }

          await this.fetchContactList();
          await this.fetchProductList();
          await this.fetchTaxSetting();
        } catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },
      limiQuantity(val, min, max){
        if (isNaN(val)) {
          return val;
        }
        return parseFloat(Math.max(Math.min(val, max), min)).toFixed(0);
      },

      changeProductQty(item){
        if(item.stock_quantity){
          item.item_quantity = this.limiQuantity(item.item_quantity, 0, item.stock_quantity)
        }
        if(item.item && item.item.stock_quantity){
          item.item_quantity = this.limiQuantity(item.item_quantity, 0, item.item.stock_quantity)
        }
        item.item_quantity = item.item_quantity
      },

      toggleAddNewContactField() {
        if (this.ui.showAddNewContactField) {
          this.ui.showAddNewContactField = false
        } else {
          this.ui.showAddNewContactField = true
        }
      },

      async edit(sales_order) {
        this.selectContact(sales_order.contact);
        this.selectSalesChannel(sales_order.my_sales_channel);

        const res = await axios.get(`sales_orders/${sales_order.sales_order_id}/details`);

        if (!responseOk(res.data.code)) {
          throw new Error(res.data.message)
        }

        this.form.details = res.data.data;
        this.form.invoice_date = sales_order.invoice_date
          ? sales_order.invoice_date.substr(0, 10)
          : null;
        this.form.due_date = sales_order.due_date
          ? sales_order.due_date.substr(0, 10)
          : null;
        this.form.contact_id = sales_order.contact_id;
        this.form.sales_order_date = sales_order.sales_order_date
          ? sales_order.sales_order_date.substr(0, 10)
          : null;
        this.form.shipment_date = sales_order.shipment_date
          ? sales_order.shipment_date.substr(0, 10)
          : null;
        this.form.carrier_id = sales_order.carrier_id;
        this.form.discount_contact_id = sales_order.discount_contact_id;
        this.form.discount_amount_type = sales_order.discount_amount_type;
        this.form.discount_amount_value = sales_order.discount_amount_value;
        this.form.shipping_weight = sales_order.shipping_weight;
        this.form.shipping_weight_unit = sales_order.shipping_weight_unit;
        this.form.shipping_rate = sales_order.shipping_rate;
        this.form.adjustment_name = sales_order.adjustment_name;
        this.form.adjustment_value = Number(sales_order.adjustment_value);
        this.form.shipping_charge = Number(sales_order.shipping_charge);
        this.form.internal_notes = sales_order.internal_notes;
        this.form.customer_notes = sales_order.customer_notes;
        this.form.term_and_condition = sales_order.term_and_condition;
        this.form.term_date = sales_order.term_date
          ? sales_order.term_date.substr(0, 10)
          : null;
        this.form.invoice_email = sales_order.invoice_email;
        this.form.billing_address = sales_order.billing_address;
        this.form.billing_region = sales_order.billing_region;
        this.form.billing_district = sales_order.billing_district;
        this.form.billing_province = sales_order.billing_province;
        this.form.billing_country = sales_order.billing_country;
        this.form.billing_zip = sales_order.billing_zip;
        this.form.billing_fax = sales_order.billing_fax;
        this.form.shipping_address = sales_order.shipping_address;
        this.form.shipping_region = sales_order.shipping_region;
        this.form.shipping_district = sales_order.shipping_district;
        this.form.shipping_province = sales_order.shipping_province;
        this.form.shipping_country = sales_order.shipping_country;
        this.form.shipping_zip = sales_order.shipping_zip;
        this.form.shipping_fax = sales_order.shipping_fax;
        this.form.tax_included = sales_order.tax_included;
        this.form.is_draft = sales_order.is_draft;
        this.form.carrier_code = sales_order.carrier_code;
        this.form.carrier_name = sales_order.carrier_name;
        this.form.carrier_service = sales_order.carrier_service;
        this.form.my_sales_channel_id = sales_order.my_sales_channel_id;
        this.form.my_sales_channel = sales_order.my_sales_channel;
        this.form.is_invoiceDraft = sales_order.invoice_status;
      },

      dueDateTime(setDate) {
        const dateConfig = {
          defaultDate: setDate,
          dateFormat: "Y-m-d",
          altFormat: "j M Y",
          altInput: true
        };
        $(".flatpickr-due").flatpickr(dateConfig);
      },

      dateTime(setDate) {
        const dateConfig = {
          defaultDate: setDate,
          dateFormat: "Y-m-d",
          altFormat: "j M Y",
          altInput: true
        };
        $(".flatpickr").flatpickr(dateConfig);
      },

      async fetchContactList() {

        this.loadingContact = true;
        try {
          const res = await axios.get(`contacts?include_area=true`, {
            params: {
              page: 1,
              per_page: 9999,
              sort: "created_at.desc",
              filter: "all",
              q: ""
            }
          });

          if (!responseOk(res.data.code)) {
            throw new Error(res.data.message)
          }

          this.list.contact_list = res.data.data;
          this.loadingContact = false;
        } catch (err) {
          this.loadingContact = false;
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      async fetchProductList() {
        this.loadingList = true;
        const product_list_response = await axios.get("items", {
          params: {
            page: 1,
            per_page: 9999,
            sort: "created_at.desc",
            filter: "all",
            q: "",
            leaf_only: true
          }
        });

        this.list.product_list = product_list_response.data.data;
        this.loadingList = false;
      },

      async salesChannel(params = {}) {
        try {
          const defaultParams = {
            filter: 'all',
            page: 1,
            per_page: 9999,
            sort: 'sales_channel_id.asc',
          }

          const query = Object.assign({}, defaultParams, params)

          const res = await axios.get(`my_channels`, {params: query})

          if (!responseOk(res.data.code)) {
            throw new Error(res.data.message)
          }

          this.list.channels = res.data.data
        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }

      },

      async fetchTaxSetting() {
      },

      async editSelectedContact() {
        window.open(`/contacts/${this.selected_contact.contact_id}/edit`);
      },

      /**
       * Invoice email addresses
       */
      updateEmail(emails) {
        this.form.invoice_email = emails.join(", \s");
      },

      /**
       * Update data "always use draft"m until "marked as sent".
       * That's why there is no "is_draft".
       */
      async save(evt) {
        try {
          if (!this.form.due_date) this.form.due_date = this.form.invoice_date;

          let res;
          let sales_order_id = this.$route.params.id;

          if (evt.target.dataset.value === "save_as_draft") {
            this.form.is_draft = 1;
          } else {
            this.form.is_draft = 0;
          }

          // When use add new contact form field
          if (this.ui.showAddNewContactField) {
            const res = await axios.post(`contacts`, this.newContact)

            if (!responseOk(res.data.code)) {
              throw new Error(res.data.message)
            }

            this.form.contact_id = res.data.data.contact_id
            this.form.billing_address = this.newContact.billing_address
          }

          if (!this.form.contact_id) {
            Alert.error('Please select a customer or create new contact.')
            return
          }

          if (sales_order_id) {
            res = await this.form.post(`sales_orders/${sales_order_id}/update`);

            if (!responseOk(res.data.code)) {
              throw new Error(res.data.message)
            }
          } else {
            res = await this.form.post(`sales_orders`);

            if (!responseOk(res.data.code)) {
              alert(res.data.message)
              throw new Error(res.data.message)
            }

            sales_order_id = res.data.data.sales_order_id;
          }

          const invoice_id = res.data.data.invoices[0].invoice_id;

          this.dirtyForm = false

          switch (evt.target.dataset.value) {
            case "save_and_send_invoice":
              Router.push({
                name: "sales.email",
                params: {
                  sales_order_id,
                  invoice_id
                },
                query: {
                  state: "send_invoice"
                }
              });
              break;

            case "save_and_pay":
              Router.push({
                name: "sales.detail",
                params: {
                  id: sales_order_id
                },
                query: {
                  state: "pay"
                }
              });
              break;

            case "save_and_close":
              Router.push({
                name: "sales.detail",
                params: {id: sales_order_id}
              });
              break;

            case "save_then_create_new":
              Router.replace({name: "sales.create"});
              break;
          }

          if (evt.target.dataset.value !== 'save_then_duplicate') {
            this.resetForm();
          }

          swal_success(res)
        } catch (err) {
          console.error(err);
          if (err.hasOwnProperty("response")) {
            swal_error(err)
          }
        }
      },

      async selectContact(contact) {
        this.dirtyForm = true;
        try {
          const contact_id = contact.contact_id
          const res = await axios.get(`contacts/${contact_id}?include_area=true`);
          if (!responseOk(res.data.code)) {
            throw new Error(res.data.message)
          }
          this.selected_contact = res.data.data;
          this.form.contact_id = this.selected_contact.contact_id
          this.form.billing_address = this.selected_contact.billing_address
          this.form.billing_region = this.selected_contact.billing_region
          this.form.billing_district = this.selected_contact.billing_district
          this.form.billing_province = this.selected_contact.billing_province
          this.form.billing_country = this.selected_contact.billing_country
          this.form.billing_zip = this.selected_contact.billing_zip
          this.form.billing_fax = this.selected_contact.billing_fax
          this.form.shipping_address = this.selected_contact.shipping_address
          this.form.shipping_region = this.selected_contact.shipping_region
          this.form.shipping_district = this.selected_contact.shipping_district
          this.form.shipping_province = this.selected_contact.shipping_province
          this.form.shipping_country = this.selected_contact.shipping_country
          this.form.shipping_zip = this.selected_contact.shipping_zip
          this.form.shipping_fax = this.selected_contact.shipping_fax
        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
      },

      clearSelectedContact() {
        this.selected_contact = null;
        this.ui.showAddNewContactField = false;
      },

      searchContact() {
        //
      },

      async selectProduct(product) {
        this.dirtyForm = true;
        this.selected_product = product;

        Vue.nextTick(() => {
          // console.log(product)
          this.selected_product = null;
        });

        //reject the item if stock_quantity smaller than 1
        if (product.track_inventory && product.stock_quantity < 1) {
          console.info('Insufficient item stock');
          let res = {
            data: {
              code: 500,
              message: "Insufficient item stock"
            }
          };

          swal_error(res);
        } else {
          if(_.map(this.form.details, 'item_id').indexOf(product.item_id) == -1){
            this.form.details.push({
              stock_quantity: product.stock_quantity,
              item_id: product.item_id,
              item_name: product.item_name,
              item_quantity: product.item_quantity || 1,
              item_rate: product.sales_rate,
              discount_contact_id: product.discount_contact_id,
              discount_amount_type: product.discount_amount_type || "fixed",
              discount_amount_value: product.discount_amount_value || 0
            })
          }else{
            Alert.error('Selected item is already on the list!')
          }
        }
      },

      removeProduct(product) {
        const index = this.form.details.indexOf(product);
        this.form.details.splice(index, 1);
      },

      searchProduct() {
        //
      },

      async selectSalesChannel(channel) {
        if (channel) {
          const my_sales_channel_id = (this.form.my_sales_channel_id = channel.id);
          const my_sales_channel = (this.form.my_sales_channel = channel.store_name);
          const res = await axios.get(`my_channels/${my_sales_channel_id}`);
          if (!responseOk(res.data.code)) {
            throw new Error(res.data.message)
          }
          this.selected_sales_channel = res.data.data;
        }
      },

      clearSelectedSalesChannel() {
        this.selected_sales_channel = null;
        this.form.my_sales_channel = null;
        this.form.my_sales_channel_id = null;
      },

      updateDiscountType(product) {
        this.amount(product);
      },

      updateDiscountValue(product) {
        this.amount(product);
      },

      /**
       * Sales rate + tax
       *
       * @param {Object} item
       * @return {float|int}
       */
      sales_rate(item) {
        return item.item_rate ? item.item_rate : item.sales_rate;
      },

      /**
       * Price + discount
       */
      amount(item) {
        const sales_rate = this.sales_rate(item);

        if (!item.discount_amount_value || !item.discount_amount_type) {
          return parseFloat(sales_rate) * parseInt(item.item_quantity);
        }

        if (item.discount_amount_type == "fixed") {
          return (
            (parseFloat(sales_rate) - parseFloat(item.discount_amount_value)) *
            parseInt(item.item_quantity)
          );
        }

        if (item.discount_amount_type == "percentage") {
          const discount =
            parseFloat(sales_rate) * parseFloat(item.discount_amount_value) / 100;
          return (
            (parseFloat(sales_rate) - discount) * parseInt(item.item_quantity)
          );
        }
      },

      /**
       * Adjustment label toggle
       */
      adjustmentEditToggle(show) {
        this.ui.adjustment_edit = show;
      },
      resetForm() {
        this.form = new Form({
          invoice_date: dateFormat(new Date(), "DD MMM YYYY"),
          due_date: dateFormat(new Date(), "DD MMM YYYY"),
          contact_id: null,
          sales_order_date: dateFormat(new Date(), "DD-MMM-YYYY"),
          shipment_date: null,
          carrier_id: null,
          discount_contact_id: null,
          discount_amount_type: "fixed",
          discount_amount_value: 0,
          shipping_weight: 1,
          shipping_weight_unit: "gr",
          shipping_rate: 0,
          adjustment_name: "",
          adjustment_value: 0,
          shipping_charge: 0,
          internal_notes: "",
          customer_notes: "",
          term_and_condition: "",
          term_date: dateFormat(new Date(), "DD-MMM-YYYY"),
          invoice_email: "", // foo@example.com,bar@example.com
          billing_address: "",
          billing_region: null,
          billing_district: null,
          billing_province: null,
          billing_country: null,
          billing_zip: null,
          billing_fax: null,
          shipping_address: "",
          shipping_region: null,
          shipping_district: null,
          shipping_province: null,
          shipping_country: null,
          shipping_zip: null,
          shipping_fax: null,
          tax_included: 1,
          is_draft: 0,
          carrier_code: "",
          carrier_name: "",
          carrier_service: "",
          my_sales_channel_id: null,
          my_sales_channel: null,
          details: []
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .panel-body.midd-pannel {
    border: 1px solid #cecece;
  }
  .right-pannel{
    .ion-ios7-arrow-down:before,
    .fa-calendar:before{
      color: #3ea9e8;
    }
    input{
      background: #eaeaea
    }
    input.flatpickr-due.form-control.flatpickr-input.form-control.input {
      background: #eeeeee;
    }
    input.flatpickr.form-control.flatpickr-input.form-control.input {
      background: #eaeaea;
    }
    .main.text-muted {
      background: #eaeaea;
    }
  }
  .customer-wrapper{

    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    position: relative;
    .vuelist{
      box-shadow: none;
      background: #eee;
      width:100%;
      .list{
        width:100% !important;
      }
      .main.text-muted{
        background-color:#eee !important;
      }
    }
  }
  .flatpickr {
    background: white;
  }

  .add-new-contact-btn {
    border: 1px dashed #aaa;
    height: 100px;
    padding: 10px;
    color: #aaa;
    cursor: pointer;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: #3ea9e8;
    color: #3ea9e8;
  }

  .btn-add-customer{
    width: 100%;
  }

  .add-new-contact-btn:hover {
    color: white;
    background: #89b5eb;
  }
  textarea{
    border: none;
    resize: none;
  }
  textarea:hover{
    border: 1px solid #ddd
  }
  textarea:focus{
    border: 1px solid #ddd
  }
  textarea::-webkit-resizer {
  display: none;
}

.panel.panel-default.bottom-pannel {
  background: #eee;
  box-shadow: none;
  .panel .panel-body {
    padding: 20px 0;
  }
  textarea {
    background: transparent;
  }
}
table.empty-table {
  display: table;
  height: 100px;
}

.right-pannel .channels-length .ion-ios7-arrow-down:before {
  color: #3ea9e8;
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
}

.channels-length,
.normal-mode.selected-contact {
  display: block;
  width: 100%;
  position: relative;
  overflow: visible;
}
.close-button {
  position: relative;
  display: inline-block;
}
.channel-list {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.normal-mode.selected-contact {
  height: 40px;
}
.contact-wrap,
.form-group.list-wrap {
  display: block;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.contact-list {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
}
</style>
