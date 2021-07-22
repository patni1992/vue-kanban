<template>
  <form-card title="Login">
    <div class="form-header">
      <p class="form-text">
        Not a member?
        <router-link to="Register">Signup now</router-link>
      </p>
    </div>
    <form @submit.prevent="submit">
      <app-input
        :error="v$.email.$errors[0]?.$message"
        @blur="v$.email.$touch"
        v-model="form.email"
        label="Email"
      />
      <app-input
        :error="v$.password.$errors[0]?.$message"
        @blur="v$.password.$touch"
        v-model="form.password"
        type="password"
        label="Password"
      />
      <router-link class="forgot-password" to="home">
        Forgot your password?
      </router-link>
      <app-button type="submit" :loading="isLoading" class="submit-button">
        Submit
      </app-button>
    </form>
  </form-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import FormCard from '@/views/auth/FormCard.vue'
import useAuth from '@/store/useAuth'

export default defineComponent({
  components: {
    AppButton,
    AppInput,
    FormCard,
  },
  setup() {
    const { login, isLoading } = useAuth()
    const form = reactive({
      password: '',
      email: '',
    })

    const rules = {
      password: { required },
      email: { required, email },
    }

    const v$ = useVuelidate(rules, form, { $lazy: true })

    const submit = async () => {
      v$.value.$touch()
      if (v$.value.$error) return
      await login(form)
    }

    return {
      v$,
      isLoading,
      submit,
      form,
    }
  },
})
</script>

<style lang="scss" scoped>
.form-header {
  text-align: center;
}

.form-text {
  margin-top: 0;
}

.forgot-password {
  display: inline-block;
  margin-bottom: 1rem;
}
</style>
