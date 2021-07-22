<template>
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
}

html {
  height: 100%;
}

a {
  color: #408cfe;
}
</style>
