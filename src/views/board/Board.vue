<template>
  <div class="ui">
    <nav class="navbar board">Board bar</nav>
    <div class="lists">
      <div class="list" v-for="list of lists" :key="list.id">
        <header>{{ list.name }}</header>
        <ul>
          <li v-for="card of cardsByListId(list.id)" :key="card.id">
            {{ card.name }}
          </li>
        </ul>
        <footer>Add a card...</footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useBoards from '@/store/useBoards'
import useLists from '@/store/useLists'
import useCards from '@/store/useCards'

export default defineComponent({
  setup(p) {
    const route = useRoute()
    const { getBoard } = useBoards()
    const { lists } = useLists()
    const { cardsByListId } = useCards()
    getBoard(route.params.id as string)

    return {
      lists,
      cardsByListId,
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
  > * {
    flex: 0 0 auto; // 'rigid' lists
    margin-left: $gap;
  }
  &::after {
    content: '';
    flex: 0 0 $gap;
  }
}

.list {
  width: $list-width;
  height: calc(100% - #{$gap} - #{$scrollbar-thickness});

  > * {
    background-color: $bg-color;
    color: white;

    padding: 0 $gap;
  }

  header {
    line-height: $list-header-height;
    font-size: 16px;
    font-weight: bold;
    border-top-left-radius: $list-border-radius;
    border-top-right-radius: $list-border-radius;
  }

  footer {
    line-height: $list-footer-height;
    border-bottom-left-radius: $list-border-radius;
    border-bottom-right-radius: $list-border-radius;
    color: #888;
  }

  ul {
    list-style: none;
    margin: 0;

    max-height: calc(100% - #{$list-header-height} - #{$list-footer-height});
    overflow-y: auto;

    li {
      background-color: $bg-color-dark;
      color: white;
      padding: $gap;
      &:not(:last-child) {
        margin-bottom: $gap;
      }

      border-radius: $card-border-radius;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

      img {
        display: block;
        width: calc(100% + 2 * #{$gap});
        margin: -$gap 0 $gap (-$gap);
        border-top-left-radius: $card-border-radius;
        border-top-right-radius: $card-border-radius;
      }
    }
  }
}
</style>
