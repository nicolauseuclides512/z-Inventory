<template>
  <div class="content-page" style="padding:0px">
    <div class="content full-width sahito-user bgr-white">
      <div class="container">

        <form method="POST" @submit.prevent="send">
          <div class="container full-width-header bt-1 p-b-10 m-b-20">

            <div class="row">
              <div class="col-md-12">
                <h4 class="pull-left page-title">Email To {{ name }}</h4>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="row m-b-20 bt-1">
              <div class="form-horizontal">
                <div class="col-md-12">
                  <div class="form-group form-general">

                    <div class="col-md-2">
                      <label class="control-label">From</label>
                    </div>
                    <div class="col-md-9">
                      {{ email_from }}
                      {{ email_address_from }}
                    </div>

                  </div>

                  <div class="form-group form-general">

                    <div class="col-md-2">
                      <!--<div class="btn-group">-->
                      <!--<span href="#" class="dropdown-toggle" data-toggle="dropdown">-->
                      <label class="control-label">Send to</label>
                      <!--<span class="caret" v-show="!ccStatus || !bccStatus"></span>-->
                      <!--</span>-->
                      <!--<ul class="dropdown-menu" v-show="!ccStatus || !bccStatus">-->
                      <!--<li><a href="javascript:void(0);" @click="addCc()" v-show="!ccStatus">CC</a></li>-->
                      <!--<li><a href="javascript:void(0);" @click="addBcc()" v-show="!bccStatus">BCC</a></li>-->
                      <!--</ul>-->
                      <!--</div>-->
                    </div>

                    <div class="col-md-9">
                      <vuetagger
                        :value="email_recipients"
                        @change="updateEmail"
                        pattern="^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$"
                      ></vuetagger>
                    </div>

                  </div>

                  <div class="form-group form-general" v-show="ccStatus">

                    <div class="col-md-2">
                      <label class="control-label">CC</label>
                    </div>
                    <div class="col-md-9">
                      <input id="email_cc" type="text" class="form-control">
                    </div>

                  </div>

                  <div class="form-group form-general" v-show="bccStatus">

                    <div class="col-md-2">
                      <label class="control-label">BCC</label>
                    </div>
                    <div class="col-md-9">
                      <input id="email_bcc" type="text" class="form-control">
                    </div>

                  </div>


                  <div class="form-group form-general">

                    <div class="col-md-2">
                      <label class="control-label">Subject</label>
                    </div>
                    <div class="col-md-9">
                      <input type="text" id="email_subject" v-model="email_subject" class="form-control">
                    </div>

                  </div>


                  <div class="form-group form-general m-b-20">
                    <div class="col-md-2">
                      <label for="email_template">Message</label>
                    </div>
                    <div class="col-md-9">
                      <textarea id="email_template" v-model.trim="email_message" cols="30" rows="10" class="form-control">{{ email_message }}</textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row m-b-20 bt-1">
              <div class="form-horizontal">
                <div class="col-md-12">
                  Attachment:
                  <a href="javascript:;" @click="viewInvoice"> {{invoice_number}} </a>
                </div>
              </div>
            </div>
            <div class="container p-b-10 m-b-20">
              <div class="row">
                <div class="col-md-12 text-center">
                  <button type="submit" class="btn btn-info waves-effect waves-light" :disabled="sending">
                    <span v-show="!sending">Send</span>
                    <span v-show="sending">Sending <i class="fa fa-spin fa-spinner"></i> </span>
                  </button>
                  <router-link :to="{ name: 'sales.index' }" type="button" class="btn btn-default waves-effect">
                    Cancel
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import store from 'src/store';
  import axios from 'axios';
  import Cookie from 'js-cookie';
  import Vuetagger from '../Vuetagger';
  import { Alert, responseOk, swal_error } from "../../helpers";
  import Salutation from "../../helpers/Salutation";
  import dateFormat from 'date-fns/format'
  import swal from 'sweetalert2'

  export default {

    name: 'EmailInvoice',

    components: {
      Vuetagger
    },

    computed: {

      email_from: {
        get() { return store.state.sales.email.from },
        set(value) { store.commit('sales/email/FROM', value) }
      },

      email_recipients: {
        get() { return store.state.sales.email.recipients },
        set(value) { store.commit('sales/email/RECIPIENTS', value) }
      },

      email_subject: {
        get() { return store.state.sales.email.subject },
        set(value) { store.commit('sales/email/SUBJECT', value) }
      },

      email_message: {
        get() { return store.state.sales.email.message },
        set(value) { store.commit('sales/email/MESSAGE', value) }
      },

    },

    data() {
      return {
        sending: false,
        invoice_number: '',
        email_address_from: '',
        emailRecipientsList: [],
        name: '',
        ccStatus: false,
        bccStatus: false,
        form: {
          from: [],
          to: [],
          cc: [],
          bcc: [],
          subject: '',
          body: '',
          attachments: '',
        }
      }
    },

    mounted() {
      this.initialize()
      this.setEmailFromAddress()
    },


    methods: {

      async initialize() {
        const sales_order_id = this.$route.params.sales_order_id
        const invoice_id = this.$route.params.invoice_id

        try {
          const response = await axios.get(`sales_orders/${sales_order_id}/invoices/${invoice_id}`)

          if (!responseOk(response.data.code)) {
            return swal_error(response)
          }

          const organization_id = Cookie.get('organization_id')
          const orgResponse = await axios.get(`organizations/${organization_id}`)
          const company_name = orgResponse.data.data.name

          let emailContact: Array<string> = []

          if (response.data.data.invoice_email !== null) {
            emailContact = response.data.data.invoice_email.split(',').filter(email => {
              return email.trim() !== ''
            })
          }

          if (response.data.data.contact.email) {
            emailContact.unshift(response.data.data.contact.email)
          }

          store.commit(`sales/email/RECIPIENTS`, emailContact)
          store.commit(`sales/email/SUBJECT`, `Invoice ${response.data.data.invoice_number} from ${company_name}`)
          this.invoice_number = response.data.data.invoice_number


          const settingsResponse = await axios.get('settings/edit')
          if (!responseOk(settingsResponse.data.code)) {
            return swal_error(settingsResponse)
          }

          let salutationName = ''
          if (response.data.data.contact.salutation_id) {
            const salutation = await Salutation.byId(response.data.data.contact.salutation_id)
            salutationName = salutation.name
          }

          let invoiceTemplate = settingsResponse.data.data.settings['web.template.notification.email.invoice'].id

          // Replace
          invoiceTemplate = invoiceTemplate.replace(/%salutation%/g, salutationName)
          invoiceTemplate = invoiceTemplate.replace(/%name%/g, response.data.data.contact.first_name)
          invoiceTemplate = invoiceTemplate.replace(/%[o|O]rganization[_|\s][N|n]ame%/g, company_name)
          invoiceTemplate = invoiceTemplate.replace(/%portal_name%/g, orgResponse.data.data.portal)
          invoiceTemplate = invoiceTemplate.replace(/%invoice[_\s]number%/g, response.data.data.invoice_number)
          invoiceTemplate = invoiceTemplate.replace(/%date[_\s]order%/g, dateFormat(response.data.data.invoice_date, 'DD-MM-YYYY'))


          store.commit('sales/email/MESSAGE', invoiceTemplate)


        } catch (e) {
          console.error(e)
          swal_error(e.response)
        }
      },


      async viewInvoice() {
        const pdfWindow = window.open()
        const salesOrderId = parseInt(this.$route.params.id)

        // Fetch invoice list
        await store.dispatch(`sales/invoiceList`, salesOrderId)
        const invoiceId = store.state.sales.invoiceList[0].invoice_id

        const url = window.BASE_URL + `/sales_orders/${salesOrderId}/invoices/${invoiceId}/pdf`

        const response = await axios.get(url, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/pdf'
          }
        })

        const file = new Blob([response.data], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        pdfWindow.location = fileURL
      },


      async viewInvoice() {
        const salesOrderId = this.$route.params.sales_order_id
        const invoiceId = this.$route.params.invoice_id
        const pdfWindow = window.open()

        const url = window.BASE_URL + `/sales_orders/${salesOrderId}/invoices/${invoiceId}/pdf`

        const response = await axios.get(url, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/pdf'
          }
        })

        const file = new Blob([response.data], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        pdfWindow.location = fileURL
      },


      async setEmailFromAddress() {
        const organization_id = Cookie.get('organization_id')

        try {
          const response = await axios.get(`organizations/${organization_id}`)
          const email = response.data.data.primary_contact.email
          store.commit('sales/email/FROM', email)
        } catch (err) {
          console.error(err)
        }
      },

      /**
       * Invoice email addresses
       */
      updateEmail(emails) {
        store.commit('sales/email/RECIPIENTS', emails)
      },

      /**
       * Send email
       */
      async send() {
        if (!this.email_recipients.length > 0) {
          Alert.error('Your email recipient is empty')
          return
        }

        if (this.email_subject.trim() === '') {
          Alert.error('Please provide the email subject')
          return
        }

        if (this.email_message.trim() === '') {
          Alert.error('Please provide the email body')
          return
        }

        try {
          this.sending = true

          await store.dispatch('sales/email/save', {
            sales_order_id: this.$route.params.sales_order_id,
            invoice_id: this.$route.params.invoice_id,
          })

        } catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response)
          }
        }
        swal({
							title: "Email was sent.",
							type: 'success',
							timer: 2000,
							showConfirmButton: false,
						})
        this.sending = false
        this.$router.push({
					name: 'sales.detail',
					params: {
						id: this.$route.params.sales_order_id
					},
				})
      },


      addCc() {
        this.ccStatus = true;
      },

      addBcc() {
        this.bccStatus = true;
      },


    }
  }
</script>
