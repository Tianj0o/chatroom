import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'


import Home from '../views/Home.vue'
import Music from '../views/Music'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      keepkeepAlive:true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path:'/music',
    name:'Music',
    component:Music,
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
