<script setup lang="ts">
type AmroflixCardProps = {
  as?: keyof HTMLElementTagNameMap
  variant?: 'vertical' | 'horizontal'
  title?: string
  subtitle?: string
  footer?: string
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
        <!-- <slot name="content">
          <p>{{ content }}</p>
        </slot> -->
        <slot name="footer">
          <div>{{ footer }}</div>
        </slot>
      </div>
    </slot>
  </component>
</template>

<style lang="scss" scoped>
.amroflix-card {
  --amroflix-card-surface-color: var(--theme-background-default-color);
  --amroflix-card-default-text-color: var(--theme-text-default-color);
  --amroflix-card-contrast-text-color: var(--theme-text-secondary-color);

  background-color: var(--amroflix-card-surface-color);
  color: var(--amroflix-card-default-text-color);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-direction: column;

  &--vertical {
    width: 100%;
    min-width: 200px;
    max-width: 200px;
    height: 400px;

    .amroflix-card__media_section {
      background-color: black;
      height: 70%;

      &__media {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .amroflix-card__content {
      padding: 0.5rem;

      h3 {
        color: var(--amroflix-card-default-text-color);
        line-height: 1.5rem;
        margin: 0 0;
      }

      h4 {
        color: var(--amroflix-card-contrast-text-color);
        line-height: 1.2rem;
        margin: 0.5rem 0 0 0;
      }
    }
  }

  &--horizontal {
    width: 300px;
    height: 200px;
    flex-direction: row;

    .amroflix-card__media {
      width: 40%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
