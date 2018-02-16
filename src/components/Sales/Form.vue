<template>
  <div class="content-page">
    <div class="content" style="padding-left: 0px; padding-right: 0px">
        <form action="POST" @submit.prevent>

                <!-- Page-Title -->
                <div class="col-md-6">
                    <h4 class="pull-left page-title">Create New Order</h4>
                </div>
                <div class="col-md-3">
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
                </div>

                <div class="row">
                    <div class="col-md-8" style="margin-left: 0px">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Items</h3>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                      <vuelist
                                        @change="selectProduct"
                                        @search="searchProduct"
                                        :options="list.product_list"
                                        :value="selected_product"
                                        placeholder="Select product"
                                        keyid="item_id"
                                        label="item_name"
                                      ></vuelist>

                                        <br>

                                        <div class="sahito-table-new-order border-1 table-responsive">
                                          <table class="table table-hover default-table sahito-list-contact--table table-striped">
                                            <thead>
                                            <tr style="color: #777">
                                              <td style="padding-left: 0px" width='30%'>Item</td>
                                              <td width="8.75%">Qty</td>
                                              <td width="17.5%">Rate</td>
                                              <td width="26.25%">Discount</td>
                                              <td class="text-right" width="17.5%">Amount</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="product in form.details">
                                              <td v-text="product.item_name" width='30%' style="padding-left:0px"></td>
                                              <td width="8.75%">
                                                <input type="number" v-model.number="product.item_quantity" min="1" max="99999" class="form-control" style="padding-left:5px; padding-right:0px">
                                              </td>

                                              <td width="17.5%">
                                                <input type="number" v-model.number="product.item_rate" min="0" max="99999999" class="form-control custom">
                                              </td>

                                              <td width="26.25%">
                                                <div class="col-md-4" style="padding-right: 0px; padding-left:0px">
                                                  <select style="padding-left: 0px;" v-model="product.discount_amount_type" @change="updateDiscountType(product)"
                                                          class="form-control">
                                                    <option v-for="value, key in list.discount_unit" :value="key" v-text="value"></option>
                                                  </select>
                                                </div>
                                                <div class="col-md-8">
                                                  <input type="number"
                                                          v-model.number="product.discount_amount_value"
                                                          @change="updateDiscountValue(product)"
                                                          class="form-control">
                                                </div>
                                              </td>

                                              <td width="17.5%"class="text-right" style="vertical-align: middle; padding-left:0px">{{ amount(product) | money }}</td>

                                              <td style="vertical-align: middle;">
                                                <a @click="removeProduct(product)" href="javascript:void(0);" class="text-danger"><i
                                                  class="ion-close-circled"></i></a>
                                              </td>

                                            </tr>
                                            </tbody>
                                          </table>
                                          <table class="table">
                                            <thead>
                                                <th style="width: 60%; border-bottom: 0px"></th>
                                                <th style="width: 20%; border-bottom: 0px"></th>
                                                <th style="width: 20%; border-bottom: 0px"></th>
                                            </thead>
                                            <tbody>
                                              <tr class="total">
                                                <td class="text-right"></td>
                                                <td class="text-right">Sub total</td>
                                                <td class="text-right">{{ subtotal | money }}</td>
                                              </tr>
                                              <tr class="total">
                                                <td class="text-right" style=" border-top-color: white; padding-bottom: 10px; padding-right: 0px"></td>
                                                <td class="text-right">PPN 10%</td>
                                                <td class="text-right">{{ tax_value }}</td>
                                              </tr>
                                              <tr class="total">
                                                <td  style=" border-top-color: white; padding-bottom: 10px; padding-right: 0px">
                                                </td>
                                                <td class="text-right" style="padding-left: 0px">
                                                  <input
                                                    v-model.trim="form.adjustment_name"
                                                    type="text"
                                                    class="form-control form-white"
                                                    style="max-width: 300px;"
                                                    placeholder="Adjustment"
                                                  />
                                                </td>
                                                <td style="padding-right: 0px">
                                                  <div class="input-group pull-right">
                                                    <span class="input-group-addon" style="color:  #666;">Rp</span>
                                                    <vue-numeric
                                                      v-model="form.adjustment_value"
                                                      :minus="true"
                                                      separator="."
                                                      style="max-width: 100%;"
                                                      maxlength="20"
                                                      class="form-control form-white text-right"
                                                      placeholder=""
                                                    ></vue-numeric>
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr class="total">
                                                <td class="no-bgr text-right" style="border-top-color: white; border-bottom-color: white; padding-bottom: 10px; padding-right: 0px"></td>
                                                <td class="text-right" style="font-size: 20px">Total</td>
                                                <td class="text-right" style="font-size: 20px">{{ grandTotal | money }}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Notes</h3>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
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
                                        <div class="container">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Contacts</h3>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group" style="margin-bottom: 0px">
                                            <label style="font-weight: normal">Invoice to:</label>
                                        </div>
                                        <div v-if="ui.add_contact_mode" class="add-mode">
                                          <div class="col-md-11" style="padding-left: 0px; padding-right: 0px">
                                            <div class="form-group">
                                              <span class="alert-danger" v-if="contact.errors.first_name">{{ contact.errors.first_name[0] }}</span>
                                              <input type="text" class="form-control" v-model="contact.display_name" required placeholder="Your Client's Name (required)">
                                            </div>
                                            <div class="form-group">
                                              <span class="alert-danger" v-if="contact.errors.billing_address">{{ contact.errors.billing_address[0] }}</span>
                                              <textarea class="form-control" v-model="contact.billing_address" placeholder="Your Client's Address"></textarea>
                                            </div>
                                            <div class="form-group">
                                              <span class="alert-danger" v-if="contact.errors.phone">{{ contact.errors.phone[0] }}</span>
                                              <input type="text" class="form-control" v-model="contact.phone" placeholder="Your Client's Phone" minlength="9" maxlength="15">
                                            </div>
                                            <div class="form-group">
                                              <span class="alert-danger" v-if="contact.errors.email">{{ contact.errors.email[0] }}</span>
                                              <input type="email" class="form-control" v-model="contact.email" placeholder="Your Client's Email">
                                            </div>

                                            <!--<div class="form-group">
                                              <button class="btn btn-primary" @click="addNewContact">Add New Contact</button>
                                            </div>-->
                                          </div>

                                          <div class="col-md-1">
                                            <a @click="clearSelectedContact" href="javascript:void(0)" class="text-danger">
                                              <i class="ion-close-circled" style="font-size:12pt"></i>
                                            </a>
                                          </div>
                                        </div>
                                        <div v-if="!ui.add_contact_mode" class="normal-mode">
                                          <div class="col-md-11" style="padding-left: 0px; padding-right: 0px; padding-bottom: 10px">
                                            <vuelist
                                              @change="selectContact"
                                              @search="searchContact"
                                              :options="list.contact_list"
                                              :value="selected_contact && selected_contact.contact_id"
                                              placeholder="Search a customer"
                                              keyid="contact_id"
                                              label="display_name"
                                            ></vuelist>
                                            <div v-if="!selected_contact" @click="addContactMode()" class="add-new-contact-btn">
                                              + Add New Contact
                                            </div>
                                          </div>
                                          <div class="col-md-1" v-if="selected_contact">
                                            <a @click="clearSelectedContact" href="javascript:void(0)" class="text-danger">
                                              <i class="ion-close-circled" style="font-size:12pt"></i>
                                            </a>
                                          </div>
                                          <!--<div class="col-md-1" v-if="!selected_contact">-->
                                          <!--<a href="javascript:void(0)" onclick="window.open('/contacts/create')" class="btn btn-default"><i class="fa fa-plus"></i></a>-->
                                          <!--</div>-->
                                        </div>
                                        <div class="normal-mode" v-if="selected_contact">
                                          <div class="col-md-10" style="padding-left: 0px">
                                            <div class="text-bold">
                                              Billing Address
                                              <a href="javascript:void(0)" @click="editSelectedContact">
                                                <i class="fa fa-fw fa-pencil"></i>
                                              </a>
                                            </div>
                                            <div v-text="selected_contact.billing_address"></div>
                                            <div v-text="selected_contact.billing_province_detail && selected_contact.billing_province_detail.name"></div>
                                            <div v-text="selected_contact.billing_zip"></div>
                                            <div v-text="selected_contact.billing_country_detail && selected_contact.billing_country_detail.name"></div>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Sales Info</h3>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group" style="margin-bottom: 0px">
                                            <label style="font-weight: normal">Sales from:</label>
                                        </div>
                                          <vuelist
                                            @change="selectSalesChannel"
                                            :options="list.channels"
                                            :value="selected_salesChannel"
                                            placeholder="Search a sales channel"
                                            keyid="sales_channel_id"
                                            label="store_name"
                                          ></vuelist>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

