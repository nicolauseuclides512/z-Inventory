import Axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

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
