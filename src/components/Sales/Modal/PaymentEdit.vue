<template>
  <div id="payment-modal-edit" class="modal fade" tabindex="-1" role="dialog">
    <form method="POST" class="form-horizontal" @submit.prevent="updatePayment">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">Edit Payment</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-md-3 control-label">Amount Receive</label>
                  <div class="col-md-6">
                    <div class="input-group">
                      <span class="input-group-addon">{{ form.payment.currency_name }}</span>
                      <input type="number" v-model="form.amount" required class="form-control" min="0">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Payment Date</label>
                  <div class="col-md-6">
                    <input type="text" v-model="form.payment.date" class="flatpickr">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Payment Mode</label>
                  <div class="col-md-4" v-if="current.payment_method[0]">
                    <input type="hidden" v-model="current.payment_method.mode_id">
                    {{ current.payment_method[0].mode_name }}
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Deposit To</label>
                  <div class="col-md-6" v-if="current.payment_method[0]">
                    {{ current.payment_method[0].details[0].account_name }}
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Reference#</label>
                  <div class="col-md-4">
                    <input type="text" v-model="form.payment.reference_number" class="form-control form-trans" id="reference">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Notes</label>
                  <div class="col-md-8">
                    <textarea v-model="form.payment.notes" class="form-control" rows="4" maxlength="500"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" :disabled="!isValidPaymentData" class="btn btn-info waves-effect waves-light m-t-15">Update</button>
            <button type="button" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {

  }
</script>
