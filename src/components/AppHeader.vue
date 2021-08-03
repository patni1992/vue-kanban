<template>
  <nav>
    <ul class="menu">
      <li class="logo"><a href="#">Kanban Board</a></li>
      <li v-if="isAuthenticated" class="item">
        <app-dropdown title="Patrik Nilsson" :items="services" />
      </li>
    </ul>
  </nav>
</template>

<script>
import AppDropdown from '@/components/AppDropdown'
import useAuth from '@/store/useAuth'
export default {
  components: {
    AppDropdown,
  },
  setup() {
    const { logout, isAuthenticated } = useAuth()
    return {
      isAuthenticated,
      services: [
        {
          title: 'Settings',
          link: '#',
        },
        {
          title: 'Logout',
          click: logout,
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
nav {
  background: $bg-color;
  padding: 0 15px;
}
a {
  color: white;
  text-decoration: none;
}
.menu,
.submenu {
  list-style-type: none;
}
.logo {
  font-size: 20px;
}
.item {
  padding: 10px;
}
.item.button {
  padding: 9px 5px;
}
.item:not(.button) a:hover,
.item a:hover::after {
  color: #ccc;
}
/* Mobile menu */
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding-left: 0;
}
.menu li {
  display: block;
  padding: 15px 5px;
}

.toggle {
  order: 1;
  font-size: 20px;
}
.item.button {
  order: 2;
}
.item {
  order: 3;
  text-align: center;
  display: none;
}
.active .item {
  display: block;
}

/* Submenu up from mobile screens */
.submenu {
  display: none;
}
.submenu-active .submenu {
  display: block;
}
.has-submenu i {
  font-size: 12px;
}
.has-submenu > a::after {
  font-family: 'Font Awesome 5 Free';
  font-size: 12px;
  line-height: 16px;
  font-weight: 900;
  content: '\f078';
  color: white;
  padding-left: 5px;
}
.subitem a {
  padding: 10px 15px;
}
.submenu-active {
  background-color: #111;
  border-radius: 3px;
}

/* Tablet menu */
@media all and (min-width: 700px) {
  .logo {
    display: block;
  }
  .item.button {
    width: auto;
    order: 1;
    display: block;
  }
  .toggle {
    text-align: right;
    order: 2;
  }
  /* Button up from tablet screen */
  .menu li.button a {
    padding: 10px 15px;
    margin: 5px 0;
  }
  .button a {
    background: #0080ff;
    border: 1px royalblue solid;
  }
  .button.secondary {
    border: 0;
  }
  .button.secondary a {
    background: transparent;
    border: 1px #0080ff solid;
  }
  .button a:hover {
    text-decoration: none;
  }
  .button:not(.secondary) a:hover {
    background: royalblue;
    border-color: darkblue;
  }
}
/* Desktop menu */
@media all and (min-width: 960px) {
  .menu {
    align-items: center;
    flex-wrap: nowrap;
    background: none;
  }
  .logo {
    order: 0;
  }
  .item {
    order: 1;
    position: relative;
    display: block;
    width: auto;
  }
  .button {
    order: 2;
  }
  .submenu-active .submenu {
    display: block;
    position: absolute;
    left: 0;
    top: 68px;
    background: #111;
  }
  .toggle {
    display: none;
  }
  .submenu-active {
    border-radius: 0;
  }
}
</style>
