<template>
  <div>
    <div v-for="article in data" :key="article._path">
      <h2>
        {{ article.title }}
      </h2>
      <div class="card-person">
        <span class="card-person__image">
          <span class="card-person__image__overflow">
            <img :src="article.image" alt="">
          </span>
        </span>
        <span v-if="article.tldr" class="card-person__quote">
          {{ article.tldr }}
        </span>
        <NuxtLink :to="article._path">meer</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, refresh } = await useAsyncData('homepage', () => {
  return queryContent('/artikelen').find()
})
</script>
