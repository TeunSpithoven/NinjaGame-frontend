import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Login from '../views/Login.vue'
import Register from'../views/Register.vue'
import Stats from '../views/Stats.vue'

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
