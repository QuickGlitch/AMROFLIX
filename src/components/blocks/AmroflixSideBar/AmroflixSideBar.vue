<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AmroflixSideBarItem from './AmroflixSideBarItem.vue'
import type { AmroflixNavigationItem } from '@/router/navigation'

const { isOpen = false, items = [] } = defineProps<{
  isOpen?: boolean
  items?: AmroflixNavigationItem[]
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const route = useRoute()

const navigate = (item: AmroflixNavigationItem) => {
  if (item.routeName) {
    router.push({ name: item.routeName })
    emit('close') // Close sidebar on mobile after navigation
  }
}
</script>
<template>
  <nav
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
        :selected="route.name === item.routeName"
        tabindex="1"
        @click="navigate(item)"
        @keydown.enter="navigate(item)"
      />
    </slot>
  </nav>
</template>

<style lang="scss" scoped>
@use '@/styles/breakpoints' as *;

.amroflix-sidebar {
  /* component tokens */
  --amroflix-sidebar-background-color: var(--theme-background-contrast-color);
  --amroflix-sidebar-text-color: var(--theme-text-contrast-color);
  --amroflix-sidebar-offset: var(--brand-header-height);

  box-sizing: border-box;
  position: fixed;
  top: var(--amroflix-sidebar-offset);
  height: calc(100vh - var(--amroflix-sidebar-offset));
  background-color: var(--amroflix-sidebar-background-color);
  color: var(--amroflix-sidebar-text-color);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    width 0.3s ease;
  z-index: 1;

  // Mobile-first: Hidden by default, slide in from left when open
  @include mobile {
    // width: var(--amroflix-layout-sidebar-width-open, 16rem);
    width: 100%;
    transform: translateX(-100%);

    &--open {
      transform: translateX(0);
    }
  }

  // Desktop: Always visible, toggle between collapsed and expanded
  @include desktop {
    &--closed {
      width: var(--amroflix-layout-sidebar-width-closed, 4rem);
    }

    &--open {
      width: var(--amroflix-layout-sidebar-width-open, 12rem);
    }
  }

  > :first-child {
    margin-top: 1rem;
  }
}
</style>
