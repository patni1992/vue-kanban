<template>
  <div class="container">
    <div>
      <h2>Your boards</h2>
      <div class="boards-container" data-testid="owner-boards">
        <board-card
          :key="board.name"
          v-for="board in ownerBoards"
          :id="board.id"
          :name="board.name"
        />
        <create-board />
      </div>
      <hr class="hr" />
      <h2>Boards shared with you</h2>
      <div class="boards-container" data-testid="member-boards">
        <board-card
          :key="board.name"
          v-for="board in memberBoards"
          :id="board.id"
          :name="board.name"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import useBoards from '@/store/useBoards'
import BoardCard from './components/BoardCard.vue'
import CreateBoard from './components/CreateBoard.vue'
export default defineComponent({
  components: {
    BoardCard,
    CreateBoard,
  },
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
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 100%;
  max-width: 52rem;
}
.boards-container {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: 1fr;
  //  max-width: 52rem;
}

.hr {
  margin: 3rem 0;
}
</style>
