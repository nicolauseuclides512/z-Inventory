<template>
  <div class="topbar">
    <!-- LOGO -->
    <div class="topbar-left">
      <div class="text-center">
        <!--<router-link
          :to="{ name: 'sales.index', query: { filter: 'all', sort: 'created_at.desc' }}"
          id="nav-top-logo"
          class="logo"
        >
          <img src="/static/images/zuragan_logo_login.png" height="40">
          <!--<span>Zuragan</span>
        </router-link>-->
        <a id="nav-top-logo" href="/" class="logo">
          <span><img src="/static/images/logo_1.png" height="27px"></span>
          <!-- <div id="icon" style="display:none"><img src="/static/images/iconzuragan.png" height="40"></div> -->
        </a>
      </div>
    </div>
    <!-- Button mobile view to collapse sidebar menu -->
    <div class="navbar navbar-default" role="navigation">
      <div class="container">
        <div class="">
          <div class="pull-left">

            <button id="nav-top-sidebar-toggle" class="button-menu-mobile open-left" onclick="sidebarToggle()" @click="sidebarToggle">
              <i class="fa fa-bars"></i>
            </button>

            <span class="clearfix"></span>
          </div>

          <ul class="nav navbar-nav navbar-right pull-right">
            <!--<li class="dropdown pull-left open">-->
              <!--<a href="javascript:void(0);" class="waves-effect">-->
                <!--<i class="md md-notifications"></i> <span class="badge badge-xs badge-danger">3</span>-->
              <!--</a>-->
              <!--<ul class="dropdown-menu dropdown-menu-lg">-->
                <!--<li class="text-center notifi-title">Notification</li>-->
                <!--<li class="list-group">-->
                  <!--&lt;!&ndash; list item&ndash;&gt;-->
                  <!--<a href="javascript:void(0);" class="list-group-item">-->
                    <!--<div class="media">-->
                      <!--<div class="pull-left">-->
                        <!--<em class="fa fa-user-plus fa-2x text-info"></em>-->
                      <!--</div>-->
                      <!--<div class="media-body clearfix">-->
                        <!--<div class="media-heading">New user registered</div>-->
                        <!--<p class="m-0">-->
                          <!--<small>You have 10 unread messages</small>-->
                        <!--</p>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</a>-->
                  <!--&lt;!&ndash; list item&ndash;&gt;-->
                  <!--<a href="javascript:void(0);" class="list-group-item">-->
                    <!--<div class="media">-->
                      <!--<div class="pull-left">-->
                        <!--<em class="fa fa-diamond fa-2x text-primary"></em>-->
                      <!--</div>-->
                      <!--<div class="media-body clearfix">-->
                        <!--<div class="media-heading">New settings</div>-->
                        <!--<p class="m-0">-->
                          <!--<small>There are new settings available</small>-->
                        <!--</p>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</a>-->
                  <!--&lt;!&ndash; list item&ndash;&gt;-->
                  <!--<a href="javascript:void(0);" class="list-group-item">-->
                    <!--<div class="media">-->
                      <!--<div class="pull-left">-->
                        <!--<em class="fa fa-bell-o fa-2x text-danger"></em>-->
                      <!--</div>-->
                      <!--<div class="media-body clearfix">-->
                        <!--<div class="media-heading">Updates</div>-->
                        <!--<p class="m-0">-->
                          <!--<small>There are-->
                            <!--<span class="text-primary">2</span> new updates available-->
                          <!--</small>-->
                        <!--</p>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</a>-->
                  <!--&lt;!&ndash; last list item &ndash;&gt;-->
                  <!--<a href="javascript:void(0);" class="list-group-item">-->
                    <!--<small>See all notifications</small>-->
                  <!--</a>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</li>-->
            <li class="dropdown pull-left open">
              <a href="javascript:void(0);" id="nav-top-settings-toggle" class="dropdown-toggle" @click="settingMenuToggle($event)">
                {{ username }} <i class="caret"></i>
              </a>
              <ul class="dropdown-menu" v-show="showSettingMenu">
                <router-link id="nav-top-profile" tag="li" :to="{ name: 'profile.change-password' }">
                  <a> <i class="md md-account-circle"></i> Account </a>
                </router-link>
                <li class="divider"></li>
                <router-link id="nav-top-settings" tag="li" :to="{ name: 'settings' }">
                  <a> <i class="fa fa-cog"></i> Settings </a>
                </router-link>
                <!--<router-link id="nav-top-users-and-roles" tag="li" :to="{ name: 'user.index' }">-->
                  <!--<a> <i class="fa fa-group"></i> Users & Roles </a>-->
                <!--</router-link>-->
                <li class="divider"></li>
                <li>
                  <a href="javascript:void(0)" tag="li" id="nav-top-logout" @click="logout">
                    <i class="md md-settings-power"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
            <!--<li class="dropdown pull-left open">-->
              <!--<a href="javascript:void(0);" id="nav-top-profile-toggle" class="dropdown-toggle profile" @click="userMenuToggle($event)">-->
                <!--{{ username }} <i class="caret"></i>-->
              <!--</a>-->
              <!--<ul class="dropdown-menu" v-show="showUserMenu">-->
              <!--</ul>-->
            <!--</li>-->
          </ul>


          <form class="navbar-form pull-left" role="search" @submit.prevent="doSearch" style="position: relative">
            <div class="input-group">

              <div class="input-group-btn">
                <div class="btn-group">
                  <button type="button" id="nav-top-search-toggle" class="btn btn-clear" @click="searchMenuToggle">
                    <i class="fa fa-search"></i> <span class="caret"></span>
                  </button>
                </div>
              </div>

              <input type="search"
                     id="nav-top-search"
                     class="form-control search-bar"
                     placeholder="Type here to search..."
                     v-model="search.text"
                     ref="search-text-field"
                     >
            </div>
            <button type="submit" id="nav-top-search-submit" class="btn btn-search">
              <i class="fa fa-search"></i>
            </button>

            <ul v-show="showSearchMenu" class="search__menu">
              <li :class="{ active: searchModule === 'contact' }">
                <a href="javascript:void(0);" @click="selectModule('contact')">
                  <i class="fa fa-check" v-if="searchModule === 'contact'"></i>
                  Contacts
                </a>
              </li>
              <li :class="{ active: searchModule === 'item' }">
                <a href="javascript:void(0);" @click="selectModule('item')">
                  <i class="fa fa-check" v-if="searchModule === 'item'"></i>
                  Items
                </a>
              </li>
              <li :class="{ active: searchModule === 'sales' }">
                <a href="javascript:void(0);" @click="selectModule('sales')">
                  <i class="fa fa-check" v-if="searchModule === 'sales'"></i>
                  Sales Orders
                </a>
              </li>
              <!--<li :class="{ active: searchModule === 'packages' }">-->
                <!--<a href="javascript:void(0);" @click="selectModule('packages')">-->
                  <!--<i class="fa fa-check" v-if="searchModule === 'packages'"></i>-->
                  <!--Packages-->
                <!--</a>-->
              <!--</li>-->
              <!--<li :class="{ active: searchModule === 'invoices' }">-->
                <!--<a href="javascript:void(0);" @click="selectModule('invoices')">-->
                  <!--<i class="fa fa-check" v-if="searchModule === 'invoices'"></i>-->
                  <!--Invoices-->
                <!--</a>-->
              <!--</li>-->
              <!--<li :class="{ active: searchModule === 'purchases' }">-->
                <!--<a href="javascript:void(0);" @click="selectModule('purchases')">-->
                  <!--<i class="fa fa-check" v-if="searchModule === 'purchases'"></i>-->
                  <!--Purchase Orders-->
                <!--</a>-->
              <!--</li>-->
              <!--<li :class="{ active: searchModule === 'bills' }">-->
                <!--<a href="javascript:void(0);" @click="selectModule('bills')">-->
                  <!--<i class="fa fa-check" v-if="searchModule === 'bills'"></i>-->
                  <!--Bills-->
                <!--</a>-->
              <!--</li>-->
            </ul>

          </form>


        </div>
        <!--/.nav-collapse -->
      </div>
    </div>
  </div>
