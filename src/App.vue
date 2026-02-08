<script setup lang="ts">
import { provideTheme } from './composables/useTheme'
import AmroflixHome from './pages/AmroflixHome.vue'

provideTheme('dark')
</script>

<template>
  <AmroflixHome />
</template>
