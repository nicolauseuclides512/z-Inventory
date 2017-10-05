export default [

  {
    path: '/',
    meta: { requiresAuth: true },
    component: require('./Home'),
    children: [

      {
        path: '/',
        name: 'dashboard',
        component: resolve => require(['./components/Sales/List'], resolve),
      },

      /**
       * Contact routes
       */
      {
        path: '/contacts',
        name: 'contact.index',
        component: resolve => require(['./components/Contacts/Index'], resolve),
      },

      {
        path: '/contacts/:id/detail',
        name: 'contact.show',
        component: resolve => require(['./components/Contacts/Detail'], resolve),
      },

      {
        path: '/contacts/create',
        name: 'contact.create',
        component: resolve => require(['./components/Contacts/Create'], resolve),
      },

      {
        path: '/contacts/:id/edit',
        name: 'contact.edit',
        component: resolve => require(['./components/Contacts/Edit'], resolve),
      },

      {
        path: '/contacts/search',
        name: 'contact.search',
        component: resolve => require(['./components/Contacts/Search'], resolve),
      },


      /**
       * Inventory - Items
       */
      {
        path: '/inventory/items',
        name: 'item.index',
        component: resolve => require(['./components/Inventory/Item/Index'], resolve),
      },

      {
        path: '/inventory/items/create',
        name: 'item.create',
        component: resolve => require(['./components/Inventory/Item/Create/Index'], resolve),
      },

      {
        path: '/inventory/items/:id/edit',
        name: 'item.edit',
        component: resolve => require(['./components/Inventory/Item/Edit/Index'], resolve),
      },

      /**
       * Inventory - Collection
       */
      {
        path: '/inventory/collection',
        name: 'collection.index',
        component: resolve => require(['./components/Inventory/Collection/Index'], resolve),
      },

      {
        path: '/inventory/collection/create',
        name: 'collection.create',
        component: resolve => require(['./components/Inventory/Collection/Create'], resolve),
      },

      {
        path: '/inventory/collection/:id/edit',
        name: 'collection.edit',
        component: resolve => require(['./components/Inventory/Collection/Edit'], resolve),
      },

      {
        path: '/items/stock_adjustment',
        name: 'stock_adjustment.index',
        component: resolve => require(['./components/Inventory/StockAdjusment/Index'], resolve),
      },

      {
        path: '/items/stock_adjustment/create',
        name: 'stock_adjustment.create',
        component: resolve => require(['./components/Inventory/StockAdjusment/Form'], resolve),
      },

      {
        path: '/items/stock_adjustment/:id/edit',
        name: 'stock_adjustment.edit',
        component: resolve => require(['./components/Inventory/StockAdjusment/Form'], resolve),
      },

      {
        path: '/items/stock_summary',
        name: 'stock_summary.index',
        component: resolve => require(['./components/Inventory/StockSummary/Index'], resolve),
      },

      {
        path: '/items/stock-summary/:id/edit',
        name: 'stock_summary.edit',
        component: resolve => require(['./components/Inventory/StockSummary/Edit'], resolve),
      },

      /**
       * Discount
       */
      {
        path: '/inventory/discount',
        name: 'discount.index',
        component: resolve => require(['./components/Discount/Index'], resolve),
      },

      {
        path: '/discount/add_coupon',
        name: 'discount.add_coupon',
        component: resolve => require(['./components/Discount/AddCoupon'], resolve),
      },

      {
        path: '/discount/add_promo',
        name: 'discount.add_promo',
        component: resolve => require(['./components/Discount/AddPromo'], resolve),
      },


      /**
       * Report
       */
      {
        path: '/report',
        name: 'report.index',
        component: resolve => require(['./components/Report/Index'], resolve),
      },


      /**
       * Sales Order
       */
      {
        path: '/sales',
        name: 'sales.index',
        component: resolve => require(['./components/Sales/List'], resolve),
      },

      {
        path: '/sales/create',
        name: 'sales.create',
        component: resolve => require(['./components/Sales/Create'], resolve),
      },

      {
        path: '/sales/:id/edit',
        name: 'sales.edit',
        component: resolve => require(['./components/Sales/Edit'], resolve),
      },

      {
        path: '/sales/:id/detail',
        name: 'sales.detail',
        component: resolve => require(['./components/Sales/Detail'], resolve),
      },

      {
        path: '/sales/:sales_order_id/:invoice_id/email',
        name: 'sales.email',
        component: resolve => require(['./components/Sales/Email'], resolve),
      },


      /**
       * User list
       */
      {
        path: '/users',
        name: 'user.index',
        component: resolve => require(['./components/Users/UserList'], resolve),
      },

      {
        path: '/profile',
        name: 'profile',
        component: resolve => require(['./components/Profile/EditProfile'], resolve),
        children: [
          {
            path: '/profile/personal-information',
            name: 'profile.personal-information',
            component: resolve => require(['./components/Profile/Edit'], resolve),
          },

          {
            path: '/profile/change-password',
            name: 'profile.change-password',
            component: require('./components/Profile/ChangePassword'),
          }
        ]
      }


    ],
  },


  /**
   * --------------------------------------------------
   * Settings
   * --------------------------------------------------
   */
  {
    path: '/settings',
    meta: { requiresAuth: true },
    component: resolve => require(['./components/Settings/Layout'], resolve),
    children: [
      {
        path: '/',
        name: 'settings',
        component: resolve => require(['./components/Settings/Index'], resolve),
      }
    ]
  },


  /**
   * --------------------------------------------------
   * Authentication routes
   * --------------------------------------------------
   */
  {
    path: '/login',
    name: 'auth.login',
    component: resolve => require(['./components/Auth/Login'], resolve)
  },

  {
    path: '/register',
    name: 'auth.register',
    component: resolve => require(['./components/Auth/Register'], resolve)
  },

  {
    path: '/register/thankyou',
    name: 'auth.register.thankyou',
    component: resolve => require(['./components/Auth/RegisterThankYou'], resolve)
  },

  {
    path: '/verification',
    name: 'auth.verification',
    component: resolve => require(['./components/Auth/Verification'], resolve)
  },

  {
    path: '/forgot',
    name: 'auth.forgot',
    component: resolve => require(['./components/Auth/ForgotPassword'], resolve)
  },


  /**
   * --------------------------------------------------
   * 404 not found page
   * --------------------------------------------------
   */
  { path: '*', component: resolve => require(['./errors/404'], resolve) }

]
