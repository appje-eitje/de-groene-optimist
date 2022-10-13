<template>
  <main class="page-center">
    <article class="article">
    <ContentRenderer :value="data">
      <header class="article-header">
        <p class="tldr">{{ data.tldr }}</p>
        <h1>{{ data.title }}</h1>
        <p class="meta">
          <time class="meta-time" datetime="{{ data.date }}">{{ data.date }}</time>
          <span v-for="author in data.authors" class="meta-author">{{ author }}</span>
        </p>
      </header>
      <ContentRendererMarkdown :value="data" class="article-content" />
    </ContentRenderer>
    </article>
  </main>
</template>

<script setup lang="ts">
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
</script>

<style lang="scss">

.page-center {
  display: grid;
  justify-content: center;
}

.article {
  color: var(--color);
  font-size: var(--font-n);
  line-height: var(--line-height);
  max-inline-size: 60ch;

  a:any-link {
    color: inherit;

    &:hover {
      color: var(--color-optimist);
    }
  }
}

.article-header {

  h1 {
    font-size: var(--font-xl);
    font-weight: normal;
    margin-block: var(--margin-m) var(--margin-s);
  }

  .tldr {
    font-style: italic;
  }

  .meta {
    color: var(--color-l);
    font-size: var(--font-s);
    margin-block-end: var(--margin-l);
  }

  .meta-author {
    margin-inline-start: var(--margin-l);
  }
}

.article-content {

  h2 {
    color: var(--color-l);
    font-size: var(--font-n);
    font-weight: normal;
    margin-block-start: var(--margin-m);

    a:any-link {
      text-decoration: none;
    }

    a:any-link:hover {
      color: var(--color);
    }
  }

  p + p {
    margin-block-start: var(--margin-s);
  }

  sup {
    line-height: 1;
  }

  ul {
    list-style: disc url('/assets/images/bullet.svg');
    padding-inline: var(--padding-m);
  }

  ol {
    list-style: decimal;
    font-size: var(--font-s);
    padding-inline: var(--padding-m);
  }
}

</style>
