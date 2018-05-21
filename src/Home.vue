<template>
	<div class="home-app">
		<div id="wrapper" :class="{ enlarged: !sidebarEnlarged }">
			<NavTop :sidebar="sidebarEnlarged" @burger-menu-clicked="sidebarEnlarged = !sidebarEnlarged"></NavTop>
			<NavLeft></NavLeft>
			<!-- <PageTitle></PageTitle> -->
			<router-view></router-view>

		<!-- <h1 v-if="!exampleData && exampleLoading">LOADING...</h1>
		<h1>halo</h1>
		<pre v-if="exampleData">{{exampleData}}</pre> -->
		</div>
	</div>
</template>

<script>
	import store from './store'
	import VueMultianalytics from 'vue-multianalytics'
	import Cookie from 'js-cookie'
//	import {mapGetters} from 'vuex'

	export default {
		name: 'Home',

		components: {
			'NavTop': () => import('./components/NavTop'),
			'NavLeft': () => import('./components/NavLeft'),
			// 'PageTitle': () => import('./components/PageTitle'),
		},

		computed: {
			sidebarEnlarged () {
				return store.state.global.sidebarEnlarged
			},
			// ...mapGetters({
			// 	exampleData: 'example/data',
			// 	exampleLoading: 'example/pending'
			// }),
		},

		mounted(){
			if( Cookie.get('auth') ){
				// console.log(Cookie.get('access_token'))
				// window.mixpanel.track("Visited Localhost")
				// this.$ma.trackEvent('this from multi analytics!')
				if(process.env.NODE_ENV == 'production'){
					const auth = Cookie.get('auth')
					const authObj = JSON.parse(auth)
					ga('set', 'userId', authObj.email)
					// this.$ma.trackEvent({action: 'visited dashboard!'})
				}
			}
			// this.$store.dispatch('example/RETRIEVE')
		},

		events: {
			listenSearch (search) {
				this.$broadcast('listenSearch', search)
			},
		},
	}
</script>
