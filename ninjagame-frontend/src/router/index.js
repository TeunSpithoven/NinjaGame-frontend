import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Login from '../views/Login.vue'
import Register from'../views/Register.vue'
import Stats from '../views/Stats.vue'
import Join from '../components/Game/Join.vue'
import Game from '../components/Game/Game.vue'
import Echo from '../components/Echo.vue'

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
  },
  {
    path: '/join',
    name: 'Join',
    component: Join
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/echo',
    name: 'Echo',
    component: Echo
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
