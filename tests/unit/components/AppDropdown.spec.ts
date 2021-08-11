import { shallowMount, mount } from '@vue/test-utils'
import AppDropdown from '@/components/AppDropdown.vue'

describe('AppDropdown.vue', () => {
  it('should render provided title', () => {
    const title = 'Test title 123'
    const wrapper = shallowMount(AppDropdown, {
      props: {
        title,
      },
    })
    expect(wrapper.html()).toContain(title)
  })
  it('should render provided item links', async () => {
    const items = [
      {
        title: 'VUE_JS',
        link: 'https://vuejs.org',
      },
      {
        title: 'REACT_NATIVE',
        link: 'https://reactnative.dev',
      },
    ]
    const wrapper = shallowMount(AppDropdown, {
      props: {
        items,
      },
    })

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()

    const html = wrapper.html()

    items.forEach((item) => {
      expect(html).toContain(item.link)
      expect(html).toContain(item.title)
    })

    expect(
      wrapper.findByTestId('dropdown-link').attributes().href
    ).toBeDefined()
  })

  it('should call function if item provides function', async () => {
    const testFn = jest.fn()
    const items = [
      {
        title: 'VUE_JS',
        click: testFn,
      },
    ]
    const wrapper = shallowMount(AppDropdown, {
      props: {
        items,
      },
    })

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()

    const item = wrapper.findByTestId('dropdown-click')
    item.trigger('click')

    expect(testFn).toHaveBeenCalled()
  })

  it('should hide dropdown if clicking again', async () => {
    const items = [
      {
        title: 'VUE_JS',
        link: 'https://vuejs.org',
      },
    ]
    const wrapper = shallowMount(AppDropdown, {
      props: {
        items,
      },
    })

    wrapper.findByTestId('app-dropdown').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain(items[0].title)

    wrapper.findByTestId('app-dropdown').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).not.toContain(items[0].title)
  })
})
