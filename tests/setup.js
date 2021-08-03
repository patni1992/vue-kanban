import { config, createWrapperError } from '@vue/test-utils'

const DataTestIdPlugin = (wrapper) => {
  function findByTestId(selector) {
    const dataSelector = `[data-testid='${selector}']`
    const element = wrapper.find(dataSelector)

    if (element) {
      return element
    }

    throw createWrapperError('DOMWrapper')
  }

  return {
    findByTestId,
  }
}

config.plugins.VueWrapper.install(DataTestIdPlugin)
