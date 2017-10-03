<template>
  <div class="left side-menu">

    <div id="sidebar-menu">
      <ul>

        <!--<li>-->
          <!--<router-link id="nev-left-dashboard" :to="{ name: 'dashboard' }" class="waves-effect waves-light">-->
            <!--<i class="md md-home"></i><span> Dashboard </span>-->
          <!--</router-link>-->
        <!--</li>-->

        <li class="clearfix">
          <router-link
            :to="{ name: 'sales.index', query: { filter: 'all', sort: 'created_at.desc' }}"
            class="waves-effect waves-light pull-left"
          >
            <i class="md-shopping-cart"></i> Sales Orders
          </router-link>
          <router-link :to="{ name: 'sales.create' }" class="pull-right" style="padding: 15px 13px; margin: 0;">
            <i class="fa fa-plus"></i>
          </router-link>
        </li>

        <!--<dropdown-menu id="nav-left-sales" title="Sales" icon="md-shopping-cart">-->
        <!---->
        <!--</dropdown-menu>-->

        <dropdown-menu title="Items" icon="ion-folder">
          <router-link tag="li" :to="{ name: 'item.index' }">
            <a class="waves-effect waves-light">Item List</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'stock_adjustment.index' }">
            <a class="waves-effect waves-light">Stock Adjustment</a>
          </router-link>
          <router-link tag="li" :to="{ name: 'stock_summary.index' }">
            <a class="waves-effect waves-light">Stock Summary</a>
          </router-link>
        </dropdown-menu>

        <li>
          <router-link id="nev-left-contacts" :to="{ name: 'contact.index' }" class="waves-effect waves-light">
            <i class="md md-perm-contact-cal"></i><span> Contacts </span>
          </router-link>
        </li>

        <router-link id="nev-left-report" tag="li" :to="{ name: 'report.index' }">
          <a class="waves-effect waves-light">
            <i class="md md-assessment"></i>
            Report
          </a>
        </router-link>

        <!--<dropdown-menu id="nav-left-inventories" title="Inventories" icon="ion-folder">-->
          <!--<router-link id="nev-left-collections" tag="li" :to="{ name: 'collection.index' }">-->
            <!--<a class="waves-effect waves-light">Collection</a>-->
          <!--</router-link>-->
          <!--<router-link id="nev-left-discount" tag="li" :to="{ name: 'discount.index' }">-->
            <!--<a class="waves-effect waves-light">Discount</a>-->
          <!--</router-link>-->
        <!--</dropdown-menu>-->



        <router-link id="nev-left-settings" tag="li" :to="{ name: 'settings' }">
          <a class="waves-effect waves-light">
            <i class="md md-settings"></i> <span>Settings</span>
          </a>
        </router-link>

      </ul>
      <div class="clearfix"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  export default {
    components: {
      'dropdown-menu': require('./Nav/DropdownMenu.vue'),
    },
  };
</script>

<style scoped>
  .router-link-active {
    background: #272C35;
    color: #ffffff;
  }

  .side-menu {
    position: fixed;
    z-index: 15;
  }
</style>
