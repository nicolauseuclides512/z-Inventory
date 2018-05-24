<template>
	<div class="pagination-wrap d-flex">
		<select id="pagination-per-page" title="Per page" style="height: 20px;" @change="changePerPage">
			<option :selected="paginate.per_page == paginate.total" :value="paginate.total">All Sales</option>
			<option :selected="paginate.per_page == 10" value="10">10 per page</option>
			<option :selected="paginate.per_page == 15" value="15">15 per page</option>
			<option :selected="paginate.per_page == 20" value="20">20 per page</option>
			<option :selected="paginate.per_page == 30" value="30">30 per page</option>
			<option :selected="paginate.per_page == 60" value="60">60 per page</option>
			<option :selected="paginate.per_page == 100" value="100">100 per page</option></select>
		<div class="page-marker">
			<span @click="toPrevPage" v-if="paginate.current_page !== 1" class="clickable prev-button"><i class="ion-chevron-left"></i></span>
			<span class="page-info">{{pageRange}} of {{paginate.total}}</span>
			<span @click="toNextPage" v-if="paginate.has_more_pages" class="clickable next-button"><i class="ion-chevron-right"></i></span>
		</div>
	</div>
</template>

<script>
	// simple pagination just to control the routes, with no fancy data!

	import Vue from 'vue'

  export default {
    name: 'JustPaginate',
    props: {
      paginate: {
        type: Object,
        required: true,
      }
    },

		// but, there should be watcher on the parents!
		// confused? ask me at any socmed: @Rebotak!

		/*** example watcher on parent! ***/

		// watch: {
		// 	'$route'(to, from) {
		// 		if (to.query) {
		// 			this.getList(to.query)
		// 		} else {
		// 			this.getList(form.query)
		// 		}
		// 	},
		// },

		/*** above is an example watcher on parent! ***/

    data () {
      return {
      }
    },

		computed: {
			pageRange() {
				if(this.paginate.count == this.paginate.total){
					return '1 - '+ this.paginate.total
				}else if(this.paginate.has_more_pages){
					return ((this.paginate.count * (this.paginate.current_page -1))+1) +' - '+ (this.paginate.count*this.paginate.current_page)
				}else if(!this.paginate.has_more_pages){
					return (this.paginate.total - this.paginate.count)+' - '+(this.paginate.total)
				}
			},
		},

    methods: {
			toPrevPage(){
				this.$router.push({
					query: {...this.$route.query,
						page: this.paginate.current_page - 1
					},
				})
			},
			toNextPage(){
				this.$router.push({
					query: {...this.$route.query,
						page: this.paginate.current_page + 1
					},
				})
			},
			changePerPage(e){
				this.$router.push({
					query: {...this.$route.query,
						page: 1,
						per_page: e.target.value || '20'
					},
				})
			},
		}
  }
</script>
<style scoped lang="scss">
.pagination-wrap.d-flex {
	float: right;
	margin: 15px 0;
}
select#pagination-per-page {
	margin-right: 20px;
}
span.page-info {
	margin: 0 5px;
}
.empty-list {
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin-bottom: 30px;
}
</style>

