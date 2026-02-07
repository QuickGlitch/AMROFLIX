<script lang="ts" setup>
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
  <div class="amroflix-sidebar-item">
    <AmroflixIcon :name="icon" />
    {{ isOpen ? label : '' }}
  </div>
</template>

<style lang="scss" scoped></style>
