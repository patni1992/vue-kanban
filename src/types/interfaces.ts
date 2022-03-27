/**
 ======== Auth ==========
 */

interface Login {
  email: string
  password: string
}

interface Register {
  email: string
  password: string
  firstName: string
  lastName: string
}

/**
 ======== Card ==========
 */

interface Card {
  name: string
  listId: number
  order: number
  createdAt: string
  updatedAt: string
  id: number
}

interface CreateCard {
  name: Card['name']
  listId: number
  cardsInList: Card[]
}

interface DefaultCardsState {
  cards: Card[]
}

/**
 ======== List ==========
 */

interface List {
  name: string
  id: number
  boardId: number
  order: number
  createdAt: string
  updatedAt: string
}

/**
 ======== Board ==========
 */

interface Board {
  id: number
  name: string
  ownerId: number | undefined
  createdAt: string
  updatedAt: string
}

interface DefaultBoardsState {
  boards: Board[]
  board: Board | null
  boardMembers: User[],
  lists: List[]
  cards: Card[]
}

/**
 ======== User ==========
 */

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}
