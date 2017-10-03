<template>
  <fieldset>
    <legend>Contacts</legend>
    <div id="report-contacts">
      <div v-if="items.length > 0">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Contact name</th>
            <th class="text-right">Amount</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items">
            <td>{{ item.customer_name }}</td>
            <td class="text-right">{{ item.sales_amount | money }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="lead text-center text-muted">No data</div>
      </div>
    </div>
  </fieldset>
</template>

<script>
  import Axios from 'axios';

  export default {
    name: 'Contacts',

    props: ['start_date', 'end_date'],

    watch: {
      start_date() {
        this.getCustomerReport();
      },
      end_date() {
        this.getCustomerReport();
      }
    },

    data() {
      return {
        items: [],
      }
    },

    mounted() {
      this.getCustomerReport();
    },

    methods: {

      async getCustomerReport() {
        const res = await Axios.get(`report/salesorder/by-customer`, {
          params: {
            start_date: this.start_date,
            end_date: this.end_date,
          }
        });
        this.items = res.data.data.items;
      },

    }
  }
</script>

<style scoped>
  #report-contacts {
    min-height: 300px;
    max-height: 400px;
    overflow: auto;
  }
</style>
