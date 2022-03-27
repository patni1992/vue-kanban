import { reactive, readonly, computed } from 'vue'
import api from '@/api/api'
import useAuth from './useAuth'
import useLists from './useLists'
import useCards from './useCards'

const omit = (o: { [key: string]: any }, ...paths: any) =>
  Object.fromEntries(Object.entries(o).filter(([k]) => !paths.includes(k)))

const flatternData = (board: any) => ({
  members: board.members as User[],
  board: omit(board, 'members', 'lists') as Board,
  cards: board.lists.map((list: any) => list.cards).flat() as Card[],
  lists: board.lists.map((list: any) => {
    delete list.cards
    return { ...list }
  }) as List[],
})

const defaultState: DefaultBoardsState = {
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
    board: computed(() => state.board),
    ownerBoards: computed(() =>
      state.boards.filter((board) => board?.ownerId === user?.value?.['id'])
    ),
    memberBoards: computed(() =>
      state.boards.filter((board) => board?.ownerId !== user?.value?.['id'])
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

    async createBoard(name: string) {
      state.boards.unshift({
        name: name,
        id: new Date().getMilliseconds(),
        ownerId: user.value?.['id'],
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      })

      const response = await api.createBoard(name)
      state.boards = response.data
    },
  }

  return {
    state: readonly(state),
    ...getters,
    ...actions,
  }
}
