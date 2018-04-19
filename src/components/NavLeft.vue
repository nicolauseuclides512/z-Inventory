<template>
  <div class="left side-menu">

    <div id="sidebar-menu" style="padding-top: 35px;">
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
            <span><i class="ion-ios7-plus-empty "></i></span>
          </router-link>
          <router-link id="nev-left-sales" :to="{ name: 'sales.index', query: { filter: 'all', sort: 'created_at.desc' }}" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="icon-sales" style="font-size:23px"></i><span> Sales Orders</span>
          </router-link>
          <li>
          <router-link
            :to="{ name: 'contact.create' }"
            class="waves-effect waves-light pull-right"
            v-if="sidebarEnlarged"
            style="padding: 15px 7px 15px 7px;"
          >
            <span><i class="ion-ios7-plus-empty " style="font-size:23px"></i></span>
          </router-link>
          <router-link id="nev-left-contacts" :to="{ name: 'contact.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="icon-contact" style="font-size:23px"></i><span> Contacts </span>
          </router-link>
        </li>
        
        <li v-if="sidebarEnlarged">
          <router-link id="nev-left-items" :to="{ name: 'item.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="icon-item_2" style="font-size:23px"></i><span>Item List</span>
          </router-link>
        </li>

        <li v-if="sidebarEnlarged">
          <router-link id="nev-left-items" :to="{ name: 'item.create' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="icon-item_3" style="font-size:23px"></i><span>Create Item</span>
          </router-link>
        </li>
		
		<li v-if="sidebarEnlarged">
          <router-link id="nev-left-items" :to="{ name: 'item.create_variant' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="icon-item" style="font-size:23px"></i><span>Create Variant</span>
          </router-link>
        </li>
		
		<li v-if="sidebarEnlarged">
          <router-link id="nev-left-sales" :to="{ name: 'stock_adjustment.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="icon-stock2" style="font-size:23px"></i><span>Stock Adjustment</span>
          </router-link>
        </li>
		
		<li v-if="sidebarEnlarged">
          <router-link id="nev-left-stock-adjustment" :to="{ name: 'stock_summary.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="icon-stock" style="font-size:23px"></i><span>Stock Summary</span>
          </router-link>
        </li>

        <!--<dropdown-menu id="nav-left-sales" title="Sales" icon="md-shopping-cart">-->
        <!---->
        <!--</dropdown-menu>-->
        <!-- <dropdown-menu v-if="sidebarEnlarged" tag="li" title="Items">
          <router-link
            :to="{ name: 'item.create' }"
            class="waves-effect waves-light pull-right"
            style="padding: 10px 7px 10px 12px; height:38px"
          >
            <span><i class="fa fa-plus"></i></span>
          </router-link>
          <router-link tag="li" :to="{ name: 'item.index' }">
            <a class="waves-effect waves-light" style="padding-right: 5px; padding-left: 42px">Item List</a>
          </router-link>
          <router-link
            :to="{ name: 'item.create_variant' }"
            class="waves-effect waves-light pull-right"
            style="padding: 10px 7px 10px 12px; height:38px"
          >
            <span><i class="fa fa-plus"></i></span>
          </router-link>
          <router-link tag="li" :to="{ name: 'item.index' }">
            <a class="waves-effect waves-light" style="padding-right: 5px; padding-left: 42px">Item Variant</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'stock_adjustment.index' }">
            <a class="waves-effect waves-light" style="padding-right: 5px; padding-left: 42px">Stock Adjustment</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'stock_summary.index' }">
            <a class="waves-effect waves-light" style="padding-right: 5px; padding-left: 42px">Stock Summary</a>
          </router-link>
        </dropdown-menu> -->
        <!--This Code below are shown when SideBar is not enlarged-->
        <li v-if="!sidebarEnlarged">
          <router-link id="nav-left-items" :to="{ name: 'item.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
              <i class="icon-item_2" style="font-size:23px"></i><span>Item List</span>
          </router-link>
        </li>
        <li v-if="!sidebarEnlarged">
          <router-link id="nav-left-items" :to="{ name: 'item.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
              <i class="icon-item" style="font-size:23px"></i><span>Item Variant</span>
          </router-link>
        </li>
        <li v-if="!sidebarEnlarged">
          <router-link id="nav-left-stock-adjustment" :to="{ name: 'stock_adjustment.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
              <i class="icon-stock2" style="font-size:23px"></i><span>Stock Adjustment</span>
          </router-link>
        </li>
        <li v-if="!sidebarEnlarged">
          <router-link id="nav-left-items" :to="{ name: 'stock_summary.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
              <i class="icon-stock" style="font-size:23px"></i><span>Stock Summary</span>
          </router-link>
        </li>
        <!-- END -->
        
        <li>
          <router-link id="nev-left-report" :to="{ name: 'report.index' }" class="waves-effect waves-light" style="padding-right: 5px; padding-left: 0px">
            <i class="icon-stat" style="font-size:23px"></i><span> Report </span>
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
            <i class="icon-gear" style="font-size:23px"></i><span> Settings </span>
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

span{
  font-family: 'Nanum Gothic', sans-serif;
}

i{
  font-size: 23px
}
</style>
