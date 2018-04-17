export default [

  {
    path: '/',
    meta: {requiresAuth: true},
    component: () => import('./Home'),
    children: [

      {
        path: '/',
        name: 'dashboard',
        component: () => import('./components/Sales/List'),
      },

      /**
       * Contact routes
       */
      {
        path: '/contacts',
        name: 'contact.index',
        component: () => import('./components/Contacts/Index'),
      },

      {
        path: '/contacts/:id/detail',
        name: 'contact.show',
        component: () => import('./components/Contacts/Detail'),
      },

      {
        path: '/contacts/create',
        name: 'contact.create',
        component: () => import('./components/Contacts/Form'),
      },

      {
        path: '/contacts/:id/edit',
        name: 'contact.edit',
        component: () => import('./components/Contacts/Form'),
      },

      {
        path: '/contacts/search',
        name: 'contact.search',
        component: () => import('./components/Contacts/Search'),
      },


      /**
       * Inventory - Items
       */
      {
        path: '/inventory/items',
        name: 'item.index',
        component: () => import('./components/Inventory/Item/Index'),
      },

      {
        path: '/inventory/items/create',
        name: 'item.create',
        component: () => import('./components/Inventory/Item/Form'),
      },

      {
        path: '/inventory/items/:id/edit',
        name: 'item.edit',
        component: () => import('./components/Inventory/Item/Form'),
      },

      {
        path: '/inventory/items/create_variant',
        name: 'item.create_variant',
        component: () => import('./components/Inventory/Item/FormVariant'),
      },

      {
        path: '/inventory/items/:id/edit_variant',
        name: 'item.edit_variant',
        component: () => import('./components/Inventory/Item/FormVariant'),
      },

      /**
       * Inventory - Collection
       */
      {
        path: '/inventory/collection',
        name: 'collection.index',
        component: () => import('./components/Inventory/Collection/Index'),
      },

      {
        path: '/inventory/collection/create',
        name: 'collection.create',
        component: () => import('./components/Inventory/Collection/Create'),
      },

      {
        path: '/inventory/collection/:id/edit',
        name: 'collection.edit',
        component: () => import('./components/Inventory/Collection/Edit'),
      },

      {
        path: '/items/stock_adjustment',
        name: 'stock_adjustment.index',
        component: () => import('./components/Inventory/StockAdjusment/Index'),
      },

      {
        path: '/items/stock_adjustment/create',
        name: 'stock_adjustment.create',
        component: () => import('./components/Inventory/StockAdjusment/Form'),
      },

      {
        path: '/items/stock_adjustment/:id/edit',
        name: 'stock_adjustment.edit',
        component: () => import('./components/Inventory/StockAdjusment/Form'),
      },

      {
        path: '/items/stock_summary',
        name: 'stock_summary.index',
        component: () => import('./components/Inventory/StockSummary/Index'),
      },

      {
        path: '/items/stock-summary/:id/edit',
        name: 'stock_summary.edit',
        component: () => import('./components/Inventory/StockSummary/Edit'),
      },

      /**
       * Discount
       */
      {
        path: '/inventory/discount',
        name: 'discount.index',
        component: import('./components/Discount/Index'),
      },

      {
        path: '/discount/add_coupon',
        name: 'discount.add_coupon',
        component: import('./components/Discount/AddCoupon'),
      },

      {
        path: '/discount/add_promo',
        name: 'discount.add_promo',
        component: import('./components/Discount/AddPromo'),
      },


      /**
       * Report
       */
      {
        path: '/report',
        name: 'report.index',
        component: () => import('./components/Report/Index'),
      },


      /**
       * Sales Order
       */
      {
        path: '/sales',
        name: 'sales.index',
        component: () => import('./components/Sales/List'),
      },

      {
        path: '/sales/create',
        name: 'sales.create',
        component: () => import('./components/Sales/Form'),
      },

      {
        path: '/sales/:id/edit',
        name: 'sales.edit',
        component: () => import('./components/Sales/Form'),
      },

      {
        path: '/sales/:id/details',
        name: 'sales.details',
        component: () => import('./components/Sales/Detail'),
      },

      {
        path: '/sales/:id/detail',
        name: 'sales.detail',
        component: () => import('./components/SalesOrder/Details/Main'),
      },

      {
        path: '/sales/:sales_order_id/:invoice_id/email',
        name: 'sales.email',
        component: () => import('./components/Sales/Email'),
      },


      /**
       * User list
       */
      {
        path: '/users',
        name: 'user.index',
        component: () => import('./components/Users/UserList'),
      },

      {
        path: '/profile',
        name: 'profile',
        component: () => import('./components/Profile/EditProfile'),
        children: [
          {
            path: '/profile/personal-information',
            name: 'profile.personal-information',
            component: () => import('./components/Profile/Edit'),
          },

          {
            path: '/profile/change-password',
            name: 'profile.change-password',
            component: () => import('./components/Profile/ChangePassword'),
          },
        ],
      },


    ],
  },


  /**
   * --------------------------------------------------
   * Settings
   * --------------------------------------------------
   */
  {
    path: '/settings',
    meta: {requiresAuth: true},
    component: () => import('./components/Settings/Layout'),
    children: [
      {
        path: '/',
        component: () => import('./components/Settings/Index'),
        children: [
          {
            path: '/',
            name: 'settings',
            component: () => import('./components/Settings/OrganizationProfile'),
          },
          {
            path: '/settings/store_detail',
            name: 'settings.store_detail',
            component: () => import('./components/Settings/StoreDetail'),
          },
          {
            path: '/settings/sales_channel',
            name: 'settings.sales_channel',
            component: () => import('./components/Settings/SalesChannel'),
          },
          {
            path: '/settings/adjustment',
            name: 'settings.adjustment',
            component: () => import('./components/Settings/Adjustment'),
          },
          {
            path: '/settings/shipment',
            name: 'settings.shipment',
            component: () => import('./components/Settings/Shipping'),
          },
          {
            path: '/settings/payment',
            name: 'settings.payment',
            component: () => import('./components/Settings/Payment'),
          },
        ],
      },
    ],
  },


  /**
   * --------------------------------------------------
   * Authentication routes
   * --------------------------------------------------
   */
  {
    path: '/login',
    name: 'auth.login',
    component: () => import('./components/Auth/Login'),
  },

  {
    path: '/register',
    name: 'auth.register',
    component: () => import('./components/Auth/Register'),
  },

  {
    path: '/register/thankyou',
    name: 'auth.register.thankyou',
    component: () => import('./components/Auth/RegisterThankYou'),
  },

  {
    path: '/verification',
    name: 'auth.verification',
    component: () => import('./components/Auth/Verification'),
  },

  {
    path: '/forgot',
    name: 'auth.forgot',
    component: () => import('./components/Auth/ForgotPassword'),
  },

  {
    path: '/register/company',
    name: 'auth.register.company',
    component: () => import('./components/Auth/RegisterNewCompany')
  },


  /**
   * --------------------------------------------------
   * 404 not found page
   * --------------------------------------------------
   */
  {path: '*', component: () => import('./errors/404')},

]
