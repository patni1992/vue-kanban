import { reactive, readonly, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/api/api'
import router from '@/router'

const toast = useToast()

const defaultState = {
  token: localStorage.getItem('token') || '',
  loading: false,
  error: '',
}

const state = reactive(defaultState)

const extractErrorMessage = (error: any) => {
  const { errors } = error.response.data
  let errorMessage = ''

  errors.forEach((e: any) => {
    errorMessage += `${e.message}\n`
  })

  return errorMessage
}

const getters = {
  isLoading: computed(() => state.loading),
  isAuthenticated: computed(() => !!state.token),
}

const actions = {
  async login(payload: Login) {
    try {
      state.loading = true

      const response = await api.login(payload)
      state.token = response.data.token

      router.push('/boards')
    } catch (e) {
      const { code, message } = e.response.data
      if (code === 'EMAIL_NOT_VERIFIED') {
        router.push({ name: 'VerifyEmail' })
      } else {
        toast.error(message)
      }
    }
    state.loading = false
  },
  async register(payload: Register) {
    try {
      state.loading = true
      await api.register(payload)
      router.push({ name: 'VerifyEmail' })
    } catch (e) {
      toast.error(extractErrorMessage(e))
    }
    state.loading = false
  },
  logout() {
    state.token = ''
    router.push({ name: 'Login' })
  },
}

watch(
  () => state.token,
  () => {
    localStorage.setItem('token', state.token)
  }
)

export default () => {
  return {
    state: readonly(state),
    ...getters,
    ...actions,
  }
}
