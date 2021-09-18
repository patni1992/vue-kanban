<template>
  <div class="list" ref="clickOutsideTarget" @click="setCreatingList">
    <header>
      <p v-if="!creatingList">Create new list +</p>
      <form @submit.prevent="submit" v-else>
        <input
          v-model="listName"
          ref="input"
          placeholder="List name"
          type="text"
        />
      </form>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, ref, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import useBoards from '@/store/useBoards'
import useLists from '@/store/useLists'
import useCards from '@/store/useCards'
import draggable from 'vuedraggable'

export default defineComponent({
  props: { list: Object },
  setup(props) {
    const creatingList = ref(false)
    const clickOutsideTarget = ref(null)
    const listName = ref('')
    const input = ref<any>(null)
    const { addList } = useLists()
    const route = useRoute()

    const setCreatingList = () => {
      creatingList.value = true
      nextTick(() => {
        input?.value?.focus()
      })
    }

    const submit = () => {
      addList(listName.value, Number(route.params.id))
      listName.value = ''
      creatingList.value = false
    }

    onClickOutside(clickOutsideTarget, (event) => (creatingList.value = false))
    return {
      clickOutsideTarget,
      input,
      creatingList,
      setCreatingList,
      listName,
      submit,
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
$list-header-height: 40px;
$list-footer-height: 36px;
// Misc
$list-border-radius: 5px;
$card-border-radius: 3px;

.list {
  width: $list-width;
  height: 40px;
  flex: 0 0 auto; // 'rigid' lists
  margin-left: $gap;

  > * {
    background-color: $bg-color;
    color: white;
    padding: 0 $gap;
  }

  p {
    margin: 0;
  }

  header {
    cursor: pointer;
    line-height: $list-header-height;
    font-size: 16px;
    border-top-left-radius: $list-border-radius;
    border-top-right-radius: $list-border-radius;
  }
}
</style>
