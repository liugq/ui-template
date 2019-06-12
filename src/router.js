import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Index from './views/Index.vue'
import LookupMaintain from './views/lookup/LookupMaintain.vue'
import RoleManagerment from './views/role/RoleManagerment.vue'
import TS from './views/tsingtao/tsmain.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '/', // process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '', component: Index },
        { path: 'lookup-maintain', component: LookupMaintain },
        { path: 'role-managerment', component: RoleManagerment }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/help/ts',
      name: 'ts',
      component: TS
    }
  ]
})
