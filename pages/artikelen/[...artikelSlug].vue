<template>
  <main class="page-center">
    <PageContent>
      <div>
        <small>TLDR</small>
        {{ data.tldr }}
      </div>
      <ContentRenderer :value="data" />
    </PageContent>
    <!-- <ContentDoc /> -->
  </main>
</template>

<script setup lang="ts">
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
</script>
