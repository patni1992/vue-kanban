<template>
  <div data-testid="board" class="ui">
    <nav class="navbar board">{{ board?.name }}</nav>
    <div data-testid="lists" class="lists">
      <draggable
        @change="onDrag"
        class="draggable"
        group="list"
        :list="lists"
        item-key="id"
      >
        <template #item="{ element }">
          <list :list="element" />
        </template>
      </draggable>
      <create-list />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useBoards from '@/store/useBoards'
import useLists from '@/store/useLists'
import useCards from '@/store/useCards'
import draggable from 'vuedraggable'
import List from './List.vue'
import CreateList from './CreateList.vue'

export default defineComponent({
  components: { List, draggable, CreateList },
  setup() {
    const route = useRoute()
    const { getBoard, board } = useBoards()
    const { lists, moveList } = useLists()
    const { cardsByListId, moveCard } = useCards()
    getBoard(route.params.id as string)

    const onDrag = (e: any) => {
      moveList(e.moved.oldIndex, e.moved.newIndex)
    }

    return {
      onDrag,
      lists,
      cardsByListId,
      board,
    }
  },
})
</script>

<style scoped lang="scss">
/* Some Sass variables */
// Layout
$navbar-height: 50px;
$list-width: 300px;
$gap: 10px;
$scrollbar-thickness: 17px;
$list-header-height: 36px;
$list-footer-height: 36px;
// Misc
$list-border-radius: 5px;
$card-border-radius: 3px;

.ui {
  height: 100vh;

  display: grid;
  grid-template-rows: $navbar-height 1fr;
  //grid-template-columns: 100%;

  background-color: $bg-color-dark;
  color: #eee;
  padding: 0 15px;
}

.navbar {
  padding-left: $gap;
  display: flex;
  align-items: center;
  &.board {
    font-size: 1.1rem;
  }
}

.lists {
  display: flex;
  overflow-x: auto;
  //width: 100%; // This is needed for FF < 54
  .draggable {
    display: flex;
    & > * {
      flex: 0 0 auto; // 'rigid' lists
      margin-left: $gap;
    }
  }
  &::after {
    content: '';
    flex: 0 0 $gap;
  }
}
</style>
