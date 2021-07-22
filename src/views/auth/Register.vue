<template>
  <form-card title="Register">
    <div class="form-header">
      <p class="form-text">
        Already a member?
        <router-link to="login">login</router-link>
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
      <app-input
        :error="v$.firstName.$errors[0]?.$message"
        @blur="v$.firstName.$touch"
        v-model="form.firstName"
        label="First name"
      />
      <app-input
        :error="v$.lastName.$errors[0]?.$message"
        @blur="v$.lastName.$touch"
        v-model="form.lastName"
        label="Last name"
      />
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
    const { register, isLoading } = useAuth()
    const form = reactive({
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    })
    const rules = {
      password: { required },
      email: { required, email },
      firstName: { required },
      lastName: { required },
    }

    const v$ = useVuelidate(rules, form, { $lazy: true })

    const submit = async () => {
      v$.value.$touch()
      if (v$.value.$error) return
      await register(form)
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
</style>
