<template>
  <fieldset>
    <div class="panel panel-default">
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div id="report-items">
                            <div v-if="items.length > 0">
                                <table class="table">
                                    <thead>
                                        <tr class="header-row">
                                            <th class="text-left">Item Name</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody class="content-table">
                                        <tr v-for="item in items">
                                            <td class="text-left item-name">{{ item.item_name }}</td>
                                            <td class="amount">{{ item.sales_amount | money }}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left row-total">Total</td>
                                            <td class="row-total">{{ total | money }}</td>
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
    
    computed: {
      total() {
        return this.items.map(item => item.sales_amount)
          .reduce((a, b) => a + b, 0);
      }
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

<style lang="scss" scoped>
  #report-items {
    min-height: auto;
    max-height: 400px;
    overflow: auto;
  }
  .panel-default{
    border:none !important;
    box-shadow:none !important;
  }
  
  
  .header-row{
    border-top: 1px solid #ddd;
    th{
      font-weight: 400;
      font-size: 1.2em;
      color:#000
    }
  }

  .content-table{
    tr{
      .amount{
        width:50%;
        color:#000;
        padding-top: 12px;
        padding-bottom: 12px;
      }
      .item-name{
        width:50%;
        color:#000;
        padding-top: 12px;
        padding-bottom: 12px;
      }
      .row-total{
        background-color: #eee;
        color:#000;
        padding-top: 16px;
        padding-bottom: 16px;
        font-size: 1.2em
      }
    }
  }
</style>
