import { reactive, readonly, computed } from 'vue'

import api from '@/api/api'

interface DefaultState {
  lists: List[]
}

const defaultState: DefaultState = {
  lists: [],
}

const state = reactive(defaultState)

export default () => {
  const getters = {
    lists: computed(() => state.lists.sort((a, b) => a.order - b.order)),
  }

  const actions = {
    moveList(oldIndex: number, newIndex: number) {
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
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      })

      const response = await api.addList(name, boardId)
      state.lists[state.lists.length - 1] = response.data
    },
    setLists(lists: List[]) {
      state.lists = lists
    },
  }

  return {
    state: readonly(state),
    ...getters,
    ...actions,
  }
}
