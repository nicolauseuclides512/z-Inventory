<template>

  <div>

    <table class="table sahito-invoice-table-inside">
      <thead>
        <tr class="dark-grey-background">
          <th id="item">Item & Description</th>
          <th id="qty">Qty</th>
          <th id="rate">Price @ (IDR)</th>
          <th id="discount" class="text-right">Disc</th>
          <th id="amount">Amount (IDR)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices.invoice_details">
          <td id="item">{{ invoice.item_name }}</td>
          <td id="qty">
            <p class="qty-amount">{{ invoice.item_quantity }} {{ invoice.uom }}</p>
          </td>
          <td id="rate">{{ invoice.item_rate | money }}</td>
          <td id="discount" class="text-right">
            <span v-if="invoice.discount_amount_type === 'fixed'">{{ invoice.discount_amount_value | money }}</span>
            <span v-else>{{ invoice.discount_amount_value }}%</span>
          </td>
          <td id="amount">{{ invoice.amount | money }}</td>
        </tr>
        <tr class="sub-total">
          <td colspan="4">Sub Total</td>
          <td>{{ invoices.sub_total | money }}</td>
        </tr>
        <tr class="sub-total">
          <td colspan="4">Shipment Charge</td>
          <td>{{ invoices.shipping_charge | money }}</td>
        </tr>
        <tr class="sub-total">
          <td colspan="4">{{ invoices.adjustment_name }}</td>
          <td>{{ invoices.adjustment_value | money }}</td>
        </tr>
        <tr class="sub-total">
          <td colspan="4">Tax</td>
          <td>{{ invoices.tax | money }}</td>
        </tr>
        <tr class="balance-due">
          <td colspan="4" >Total</td>
          <td>{{ invoices.total | money }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>

  export default {
    name: 'overview-invoice',

    props: ['invoices'],
  }

</script>
