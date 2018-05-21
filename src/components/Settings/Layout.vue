<template>
  <div class="settings-layout">
    <div id="wrapper" :class="{ enlarged: !sidebarEnlarged }">

      <NavTop :sidebar="sidebarEnlarged"></NavTop>
      <NavLeft></NavLeft>

      <router-view></router-view>

    </div>
  </div>
</template>

<script>
  import store from 'src/store'

  export default {

    name: 'SettingsLayout',

    components: {
      'NavTop': () => import('components/NavTop'),
      'NavLeft': () => import('components/NavLeft'),
      // 'PageTitle': () => import('components/PageTitle'),
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
