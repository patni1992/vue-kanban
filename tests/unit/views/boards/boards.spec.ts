import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { ownerBoards, memberBoards } from '../../../testData'

import Boards from '@/views/boards/Boards.vue'
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
  it('should render owner boards', async () => {
    const wrapper = mount(Boards, {
      global: {
        plugins: [router],
      },
    })

    await authenticate(wrapper)

    const ownerBoardsWrapper = wrapper.findByTestId('owner-boards')
    ownerBoards.forEach((ownerBoard) => {
      expect(ownerBoardsWrapper.html()).toContain(ownerBoard.name)
    })
    memberBoards.forEach((memberBoard) => {
      expect(ownerBoardsWrapper.html()).not.toContain(memberBoard.name)
    })
  })

  it('should render member boards', async () => {
    const wrapper = mount(Boards, {
      global: {
        plugins: [router],
      },
    })

    await authenticate(wrapper)

    const memberBoardsWrapper = wrapper.findByTestId('member-boards')

    memberBoards.forEach((memberBoard) => {
      expect(memberBoardsWrapper.html()).toContain(memberBoard.name)
    })

    ownerBoards.forEach((ownerBoard) => {
      expect(memberBoardsWrapper.html()).not.toContain(ownerBoard.name)
    })
  })

  it('should list a new card when creating a new one', async () => {
    const newBoard = 'new test board 123456'
    const wrapper = mount(Boards, {
      global: {
        plugins: [router],
      },
    })

    await authenticate(wrapper)

    wrapper.findByTestId('create-new-board').trigger('click')
    await wrapper.vm.$nextTick()

    wrapper.findByTestId('create-new-board-input').setValue(newBoard)
    wrapper.findByTestId('create-new-board-submit').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    const memberBoardsWrapper = wrapper.findByTestId('member-boards')
    const ownerBoardsWrapper = wrapper.findByTestId('owner-boards')
    expect(ownerBoardsWrapper.html()).toContain(newBoard)
    expect(memberBoardsWrapper.html()).not.toContain(newBoard)
  })
})

const authenticate = async (wrapper: VueWrapper<any>) => {
  await me()
  await flushPromises()
  await wrapper.vm.$nextTick()
}
