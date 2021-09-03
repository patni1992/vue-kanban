<template>
  <app-header />
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;500&display=swap');
html {
  font-size: 100%;
  box-sizing: border-box;
}

*,
*::before,
*::before {
  box-sizing: inherit;
}
#app {
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  line-height: 1.3;
  height: 100%;

  background-color: #18191a;
}

html {
  height: 100%;
}

a {
  color: #408cfe;
}
</style>
<script lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import useAuth from '@/store/useAuth'
export default {
  components: {
    AppHeader,
  },
  setup() {
    const { me, isAuthenticated } = useAuth()

    console.log('test deploy')

    if (isAuthenticated.value) me()
  },
}
</script>
