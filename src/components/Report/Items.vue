<template>
  <fieldset>
    <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Sales by Items</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div id="report-items">
                            <div v-if="items.length > 0">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th class="text-right">Item Name</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in items">
                                            <td class="text-right">{{ item.item_name }}</td>
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
    min-height: auto;
    max-height: 400px;
    overflow: auto;
  }
</style>
