import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Login from '../views/Login.vue'
import Register from'../views/Register.vue'
import Stats from '../views/Stats.vue'
import Join from '../components/Game/Join.vue'
import Game from '../components/Game/Game.vue'
import joinroom from '../views/Chat/joinroom.vue'
import room from '../views/Chat/room.vue'

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
  // ZOOI VOOR WSTEST
  {
    path: '/joinroom',
    name: 'joinroom',
    component: joinroom
  },
  {
    path: '/room/:roomname',
    name: 'room',
    component: room,
    props: true,
  },
  // EINDE ZOOI
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
