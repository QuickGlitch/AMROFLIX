<script lang="ts" setup>
import AmroflixButton from '../../essentials/AmroflixButton.vue'
import { type IconName } from '../../essentials/AmroflixIcon/AmroflixIcon.vue'
import AmroflixTypography from '../../essentials/AmroflixTypography.vue'

export type AmroflixSideBarItemIcon = {
  label: string
  icon: IconName
}

export type AmroflixSideBarItemProps = AmroflixSideBarItemIcon & {
  isOpen?: boolean
  selected?: boolean
}

const { label, icon, isOpen = false, selected = false } = defineProps<AmroflixSideBarItemProps>()
</script>

<template>
  <div
    class="amroflix-sidebar-item"
    :class="{
      'amroflix-sidebar-item--closed': !isOpen,
      'amroflix-sidebar-item--selected': selected,
    }"
  >
    <div
      class="amroflix-sidebar-item__background"
      :class="{ 'amroflix-sidebar-item__background--small': !isOpen }"
    />
    <AmroflixButton class="amroflix-sidebar-item__button" variant="plain" :leading-icon="icon">
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
  --amroflix-sidebar-item-selected-background: var(--theme-background-default-color);
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

  &:not(&--selected):hover {
    color: var(--amroflix-sidebar-item-hover-text-color);
  }

  &:not(&--selected):hover &__background {
    opacity: 1;
  }

  &--selected {
    color: var(--brand-neutral-color);
  }

  &--selected &__background {
    opacity: 1;
    background-color: var(--amroflix-sidebar-item-selected-background);
  }

  .amroflix-sidebar-item__button {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    justify-content: start;
  }

  &--closed .amroflix-sidebar-item__button {
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
