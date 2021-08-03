<template>
  <router-link
    v-if="id"
    :style="{ color: 'white', textDecoration: 'none' }"
    :to="{ name: 'Board', params: { id } }"
  >
    <div class="board">
      <p class="board__title">{{ name }}</p>
    </div>
  </router-link>
  <div v-else class="board center">
    <p>{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent } from 'vue'
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      default: null,
    },
  },
})
</script>

<style lang="scss" scoped>
.board {
  background: $bg-color-light;
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
