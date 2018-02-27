<template>

  <div class="content-page setting-page">

    <div class="container">
      <div class="row">
        <nav class="setting-page-left" id="setting-page-left" data-spy="affix">
          <ul id="sahito-page-left-list" class="nav">

            <li :class="{ active: $route.name === 'settings' }">
              <router-link :to="{ name: 'settings' }">
                Company Profile
              </router-link>
            </li>
            <li :class="{ active: $route.name === 'settings.store_detail' }">
              <router-link :to="{ name: 'settings.store_detail' }">
                Store Details
              </router-link>
            </li>
            <li :class="{ active: $route.name === 'settings.sales_channel' }">
              <router-link :to="{ name: 'settings.sales_channel' }">
                Sales Channel
              </router-link>
            </li>
            <li :class="{ active: $route.name === 'settings.adjustment' }">
              <router-link :to="{ name: 'settings.adjustment' }">
                Adjustment Settings
              </router-link>
            </li>
            <!--<li :class="{ active: currentView === 'checkout' }">-->
              <!--<a href="javascript:void(0);" @click="changeView('checkout')">-->
                <!--Checkout-->
              <!--</a>-->
            <!--</li>-->
            <!-- <li :class="{ active: $route.name === 'settings.shipment' }">
              <router-link :to="{ name: 'settings.shipment' }">
                Shipment
              </router-link>
            </li> -->
            <li :class="{ active: $route.name === 'settings.payment' }">
              <router-link :to="{ name: 'settings.payment' }">
                Payment Settings
              </router-link>
            </li>
            <!--<li :class="{ active: currentView === 'Notifications' }">-->
              <!--<a href="javascript:void(0);" @click="changeView('Notifications')">-->
                <!--Notifications-->
              <!--</a>-->
            <!--</li>-->

            <!--<li class="active"><a href="#organization">Organization Profile</a></li>-->
            <!--<li><a href="#store_detail">Store Detail</a></li>-->
            <!--<li><a href="#checkout">Checkout</a></li>-->
            <!--<li><a href="#shipping">Shipping</a></li>-->
            <!--<li><a href="#taxes">Taxes</a></li>-->
            <!--<li><a href="#payment">Payment</a></li>-->
            <!--<li><a href="#notifications">Notifications</a></li>-->
          </ul>
        </nav>
      </div>
    </div>

    <div class="setting-page-right">

      <router-view></router-view>

      <!--<component :is="currentView"></component>-->

      <!--<organization-profile></organization-profile>-->
      <!--<store-detail></store-detail>-->
      <!--<checkout></checkout>-->
      <!--<shipping></shipping>-->
      <!--<tax></tax>-->
      <!--<payment></payment>-->
      <!--<notification></notification>-->

    </div>

  </div>

</template>

<script>
  import Axios from 'axios'
  import store from '../../store'

  import OrganizationProfile from './OrganizationProfile';
  import StoreDetail from './StoreDetail';
  import SalesChannel from './SalesChannel';
  import Adjustment from './Adjustment';
  import Shipping from './Shipping';
  import Payment from './Payment';
//  import Checkout from './Checkout';
//  import Tax from './Tax';
//  import Notification from './Notification';

  export default {
    name: 'Settings',

    components: {
      OrganizationProfile,
      StoreDetail,
      Shipping,
      Payment,
      SalesChannel,
      Adjustment,
//      Checkout,
//      Tax,
//      Notification,
    },


    data() {
      return {
        currentView: OrganizationProfile,
      }
    },


    mounted() {

      this.initialize()

      // ScrollSpy
      let offsetHeight = 115
      $('body').scrollspy({
        offset: offsetHeight
      })

      // Animation scrolling
      $("#sahito-page-left-list a").on('click', function (event) {
        if (this.hash !== "") {

          event.preventDefault()

          let hash = this.hash
          let setOff = ($(hash).offset().top) - offsetHeight
          $('html, body').animate({ scrollTop: setOff }, 400, function () {
            // window.location.hash = setOff
          })
        }

      })
    },

    methods: {

      /**
       * Initialize data
       */
      async initialize() {
        await Axios.get('setup')

        store.dispatch('settings/initialize')
      },


      changeView(view) {
        this.currentView = view;
      }
    }
  }
</script>

<style scoped>
  .setting-page .setting-page-left ul li.active {
    background: #e9e9e9;
    border-left: 4px solid #d9d9d9;
  }

  .setting-page .setting-page-left ul li.active a {
    font-weight: bold;
  }

  .setting-page .setting-page-right .content {
    margin-bottom: 25px;
    box-shadow: 0 2px 1px rgba(180, 180, 180, 0.18);
  }

  .setting-page .setting-page-right .content:last-child {
    margin-bottom: 80px;
  }
</style>
