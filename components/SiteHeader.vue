<template>
  <header class="header layout">
    <h1 class="header__logo">
      <NuxtLink class="header__logo-link" to="/">
        <SiteLogo />
        <span class="header__logo__text">
          De Groene Optimist
        </span>
      </NuxtLink>
    </h1>
    <nav class="site-nav">
      <!-- <button class="navigation__button" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">open</button> -->
      <ul class="navigation__menu">
        <li>
          <NuxtLink to="/" class="site-nav-link">
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/over" class="site-nav-link">
            Over
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>
.header {
  display: flex;
  align-items: center;
  grid-area: header;
}

.header__logo {
  position: relative;
  width: 5rem;
  max-height: 5rem;
  margin-right: 20px;
}

.header__logo-link {
  display: block;
  color: #000;
}

.header__logo__text {
  position: absolute;
  display: block;
  top: 10px;
  left: 100px;
  font-size: 26px;
  font-weight: bold;
  font-family: 'Alegreya Sans', sans-serif;
  width: 257px;
}

.header__title {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Alegreya Sans', sans-serif;
}

.navigation {
}

.navigation {
  background: white;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0 0 0 0;
  height: 100%;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}

.navigation__menu {
  position: relative;
  top: 20px;
  display: flex;
  color: #000;
  padding: 0;
  margin: 0 0 0 -10px;
}

.navigation__menu[aria-expanded="false"] {
  display: none;
}

.navigation__menu[aria-expanded="true"] {
  display: block;
}

.site-nav-link {
  display: block;
  padding: 10px;
  color: #000;
  text-decoration: none;
}
</style>
