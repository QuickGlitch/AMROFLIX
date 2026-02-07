<script lang="ts" setup>
import AmroflixButton from '../AmroflixButton.vue'
import { type IconName } from '../AmroflixIcon/AmroflixIcon.vue'
import AmroflixTypography from '../essentials/AmroflixTypography.vue'

export type AmroflixSideBarItemIcon = {
  label: string
  icon: IconName
}

export type AmroflixSideBarItemProps = AmroflixSideBarItemIcon & {
  isOpen?: boolean
}

const { label, icon, isOpen = false } = defineProps<AmroflixSideBarItemProps>()
</script>

<template>
  <div class="amroflix-sidebar-item" :class="{ 'amroflix-sidebar-item--closed': !isOpen }">
    <div
      class="amroflix-sidebar-item__background"
      :class="{ 'amroflix-sidebar-item__background--small': !isOpen }"
    />
    <AmroflixButton variant="plain" :leading-icon="icon">
      <Transition name="fade">
        <AmroflixTypography v-if="isOpen" size="large" weight="bold">
          {{ label }}
        </AmroflixTypography>
      </Transition>
    </AmroflixButton>
  </div>
</template>

<style lang="scss" scoped>
.amroflix-sidebar-item {
  /* component tokens */
  --amroflix-sidebar-item-height: var(--brand-tap-height);
  --amroflix-sidebar-item-hover-background: var(--theme-cta-primary-color);
  --amroflix-sidebar-item-hover-text-color: var(--brand-darkest-color);
  --amroflix-sidebar-item-tab-radius: 0.5rem;
  --amroflix-sidebar-item-transition-duration: 0.3s;
  --amroflix-sidebar-item-transition-delay: 0.2s;

  position: relative;
  width: 100%;
  height: var(--amroflix-sidebar-item-height);

  &__background {
    position: absolute;
    inset: 0 var(--amroflix-sidebar-item-tab-radius) 0 -1rem;
    background-color: var(--amroflix-sidebar-item-hover-background);
    border-radius: 0 var(--amroflix-sidebar-item-tab-radius) var(--amroflix-sidebar-item-tab-radius)
      0;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;

    &--small {
      inset: 0 0 0 -1rem;
    }
  }

  &:hover {
    color: var(--amroflix-sidebar-item-hover-text-color);
  }

  &:hover &__background {
    opacity: 1;
  }

  :deep(.amroflix-button) {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    justify-content: start;
  }

  &--closed :deep(.amroflix-button) {
    justify-content: center;
  }
}

.fade-enter-active {
  transition: opacity var(--amroflix-sidebar-item-transition-duration) ease
    var(--amroflix-sidebar-item-transition-delay);
}

.fade-leave-active {
  transition: none;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
