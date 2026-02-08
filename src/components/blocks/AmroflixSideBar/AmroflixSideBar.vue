<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AmroflixSideBarItem from './AmroflixSideBarItem.vue'
import type { AmroflixNavigationItem } from '@/router/navigation'

const { isOpen = false, items = [] } = defineProps<{
  isOpen?: boolean
  items?: AmroflixNavigationItem[]
}>()

const router = useRouter()
const route = useRoute()

const navigate = (item: AmroflixNavigationItem) => {
  if (item.routeName) {
    router.push({ name: item.routeName })
  }
}
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
        :selected="route.name === item.routeName"
        @click="navigate(item)"
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

  box-sizing: border-box;
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
    width: 4rem;
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
