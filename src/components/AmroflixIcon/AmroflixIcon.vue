<!-- Inlined SVGs have performance benefits and enabled us to easily apply CSS styles to the icons. -->
<script setup lang="ts">
import { computed } from 'vue'
import HamburgerIcon from './hamburger.svg?raw'
import LightModeIcon from './light_mode.svg?raw'
import NightModeIcon from './night_mode.svg?raw'

export type IconName = 'hamburger' | 'light_mode' | 'night_mode'

const { name } = defineProps<{
  name: IconName
}>()

const iconMap: Record<IconName, string> = {
  hamburger: HamburgerIcon,
  light_mode: LightModeIcon,
  night_mode: NightModeIcon,
}

const svgContent = computed(() => iconMap[name])
</script>

<template>
  <span class="amroflix-icon" v-html="svgContent"></span>
</template>

<style lang="scss" scoped>
.amroflix-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  :deep(svg) {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
}
</style>
