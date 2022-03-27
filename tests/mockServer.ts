import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { user, ownerBoards, memberBoards, lists } from './testData'

const handlers = [
  rest.get(`${process.env.VUE_APP_API_URL}/boards`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...ownerBoards, ...memberBoards]))
  }),

  rest.post(`${process.env.VUE_APP_API_URL}/boards`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.get(`${process.env.VUE_APP_API_URL}/boards/:id`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        lists,
        members: [],
        name: 'test-board',
      })
    )
  }),

  rest.get(`${process.env.VUE_APP_API_URL}/me`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user))
  }),
]
function initMockServer() {
  const mockServer = setupServer(...handlers)
  mockServer.listen()
  return mockServer
}

export default initMockServer
