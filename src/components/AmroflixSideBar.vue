<script setup lang="ts">
const { isOpen = false } = defineProps<{
  isOpen?: boolean
}>()
</script>
<template>
  <div
    class="amroflix-sidebar"
    :class="isOpen ? 'amroflix-sidebar--open' : 'amroflix-sidebar--closed'"
  >
    <slot>taco time taco time</slot>
  </div>
</template>

<style lang="scss" scoped>
.amroflix-sidebar {
  /* component tokens */
  --amroflix-sidebar-background-color: var(--theme-background-contrast-color);
  --amroflix-sidebar-text-color: var(--theme-text-default-color);
  --amroflix-sidebar-offset: var(--brand-header-height);

  position: absolute;
  top: var(--amroflix-sidebar-offset);
  height: calc(100vh - var(--amroflix-sidebar-offset));
  background-color: var(--amroflix-sidebar-background-color);
  color: var(--amroflix-sidebar-text-color);

  &--closed {
    width: 5rem;
    transition: width 0.3s ease;
  }

  &--open {
    width: 12rem;
    transition: width 0.3s ease;
  }
}
</style>
