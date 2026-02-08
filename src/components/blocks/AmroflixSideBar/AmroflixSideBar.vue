<script setup lang="ts">
import { ref, watch } from 'vue'
import AmroflixSideBarItem, { type AmroflixSideBarItemIcon } from './AmroflixSideBarItem.vue'

type SideBarItem = AmroflixSideBarItemIcon & { selected?: boolean }

const { isOpen = false, items = [] } = defineProps<{
  isOpen?: boolean
  items?: AmroflixSideBarItemIcon[]
}>()

const localItems = ref<SideBarItem[]>([])

const syncItems = () => {
  const selectedByLabel = new Map(
    localItems.value.map((item) => [item.label, item.selected ?? false]),
  )

  localItems.value = items.map((item) => ({
    ...item,
    selected: item.selected ?? selectedByLabel.get(item.label) ?? false,
  }))
}

const selectItem = (label: string) => {
  localItems.value = localItems.value.map((item) => ({
    ...item,
    selected: item.label === label,
  }))
}

watch(
  () => items,
  () => syncItems(),
  { immediate: true, deep: true },
)
</script>
<template>
  <div
    class="amroflix-sidebar"
    :class="isOpen ? 'amroflix-sidebar--open' : 'amroflix-sidebar--closed'"
  >
    <slot>
      <amroflix-side-bar-item
        v-for="item in localItems"
        :is-open="isOpen"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
        :selected="item.selected"
        @click="selectItem(item.label)"
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