</template>

<script>
  import store from 'src/store'
  import Cookie from 'js-cookie'
  import axios from 'axios'
  import {reauth} from 'src/helpers'

  export default {

    props: ['sidebar'],


    data() {
      return {
        username: '',
        search: {
          text: '',
        },
      }
    },


    computed: {
      showUserMenu() {
        return store.state.global.showUserMenu
      },

      showSettingMenu() {
        return store.state.global.showSettingMenu
      },

      showSearchMenu() {
        return store.state.global.showSearchMenu
      },

      searchModule() {
        return store.state.global.currentSearchModule
      }
    },


    mounted() {
      this.getUsername()

      if (this.search.module === '') {
        // console.log(this.$store)
      }

      document.addEventListener('click', (ev) => {
        if (store.state.global.showUserMenu) store.commit('global/userMenuToggle', false)
        if (store.state.global.showSettingMenu) store.commit('global/settingMenuToggle', false)
        if (store.state.global.showSearchMenu) store.commit('global/searchMenuToggle', false)
      })
    },


    methods: {

      async getUsername() {
        const res = await axios.get(`profile`)
        this.username = res.data.data.email
      },


      logout() {
        // Send logout signal to server
        axios.post('logout')

        // Force user to logout
        Cookie.remove('token_type')
        Cookie.remove('access_token')
        Cookie.remove('refresh_token')
        Cookie.remove('organization_id')

        this.$router.replace('/login')
      },


      selectModule(name) {
        store.commit('global/changeCurrentSearchModule', name)
//        this.$refs.searchTextField.focus()
      },


      doSearch() {
        const route = this.$route.name
        const currentRouteName = route.slice(0, route.indexOf('.'))
        const currentSearchModule = store.state.global.currentSearchModule || currentRouteName

        this.$router.push({
          name: `${currentSearchModule}.index`,
          query: { q: this.search.text }
        })
      },


      sidebarToggle() {
        store.commit('global/SIDEBAR_TOGGLE')
        var x = document.getElementById("icon");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
      },

      userMenuToggle(event) {
        store.commit('global/userMenuToggle')
        event.stopPropagation()
      },

      settingMenuToggle(event) {
        store.commit('global/settingMenuToggle')
        event.stopPropagation()
      },

      searchMenuToggle(event) {
        store.commit('global/searchMenuToggle')
        event.stopPropagation()
      },

    }
  }
</script>

<style scoped>
  .search__menu {
    position: absolute;
    top: 40px;
    background: white;
    z-index: 100;
    box-shadow: 1px 1px 4px #a9a9a9;
    padding: 0;
    margin: 0;
  }

  .search__menu > li {
    list-style: none;
    line-height: 2em;
  }

  .search__menu > li:hover {
    background: #f0f0f0;
  }

  .search__menu > li > a {
    color: black;
    display: block;
    padding: 5px 25px;
  }

</style>
