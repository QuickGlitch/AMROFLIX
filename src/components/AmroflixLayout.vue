<script setup lang="ts">
import AmroflixButton from './AmroflixButton.vue'
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div class="amroflix-layout" :data-theme="theme">
    <header class="amroflix-layout__header">
      <slot name="header"
        ><AmroflixButton @click="toggleTheme">{{ theme }}</AmroflixButton></slot
      >
    </header>

    <main class="amroflix-layout__body">
      <slot> </slot>
    </main>

    <footer class="amroflix-layout__footer">
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<style lang="css" scoped>
.amroflix-layout {
  /* component tokens */
  --amroflix-layout-header-text-color: var(--theme-text-default-color);
  --amroflix-layout-footer-background-color: var(--neutral-darkest-grey);
  --amroflix-layout-footer-text-color: var(--theme-text-default-color);
  --amroflix-layout-body-background-color: var(--theme-background-default-color);

  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.amroflix-layout__header {
  display: flex;
  justify-content: end;
  background-color: var(--amroflix-layout-body-background-color);
  color: var(--amroflix-layout-header-text-color);
  padding: 1rem 2rem;
}

.amroflix-layout__body {
  background-color: var(--amroflix-layout-body-background-color);
  flex: 1;
}

.amroflix-layout__footer {
  background-color: var(--amroflix-layout-footer-background-color);
  color: var(--amroflix-layout-footer-text-color);
  padding: 1rem 2rem;
  text-align: center;
}
</style>
