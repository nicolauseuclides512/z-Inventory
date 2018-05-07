<template>
  <div class="home-app">
    <div id="wrapper" :class="{ enlarged: !sidebarEnlarged }">

      <nav-top :sidebar="sidebarEnlarged" @burger-menu-clicked="sidebarEnlarged = !sidebarEnlarged"></nav-top>
      <nav-left></nav-left>

            <page-title></page-title>

            <router-view></router-view>

    </div>
  </div>
</template>

<script>
  import store from './store'
  import VueMultianalytics from 'vue-multianalytics'
  import Cookie from 'js-cookie'

  export default {
    name: 'Home',

    components: {
      'nav-top': () => import('./components/NavTop'),
      'nav-left': () => import('./components/NavLeft'),
      'page-title': () => import('./components/PageTitle'),
    },

    computed: {
      sidebarEnlarged () {
        return store.state.global.sidebarEnlarged
      },
    },

    mounted(){

      const auth = Cookie.get('auth')
      const authObj = JSON.parse(auth)
      ga('set', 'userId', authObj.email)
      // console.log(Cookie.get('access_token'))
      // window.mixpanel.track("Visited Localhost")
      // this.$ma.trackEvent('this from multi analytics!')
      if(process.env.NODE_ENV == 'production'){
        this.$ma.trackEvent({action: 'visited dashboard!'})
      }
    },

    events: {
      listenSearch (search) {
        this.$broadcast('listenSearch', search)
      },
    },
  }
</script>
