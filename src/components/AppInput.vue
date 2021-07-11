<template>
  <div class="input-container">
    <label v-if="label" class="input-label" :for="label">{{ label }}</label>
    <input :id="label" :type="type" class="input" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    label: String,
    type: {
      type: String,
      deefault: 'text',
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
  font-weight: 400;
  line-height: 22px;
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  padding: 10px;
  display: block;
  width: 100%;
}

.input-label {
  display: inline-block;
  margin: 0.5rem 0;
}
</style>
