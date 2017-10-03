<template>
  <div id="notifications">
    <div class="container full-width-header bttop-1 pt-pb-10">
      <div class="row">
        <div class="col-md-12">
          <h4 class="pull-left page-title">Notifications Settings</h4>
        </div>
      </div>
    </div>
    <div class="container setting-page-right-content">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12 p-b-20">
          <div class="form-horizontal form-shipping">
            <div class="form-group form-general form-have-title bgr-grey form-shipping-from p-15">
              <label class="col-md-3 col-xs-12 col-sm-12 control-label text-left">
                <h5>Email Templates</h5>
              </label>
              <div class="col-md-9 col-xs-12 col-sm-12 bgr-white p-15 email-template-list m-b-20">
                <h5>Orders</h5>
                <ul>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Order Confirmation</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to the customer after they place their order.
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Order Canceled</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to the customer after they place their order.
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Order Refund</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to the customer if their order is refunded (if you select this option).
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Draft Order Invoice</a>
                      </div>
                      <div class="col-md-8">
                        Sent to the customer when a draft order invoice is created. You can edit this email
                        invoice before you send it.
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Abandoned Checkout</a>
                      </div>
                      <div class="col-md-8">
                        Sent to the customer if they leave checkout before they buy the items in their cart.
                        Configure options in checkout settings.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="col-md-9 col-xs-12 col-sm-12 col-md-offset-3 bgr-white p-15 email-template-list m-b-20">
                <h5>Shipping</h5>
                <ul>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Fulfillment request</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to a third-party fulfillment service provider when order items are
                        fulfilled.
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Shipping confirmation</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to the customer when their order is fulfilled (if you select this
                        option).
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Shipping update</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to the customer if their fulfilled order’s tracking number is updated
                        (if you select this option).
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Shipment out for delivery</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to the customer after the status of their fulfillment changes to 'out
                        for delivery'
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Shipment delivered</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to the customer after the status of their fulfillment changes to
                        'delivered'
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="col-md-9 col-xs-12 col-sm-12 col-md-offset-3 bgr-white p-15 email-template-list m-b-20">
                <h5>Customer</h5>
                <ul>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Fulfillment request</a>
                      </div>
                      <div class="col-md-8">
                        Sent to the customer with account activation instructions. You can edit this email before
                        you send it.
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Shipping confirmation</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to the customer when they complete their account activation.
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Shipping update</a>
                      </div>
                      <div class="col-md-8">
                        Sent automatically to the customer when they ask to reset their account's password.
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-md-4">
                        <a href="#">Shipment out for delivery</a>
                      </div>
                      <div class="col-md-8">
                        Sent to the customer when you contact them from the orders or customers page. You can edit
                        this email before you send it.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container p-b-10 m-b-20">
      <div class="row">
        <div class="col-md-12 text-center">
          <a href="javascript:;" class="btn btn-info waves-effect waves-light">Save</a>
          <a href="javascript:;" class="btn btn-default waves-effect">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>
