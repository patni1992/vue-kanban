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
  createBoard(name: string): Promise<any> {
    return apiClient.post('/boards', { name })
  },
}

export default api
