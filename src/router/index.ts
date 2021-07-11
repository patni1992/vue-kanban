import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import Board from '@/views/board/Board.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Home',
    component: Login,
  },
  {
    path: '/boards',
    name: 'Board',
    component: Board,
  },

  {
    path: '/',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
