<script setup lang="ts">
import AmroflixIcon from '@/components/essentials/AmroflixIcon/AmroflixIcon.vue'

type AmroflixCardProps = {
  as?: keyof HTMLElementTagNameMap
  variant?: 'vertical' | 'horizontal'
  title?: string
  subtitle?: string
  footer?: string
  rating?: number | null
  media?: {
    src: string
    alt: string
  }
}

const {
  as = 'div',
  variant = 'vertical',
  title,
  subtitle,
  footer,
  rating,
} = defineProps<AmroflixCardProps>()
</script>

<template>
  <component :is="as" class="amroflix-card" :class="`amroflix-card--${variant}`">
    <slot name="media">
      <div class="amroflix-card__media_section">
        <img
          v-if="media?.src"
          :src="media.src"
          :alt="media.alt"
          class="amroflix-card__media_section__media"
        />
      </div>
    </slot>
    <slot>
      <div class="amroflix-card__content">
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
        <slot name="subtitle">
          <h4>{{ subtitle }}</h4>
        </slot>
        <slot name="rating">
          <div v-if="rating !== undefined && rating !== null" class="amroflix-card__rating">
            <AmroflixIcon name="circle_star" />
            <span>{{ rating.toFixed(1) }}</span>
          </div>
        </slot>
        <slot name="footer">
          <div>{{ footer }}</div>
        </slot>
      </div>
    </slot>
  </component>
</template>

<style lang="scss" scoped>
.amroflix-card {
  /* component tokens */
  --amroflix-card-surface-color: var(--theme-background-card-surface-color);
  --amroflix-card-default-text-color: var(--theme-text-default-card-color);
  --amroflix-card-contrast-text-color: var(--theme-text-secondary-color);
  --amroflix-card-border-radius: var(--brand-card-border-radius);
  --amroflix-card-content-padding: 0.5rem;
  --amroflix-card-title-line-height: 1.5rem;
  --amroflix-card-subtitle-line-height: 1.2rem;
  --amroflix-card-subtitle-margin-top: 0.5rem;
  --amroflix-card-vertical-width: 200px;
  --amroflix-card-vertical-height: 400px;
  --amroflix-card-vertical-media-height: 70%;
  --amroflix-card-horizontal-width: 300px;
  --amroflix-card-horizontal-height: 200px;
  --amroflix-card-horizontal-media-width: 40%;
  --amroflix-card-media-background: var(--neutral-darkest-grey);

  background-color: var(--amroflix-card-surface-color);
  color: var(--amroflix-card-default-text-color);
  border-radius: var(--amroflix-card-border-radius);
  overflow: hidden;
  flex-direction: column;

  &--vertical {
    width: 100%;
    min-width: var(--amroflix-card-vertical-width);
    max-width: var(--amroflix-card-vertical-width);
    height: var(--amroflix-card-vertical-height);

    .amroflix-card__media_section {
      background-color: var(--amroflix-card-media-background);
      height: var(--amroflix-card-vertical-media-height);

      &__media {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .amroflix-card__content {
      padding: var(--amroflix-card-content-padding);

      h3 {
        color: var(--amroflix-card-default-text-color);
        line-height: var(--amroflix-card-title-line-height);
        margin: 0 0;
      }

      h4 {
        color: var(--amroflix-card-contrast-text-color);
        line-height: var(--amroflix-card-subtitle-line-height);
        margin: var(--amroflix-card-subtitle-margin-top) 0 0 0;
      }

      .amroflix-card__rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.5rem;
        color: var(--brand-secondary-color);
        font-weight: var(--text-weight-bold);
        font-size: var(--text-size-small);
      }
    }
  }

  &--horizontal {
    width: var(--amroflix-card-horizontal-width);
    height: var(--amroflix-card-horizontal-height);
    flex-direction: row;

    .amroflix-card__media {
      width: var(--amroflix-card-horizontal-media-width);
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
