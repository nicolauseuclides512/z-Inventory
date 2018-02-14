<template>
  <div>
    <div id="wrapper" :class="{ enlarged: !sidebarEnlarged }">

      <nav-top :sidebar="sidebarEnlarged" @burger-menu-clicked="sidebarEnlarged = !sidebarEnlarged"></nav-top>
      <nav-left></nav-left>

            <!-- <page-title></page-title> -->

            <router-view></router-view>

    </div>
  </div>
</template>

<script>
  import store from './store'

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

    events: {
      listenSearch (search) {
        this.$broadcast('listenSearch', search)
      },
    },
  }
</script>
