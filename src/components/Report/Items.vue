<template>
  <fieldset>
    <legend>Items</legend>
    <div id="report-items">
      <div v-if="items.length > 0">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Item name</th>
            <th class="text-right">Amount</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items">
            <td>{{ item.item_name }}</td>
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
    name: 'Items',

    props: ['start_date', 'end_date'],

    watch: {
      start_date() {
        this.getItemReport();
      },
      end_date() {
        this.getItemReport();
      }
    },

    data() {
      return {
        items: [],
      }
    },

    mounted() {
      this.getItemReport();
    },

    methods: {

      async getItemReport() {
        const res = await Axios.get(`report/salesorder/by-item`, {
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
  #report-items {
    min-height: 300px;
    max-height: 400px;
    overflow: auto;
  }
</style>
