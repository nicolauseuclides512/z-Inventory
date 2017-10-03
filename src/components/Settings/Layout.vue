<template>
  <div>
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
       'nav-top': require('components/NavTop'),
       'nav-left': require('components/NavLeft'),
       'page-title': require('components/PageTitle'),
    },

    computed: {
      sidebarEnlarged() {
        return store.state.global.sidebarEnlarged
      }
    },


    events: {
      listenSearch(search) {
        this.$broadcast('listenSearch', search);
      },
    }
  };
</script>
