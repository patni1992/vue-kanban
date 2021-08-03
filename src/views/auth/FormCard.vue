<template>
  <div class="container">
    <div class="form">
      <div class="form-header">
        <h2 class="form-title">{{ title }}</h2>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  // background: rgba(64, 140, 254, 0.8);
  // background: linear-gradient(to right, #56ccf2, #2f80ed);
  padding-top: 6rem;
}
.form {
  background: $bg-color;
  color: white;
  box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%);
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 2rem;
  text-align: left;
  border-radius: 0.5rem;
}

.form-header {
  text-align: center;
}

.form-title {
  margin-bottom: 0.5rem;
  margin-top: 0;
}
</style>
