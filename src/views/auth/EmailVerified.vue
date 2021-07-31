<template>
  <div>
    <h1 class="text-center">Verifing email loading....</h1>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useAuth from '@/store/useAuth'

export default {
  setup(): void {
    const route = useRoute()
    const { verifyEmail } = useAuth()
    onMounted(() => {
      verifyEmail(route.query.path as string)
    })
  },
}
</script>

<style scoped lang="scss">
.text-center {
  text-align: center;
}
</style>
