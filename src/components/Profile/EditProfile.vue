<template>
  <div class="content-page-full">
    <div class="content full-width sahito-user bgr-white">
      <div class="container">

    <!--<ul class="nav nav-tabs">-->
      <!--<router-link tag="li"-->
                   <!--:to="{ name: 'profile.personal-information' }"-->
                   <!--:class="{ 'active': $route.name === 'profile.personal-information' }">-->
        <!--<a> PERSONAL INFORMATION </a>-->
      <!--</router-link>-->
      <!--<router-link tag="li"-->
                   <!--:to="{ name: 'profile.change-password' }"-->
                   <!--:class="{ 'active': $route.name === 'profile.change-password' }">-->
        <!--<a> CHANGE PASSWORD </a>-->
      <!--</router-link>-->
    <!--</ul>-->

    <!-- Tab panes -->
    <!--<div class="tab-content">-->
      <router-view></router-view>
    <!--</div>-->

      </div>
    </div>
  </div>
</template>

<script>
  export default {

    name: 'ProfileEdit',

    components: {
      edit: require('./Edit.vue'),
      changePassword: require('./ChangePassword.vue')
    }
  }
</script>

<style>
  .nav-tabs li {
    border-bottom: 2px solid transparent
  }

  .nav-tabs li.active {
    border-bottom: 2px solid #6e8cd7 ;
  }
</style>
