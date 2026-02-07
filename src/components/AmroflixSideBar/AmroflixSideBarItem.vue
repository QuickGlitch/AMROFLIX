<script lang="ts" setup>
import AmroflixButton from '../AmroflixButton.vue'
import AmroflixIcon from '../AmroflixIcon/AmroflixIcon.vue'
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
  <AmroflixButton class="amroflix-sidebar-item" variant="plain" :leading-icon="icon">
    <AmroflixTypography size="large" weight="bold"> {{ isOpen ? label : '' }}</AmroflixTypography>
  </AmroflixButton>
</template>

<style lang="scss" scoped>
.amroflix-sidebar-item {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: start;
}
</style>
