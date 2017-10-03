<template>
  <div>
    <div id="wrapper" :class="{ enlarged: !sidebarEnlarged }">

      <nav-top :sidebar="sidebarEnlarged" @burger-menu-clicked="sidebarEnlarged = !sidebarEnlarged"></nav-top>
      <nav-left></nav-left>

      <div class="content-page">
        <div class="content full-width sahito-user bgr-white">
          <div class="container">
            <!-- <page-title></page-title> -->

            <router-view></router-view>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import store from './store'

  export default {
    name: 'Home',

    components: {
      'nav-top': require('./components/NavTop'),
      'nav-left': require('./components/NavLeft'),
      'page-title': require('./components/PageTitle'),
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
