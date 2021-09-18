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
    lists: computed(() =>
      state.lists.sort((a: any, b: any) => a.order - b.order)
    ),
  }

  const actions = {
    moveList(oldIndex: any, newIndex: any) {
      const element = state.lists[oldIndex]
      state.lists.splice(oldIndex, 1)
      state.lists.splice(newIndex, 0, element)
      state.lists.forEach((list, index) => {
        list.order = index
      })

      api.reorderlists(state.lists[0].boardId, state.lists)
    },
    async addList(name: string, boardId: number) {
      if (!name) return
      const lists = getters.lists.value
      const lastList = lists[lists.length - 1]
      const order = lastList?.order ? lastList.order + 1 : 0

      state.lists.push({
        name: name,
        boardId,
        id: Date.now(),
        order,
      })

      await api.addList(name, boardId)
    },
    setLists(lists: any) {
      state.lists = lists
    },
  }

  return {
    state: readonly(state),
    ...getters,
    ...actions,
  }
}
