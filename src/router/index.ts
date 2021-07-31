import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Boards from '@/views/boards/Boards.vue'
import Board from '@/views/boards/Board.vue'
import VerifyEmail from '@/views/auth/VerifyEmail.vue'
import EmailVerified from '@/views/auth/EmailVerified.vue'
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
    path: '/email-verified',
    name: 'EmailVerified',
    component: EmailVerified,
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
    name: 'Boards',
    component: Boards,
  },
  {
    path: '/boards/:id',
    name: 'Board',
    component: Board,
  },
  {
    path: '/',
    name: 'Home',
    component: Boards,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = useAuth().isAuthenticated.value

  if (!to.meta.isPublic && !isAuthenticated) return next({ name: 'Login' })
  else if (to.meta.isPublic && isAuthenticated) return next({ name: 'Boards' })

  next()
})

export default router
