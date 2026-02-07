<template>
  <component :is="tag" :class="['amroflix-button', `amroflix-button--${variant}`]">
    <slot name="leadingIcon">
      <AmroflixIcon v-if="leadingIcon" :name="leadingIcon" />
    </slot>
    <slot></slot>
    <slot name="trailingIcon">
      <AmroflixIcon v-if="trailingIcon" :name="trailingIcon" />
    </slot>
  </component>
</template>

<script setup lang="ts">
import type { IconName } from './AmroflixIcon/AmroflixIcon.vue'
import AmroflixIcon from './AmroflixIcon/AmroflixIcon.vue'

export type AmroflixButtonVariants = 'primary' | 'secondary' | 'plain'

const {
  tag = 'button',
  variant = 'primary',
  leadingIcon = '',
  trailingIcon,
} = defineProps<{
  // defaults to 'button' but can be used for other tags (e.g., 'a') depending on UX
  tag?: string
  variant?: AmroflixButtonVariants
  leadingIcon?: IconName
  trailingIcon?: IconName
}>()
</script>

<style lang="scss" scoped>
.amroflix-button {
  /* component tokens */
  --amroflix-button--height: var(--brand-tap-height);
  --amroflix-button-background-color: var(--theme-cta-primary-color);
  --amroflix-button-text-color: var(--theme-text-default-color);
  --amroflix-button-hover-text-color: var(--theme-text-hover-color);
  --amroflix-button-hover-background-color: var(--theme-cta-primary-accent-color);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &--plain {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  &--primary {
    /* applying component tokens */
    height: var(--amroflix-button--height);
    background-color: var(--amroflix-button-background-color);
    color: var(--amroflix-button-text-color);
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--amroflix-button-hover-background-color);
      color: var(--amroflix-button-hover-text-color);
    }
  }
}
</style>
