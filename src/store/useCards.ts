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
        state.cards
          .filter((card) => card.listId === listId)
          .sort((a, b) => a.order - b.order)
    ),
  }

  const actions = {
    reOrderCard(listId: any, fromIndex: number, toIndex: number) {
      const cards = getters.cardsByListId.value(listId)
      const card = cards[fromIndex]

      cards.splice(fromIndex, 1)
      cards.splice(toIndex, 0, card)

      cards.forEach((card, index) => {
        card.order = index
        card.listId = listId
      })
    },

    moveCard(listId: any, cardId: any, newIndex: any) {
      const cards = getters.cardsByListId.value(listId)
      const card = state.cards.find((card) => card.id === cardId)

      cards.splice(newIndex, 0, card)

      cards.forEach((card, index) => {
        card.order = index
        card.listId = listId
      })

      api.reorderCards(listId, cards)
    },

    async setCards(cards: any) {
      state.cards = cards
    },
  }

  return {
    state: readonly(state),
    ...getters,
    ...actions,
  }
}
