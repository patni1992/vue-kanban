<template>
  <div ref="clickOutsideTarget">
    <board-card @click="setCreating" :center="!creating">
      <div class="creating" v-if="creating">
        <form data-testid="create-new-board-submit" @submit.prevent="submit">
          <input
            ref="input"
            data-testid="create-new-board-input"
            v-model="boardName"
            class="input"
          />
          <button type="submit">Create</button>
        </form>
      </div>

      <!-- <p v-if="creating">Create new board</p> -->
      <p data-testid="create-new-board" v-else>Create new board</p>
    </board-card>
  </div>
</template>

<script>
import BoardCard from './BoardCard.vue'
import { ref, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import useBoards from '@/store/useBoards'
export default {
  components: {
    BoardCard,
  },
  setup() {
    const clickOutsideTarget = ref(null)
    const creating = ref(false)
    const boardName = ref('')
    const input = ref(null)
    const { createBoard } = useBoards()

    const submit = () => {
      createBoard(boardName.value)
      boardName.value = ''
      creating.value = false
    }

    const setCreating = () => {
      creating.value = true
      nextTick(() => {
        input.value.focus()
      })
    }

    onClickOutside(clickOutsideTarget, (event) => (creating.value = false))

    return {
      clickOutsideTarget,
      setCreating,
      creating,
      submit,
      boardName,
      input,
    }
  },
}
</script>

<style scoped lang="scss">
.input {
  display: block;
  width: 100%;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
}
.creating {
  width: 100%;
}
</style>
