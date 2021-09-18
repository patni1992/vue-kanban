import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { ownerBoards, memberBoards, lists, boardName } from '../../../testData'

import Board from '@/views/board/Board.vue'
import useAuth from '@/store/useAuth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Board',
      component: {
        template: '',
      },
    },
  ],
})

const { me } = useAuth()

describe('Boards', () => {
  it('should render lists', async () => {
    const wrapper = mount(Board, {
      global: {
        plugins: [router],
      },
    })

    await authenticate(wrapper)

    const listsWrapper = wrapper.findByTestId('lists')
    lists.forEach((list) => {
      expect(listsWrapper.html()).toContain(list.name)
    })
  })

  it('should render lists in sorted order', async () => {
    const wrapper = mount(Board, {
      global: {
        plugins: [router],
      },
    })

    await authenticate(wrapper)

    const listWrappers = wrapper.findByTestId('list', true)
    const list1 = lists.find((list) => list.order === 1)
    const list2 = lists.find((list) => list.order === 2)
    const list3 = lists.find((list) => list.order === 3)

    expect(listWrappers[0].html()).toContain(list1?.name)
    expect(listWrappers[1].html()).toContain(list2?.name)
    expect(listWrappers[2].html()).toContain(list3?.name)
  })

  it('should display board name', async () => {
    const wrapper = mount(Board, {
      global: {
        plugins: [router],
      },
    })

    await authenticate(wrapper)

    const boardWrapper = wrapper.findByTestId('board')
    expect(boardWrapper.html()).toContain(boardName)
  })
})

const authenticate = async (wrapper: VueWrapper<any>) => {
  await me()
  await flushPromises()
  await wrapper.vm.$nextTick()
}
