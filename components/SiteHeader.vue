<template>
  <header class="header layout">
    <span class="header__logo">
      <NuxtLink to="/"><SiteLogo/></NuxtLink>
    </span>
    <p class="header__title">De Groene Optimist</p>
  </header>
</template>

<script>
import SiteLogo from "../assets/images/SiteLogo";

export default {
  components: {SiteLogo}
}
</script>

<style>
.header {
  display: flex;
  align-items: center;
  grid-area: header;
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

.navigation {
  background: white;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 2em;
  height: 100%;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}

.navigation__menu[aria-expanded="false"] {
  display: none;
}

.navigation__menu[aria-expanded="true"] {
  display: block;
}
</style>
