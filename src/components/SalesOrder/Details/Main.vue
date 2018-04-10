<template>
  <div class="content-page">

    <iframe id="iframe-print" src="about:blank" style="display: none"></iframe>

    <div class="content bgr-white" style="padding: 20px;">
      <div class="row">
        <div class="col-md-4">
          <List
            @selectSalesOrder="selectSalesOrder($event)"
          />
        </div>
        <div class="col-md-8" style="border-left: 1px solid #f0f0f0;">
          <Detail
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import Form from '@/helpers/Form'
  import List from './List'
  import Detail from './Detail'
  import {mapState} from 'vuex'

  export default {
    name: 'SalesOrderDetail',

    components: {
      List,
      Detail,
    },

    data () {
      return {
        salesOrderRoute: this.$route.params.id
      }
    },

    computed: {},

    async mounted () {
      //load content if users directly hit url
      this.selectSalesOrder(this.salesOrderRoute)
    },

    methods: {
      async selectSalesOrder (salesOrderId) {
        this.$store.dispatch('salesOrders/selectSalesOrder', salesOrderId)
          .then(() => {
            this.$router.push({
              path: `/sales/${salesOrderId}/detail`,
              replace: true,
            })
          })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
