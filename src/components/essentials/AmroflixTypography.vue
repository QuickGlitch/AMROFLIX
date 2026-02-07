<script setup lang="ts">
export type TypographySize = 'small' | 'default' | 'medium' | 'large' | 'huge'
export type TypographyWeight = 'light' | 'default' | 'bold' | 'bolder'

const {
  as = 'span',
  size = 'default',
  weight = 'default',
} = defineProps<{
  as?: keyof HTMLElementTagNameMap
  size?: TypographySize
  weight?: TypographyWeight
}>()

const sizeClass = `amroflix-typography--size-${size}`
const weightClass = `amroflix-typography--weight-${weight}`
</script>

<template>
  <component :is="as" class="amroflix-typography" :class="[sizeClass, weightClass]">
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
.amroflix-typography {
  /* component tokens - size */
  --amroflix-typography-size-small: var(--theme-text-small-size);
  --amroflix-typography-size-default: var(--theme-text-default-size);
  --amroflix-typography-size-medium: var(--theme-text-medium-size);
  --amroflix-typography-size-large: var(--theme-text-large-size);
  --amroflix-typography-size-huge: var(--theme-text-huge-size);

  /* component tokens - weight */
  --amroflix-typography-weight-light: var(--theme-text-light-weight);
  --amroflix-typography-weight-default: var(--theme-text-default-weight);
  --amroflix-typography-weight-bold: var(--theme-text-bold-weight);
  --amroflix-typography-weight-bolder: var(--theme-text-bolder-weight);

  /* applying component tokens */
  display: inline;
  color: inherit;

  &--size-small {
    font-size: var(--amroflix-typography-size-small);
  }

  &--size-default {
    font-size: var(--amroflix-typography-size-default);
  }

  &--size-medium {
    font-size: var(--amroflix-typography-size-medium);
  }

  &--size-large {
    font-size: var(--amroflix-typography-size-large);
  }

  &--size-huge {
    font-size: var(--amroflix-typography-size-huge);
  }

  &--weight-light {
    font-weight: var(--amroflix-typography-weight-light);
  }

  &--weight-default {
    font-weight: var(--amroflix-typography-weight-default);
  }

  &--weight-bold {
    font-weight: var(--amroflix-typography-weight-bold);
  }

  &--weight-bolder {
    font-weight: var(--amroflix-typography-weight-bolder);
  }
}
</style>
