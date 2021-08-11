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

export { ownerBoards, memberBoards, user }
