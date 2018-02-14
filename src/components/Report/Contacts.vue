<template>
  <fieldset>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Sales by Contacts</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div id="report-contacts">
                            <div v-if="items.length > 0">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th class="text-right">Display Name</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in items">
                                            <td class="text-right">{{ item.customer_name }}</td>
                                            <td>{{ item.sales_amount | money }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>
                                <div class="lead text-center text-muted">No data</div>
                            </div>
                        </div>
                    </div>
                </div>
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
    min-height: auto;
    max-height: 400px;
    overflow: auto;
  }
</style>
