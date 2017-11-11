<template>
  <div>
    <div id="wrapper" :class="{ enlarged: !sidebarEnlarged }">

      <nav-top :sidebar="sidebarEnlarged"></nav-top>
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
  export default {
    name: 'Main',

    components: {
      'nav-top': () => import('components/NavTop.vue'),
      'nav-left': () => import('components/NavLeft.vue'),
      'page-title': () => import('components/PageTitle.vue'),
    },

    data () {
      return {
        sidebarEnlarged: true,
      }
    },

    events: {
      listenSearch (search) {
        this.$broadcast('listenSearch', search)
      },
    },
  }
</script>
