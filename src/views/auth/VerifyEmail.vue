<template>
  <form-card title="Please verify your email">
    <div class="text-center">
      <p>
        you're almost there! We sent an email to <br />
        <span class="text-bold">patriknilsson1992@gmail.com</span>
      </p>
      <p>Just click on the link in that email to complete your signup.</p>
      <p>Still can't find the email?</p>
      <app-button>Resend Email</app-button>
    </div>
  </form-card>
</template>

<script>
import FormCard from '@/views/auth/FormCard.vue'
import AppButton from '@/components/AppButton.vue'
export default {
  components: {
    FormCard,
    AppButton,
  },
}
</script>

<style scoped lang="scss">
.text-center {
  text-align: center;
}
.text-bold {
  font-weight: 700;
}
</style>
