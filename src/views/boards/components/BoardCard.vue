<template>
  <router-link
    v-if="id"
    :style="{ color: 'white', textDecoration: 'none' }"
    :to="{ name: 'Board', params: { id } }"
  >
    <div class="board">
      <p class="board__title">{{ truncate(name, 85) }}</p>
    </div>
  </router-link>
  <div v-else class="board" :class="{ center: center }">
    <slot />
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const truncate = (text: string, limit: number) => {
      if (text.length <= limit) return text
      return `${text.slice(0, limit)}...`
    }
    return {
      truncate,
    }
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: null,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.board {
  background: $bg-color;
  color: white;
  padding: 0.8rem;
  min-height: 8rem;
  height: 100%;
  box-shadow: 0 3px 6px rgb(0 0 0 / 10%), 0 6px 12px rgb(0 0 0 / 10%);
  border-radius: 5px;
  display: flex;
  cursor: pointer;

  &__title {
    font-weight: 600;
    margin-top: 0;
    word-break: break-all;
    line-height: 1.5;
  }
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
