<script setup lang="ts">
import AmroflixLayout from './components/blocks/AmroflixLayout.vue'
import { provideTheme } from './composables/useTheme'

provideTheme('dark')
</script>

<template>
  <AmroflixLayout>
    <template #default> welcome </template>
  </AmroflixLayout>
</template>
