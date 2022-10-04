<template>
  <div class="grid">
    <SiteHeader/>
    <slot />
    <SiteFooter/>
  </div>
</template>

<script setup>
const route = useRoute()

useHead({
  htmlAttrs: {
    lang: route.meta.lang ? route.meta.lang : 'nl',
  },
  title: route.meta.title ? `${route.meta.title} - De Groene Optimist` : 'De Groene Optimist',
  script: [
    {
      children: 'var _paq = window._paq = window._paq || []; /* tracker methods like "setCustomDimension" should be called before "trackPageView" */ _paq.push([\'trackPageView\']); _paq.push([\'enableLinkTracking\']); (function() { var u="//stats.ikbenmelle-en-co.nl/"; _paq.push([\'setTrackerUrl\', u+\'matomo.php\']); _paq.push([\'setSiteId\', \'2\']); var d=document, g=d.createElement(\'script\'), s=d.getElementsByTagName(\'script\')[0]; g.async=true; g.src=u+\'matomo.js\'; s.parentNode.insertBefore(g,s); })();'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: route.meta.canonical ? route.meta.canonical : 'https://appje-eitje.nl' + route.path,
    },
  ],
  meta: [
    {
      name: 'title',
      content: route.meta.title ? `${route.meta.title} - De Groene Optimist` : 'De Groene Optimist',
    },
    {
      name: 'description',
      content: route.meta.description ? route.meta.description : 'De Groene Optimist blogt over het klimaat en wat jij kunt doen om net dat beetje groener te zijn.'
    },
    {
      name: 'theme-color',
      content: '#A4E4AE',
    },
    {
      property: 'og:title',
      content: route.meta.title ? `${route.meta.title} - De Groene Optimist` : 'De Groene Optimist',
    },
    {
      property: 'og:description',
      content: route.meta.description ? route.meta.description : 'De Groene Optimist blogt over het klimaat en wat jij kunt doen om net dat beetje groener te zijn.',
    },
    {
      property: 'og:image',
      content: route.meta.image ? route.meta.image : '',
    },
    {
      property: 'og:url',
      content: 'https://degroeneoptimist.nl',
    },
    {
      property: 'og:site_name',
      content: 'De Groene Optimist',
    },
    {
      property: 'og:locale',
      content: 'nl_NL',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      property: 'twitter:title',
      content: route.meta.title ? `${route.meta.title} - De Groene Optimist` : 'De Groene Optimist',
    },
    {
      property: 'twitter:description',
      content: route.meta.description ? `De Groene Optimist - ${route.meta.description}` : 'De Groene Optimist blogt over het klimaat en wat jij kunt doen om net dat beetje groener te zijn.',
    },
    {
      property: 'twitter:image',
      content: route.meta.image ? route.meta.image : '',
    },
  ],
})

</script>

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
