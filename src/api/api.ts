import apiClient from './apiClient'

const api = {
  login(body: Login): Promise<any> {
    return apiClient.post('login', body)
  },
  register(body: Register): Promise<any> {
    return apiClient.post('register', body)
  },
}

export default api
