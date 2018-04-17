<template>
  <div class="clearfix" v-if="pageContext.total > 15">
    <div class="pr-20 pull-right" style="padding: 26px 0 0 15px;">


      <ul class="pagination m-b-5">
        <li>
          <small class="text-muted" style="margin-right:10px">
          <select id="pagination-per-page" v-model="per_page" @change="updatePerPage" title="Per page" style="height:20px">
          <option v-bind:value="pageContext.total">All Sales</option>
          <option :value="10">10 per page</option>
          <option :value="15">15 per page</option>
          <option :value="30">30 per page</option>
          <option :value="60">60 per page</option>
          <option :value="100">100 per page</option>
        </select>
          </small>
        </li>

        <li>
          <button type="button"
                  id="pagination-prev"
                  :class="{ btn: true, 'btn-primary': pageContext.prev_page_url, 'btn-default': !pageContext.prev_page_url }"
                  :disabled="!pageContext.prev_page_url"
                  @click="prev">
            <i class="ion-chevron-left" v-show="!loadingPrev"></i>
            <i class="fa fa-circle-o-notch fa-spin" v-show="loadingPrev"></i>
          </button>
        </li>
        <li>
          <small class="text-muted">
        {{
        pageContext.current_page == 1
          ? 1
          : pageContext.current_page * pageContext.per_page - pageContext.per_page + 1
        }}
        -
        {{
        pageContext.current_page == pageContext.last_page
          ? pageContext.total
          : pageContext.current_page * pageContext.per_page
        }}
        of {{ pageContext.total }}
      </small>
        </li>
        <li>
          <button type="button"
                  id="pagination-next"
                  :class="{ btn: true, 'btn-primary': pageContext.next_page_url, 'btn-default': !pageContext.next_page_url }"
                  :disabled="!pageContext.next_page_url"
                  @click="next">
            <i class="ion-chevron-right" v-show="!loadingNext"></i>
            <i class="fa fa-circle-o-notch fa-spin" v-show="loadingNext"></i>
          </button>
        </li>

      </ul>
  </div>
  </div>
  <div class="clearfix" v-else-if="pageContext.total < 16">

  </div>
</template>

<script>
  import Vue from 'vue'
  import Axios from 'axios'
  import { responseOk, swal_success, swal_error } from 'src/helpers'

  export default {

    name: 'Pagination',

    props: {
      pageContext: {
        type: Object,
        required: true,
      },
      result: {
        type: Array,
        required: true,
      },
    },


    data () {
      return {
        per_page: 15,
        loading: false,
        loadingNext: false,
        loadingPrev: false,
      }
    },


    methods: {


      async updatePerPage () {
        try {
          if (Object.keys(this.pageContext).length) {

            this.loading = true

            const url = this.pageContext.current_page_url
              .replace(/(?:per_page=)(\d+)/, `per_page=${this.per_page}`)
              .replace(/(?:page=)(\d+)/, 'page=1')

            const res = await Axios.get(url)
            if (!responseOk(res.data.code)) {
              this.loading = false
              return swal_error(res)
            }

            this.$emit('updated', res.data)

            this.loading = false
          }
        }
        catch (err) {
          console.error(err)
          this.loading = false
          if (err.hasOwnProperty('response')) {
            return swal_error(err.response)
          }
        }
      },


      /**
       * Get previous page
       */
      async prev () {
        try {

          this.loadingPrev = true

          const res = await Axios.get(this.pageContext.prev_page_url)
          if (!responseOk(res.data.code)) {
            this.loadingPrev = false
            return swal_error(res)
          }

          this.$emit('updated', res.data)

          this.loadingPrev = false

        }
        catch (err) {
          this.loadingPrev = false
          return swal_error(err.response)
        }

      },


      /**
       * Get next page
       */
      async next () {
        try {
          this.loadingNext = true

          const res = await Axios.get(this.pageContext.next_page_url)
          if (!responseOk(res.data.code)) {
            this.loadingNext = false
            return swal_error(res)
          }

          this.$emit('updated', res.data)

          this.loadingNext = false

        }
        catch (err) {
          this.loadingNext = false
          return swal_error(err.response)
        }

      },


    },
    beforeMount(){
      this.updatePerPage()
    }
  }
</script>
<style scoped>
  .btn-primary{
    border:none !important;
    box-shadow: none !important;
    background-color: #fff !important;
    color: #1c8ad9 !important;
  }
  .btn-default{
    border:none !important;
    box-shadow: none !important;
    background-color: #fff !important;
    color: #aaa !important;
  }
  .btn-default:hover{
    box-shadow: none !important;
  }
  .btn-primary:hover{
    box-shadow: none !important;
  }
</style>

