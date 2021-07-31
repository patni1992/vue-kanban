<template>
  <div class="container">
    <div style="max-width: 52rem">
      <h2>Your boards</h2>

      <div class="boards-container">
        <router-link
          :key="board.name"
          v-for="board in ownerBoards"
          :style="{ color: 'white', textDecoration: 'none' }"
          :to="{ name: 'Board', params: { id: board.id } }"
        >
          <div class="board">
            <p class="board__title">{{ board.name }}</p>
          </div>
        </router-link>

        <div class="board center">
          <p>Create new board</p>
        </div>
      </div>

      <hr style="margin: 3rem 0" />
      <h2>Boards shared with you</h2>
      <div class="boards-container">
        <router-link
          :key="board.name"
          v-for="board in memberBoards"
          :style="{ color: 'white', textDecoration: 'none' }"
          :to="{ name: 'Board', params: { id: board.id } }"
        >
          <div class="board">
            <p class="board__title">{{ board.name }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import useBoards from '@/store/useBoards'
export default defineComponent({
  setup() {
    const { getBoards, state, ownerBoards, memberBoards } = useBoards()
    const { boards } = toRefs(state)

    getBoards()

    return {
      memberBoards,
      ownerBoards,
      boards,
    }
  },
})
</script>

<style scoped lang="scss">
h2 {
  color: white;
}
.container {
  padding: 2rem 2rem;
  display: flex;
  justify-content: center;
  // background-color: #22262a;
  height: 100%;
  // padding: 0 2rem;
}
.boards-container {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: 1fr;
}
.board {
  background: #3c3c3c;
  color: white;
  padding: 0.8rem;
  min-height: 8rem;
  box-shadow: 0 3px 6px rgb(0 0 0 / 10%), 0 6px 12px rgb(0 0 0 / 10%);
  border-radius: 5px;
  display: flex;
  cursor: pointer;

  &__title {
    font-weight: 600;
    margin-top: 0;
  }
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
