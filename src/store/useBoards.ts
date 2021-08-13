import { reactive, readonly, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/api/api'
import router from '@/router'
import useAuth from './useAuth'
import useLists from './useLists'
import useCards from './useCards'

const omit = (o: any, ...paths: any) =>
  Object.fromEntries(Object.entries(o).filter(([k]) => !paths.includes(k)))

const flatternData = (board: any) => ({
  members: board.members,
  board: omit(board, 'members', 'lists'),
  cards: board.lists.map((list: any) => list.cards).flat(),
  lists: board.lists.map((list: any) => {
    delete list.cards
    return { ...list }
  }),
})

interface DefaultState {
  boards: any[]
  board: any
  boardMembers: any
  lists: any
  cards: any
}

const defaultState: DefaultState = {
  boards: [],
  board: null,
  boardMembers: [],
  lists: [],
  cards: [],
}

const state = reactive(defaultState)

export default () => {
  const { user } = useAuth()
  const { setLists } = useLists()
  const { setCards } = useCards()

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

    async getBoard(id: string) {
      const response = await api.getBoard(id)
      const { members, board, lists, cards } = flatternData(response.data)

      state.boardMembers = members
      state.board = board

      setCards(cards)
      setLists(lists)
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
