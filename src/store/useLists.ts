import { reactive, readonly, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/api/api'
import router from '@/router'
import useAuth from './useAuth'

interface DefaultState {
  lists: any[]
}

const defaultState: DefaultState = {
  lists: [],
}

const state = reactive(defaultState)

export default () => {
  const getters = {
    lists: computed(() => state.lists),
  }

  const actions = {
    async setLists(lists: any) {
      state.lists = lists
    },
  }

  return {
    state: readonly(state),
    ...getters,
    ...actions,
  }
}
