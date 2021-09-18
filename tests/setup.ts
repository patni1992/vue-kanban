import { config, flushPromises, VueWrapper } from '@vue/test-utils'
import initMockServer from './mockServer'

const DataTestIdPlugin = (wrapper: VueWrapper<any>) => {
  function findByTestId(selector: string, multiple = false) {
    const dataSelector = `[data-testid='${selector}']`
    const element = multiple
      ? wrapper.findAll(dataSelector)
      : wrapper.find(dataSelector)

    return element
  }

  return {
    findByTestId,
  }
}

const mockServer = initMockServer()

global.beforeAll(async () => {
  mockServer.listen()
  await flushPromises()
})
global.afterEach(() => mockServer.resetHandlers())
global.afterAll(() => mockServer.close())

config.plugins.VueWrapper.install(DataTestIdPlugin)
