const user = {
  id: 1,
  email: 'test@gmail.com',
  firstName: 'john',
  lastName: 'Doe',
}

const ownerBoards = [
  { id: 1, name: 'random-owner-board', ownerId: user.id },
  { id: 2, name: 'test-owner-board', ownerId: user.id },
]

const memberBoards = [
  { id: 3, name: 'random-member-board', ownerId: 1337 },
  { id: 4, name: 'test-member-board', ownerId: 1337 },
]

const lists = [
  { id: 1, name: 'test-list-2', boardId: 2, order: 2, cards: [] },
  { id: 1, name: 'test-list-1', boardId: 1, order: 1, cards: [] },
  { id: 1, name: 'test-list-3', boardId: 1, order: 3, cards: [] },
]

const boardName = 'test-board'

export { ownerBoards, memberBoards, user, lists, boardName }
