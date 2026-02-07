<script setup lang="ts">
import AmroflixSideBarItem, { type AmroflixSideBarItemIcon } from './AmroflixSideBarItem.vue'

const { isOpen = false, items = [] } = defineProps<{
  isOpen?: boolean
  items?: AmroflixSideBarItemIcon[]
}>()
</script>
<template>
  <div
    class="amroflix-sidebar"
    :class="isOpen ? 'amroflix-sidebar--open' : 'amroflix-sidebar--closed'"
  >
    <slot>
      <amroflix-side-bar-item
        v-for="item in items"
        :is-open="isOpen"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
      />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.amroflix-sidebar {
  /* component tokens */
  --amroflix-sidebar-background-color: var(--theme-background-contrast-color);
  --amroflix-sidebar-text-color: var(--theme-text-contrast-color);
  --amroflix-sidebar-offset: var(--brand-header-height);

  position: absolute;
  top: var(--amroflix-sidebar-offset);
  height: calc(100vh - var(--amroflix-sidebar-offset));
  background-color: var(--amroflix-sidebar-background-color);
  color: var(--amroflix-sidebar-text-color);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  overflow: hidden;

  &--closed {
    width: 3rem;
    transition: width 0.3s ease;
  }

  &--open {
    width: 12rem;
    transition: width 0.3s ease;
  }

  > :first-child {
    margin-top: 1rem;
  }
}
</style>
