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
  /* component tokens */
  --amroflix-spinner-color: var(--theme-text-subtle-color);
  --amroflix-spinner-icon-size: 2rem;
  --amroflix-spinner-gap: 0.75rem;
  --amroflix-spinner-padding: 2rem;
  --amroflix-spinner-animation-duration: 1.5s;
  --amroflix-spinner-label-size: var(--theme-text-default-size);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--amroflix-spinner-gap);
  padding: var(--amroflix-spinner-padding);
  color: var(--amroflix-spinner-color);

  &--small {
    --amroflix-spinner-icon-size: 1.25rem;
    --amroflix-spinner-gap: 0.5rem;
    --amroflix-spinner-padding: 1rem;
  }

  &--large {
    --amroflix-spinner-icon-size: 3rem;
    --amroflix-spinner-gap: 1rem;
    --amroflix-spinner-padding: 3rem;
  }

  &__icon {
    font-size: var(--amroflix-spinner-icon-size);
    animation: spin var(--amroflix-spinner-animation-duration) linear infinite;
  }

  &__label {
    font-size: var(--amroflix-spinner-label-size);
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
