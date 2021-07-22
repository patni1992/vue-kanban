<template>
  <div class="input-container">
    <label v-if="label" class="input-label" :for="label">{{ label }}</label>
    <input
      :value="modelValue"
      @blur="$emit('blur')"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="label"
      :type="type"
      class="input"
    />
    <p v-if="error" class="input-error">{{ error }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
      required: true,
    },

    label: String,
    error: String,
    type: {
      type: String,
      default: 'text',
    },
  },
})
</script>

<style lang="scss" scoped>
.input-container {
  text-align: left;
  margin-bottom: 1rem;
}
.input {
  font-size: 1rem;
  line-height: 22px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 10px;
  display: block;
  width: 100%;

  &:focus {
    border: 1px solid #4895fe;
    outline: none;
  }
}

.input-label {
  display: inline-block;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.input-error {
  color: #f24767;
  margin-top: 0.3rem;
  font-size: 0.7rem;
}
</style>
