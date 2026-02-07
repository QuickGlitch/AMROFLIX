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
  <AmroflixButton
    class="amroflix-sidebar-item"
    :class="[isOpen ? '' : 'amroflix-sidebar-item--closed']"
    variant="plain"
    :leading-icon="icon"
  >
    <Transition name="fade">
      <AmroflixTypography
        v-if="isOpen"
        class="amroflix-sidebar-item__content"
        size="large"
        weight="bold"
      >
        {{ label }}
      </AmroflixTypography>
    </Transition>
  </AmroflixButton>
</template>

<style lang="scss" scoped>
.amroflix-sidebar-item {
  --amrofix-sidebar-item-height: var(--brand-tap-height);
  --amrofix-sidebar-item-animation-duration: var(--theme-duration-long);
  --amrofix-sidebar-item-animation-delay: 0.2s;

  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: start;
  height: var(--amrofix-sidebar-item-height);
  overflow: hidden;

  &__content {
    white-space: nowrap;
  }

  &--closed {
    justify-content: center;
  }
}

.fade-enter-active {
  transition: opacity var(--amrofix-sidebar-item-animation-duration, 0.3s) ease;
  transition-delay: var(--amrofix-sidebar-item-animation-delay, 0.2s);
}

.fade-leave-active {
  transition: none;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
