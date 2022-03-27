import { reactive, readonly, computed } from 'vue'
import api from '@/api/api'
import { cardFactory } from './factories'

const defaultState: DefaultCardsState = {
  cards: [],
}

const state = reactive(defaultState)

export default () => {
  const getters = {
    cardsByListId: computed(
      () => (listId: Card['listId']) =>
        state.cards
          .filter((card) => card.listId === listId)
          .sort((a, b) => a.order - b.order)
    ),
  }

  const actions = {
    reOrderCard(listId: Card['listId'], fromIndex: number, toIndex: number) {
      const cards = getters.cardsByListId.value(listId)
      const card = cards[fromIndex]

      cards.splice(fromIndex, 1)
      cards.splice(toIndex, 0, card)

      cards.forEach((card, index) => {
        card.order = index
        card.listId = listId
      })

      api.reorderCards(listId, cards)
    },

    moveCard(listId: Card['listId'], cardId: Card['id'], newIndex: number) {
      const cards = getters.cardsByListId.value(listId)
      const card = state.cards.find((card) => card.id === cardId)

      if (!card) return

      cards.splice(newIndex, 0, card)

      cards.forEach((card, index) => {
        card.order = index
        card.listId = listId
      })

      api.reorderCards(listId, cards)
    },

    async createCard(name: Card['name'], listId: Card['listId']) {
      const cardsInList = getters.cardsByListId.value(listId)
      const newCard: Card = cardFactory({ name, listId, cardsInList })

      state.cards.push(newCard)

      const response = await api.createCard(name, listId)
      state.cards[state.cards.length - 1] = response.data
    },

    async setCards(cards: Card[]) {
      state.cards = cards
    },
  }

  return {
    state: readonly(state),
    ...getters,
    ...actions,
  }
}