<!-- END OF HTML VERSION-->
<!--OLD VERSION-->
            <!-- <h2 class="lead">Sales Order</h2>
            <hr>

            <div class="row">
              <div class="col-md-2">
                <label>Invoice date</label>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <div class="input-group">
                    <input v-model="form.invoice_date" required class="flatpickr form-control">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <label>Due date</label>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <div class="input-group">
                    <input v-model="form.due_date" class="flatpickr form-control">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                  </div>
                </div>
              </div>
            </div>

            <hr>

            <div class="form-group row">
              <label class="control-label col-md-2">Customer</label>
              <div class="col-md-4">
                <vuelist
                  @change="selectContact"
                  @search="searchContact"
                  :options="list.contact_list"
                  :value="selected_contact && selected_contact.contact_id"
                  placeholder="Search a customer"
                  keyid="contact_id"
                  label="display_name"
                ></vuelist>
              </div>
              <div class="col-md-1" v-if="selected_contact">
                <a @click="clearSelectedContact" href="javascript:void(0)" class="btn btn-default btn-xs"><i
                  class="fa fa-times"></i></a>
              </div>
              <div class="col-md-1" v-if="!selected_contact">
                <a href="javascript:window.open('/contacts/create')"><i class="fa fa-plus"></i></a>
              </div>
            </div>

            <div class="row" v-if="selected_contact">
              <div class="col-md-2"></div>
              <div class="col-md-2">
                <div class="text-bold">
                  Billing Address
                  <a href="javascript:void(0)" @click="editSelectedContact">
                    <i class="fa fa-fw fa-pencil"></i>
                  </a>
                </div>
                <div v-text="selected_contact.billing_address"></div>
                <div v-text="selected_contact.billing_province_detail && selected_contact.billing_province_detail.name"></div>
                <div v-text="selected_contact.billing_zip"></div>
                <div v-text="selected_contact.billing_country_detail && selected_contact.billing_country_detail.name"></div>
              </div>
              <div class="col-md-4">
                <div class="text-bold">
                  Shipping Address
                  <a href="javascript:void(0)" @click="editSelectedContact">
                    <i class="fa fa-fw fa-pencil"></i>
                  </a>
                </div>
                <div v-text="selected_contact.shipping_address"></div>
                <div
                  v-text="selected_contact.shipping_province_detail && selected_contact.shipping_province_detail.name"></div>
                <div v-text="selected_contact.shipping_zip"></div>
                <div v-text="selected_contact.shipping_country_detail && selected_contact.shipping_country_detail.name"></div>
              </div>
            </div>

            <hr>

              <div class="form-group row">
                <label class="control-label col-md-2">Product</label>
                <div class="col-md-4">
                  <vuelist
                    @change="selectProduct"
                    @search="searchProduct"
                    :options="list.product_list"
                    :value="selected_product"
                    placeholder="Select product here"
                    keyid="item_id"
                    label="item_name"
                  ></vuelist>
                </div>

              </div>

              <div class="row sahito-list">
                <div class="sahito-list-contact border-1 table-responsive">
                  <table class="table table-hover default-table sahito-list-contact--table table-striped">
                    <thead>
                    <tr style="color: #777">
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th colspan="2">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="product in form.details">
                      <td v-text="product.item_name"></td>
                      <td width="90">
                        <input type="number" v-model.number="product.item_quantity" min="1" class="form-control">
                      </td>

                      <td>
                        <input type="number" v-model.number="product.item_rate" min="0" class="form-control no-spin-button">
                      </td>

                      <td>
                        <div class="col-md-3">
                          <select v-model="product.discount_amount_type" @change="updateDiscountType(product)"
                                  class="form-control">
                            <option v-for="value, key in list.discount_unit" :value="key" v-text="value"></option>
                          </select>
                        </div>
                        <div class="col-md-9">
                          <input type="number"
                                v-model.number="product.discount_amount_value"
                                @change="updateDiscountValue(product)"
                                class="form-control">
                        </div>
                      </td>

                      <td class="text-right">{{ amount(product) | money }}</td>

                      <td>
                        <a @click="removeProduct(product)" href="javascript:void(0);" class="text-danger"><i
                          class="ion-close-circled"></i></a>
                      </td>

                    </tr>
                    </tbody>
                    <tfoot>
                    <tr class="total text-bold">
                      <td colspan="4" class="text-right">Sub total</td>
                      <td colspan="4" class="text-right">{{ subtotal | money }}</td>
                    </tr>
                    <tr class="total text-bold">
                      <td colspan="4" class="text-right">PPN 10%</td>
                      <td colspan="4" class="text-right">{{ tax_value | money }}</td>
                    </tr>
                    <tr class="total text-bold">
                      <td colspan="3">
                        <input
                          v-model.trim="form.adjustment_name"
                          type="text"
                          class="form-control form-white"
                          style="max-width: 300px;"
                          placeholder="Adjustment"
                        />
                      </td>
                      <td colspan="3">
                        <div class="input-group pull-right">
                          <span class="input-group-addon">Rp</span>
                          <input type="number" min="0" class="form-control form-white text-right" style="max-width: 100%;"
                                placeholder="" v-model.number="form.adjustment_value">
                        </div>
                      </td>
                    </tr>
                    <tr class="total text-bold">
                      <td colspan="4" class="text-right" style="font-size: 18px">Total</td>
                      <td colspan="4" class="text-right" style="font-size: 18px">{{ grandTotal | money }}</td>
                    </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div class="row  m-b-20">
                <div class="row  m-b-20">
                </div>
              </div>

              <div class="row m-b-20">
                <div class="col-md-6 pl-pr-0">
                </div>
                <div class="col-md-6 pl-pr-0">
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-3 control-label text-left">Customer Notes</label>
                    <textarea
                      class="form-control"
                      rows="5"
                      v-model="form.customer_notes"
                      maxlength="500"
                    ></textarea>
                    <div class="">Will be displayed in invoice</div>
                    <div class="help-text">Maximum customer notes characters is 500.</div>
                  </div>
                </div>
              </div>
              <div class="row m-b-20">
                <div class="col-md-6 pl-pr-0">
                </div>
                <div class="col-md-6 pl-pr-0">
                  <div class="form-group form-general m-b-20">
                    <label class="control-label text-left">Terms & Conditions</label>
                    <textarea
                      class="form-control"
                      rows="5"
                      v-model="form.term_and_condition"
                      maxlength="500"
                    ></textarea>
                    <div class="">Will be displayed in invoice.</div>
                    <div class="help-text">Maximum customer notes characters is 500.</div>
                  </div>
                </div>
              </div>
              <div class="row m-b-20">
                <div class="col-md-6 pl-pr-0">
                </div>
                <div class="col-md-6 pl-pr-0">
                  <div class="form-group form-general m-b-20">
                    <label class="control-label text-left">Internal Notes</label>
                    <textarea
                      class="form-control"
                      rows="5"
                      v-model="form.internal_notes"
                      maxlength="500"
                    ></textarea>
                    <div class="">Internal use only. Will not be displayed anywhere.</div>
                    <div class="help-text">Maximum customer notes characters is 500.</div>
                  </div>
                </div>
              </div>

              <div class="row m-b-20">
                <div class="col-md-6 pl-pr-0">
                </div>
                <div class="col-md-6 pl-pr-0">
                  <div class="form-group form-general">
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
              </div> -->
