<template>
  <component :is="tag" class="amroflix-button">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
const { tag = 'button' } = defineProps<{
  // defaults to 'button' but can be used for other tags (e.g., 'a') depending on UX
  tag?: string
}>()
</script>

<style lang="css" scoped>
.amroflix-button {
  /* component tokens */
  --amroflix-button-background-color: var(--theme-cta-primary-color);
  --amroflix-button-text-color: var(--theme-text-default-color);
  --amroflix-button-hover-text-color: var(--theme-text-hover-color);
  --amroflix-button-hover-background-color: var(--theme-cta-primary-accent-color);

  /* applying component tokens */
  background-color: var(--amroflix-button-background-color);
  color: var(--amroflix-button-text-color);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.amroflix-button:hover {
  background-color: var(--amroflix-button-hover-background-color);
  color: var(--amroflix-button-hover-text-color);
}
</style>
