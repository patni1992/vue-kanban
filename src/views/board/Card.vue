<template>
  <div ref="clickOutsideTarget" class="card">
    <textarea
      :style="{ height: textareaHeight, width: '100%' }"
      :value="cardName"
      ref="input"
      v-if="isEditing"
    />
    <div ref="cardRef" @click="setCreatingCard" v-else>
      {{ card.name }}
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, computed, ref, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  props: { card: Object },
  setup(props) {
    const isEditing = ref(false)
    const clickOutsideTarget = ref(null)
    const input = ref(null)
    const cardRef = ref(null)
    const cardName = ref(props.card.name)
    const textareaHeight = ref(null)

    const setCreatingCard = () => {
      isEditing.value = true
      textareaHeight.value = `${cardRef.value.clientHeight}px`
      nextTick(() => {
        input?.value?.focus()
      })
    }

    onClickOutside(clickOutsideTarget, (event) => (isEditing.value = false))

    return {
      isEditing,
      clickOutsideTarget,
      input,
      setCreatingCard,
      cardName,
      cardRef,
      textareaHeight,
    }
  },
}
</script>

<style scoped lang="scss">
$card-border-radius: 3px;
$gap: 10px;
.card {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  cursor: pointer;

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
</style>