<!--END OF OLD VERSION-->

            <div class="float-save">
              <div class="row">
                <div class="col-md-6 text-left">
                  <router-link :to="{ name: 'sales.index' }" class="btn btn-default waves-effect">
                    <i class="fa fa-chevron-left"></i> Cancel
                  </router-link>
                </div>
                <div class="col-md-6 text-right">
                  <button type="button" class="btn btn-default" data-value="save_as_draft"
                          @click="save($event)">Save as Draft
                  </button>
                  <div class="btn-group dropup">
                    <button type="button" class="btn btn-primary" data-value="save_and_close"
                            @click="save($event)">Save then Close
                    </button>
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="javascript:void(0);" data-value="save_and_pay" @click="save($event)">Save then Pay</a></li>
                      <li><a href="javascript:void(0);" data-value="save_then_create_new" @click="save($event)">Save and
                        New</a></li>
                      <li><a href="javascript:void(0);" data-value="save_then_duplicate" @click="save($event)">Save and
                        Duplicate</a></li>
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
  import Vuelist from "../Vuelist";
  import Vuetagger from "../Vuetagger";
  import Router from "src/router";
  import Form from "../../helpers/Form";
  import dateFormat from "date-fns/format";
  import VueNumeric from 'vue-numeric'

  export default {
    name: "SalesOrderForm",

    components: {
      Vuelist,
      Vuetagger,
      VueNumeric,
    },

    watch: {
      "form.invoice_date"(val) {
        this.form.due_date = val;
      }
    },

    computed: {
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
        if (_.isNumber(_.toNumber(this.form.adjustment_value))) {
          adjustmentValue = _.toNumber(this.form.adjustment_value);
        }

        return this.subtotal + taxValue + adjustmentValue;
      },

      invoice_emails() {
        return this.form.invoice_email
          ? this.form.invoice_email.split(/\s*,\s*/)
          : [];
      }
    },

    data() {
      return {
        ui: {
          adjustment_edit: false,
          invalidInvoiceEmail: false
        },
        list: {
          discount_unit: [],
          weight_unit: [],
          contact_list: [],
          product_list: [],
          channels: [],
        },
        selected_contact: null,
        selected_product: null,
        selected_salesChannel: null,
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
          details: []
        })
      };
    },

    mounted() {
      this.initialize()
      this.salesChannel()
    },

    methods: {
      async initialize() {
        if (this.$route.params.id) {
          const sales_order_id = this.$route.params.id;
          const res = await axios.get(`sales_orders/${sales_order_id}/edit`);
          this.edit(res.data.data.sales_order);
          this.list.discount_unit = res.data.data.discount_unit;
          this.list.weight_unit = res.data.data.weight_unit;
          this.tax_included = res.data.data.tax_included;
        } else {
          const res = await axios.get("sales_orders/create");
          this.list.discount_unit = res.data.data.discount_unit;
          this.list.weight_unit = res.data.data.weight_unit;
          this.tax_included = res.data.data.tax_included;
        }

        await this.dateTime();
        await this.fetchContactList();
        await this.fetchProductList();
        await this.fetchTaxSetting();
      },

      async salesChannel (params = {}) {
        const defaultParams = {
          filter: 'all',
          page: 1,
          per_page: 10,
          sort: 'sales_channel_id.asc',
        }

        const query = Object.assign({}, defaultParams, params)

        const res = await axios.get(`my_channels`, {params: query})
        this.list.channels = res.data.data
      },

      selectSalesChannel (){

      },

      async edit(sales_order) {
        this.selectContact(sales_order.contact);

        const res = await axios.get(
          `sales_orders/${sales_order.sales_order_id}/details`
        );
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
        this.form.adjustment_value = sales_order.adjustment_value;
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
      },

      dateTime() {
        const dateConfig = {
          defaultDate: new Date(),
          dateFormat: "Y-m-d",
          altFormat: "j M Y",
          altInput: true
        };
        $(".flatpickr").flatpickr(dateConfig);
      },

      async fetchContactList() {
        const contact_list_response = await axios.get("contacts", {
          params: {
            page: 1,
            per_page: 9999,
            sort: "created_at.desc",
            filter: "all",
            q: ""
          }
        });

        this.list.contact_list = contact_list_response.data.data;
      },

      async fetchProductList() {
        const product_list_response = await axios.get("items", {
          params: {
            page: 1,
            per_page: 9999,
            sort: "created_at.desc",
            filter: "all",
            q: ""
          }
        });

        this.list.product_list = product_list_response.data.data;
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
        this.form.invoice_email = emails.join(",");
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

          if (sales_order_id) {
            res = await this.form.post(`sales_orders/${sales_order_id}/update`);
          } else {
            res = await this.form.post(`sales_orders`);
            sales_order_id = res.data.data.sales_order_id;
          }

          const invoice_id = res.data.data.invoices[0].invoice_id;

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

          Alert.success(res.data.message);
        } catch (err) {
          console.error(err);
          if (err.hasOwnProperty("response")) {
            Alert.error(err.response.data.message);
          }
        }
      },

      async selectContact(contact) {
        const contact_id = (this.form.contact_id = contact.contact_id);
        const res = await axios.get(`contacts/${contact_id}`);
        this.selected_contact = res.data.data;
      },

      clearSelectedContact() {
        this.selected_contact = null;
      },

      searchContact() {
        //
      },

      async selectProduct(product) {
        this.selected_product = product;
        Vue.nextTick(() => {
          this.selected_product = null;
        });
        this.form.details.push({
          item_id: product.item_id,
          item_name: product.item_name,
          item_quantity: product.item_quantity || 1,
          item_rate: product.sales_rate,
          discount_contact_id: product.discount_contact_id,
          discount_amount_type: product.discount_amount_type || "fixed",
          discount_amount_value: product.discount_amount_value || 0
        });
      },

      removeProduct(product) {
        const index = this.form.details.indexOf(product);
        this.form.details.splice(index, 1);
      },

      searchProduct() {
        //
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
          details: []
        });
      }
    }
  };
</script>

<style scoped>
  .flatpickr {
    background: white;
  }

  .add-new-contact-btn {
  border: 1px dashed #89bbeb;
  height: 100px;
  padding: 10px;
  color: #89bbeb;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-new-contact-btn:hover {
  color: white;
  background: #89b5eb;
}
</style>
