import { reactive, readonly, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/api/api'
import router from '@/router'
import useAuth from './useAuth'

interface DefaultState {
  cards: any[]
}

const defaultState: DefaultState = {
  cards: [],
}

const state = reactive(defaultState)

export default () => {
  const getters = {
    cardsByListId: computed(
      () => (listId: any) =>
        state.cards.filter((card) => card.listId === listId)
    ),
  }

  const actions = {
    async setCards(cards: any) {
      console.log('cards')
      console.log(cards)
      state.cards = cards
    },
  }

  return {
    state: readonly(state),
    ...getters,
    ...actions,
  }
}
