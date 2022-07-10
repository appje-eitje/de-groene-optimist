<template>
  <header class="header layout">
    <span class="header__logo">
      <SiteLogo/>
    </span>
    <p class="header__title">De Groene Optimist</p>

    <nav class="navigation">
      <button class="navigation__button" @click="menuOpen = !menuOpen">open</button>
      <ul class="navigation__menu" :aria-expanded="menuOpen">
        <li>
          <a href="">linkje</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import SiteLogo from "../assets/images/SiteLogo";

export default {
  data() {
    return {
      menuOpen: false,
    }
  },
  components: {SiteLogo}
}
</script>

<style>
.header {
  display: flex;
  align-items: center;
}

.header__logo {
  width: 5rem;
  max-height: 5rem;
  margin-right: 1em;
}

.header__title {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Alegreya Sans', sans-serif;
}

.navigation {
  margin-left: auto;
}

.navigation__menu[aria-expanded="false"] {
  display: none;
}

.navigation__menu[aria-expanded="true"] {
  display: block;
}
</style>
