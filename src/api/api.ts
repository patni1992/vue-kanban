import apiClient from './apiClient'

const api = {
  login(body: Login): Promise<any> {
    return apiClient.post('/login', body)
  },
  register(body: Register): Promise<any> {
    return apiClient.post('/register', body)
  },
  me(): Promise<any> {
    return apiClient.get('/me')
  },
  verifyEmail(path: string): Promise<any> {
    return apiClient.get(path)
  },
  getBoards(): Promise<any> {
    return apiClient.get('/boards')
  },
  getBoard(id: string): Promise<any> {
    return apiClient.get(`/boards/${id}`)
  },
  createBoard(name: string): Promise<any> {
    return apiClient.post('/boards', { name })
  },
  reorderCards(listId: number, cards: any): Promise<any> {
    return apiClient.post(`/cards/reorder/?listId=${listId}`, {
      cardIds: cards.map((card: any) => card.id),
    })
  },
  createCard(name: string, listId: number): Promise<any> {
    return apiClient.post('/cards', { name, listId })
  },
  reorderlists(boardId: number, lists: any): Promise<any> {
    return apiClient.post(`/lists/reorder/?boardId=${boardId}`, {
      listIds: lists.map((list: any) => list.id),
    })
  },
  addList(name: string, boardId: number): Promise<any> {
    return apiClient.post('/lists', { name, boardId })
  },
}

export default api
