import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DailyScrum from '../views/DailyScrum.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: Home
  },
  {
    path: '/login',
    name: 'Login',
    components: {default: Login}
  },
  {
    path: '/register',
    name: 'register',
    components: {default: Register, footer: Footer}
  },
  {
    path: '/dailyscrum',
    name: 'dailyscrum',
    components: {default: DailyScrum, footer: Footer, header: Navbar}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
