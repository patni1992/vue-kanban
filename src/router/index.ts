import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Board from '@/views/board/Board.vue'
import VerifyEmail from '@/views/auth/VerifyEmail.vue'
import useAuth from '@/store/useAuth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: VerifyEmail,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/boards',
    name: 'Board',
    component: Board,
  },
  {
    path: '/',
    name: 'Home',
    component: Board,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = useAuth().isAuthenticated.value

  if (!to.meta.isPublic && !isAuthenticated) return next({ name: 'Login' })
  else if (to.meta.isPublic && isAuthenticated) return next({ name: 'Board' })

  next()
})

export default router
