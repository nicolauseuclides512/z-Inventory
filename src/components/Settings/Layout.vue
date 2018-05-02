<template>
  <div class="settings-layout">
    <div id="wrapper" :class="{ enlarged: !sidebarEnlarged }">

      <nav-top :sidebar="sidebarEnlarged"></nav-top>
      <nav-left></nav-left>

      <router-view></router-view>

    </div>
  </div>
</template>

<script>
  import store from 'src/store'

  export default {

    name: 'SettingsLayout',

    components: {
      'nav-top': () => import('components/NavTop'),
      'nav-left': () => import('components/NavLeft'),
      'page-title': () => import('components/PageTitle'),
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
