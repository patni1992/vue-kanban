import { reactive, readonly, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/api/api'
import router from '@/router'
import useAuth from './useAuth'

const defaultState: { boards: any[] } = { boards: [] }
const state = reactive(defaultState)

export default () => {
  const { user } = useAuth()

  const getters = {
    ownerBoards: computed(() =>
      state.boards.filter(
        (board: any) => board?.ownerId === user?.value?.['id']
      )
    ),
    memberBoards: computed(() =>
      state.boards.filter(
        (board: any) => board?.ownerId !== user?.value?.['id']
      )
    ),
  }

  const actions = {
    async getBoards() {
      const response = await api.getBoards()
      state.boards = response.data
    },

    async createBoard(name: any) {
      state.boards.unshift({
        name: name,
        id: Date.now(),
        ownerId: user?.value?.['id'],
      })

      const response = await api.createBoard(name)
      // state.boards = response.data
      // console.log(state.boards)
    },
  }

  return {
    state: readonly(state),
    ...getters,
    ...actions,
  }
}
