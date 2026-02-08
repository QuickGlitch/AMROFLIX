<!-- Inlined SVGs have performance benefits and enabled us to easily apply CSS styles to the icons. -->
<script setup lang="ts">
import { computed } from 'vue'
import HamburgerIcon from './hamburger.svg?raw'
import LightModeIcon from './light_mode.svg?raw'
import NightModeIcon from './night_mode.svg?raw'
import SearchIcon from './search.svg?raw'
import CategoryIcon from './category.svg?raw'
import ExploreIcon from './explore.svg?raw'
import SquareCircleIcon from './square_circle.svg?raw'

export type IconName =
  | 'hamburger'
  | 'light_mode'
  | 'night_mode'
  | 'search'
  | 'category'
  | 'explore'
  | 'square_circle'

const { name } = defineProps<{
  name: IconName
}>()

const iconMap: Record<IconName, string> = {
  square_circle: SquareCircleIcon,
  explore: ExploreIcon,
  search: SearchIcon,
  category: CategoryIcon,
  hamburger: HamburgerIcon,
  light_mode: LightModeIcon,
  night_mode: NightModeIcon,
}

const svgContent = computed(() => {
  const icon = iconMap[name]

  if (!icon) {
    console.warn(
      `[AmroflixIcon] Invalid icon name provided: "${name}". Falling back to default icon.`,
    )
    return SquareCircleIcon
  }

  return icon
})
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
