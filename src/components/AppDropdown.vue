<template>
  <div data-testid="app-dropdown" class="menu-item" @click="isOpen = !isOpen">
    <a class="title" href="#">
      {{ title }}
    </a>
    <svg viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
        fill="#FFF"
      ></path>
    </svg>
    <transition name="fade" appear>
      <div ref="clickOutsideTarget" class="sub-menu" v-if="isOpen">
        <p class="sub-menu__title">User actions</p>
        <hr class="hr" />
        <div class="menu-items">
          <div v-for="(item, i) in items" :key="i" class="menu-item">
            <a
              data-testid="dropdown-click"
              v-if="item.click"
              href="#"
              @click="item.click"
              >{{ item.title }}</a
            >
            <a data-testid="dropdown-link" v-else :href="item.link">{{
              item.title
            }}</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'dropdown',
  props: ['title', 'items'],
  setup() {
    const isOpen = ref(false)
    const clickOutsideTarget = ref(null)

    onClickOutside(clickOutsideTarget, (event) => (isOpen.value = false))

    return { isOpen, clickOutsideTarget }
  },
}
</script>

<style scoped lang="scss">
.title {
  color: white;
  text-decoration: none;
}
.menu-item svg {
  width: 10px;
  margin-left: 10px;
}

.sub-menu {
  position: absolute;
  background-color: $bg-color-light;

  top: 3.5rem;
  right: -0.9rem;
  min-width: 15rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.sub-menu .menu-item {
  display: flex;
  padding: 0 0.6rem 1rem 0.6rem;
  text-align: left;

  a {
    color: white;
    text-decoration: none;
  }
}

.sub-menu__title {
  color: white;
}
.menu-items {
  padding-top: 0.5rem;
}
</style>
