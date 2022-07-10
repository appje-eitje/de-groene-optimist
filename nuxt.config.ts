import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content-edge'],
  css: [
    '@/assets/css/reset.css',
    '@/assets/css/main.css'
  ]
})
