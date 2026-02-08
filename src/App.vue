<script setup lang="ts">
import { RouterView } from 'vue-router'
import { provideTheme } from './composables/useTheme'

provideTheme('dark')
</script>

<template>
  <RouterView />
</template>
