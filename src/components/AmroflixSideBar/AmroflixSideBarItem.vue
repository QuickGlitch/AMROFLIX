<script lang="ts" setup>
import AmroflixButton from '../AmroflixButton.vue'
import AmroflixIcon from '../AmroflixIcon/AmroflixIcon.vue'
import { type IconName } from '../AmroflixIcon/AmroflixIcon.vue'

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
  <AmroflixButton class="amroflix-sidebar-item" variant="plain">
    <AmroflixIcon :name="icon" />
    {{ isOpen ? label : '' }}
  </AmroflixButton>
</template>

<style lang="scss" scoped></style>
