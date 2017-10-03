import axios from 'axios'
import { responseOk } from 'src/helpers'

const state = {
  from: '',
  recipients: [],
  subject: 'Invoice [INVOICE_NUMBER] from [COMPANY NAME]',
  message: '',
  attachment: true,
}

const mutations = {
  FROM(state, payload) { state.from = payload },
  RECIPIENTS(state, payload) {
    "use strict";

    if (Array.isArray(payload)) {
      state.recipients = payload
    }
  },
  SUBJECT(state, payload) { state.subject = payload },
  MESSAGE(state, payload) { state.message = payload },
  ATTACHMENT(state, payload) { state.attachment = payload },
}

const actions = {
  async save({state}, {sales_order_id, invoice_id}) {
    const payload = {
      recipients: state.recipients.join(','),
      subject: state.subject,
      message: state.message.replace(/\r?\n/g, '<br>'), // Transform new line to <br>
      cc: '',
      bcc: '',
      from: state.from,
      attachment: [
        // {name: state.subject, url: ''},
      ],
    }

    try {
      const response = await axios.post(`sales_orders/${sales_order_id}/invoices/${invoice_id}/email`, payload)

      if (!responseOk(response.data.code)) {
        return swal_error(response)
      }

      swal_success(response)

    } catch (err) {
      swal_error(err.response)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
