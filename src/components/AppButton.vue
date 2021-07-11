<template>
  <button
    :disabled="loading"
    class="button"
    :class="{ 'button--loading': loading }"
  >
    <div class="button-content">
      <span class="button__text">
        <slot>Button Text</slot>
      </span>
    </div>
  </button>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style scoped lang="scss">
.button {
  position: relative;
  font-size: 1rem;
  background-color: #4895fe;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 0.4rem;
  width: 100%;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    border-color: #dbdbdb;
    box-shadow: none;
    opacity: 0.5;
  }

  &--loading {
    cursor: default;
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 4px solid transparent;
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }
  }
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

.button--loading .button__text {
  visibility: hidden;
  opacity: 0;
}
</style>
