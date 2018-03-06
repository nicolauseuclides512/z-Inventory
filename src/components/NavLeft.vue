<template>
  <div class="left side-menu">

    <div id="sidebar-menu" style="padding-top: 83px;">
      <ul>

        <!--<li>-->
        <!--<router-link id="nev-left-dashboard" :to="{ name: 'dashboard' }" class="waves-effect waves-light">-->
        <!--<i class="md md-home"></i><span> Dashboard </span>-->
        <!--</router-link>-->
        <!--</li>-->

        <li>
          <router-link
            :to="{ name: 'sales.create' }"
            class="waves-effect waves-light pull-right"
            v-if="sidebarEnlarged"
            style="padding: 15px 7px 15px 7px;"
          >
            <span><i class="fa fa-plus"></i></span>
          </router-link>
          <router-link id="nev-left-sales" :to="{ name: 'sales.index', query: { filter: 'all', sort: 'created_at.desc' }}" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="md md-shopping-cart"></i><span> Sales Orders</span>
          </router-link>
        </li>

        <!--<dropdown-menu id="nav-left-sales" title="Sales" icon="md-shopping-cart">-->
        <!---->
        <!--</dropdown-menu>-->
        <dropdown-menu tag="li" title="Items" icon="fa fa-dropbox">
          <router-link tag="li" :to="{ name: 'item.index' }">
            <a class="waves-effect waves-light" style="padding-right: 5px; padding-left: 42px">Item List</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'stock_adjustment.index' }">
            <a class="waves-effect waves-light" style="padding-right: 5px; padding-left: 42px">Stock Adjustment</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'stock_summary.index' }">
            <a class="waves-effect waves-light" style="padding-right: 5px; padding-left: 42px">Stock Summary</a>
          </router-link>
        </dropdown-menu>
        <li>
          <router-link id="nev-left-contacts" :to="{ name: 'contact.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="md md-people"></i><span> Contacts </span>
          </router-link>
        </li>
        <li>
          <router-link id="nev-left-report" :to="{ name: 'report.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="fa fa-area-chart"></i><span> Report </span>
          </router-link>
        </li>

        <!--<dropdown-menu id="nav-left-inventories" title="Inventories" icon="ion-folder">-->
        <!--<router-link id="nev-left-collections" tag="li" :to="{ name: 'collection.index' }">-->
        <!--<a class="waves-effect waves-light">Collection</a>-->
        <!--</router-link>-->
        <!--<router-link id="nev-left-discount" tag="li" :to="{ name: 'discount.index' }">-->
        <!--<a class="waves-effect waves-light">Discount</a>-->
        <!--</router-link>-->
        <!--</dropdown-menu>-->

        <li>
          <router-link id="nev-left-settings" :to="{ name: 'settings' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="fa fa-gear"></i><span> Settings </span>
          </router-link>
        </li>

      </ul>
      <div class="clearfix"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import store from '@/store'

  export default {

    components: {
      "dropdown-menu": () => import("./Nav/DropdownMenu.vue")
    },

    computed: {
      sidebarEnlarged() {
        return store.state.global.sidebarEnlarged
      }
    }
  }
</script>

<style scoped>
.router-link-active {
  background: #2FA3E6 !important;
  color: #ffffff;
  font-weight: bold;
}

.side-menu {
  position: fixed;
  z-index: 15;
}
</style>
