<script setup lang="ts">
import AmroflixIcon from './AmroflixIcon/AmroflixIcon.vue'

const { size = 'medium', label } = defineProps<{
  size?: 'small' | 'medium' | 'large'
  label?: string
}>()
</script>

<template>
  <div :class="['amro-spinner', `amro-spinner--${size}`]" role="status">
    <AmroflixIcon name="cog" class="amro-spinner__icon" />
    <span class="amro-spinner__label">{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.amro-spinner {
  --amro-spinner-color: var(--theme-text-subtle-color);
  --amro-spinner-size: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  color: var(--amro-spinner-color);

  &--small {
    --amro-spinner-size: 1.25rem;
    gap: 0.5rem;
    padding: 1rem;
  }

  &--large {
    --amro-spinner-size: 3rem;
    gap: 1rem;
    padding: 3rem;
  }

  &__icon {
    font-size: var(--amro-spinner-size);
    animation: spin 1.5s linear infinite;
  }

  &__label {
    font-size: var(--theme-text-default-size);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
