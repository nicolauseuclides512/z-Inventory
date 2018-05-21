<template>
  <div>
    <div id="wrapper" :class="{ enlarged: !sidebarEnlarged }">

      <NavTop :sidebar="sidebarEnlarged"></NavTop>
      <NavLeft></NavLeft>

      <div class="content-page">
        <div class="content full-width sahito-user bgr-white">
          <div class="container">
            <!-- <PageTitle></PageTitle> -->

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
      'NavTop': () => import('components/NavTop.vue'),
      'NavLeft': () => import('components/NavLeft.vue'),
      // 'PageTitle': () => import('components/PageTitle.vue'),
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
