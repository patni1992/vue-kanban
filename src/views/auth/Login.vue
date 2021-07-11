<template>
  <div class="form-container">
    <div class="form-header">
      <h2 class="form-title">Login</h2>
      <p class="form-text">
        Not a member? <router-link to="home">Signup now</router-link>
      </p>
    </div>
    <app-input label="Email" />
    <app-input type="password" label="Password" />
    <router-link to="home">Forgot your password?</router-link>
    <app-button @click="submit" :loading="isLoading" class="submit-button">
      Submit
    </app-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

export default defineComponent({
  components: {
    AppButton,
    AppInput,
  },
  setup() {
    const isLoading = ref(false)

    const submit = () => {
      isLoading.value = true

      setTimeout(() => {
        isLoading.value = false
      }, 2000)
    }

    return {
      isLoading,
      submit,
    }
  },
})
</script>

<style lang="scss" scoped>
.form-container {
  box-shadow: 0 5px 20px 0 rgb(21 27 38 / 8%);
  width: 100%;
  max-width: 32rem;
  margin: 5rem auto 0 auto;
  padding: 2rem;
  text-align: left;
}

.form-header {
  text-align: center;
}

.form-text {
  margin-top: 0;
}
.form-title {
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.submit-button {
  margin-top: 2rem;
}
</style>
