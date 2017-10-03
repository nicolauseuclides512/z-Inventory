<template>
  <fieldset>
    <div class="clearfix">
      <div class="pull-left lead">Monthly Report</div>
      <div class="pull-right lead">
        <small>Total</small> {{ total | money }}
      </div>
    </div>
    <div id="report-monthly">
      <div v-if="items.length > 0">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th class="text-right">Month</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items">
            <td width="50%" class="text-right">
              {{ item.sales_month_desc.substr(0, 3) }}/{{ item.sales_year }}
            </td>
            <td width="50%">{{ item.sales_amount | money }}</td>
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
    name: 'MonthlyReport',

    props: ['start_date', 'end_date'],

    watch: {
      start_date() {
        this.getMonthlyReport();
      },
      end_date() {
        this.getMonthlyReport();
      }
    },

    data() {
      return {
        items: [],
      }
    },

    mounted() {
      this.getMonthlyReport();
    },

    computed: {
      total() {
        return this.items.map(item => item.sales_amount)
          .reduce((a, b) => a + b, 0);
      }
    },

    methods: {
      async getMonthlyReport() {
        try {
          const res = await Axios.get(`report/salesorder/by-month`, {
            params: {
              start_date: this.start_date,
              end_date: this.end_date,
            }
          });
          this.items = res.data.data.items;
        } catch (e) {
          console.error(e);
          Alert.error('We can not retrieve the monthly report');
        }
      },
    }
  }
</script>

<style scoped>
  #report-monthly {
    min-height: 300px;
    max-height: 400px;
    overflow: auto;
  }
</style>
