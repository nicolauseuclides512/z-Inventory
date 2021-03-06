import Axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueMultianalytics from 'vue-multianalytics'

Vue.use(VueRouter)


/**
 * Setup router
 */
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  },
})

// if(process.env.NODE_ENV == 'production'){

//   let gaConfig = {
//     appName: 'Zuragan Web App',
//     appVersion: '0.1.0',
//     // trackingId: process.env.GA_ID,
//     trackingId: 'UA-104614950-3',
//     debug: (process.env.NODE_ENV !== 'production')?true:false,
//   }

//   let mixpanelConfig = {
//   //   token: process.env.MIXPANEL_TOKEN
//     token: '946153a6f2bb0d44ff8fa88188b21a6d'
//   }

//   Vue.use(VueMultianalytics, {
//     modules: {
//       mixpanel: mixpanelConfig,
//       ga: gaConfig,
//     },
//     routing: {
//       vueRouter: router,
//       preferredProperty: 'fullPath',
//     }
//   })
// }

/**
 * Setup authentication middleware
 */
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    // Check if user already authenticated
    if (!Cookie.get('access_token')) {
      next({name: 'auth.login', query: {redirect: to.fullPath}})
    }

    Axios.defaults.headers.common['X-Header-Organization-Id'] = Cookie.get('organization_id')

  }

  next()
})

export default router
