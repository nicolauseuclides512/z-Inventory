<template>
  <div class="content-page">
    <div class="content " style="padding-left: 0px; padding-right: 0px">
      <!-- <div class="container"> -->
        <form method="POST" action="#" @submit.prevent="save">
          <div class="col-md-12" style="padding-left:0px">
              <h4 v-if="this.$route.params.id" class="pull-left page-title">Edit Contact</h4>
              <h4 v-if="!this.$route.params.id" class="pull-left page-title">New Contact</h4>
          </div>

          <!-- Row:1 Contact Info -->
          <div class="row">
            <div class="col-md-2">
              <!-- Left Panel : 1 Contact Info Guide -->
              <div class="panel panel-default" style="background-color:transparent; box-shadow:none">
                <div class="panel-body" style="padding:0px">
                  Information <br>
                  <small class="text-muted">This section contain the overview of your contact's information.</small>
                </div>
              </div>
            </div>
            <div class="col-md-9">
              <!-- Right Panel : 1 Contact Info Form -->
              <div class="panel panel-default">
                <div class="panel-body">
                  <div class="form-horizontal">
                    <div class="form-group form-general m-b-20">
                      <label class="col-md-2 control-label text-left">Type</label>
                      <div class="col-md-10">
                        <div class="checkbox checkbox-success checkbox-inline">
                          <input type="checkbox" id="inlineCheckbox1" v-model="form.is_customer">
                          <label for="inlineCheckbox1">Customer</label>
                        </div>
                        <div class="checkbox checkbox-success checkbox-inline">
                          <input type="checkbox" id="inlineCheckbox2" v-model="form.is_dropshipper">
                          <label for="inlineCheckbox2">Dropshipper</label>
                        </div>
                        <!-- <div class="checkbox checkbox-success checkbox-inline">
                          <input type="checkbox" id="inlineCheckbox3" v-model="form.is_vendor">
                          <label for="inlineCheckbox3">Vendor</label>
                        </div> -->
                        <div class="checkbox checkbox-success checkbox-inline">
                          <input type="checkbox" id="inlineCheckbox4" v-model="form.is_reseller">
                          <label for="inlineCheckbox4">Resellers</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group form-general m-b-20">
                      <label class="col-md-2 control-label text-left">Name *</label>
                        <!-- <div class="col-md-2">
                          <select id="salutation_id" v-model="form.salutation_id" class="form-control" title="Salutation">
                            <option :value="null"></option>
                            <option v-for="salutation in list.salutation_list" :value="salutation.salutation_id">
                              {{ salutation.name }}
                            </option>
                          </select>
                        </div> -->
                        <div class="col-md-8">
                          <input
                            type="text"
                            class="form-control"
                            name="first_name"
                            id="first_name"
                            placeholder="Name"
                            ref="firstName"
                            v-model="form.first_name"
                            data-vv-as="name"
                            v-validate="'required'"
                            data-vv-validate-on="blur"
                            maxlength="100"
                          />
                          <span class="error" v-if="errors.first('first_name')">{{ errors.first('first_name') }}</span>
                        </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left">Company Name</label>
                    <div class="col-md-8">
                      <input type="text" class="form-control" placeholder="" maxlength="100" id="company_name"
                            v-model="form.company_name">
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left ">Display Name *</label>
                    <div class="col-md-8">
                      <select name="display_code" id="display_code" v-model="form.display_code" data-vv-as="display name" title="Select display name" class="form-control" v-validate="'required'" data-vv-validate-on="blur">
                        <!-- <option :value="0">{{ displayNameFormat1 }}</option> -->
                        <option :value="1">{{ displayNameFormat2 }}</option>
                        <option :value="2">{{ displayNameFormat3 }}</option>
                      </select>
                      <span class="error" v-if="errors.first('display_code')">{{ errors.first('display_code') }}</span>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left">Email</label>
                    <div class="col-md-8">
                      <input
                        type="email"
                        name="email"
                        class="form-control"
                        placeholder=""
                        id="email"
                        v-model="form.email"
                        maxlength="255"
                        data-vv-validate-on="blur"
                        v-validate="'email'"
                      />
                      <span class="error" v-if="errors.first('email')">{{ errors.first('email') }}</span>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left">Phone</label>
                    <div class="col-md-4">
                      <input type="text" class="form-control" placeholder="Work Phone" maxlength="15" minlength="9" id="phone"
                            @keyup="inputPhone(form.phone, $event)"
                            @blur="inputPhone(form.phone, $event)"
                            v-model="form.phone">
                    </div>
                    <div class="col-md-4">
                      <input type="text" class="form-control" placeholder="Mobile" maxlength="15" minlength="9" id="mobile"
                            @keyup="inputPhone(form.phone, $event)"
                            @blur="inputPhone(form.phone, $event)"
                            v-model="form.mobile">
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label class="col-md-2 control-label text-left">Website</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        name="website"
                        class="form-control"
                        placeholder=""
                        maxlength="255"
                        id="website"
                        v-model="form.website"
                        data-vv-validate-on="blur"
                        v-validate="'url'"
                      />
                      <span class="error" v-if="errors.first('website')">{{ errors.first('website') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          <!-- Row:2 Contact Address -->
          <div class="row">
            <div class="col-md-2">
              <!-- Left Panel : 2 Contact Address Guide -->
              <div class="panel panel-default" style="background-color:transparent; box-shadow:none">
                <div class="panel-body" style="padding:0px">
                  Address<br>
                  <small class="text-muted">The primary address for billing or shipping purpose.</small>
                </div>
              </div>
            </div>
            <div class="col-md-9">

              <!-- Right Panel : 2 Contact Address Form -->
              <div class="panel panel-default">
                <div class="panel-body">
                  <div class="form-horizontal">

                    <!-- Billing Address Goes Here -->
                    <div class="col-md-6" style="padding-left:0px">
                      <div class="form-group form-general m-b-10">
                        <div v-if="form.is_sameAddress =='false'" class="form-group form-general m-b-10">
                          <label class="col-md-4 control-label text-left">Billing Address</label>
                        </div>
                        <div v-if="form.is_sameAddress =='true'" class="form-group form-general m-b-10">
                          <label class="col-md-6 control-label text-left">Billing & Shipping Address</label>
                        </div>
                        <label class="col-md-4 control-label text-left">Country</label>
                        <div class="col-md-8">
                          <select id="billing_country_id" v-model="form.billing_country" class="form-control">
                            <option :value="0" hidden disabled>Select Country</option>
                            <option v-for="country in list.billing_country_list" :value="country.id" v-text="">
                              {{ country.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">Province</label>
                        <div class="col-md-8">
                          <select id="billing_province_id" v-model="form.billing_province" class="form-control"
                                  @change="updateBillingDistrictList" :disabled="!list.billing_province_list.length">
                            <option :value="0" hidden disabled>Select Province</option>
                            <option v-for="province in list.billing_province_list" :value="province.id">
                              {{ province.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">District</label>
                        <div class="col-md-8">
                          <select id="billing_district_id" v-model="form.billing_district" class="form-control"
                                  @change="updateBillingRegionList" :disabled="!list.billing_district_list.length">
                            <option :value="0" hidden disabled>Select District</option>
                            <option v-for="district in list.billing_district_list" :value="district.id">
                              {{ district.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">Region</label>
                        <div class="col-md-8">
                          <select id="billing_region_id" v-model="form.billing_region" class="form-control"
                                  :disabled="!list.billing_region_list.length">
                            <option :value="0" hidden disabled>Select Region</option>
                            <option v-for="region in list.billing_region_list" :value="region.id">{{ region.name }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">Street</label>
                        <div class="col-md-8">
                          <textarea class="form-control" rows="2" id="billing_address"
                                    v-model="form.billing_address" style="resize:vertical"></textarea>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">Zip Code</label>
                        <div class="col-md-8">
                          <input
                            class="form-control"
                            data-vv-as="billing zip code"
                            data-vv-validate-on="blur"
                            id="billing_zip"
                            maxlength="5"
                            name="billing_zip"
                            placeholder="Zip code"
                            ref="billing_zip"
                            type="text"
                            v-model="form.billing_zip"
                            v-validate="'numeric|min:5|max:5'"
                          />
                          <span class="error" v-if="errors.first('billing_zip')">{{ errors.first('billing_zip') }}</span>
                        </div>
                      </div>
                    </div>

                      <!-- Shipping Address Goes Here -->
                    <div v-show="form.is_sameAddress =='false' || this.$route.params.id" class="col-md-6" style="border-left:1px solid #eee">
                      <div class="form-group form-general m-b-10">
                          <label class="col-md-4 control-label text-left">Shipping Address</label>
                        </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">Country</label>
                        <div class="col-md-8">
                          <select id="shipping_country_id" v-model="form.shipping_country" class="form-control">
                            <option :value="0" hidden disabled>Select Country</option>
                            <option v-for="country in list.shipping_country_list" :value="country.id">
                              {{ country.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">Province</label>
                        <div class="col-md-8">
                          <select id="shipping_province_id" v-model="form.shipping_province" class="form-control"
                                  @change="updateShippingDistrictList" :disabled="!list.shipping_province_list.length">
                            <option :value="0" hidden disabled>Select Province</option>
                            <option v-for="province in list.shipping_province_list" :value="province.id">
                              {{ province.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">District</label>
                        <div class="col-md-8">
                          <select id="shipping_district_id" v-model="form.shipping_district" class="form-control"
                                  @change="updateShippingRegionList" :disabled="!list.shipping_district_list.length">
                            <option :value="0" hidden disabled>Select District</option>
                            <option v-for="district in list.shipping_district_list" :value="district.id">{{ district.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">Region</label>
                        <div class="col-md-8">
                          <select id="shipping_region_id" v-model="form.shipping_region" class="form-control"
                                  :disabled="!list.shipping_region_list.length">
                            <option :value="0" hidden disabled>Select Region</option>
                            <option v-for="region in list.shipping_region_list" :value="region.id">{{ region.name }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">Street</label>
                        <div class="col-md-8">
                          <textarea class="form-control" rows="2" id="shipping_address"
                                    v-model="form.shipping_address" style="resize:vertical"></textarea>
                        </div>
                      </div>
                      <div class="form-group form-general m-b-10">
                        <label class="col-md-4 control-label text-left">Zip Code</label>
                        <div class="col-md-8">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Zip code"
                            maxlength="5"
                            data-vv-as="shipping zip code"
                            id="shipping_zip"
                            ref="shipping_zip"
                            name="shipping_zip"
                            v-model="form.shipping_zip"
                            v-validate="'numeric|min:5|max:5'"
                            data-vv-validate-on="blur"
                          />
                          <span class="error" v-if="errors.first('shipping_zip')">{{ errors.first('shipping_zip') }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-if="!this.$route.params.id" class="col-md-8 pl-0">
                      <div  class="form-group form-general m-b-10">
                      <div class="checkbox checkbox-success checkbox-inline">
                        <input
                          v-model="form.is_sameAddress"
                          type="checkbox"
                          id="sameAddress"
                          true-value="true"
                          false-value="false"
                          checked="unchecked"
                        />
                        <label for="sameAddress">Same address between Billing and Shipping</label>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row:3 Contact Notes -->
          <div class="row">
            <div class="col-md-2">
              <!-- Left Panel : 2 Contact Notes Guide -->
              <div class="panel panel-default" style="background-color:transparent; box-shadow:none">
                <div class="panel-body" style="padding:0px">
                  Note<br>
                  <small class="text-muted">Enter any extra notes relating to this customer.</small>
                </div>
              </div>
            </div>
            <div class="col-md-9">
              <!-- Right Panel : 2 Contact Notes Form -->
              <div class="panel panel-default">
                <div class="panel-body">
                  <div class="form-horizontal">
                    <div class="form-group form-general m-b-10">
                      <label class="col-md-2 control-label text-left">
                        Notes <br>
                        <small style="color: #aaa">(For Internal Use)</small>
                      </label>
                      <div class="col-md-8">
                        <textarea id="notes" v-model="form.notes" class="form-control m-l-15" rows="4"
                        style="
                        resize:vertical;
                        margin-left:0px"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="container">
            <div class="row">
              <div class="col-md-12 p-b-20">

                <div class="form-group form-general m-b-20">
                  <label class="col-md-3 control-label text-left">I am a</label>
                  <div class="col-md-9">
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input type="checkbox" id="inlineCheckbox1" v-model="form.is_customer">
                      <label for="inlineCheckbox1">Customer</label>
                    </div>
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input type="checkbox" id="inlineCheckbox2" v-model="form.is_dropshipper">
                      <label for="inlineCheckbox2">Dropshipper</label>
                    </div>
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input type="checkbox" id="inlineCheckbox3" v-model="form.is_vendor">
                      <label for="inlineCheckbox3">Vendor</label>
                    </div>
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input type="checkbox" id="inlineCheckbox4" v-model="form.is_reseller">
                      <label for="inlineCheckbox4">Resellers</label>
                    </div>
                  </div>
                </div>

                <div class="form-group form-general m-b-20">
                  <label class="col-md-3 control-label text-left">Name</label>
                  <div class="col-md-2">
                    <select id="salutation_id" v-model="form.salutation_id" class="form-control" title="Salutation">
                      <option :value="null"></option>
                      <option v-for="salutation in list.salutation_list" :value="salutation.salutation_id">
                        {{ salutation.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="Name" id="first_name" v-model="form.first_name"
                          ref="firstName" maxlength="100" required>
                  </div> -->
                  <!--<div class="col-md-2">-->
                  <!--<input type="text" class="form-control" placeholder="Last Name" id="last_name" v-model="form.last_name" maxlength="100">-->
                  <!--</div>-->
                <!-- </div>
                <div class="form-group form-general m-b-20">
                  <label class="col-md-3 control-label text-left">Company Name</label>
                  <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="" maxlength="100" id="company_name"
                          v-model="form.company_name">
                  </div>
                </div>
                <div class="form-group form-general m-b-20">
                  <label class="col-md-3 control-label text-left text-danger">Display Name</label>
                  <div class="col-md-6">
                    <select id="display_code" v-model="form.display_code" class="form-control"> -->
                      <!--<option :value="0">{{ displayNameFormat1 }}</option>-->
                      <!-- <option :value="1">{{ displayNameFormat2 }}</option>
                      <option :value="2">{{ displayNameFormat3 }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group form-general m-b-20">
                  <label class="col-md-3 control-label text-left">Email</label>
                  <div class="col-md-6">
                    <input type="email" class="form-control" placeholder="" id="email" v-model="form.email" maxlength="255">
                    <div v-if="form.errors && form.errors.email" class="alert alert-danger">
                      {{ form.errors && form.errors.email && form.errors.email[0] }}
                    </div>
                  </div>
                </div>
                <div class="form-group form-general m-b-20">
                  <label class="col-md-3 control-label text-left">Phone</label>
                  <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Work Phone" maxlength="15" minlength="9" id="phone"
                          @keyup="inputPhone(form.phone, $event)"
                          @blur="inputPhone(form.phone, $event)"
                          v-model="form.phone">
                  </div>
                  <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Mobile" maxlength="15" minlength="9" id="mobile"
                          @keyup="inputPhone(form.phone, $event)"
                          @blur="inputPhone(form.phone, $event)"
                          v-model="form.mobile">
                  </div>
                </div>
                <div class="form-group form-general m-b-20">
                  <label class="col-md-3 control-label text-left">Website</label>
                  <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="" maxlength="255" id="website"
                          v-model="form.website">
                  </div>
                </div> -->
                <!--<div class="form-group form-general m-b-20">-->
                <!--<label class="col-md-3 control-label text-left text-danger">Contact Type</label>-->
                <!--<div class="col-md-7">-->
                <!--<div v-for="(type, index) of contactTypeList" class="radio radio-info radio-inline">-->
                <!--<input type="radio" :id="'customer_type-' + type" :value="index" name="contact-type" id="contact_type" v-model="form.contact_type" required>-->
                <!--<label :for="'customer_type-' + type"> {{ type }} </label>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
              <!-- </div>
            </div> -->

            <!-- </div> -->
            <!-- <div class="container bt-1 p-b-10 m-b-20">
            <div class="row">
              <div class="col-md-12">
                <ul class="nav nav-tabs nav-tabs-clear nav-grey btp-1 tabs" style="width: 100%;"> -->
                  <!--
                  <li class="tab" style="width: 33.3333%;">
                    <a href="#payment-details" data-toggle="tab" aria-expanded="false">
                      <span class="hidden-xs">Payment Details</span>
                    </a>
                  </li>
                  -->
                  <!-- <li :class="{ tab: true, active: currentTab === 'address'}" style="width: 50%;">
                    <a href="javascript:void(0)" @click="changeTab('address')" style="line-height:50px"> Address </a>
                  </li>
                  <li :class="{ tab: true, active: currentTab === 'notes'}" style="width: 50%;">
                    <a href="javascript:void(0)" @click="changeTab('notes')" style="line-height:50px">Notes</a>
                  </li>
                  <div class="indicator" style="right: 932px; left: 0px;"></div>
                </ul>
                <div class="tab-content r-pl-pr tab-content-clear"> -->
                  <!--
                  <div class="tab-pane" id="payment-details">
                    <div class="form-group form-general m-b-20">
                      <label class="col-md-3 control-label text-left">Currency</label>
                      <div class="col-md-4">
                        <select id=currency_id v-model="form.currency_id" class="select2 form-control">
                          <option value=""></option>
                          <option v-for="c in currencyList" :value="c.currency_id">{{ c.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group form-general m-b-20">
                      <label class="col-md-3 control-label text-left">Payment Terms</label>
                      <div class="col-md-4">
                        <select id=payment_term_id v-model="form.payment_term_id" class="select2 form-control">
                          <option value=""></option>
                          <option v-for="p in paymentTermsList" :value="p.payment_term_id">{{ p.name }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  -->
                  <!-- <div v-show="currentTab == 'address'">
                    <div class="col-md-6">
                      <p class="m-b-30" style="color: #aaa;">Billing Address</p>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Country</label>
                        <div class="col-md-7">
                          <select id="billing_country_id" v-model="form.billing_country" class="form-control">
                            <option :value="0" hidden disabled>Select Country</option>
                            <option v-for="country in list.billing_country_list" :value="country.id" v-text="">
                              {{ country.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Province</label>
                        <div class="col-md-7">
                          <select id="billing_province_id" v-model="form.billing_province" class="form-control"
                                  @change="updateBillingDistrictList" :disabled="!list.billing_province_list.length">
                            <option :value="0" hidden disabled>Select Province</option>
                            <option v-for="province in list.billing_province_list" :value="province.id">
                              {{ province.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">District</label>
                        <div class="col-md-7">
                          <select id="billing_district_id" v-model="form.billing_district" class="form-control"
                                  @change="updateBillingRegionList" :disabled="!list.billing_district_list.length">
                            <option :value="0" hidden disabled>Select District</option>
                            <option v-for="district in list.billing_district_list" :value="district.id">
                              {{ district.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Region</label>
                        <div class="col-md-7">
                          <select id="billing_region_id" v-model="form.billing_region" class="form-control"
                                  :disabled="!list.billing_region_list.length">
                            <option :value="0" hidden disabled>Select Region</option>
                            <option v-for="region in list.billing_region_list" :value="region.id">{{ region.name }}</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Street</label>
                        <div class="col-md-7">
                          <textarea class="form-control" rows="2" id="billing_address"
                                    v-model="form.billing_address"></textarea>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Zip Code</label>
                        <div class="col-md-7">
                          <input type="text" class="form-control" placeholder="" maxlength="5" id="billing_zip"
                            @keyup="inputZip(form.billing_zip, $event)"
                            @blur="inputZip(form.billing_zip, $event)"
                            v-model="form.billing_zip">
                        </div>
                      </div> -->

                      <!--<div class="form-group form-general m-b-20">-->
                      <!--<label class="col-md-4 control-label text-left">Fax</label>-->
                      <!--<div class="col-md-7">-->
                      <!--<input type="text" class="form-control" placeholder="" maxlength="20" id="billing_fax" v-model="form.billing_fax">-->
                      <!--</div>-->
                      <!--</div>-->

                    <!-- </div>
                    <div class="col-md-6">
                      <p class="m-b-30" style="display: inline-block;color: #aaa;">Shipping Address</p>

                      <a href="javascript:void(0);" @click="copyBillingAddress" class="pull-right">
                        <i class="ion-arrow-down-a"></i>
                        Copy Billing Address
                      </a>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Country</label>
                        <div class="col-md-7">
                          <select id="shipping_country_id" v-model="form.shipping_country" class="form-control">
                            <option :value="0" hidden disabled>Select Country</option>
                            <option v-for="country in list.shipping_country_list" :value="country.id">
                              {{ country.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Province</label>
                        <div class="col-md-7">
                          <select id="shipping_province_id" v-model="form.shipping_province" class="form-control"
                                  @change="updateShippingDistrictList" :disabled="!list.shipping_province_list.length">
                            <option :value="0" hidden disabled>Select Province</option>
                            <option v-for="province in list.shipping_province_list" :value="province.id">
                              {{ province.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">District</label>
                        <div class="col-md-7">
                          <select id="shipping_district_id" v-model="form.shipping_district" class="form-control"
                                  @change="updateShippingRegionList" :disabled="!list.shipping_district_list.length">
                            <option :value="0" hidden disabled>Select District</option>
                            <option v-for="district in list.shipping_district_list" :value="district.id">{{ district.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Region</label>
                        <div class="col-md-7">
                          <select id="shipping_region_id" v-model="form.shipping_region" class="form-control"
                                  :disabled="!list.shipping_region_list.length">
                            <option :value="0" hidden disabled>Select Region</option>
                            <option v-for="region in list.shipping_region_list" :value="region.id">{{ region.name }}</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Street</label>
                        <div class="col-md-7">
                          <textarea class="form-control" rows="2" id="shipping_address"
                                    v-model="form.shipping_address"></textarea>
                        </div>
                      </div>

                      <div class="form-group form-general m-b-20">
                        <label class="col-md-4 control-label text-left">Zip Code</label>
                        <div class="col-md-7">
                          <input type="text" class="form-control" placeholder="" minlength="5" maxlength="5" id="shipping_zip"
                          @keyup="inputZip(form.shipping_zip, $event)"
                           @blur="inputZip(form.shipping_zip, $event)"
                           v-model="form.shipping_zip">
                        </div>
                      </div> -->

                      <!--<div class="form-group form-general m-b-20">-->
                      <!--<label class="col-md-4 control-label text-left">Fax</label>-->
                      <!--<div class="col-md-7">-->
                      <!--<input type="text" class="form-control" placeholder="" maxlength="20" id="shipping_fax" v-model="form.shipping_fax">-->
                      <!--</div>-->
                      <!--</div>-->

                    <!-- </div>
                  </div>

                  <div v-show="currentTab == 'notes'">
                    <div class="col-md-11">
                      <div class="form-group form-general m-b-20">
                        <label class="control-label text-left">
                          Notes <span style="color: #aaa">(For Internal Use)</span>
                        </label>
                        <textarea id="notes" v-model="form.notes" class="form-control m-l-15" rows="4"></textarea>
                      </div>
                    </div>
                  </div> -->

                <!-- </div>.tab-content

              </div>
            </div>
          </div> -->

          <div class="float-save">
            <div class="container">
              <div class="clearfix">
                <div class="pull-right">
                  <button v-if="!saving" type="submit" :disabled="saving" class="btn btn-primary waves-effect waves-light">
                    Save
                  </button>
                  <button v-if="saving" type="submit" :disabled="saving" class="btn btn-default waves-effect waves-light">
                    <i class="fa fa-spin fa-spinner"></i> Saving ...
                  </button>
                </div>
                <div class="pull-left">
                  <router-link :to="{ name: 'contact.index' }" class="btn btn-default" type="button">
                    <i class="fa fa-chevron-left"></i> Cancel
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </form>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import store from 'src/store'
  import Vuelist from '../Vuelist'
  import Form from 'src/helpers/Form'
  import sharedMethods from './sharedMethods.js'
  // import Salutation from 'src/helpers/Salutation'
  import Regional from 'src/helpers/regional'
  import {responseOk, swal_error, swal_success} from 'helpers'

  export default {

    name: 'ContactForm',

    components: {
      Vuelist,
    },

    data () {
      return {
        dirtyForm: false,
        saving: false,
        currentTab: 'address',

        list: {
          // salutation_list: [],
          billing_country_list: [],
          billing_province_list: [],
          billing_district_list: [],
          billing_region_list: [],
          shipping_country_list: [],
          shipping_province_list: [],
          shipping_district_list: [],
          shipping_region_list: [],
        },

        form: new Form({
          is_vendor: false,
          is_customer: false,
          is_dropshipper: false,
          is_reseller: false,
          contact_type: null,
          // salutation_id: null,
          currency_id: null,
          payment_term_id: null,
          first_name: '',
          // last_name: '',
          display_name: null,
          display_code: null,
          email: '',
          phone: '',
          mobile: '',
          website: '',
          company_title: '',
          company_name: '',
          billing_address: '',
          billing_region: null,
          billing_district: null,
          billing_province: null,
          billing_country: null,
          billing_zip: '',
          billing_fax: '',
          shipping_address: null,
          shipping_region: null,
          shipping_district: null,
          shipping_province: null,
          shipping_country: null,
          shipping_zip: '',
          shipping_fax: '',
          notes: '',
          contact_status: 1,
          is_sameAddress:''
        }),
      }
    },


    computed: {

      // displayNameFormat1 () {
      //   const first_name = this.form.first_name ? this.form.first_name : '(First Name)'
      //   const last_name = this.form.last_name ? this.form.last_name : '(Last Name)'

      //   return first_name + ' ' + last_name
      // },

      displayNameFormat2 () {
        // let salutation_name = this.list.salutation_list.find(item => item.salutation_id === this.form.salutation_id)

        // if (!salutation_name) {
        //   salutation_name = ''
        // }

        // const salutation = salutation_name ? salutation_name.name : ''
        const firstName = this.form.first_name ? this.form.first_name : '(First Name)'
        // const lastName = this.form.last_name ? this.form.last_name : '(Last Name)'

      //return salutation + ' ' + firstName + ' ' + lastName
        return /*salutation + ' ' + */firstName
      },

      displayNameFormat3 () {
        return this.form.company_name ? this.form.company_name : 'Company name'
      },
    },

    beforeRouteLeave (to, from, next) {
      if (this.dirtyForm) {
        const leave = confirm('Are you sure leave this page?')
        if (!leave) return next(false)
      }
      return next()
    },

    async mounted () {
      $('input').on('change', (event) => {
        this.dirtyForm = true
      })

      this.$refs.firstName.focus()

      if (this.$route.params.id) {
        this.initEdit()
      } else {
        this.initCreate()
      }
    },

    methods: {
      ...sharedMethods,

      async initCreate () {
        const res = await Axios.get(`contacts/create`)

        // this.list.salutation_list = await Salutation.get()

        const country_list = await Regional.countryList()
        this.list.billing_country_list = country_list
        this.list.shipping_country_list = country_list

        // Set default country is Indonesia
        country_list.find(country => {
          if (country.name === 'Indonesia') {
            this.form.billing_country = country.id
            this.form.shipping_country = country.id
          }
        })

        this.list.billing_province_list = await Regional.provinceList(this.form.billing_country)
        this.list.shipping_province_list = await Regional.provinceList(this.form.shipping_country)

        this.list.billing_district_list = await Regional.districtList(this.form.billing_province)
        this.list.shipping_district_list = await Regional.districtList(this.form.shipping_province)

        this.list.billing_region_list = await Regional.regionList(this.form.billing_district)
        this.list.shipping_region_list = await Regional.regionList(this.form.shipping_district)

        this.form.is_sameAddress='true'
      },

      async initEdit () {
        const contact_id = this.$route.params.id
        const res = await Axios.get(`contacts/${contact_id}/edit`)
        this.form = new Form(res.data.data.contact)

        // this.list.salutation_list = await Salutation.get()

        const country_list = await Regional.countryList()
        this.list.billing_country_list = country_list
        this.list.shipping_country_list = country_list

        // Set default country is Indonesia
        country_list.find(country => {
          if (country.name === 'Indonesia') {
            this.form.billing_country = country.id
            this.form.shipping_country = country.id
          }
        })

        this.list.billing_province_list = await Regional.provinceList(this.form.billing_country)
        this.list.shipping_province_list = await Regional.provinceList(this.form.shipping_country)

        this.list.billing_district_list = await Regional.districtList(this.form.billing_province)
        this.list.shipping_district_list = await Regional.districtList(this.form.shipping_province)

        this.list.billing_region_list = await Regional.regionList(this.form.billing_district)
        this.list.shipping_region_list = await Regional.regionList(this.form.shipping_district)

        if(res.data.data.contact.billing_country===res.data.data.contact.shipping_country&&
           res.data.data.contact.billing_province===res.data.data.contact.shipping_province&&
           res.data.data.contact.billing_district===res.data.data.contact.shipping_district&&
           res.data.data.contact.billing_region===res.data.data.contact.shipping_region&&
           res.data.data.contact.billing_address===res.data.data.contact.shipping_address&&
           res.data.data.contact.billing_zip===res.data.data.contact.shipping_zip
           ){
          this.form.is_sameAddress='true'
        }
         else{
          this.form.is_sameAddress='false'
        }
      },

      inputPhone (phone_number, $event) {
        phone_number = $event.target.value = $event.target.value.replace(/\D/g, '')
      },

      /**
       * Save contact
       */
      async save() {
        this.$validator.validateAll().then(async result => {
          if (result) {
            // Display name
            if (this.form.display_code === 1) {
              this.form.display_name = this.form.first_name
            }

            if (this.form.display_code === 2) {
              this.form.display_name = this.form.company_name
            }

            if (this.form.is_sameAddress === 'true') {
              this.form.shipping_country = this.form.billing_country
              this.form.shipping_province = this.form.billing_province
              this.form.shipping_district = this.form.billing_district
              this.form.shipping_region = this.form.billing_region
              this.form.shipping_address = this.form.billing_address
              this.form.shipping_zip = this.form.billing_zip
            }

            const contactId = this.$route.params.id
            const url = contactId ? `contacts/${contactId}/update` : `contacts`

            this.saving = true

            const data = _.cloneDeep(this.form)
            delete data['originalData']
            delete data['errors']

            // This is weird. But I must convert Boolean to String to make it work.
            data.is_customer = String(this.form.is_customer)
            data.is_reseller = String(this.form.is_reseller)
            data.is_vendor = String(this.form.is_vendor)
            data.is_dropshipper = String(this.form.is_dropshipper)

            const res = await Axios.post(url, data)

            if (!responseOk(res.data.code)) {
              swal_error(res)
            } else {
              this.dirtyForm = false
              this.$router.push({name: 'contact.index'})
              swal_success(res)
            }

            this.saving = false

          } else {
            Alert.error('There are errors on the form. Please fix them before continuing.')
          }
        }).catch(err => {
          this.saving = false
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)

            if (this.$route.params.id) {
              this.form.errors = err.response.data.data.errors
            } else {
              this.form.errors = err.response.data.data
            }
          }
        })
      },
    },
  }
</script>

<style scoped>
  .tab.active {
    border-bottom: 2px solid #6e8cd7;
  }
</style>
