<template>
  <div class="grid">
    <SiteHeader/>
    <NuxtPage/>
    <SiteFooter/>
  </div>
</template>

<style>
.grid {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";
  min-height: 100vh;
  min-height: 100dvh;
}
</style>
