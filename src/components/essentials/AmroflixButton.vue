<script setup lang="ts">
import type { IconName } from './AmroflixIcon/AmroflixIcon.vue'
import AmroflixIcon from './AmroflixIcon/AmroflixIcon.vue'
import AmroflixTypography from './AmroflixTypography.vue'

export type AmroflixButtonVariants = 'primary' | 'plain'

const {
  as = 'button',
  variant = 'primary',
  leadingIcon = '',
  trailingIcon,
} = defineProps<{
  // defaults to 'button' but can be used for other tags (e.g., 'a') depending on UX
  as?: string
  variant?: AmroflixButtonVariants
  leadingIcon?: IconName
  trailingIcon?: IconName
}>()
</script>

<template>
  <component :is="as" :class="['amroflix-button', `amroflix-button--${variant}`]">
    <slot name="leadingIcon">
      <AmroflixTypography
        v-if="leadingIcon"
        :weight="'bold'"
        :size="'large'"
        class="amroflix-button__content"
      >
        <AmroflixIcon :name="leadingIcon" />
      </AmroflixTypography>
    </slot>
    <slot name="content">
      <AmroflixTypography v-if="$slots.default" :weight="'bold'" :size="'large'">
        <slot></slot>
      </AmroflixTypography>
    </slot>
    <slot name="trailingIcon">
      <AmroflixTypography
        v-if="trailingIcon"
        :weight="'bold'"
        :size="'large'"
        class="amroflix-button__content"
      >
        <AmroflixIcon :name="trailingIcon" />
      </AmroflixTypography>
    </slot>
  </component>
</template>

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

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
