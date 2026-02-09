<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'
import Accessibility from 'embla-carousel-accessibility'
import type { TVMazeShow } from '@/utils/services/TVMazeService'
import AmroflixCard from '@/components/blocks/AmroflixCard.vue'
import AmroflixButton from '@/components/essentials/AmroflixButton.vue'
import AmroflixSpinner from '@/components/essentials/AmroflixSpinner.vue'

const { title, shows, loading } = defineProps<{
  title?: string
  shows: TVMazeShow[]
  loading?: boolean
}>()

// Emit event to parent when near end of carousel for infinite loading
const emit = defineEmits<{
  reachEnd: []
}>()

const prevBtnRef = ref<InstanceType<typeof AmroflixButton> | null>(null)
const nextBtnRef = ref<InstanceType<typeof AmroflixButton> | null>(null)

// exposes embla API for use within Vue
const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    slidesToScroll: 3,
  },
  [
    Accessibility({
      announceChanges: true,
    }),
  ],
)

const goToPrev = () => emblaApi.value?.goToPrev()
const goToNext = () => emblaApi.value?.goToNext()

// fire this function to see if its time to fetch additional items
function checkIfNearEnd() {
  const api = emblaApi.value
  if (!api) {
    console.warn('Embla API is not initialized')
    return
  }

  const slidesInView = api.slidesInView()
  const totalSlides = api.slideNodes().length

  if (totalSlides === 0) return

  const lastVisibleSlide = Math.max(...slidesInView)

  // If within 10 slides of the end, emit to fetch more
  if (lastVisibleSlide >= totalSlides - 10) {
    emit('reachEnd')
  }
}

watch(emblaApi, (api) => {
  if (!api) {
    console.warn('Embla API is not initialized')
    return
  }
  api.on('select', checkIfNearEnd)
  api.on('settle', checkIfNearEnd)
  api.on('reinit', checkIfNearEnd)

  // Register nav buttons and live region with the Accessibility plugin
  const accessibility = api.plugins()?.accessibility
  if (accessibility) {
    const prevEl = prevBtnRef.value?.$el as HTMLElement | undefined
    const nextEl = nextBtnRef.value?.$el as HTMLElement | undefined
    if (prevEl && nextEl) {
      accessibility.setupPrevAndNextButtons(prevEl, nextEl)
    }
    accessibility.setupLiveRegion('.amroflix-carousel__live-region')
  }

  // edge case - Check immediately in case the initial set is small
  checkIfNearEnd()
})

// clean up listeners on unmount unless you like leaks
onUnmounted(() => {
  const api = emblaApi.value
  if (!api) return
  api.off('select', checkIfNearEnd)
  api.off('settle', checkIfNearEnd)
  api.off('reinit', checkIfNearEnd)
})
</script>

<template>
  <section class="amroflix-carousel">
    <div v-if="title" class="amroflix-carousel__header">
      <h2 class="amroflix-carousel__title">{{ title }}</h2>
      <div class="amroflix-carousel__nav">
        <AmroflixSpinner v-if="loading" size="small" />
        <template v-else>
          <AmroflixButton
            class="amroflix-carousel__nav_button"
            ref="prevBtnRef"
            variant="plain"
            leading-icon="chevron_left"
            @click="goToPrev"
          />
          <AmroflixButton
            class="amroflix-carousel__nav_button"
            ref="nextBtnRef"
            variant="plain"
            leading-icon="chevron_right"
            @click="goToNext"
          />
        </template>
      </div>
    </div>

    <div class="amroflix-carousel__live-region" aria-live="polite" aria-atomic="true" />

    <div class="amroflix-carousel__viewport" ref="emblaRef">
      <div class="amroflix-carousel__container">
        <div v-for="show in shows" :key="show.id" class="amroflix-carousel__slide">
          <AmroflixCard
            :title="show.name"
            :subtitle="show.genres.join(', ')"
            :rating="show.rating?.average"
            :media="{
              src: show.image?.medium || '',
              alt: show.name,
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.amroflix-carousel {
  /* component tokens */
  --amroflix-carousel-padding: 1rem 1.5rem;
  --amroflix-carousel-slide-gap: 1rem;
  --amroflix-carousel-slide-width: 200px;
  --amroflix-carousel-title-color: var(--theme-text-default-color);
  --amroflix-carousel-nav-color: var(--theme-text-default-color);
  --amroflix-carousel-nav-hover-color: var(--brand-secondary-color);

  padding: var(--amroflix-carousel-padding);

  &__nav_button {
    &:hover {
      color: var(--amroflix-carousel-nav-hover-color);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  &__title {
    color: var(--amroflix-carousel-title-color);
    font-size: var(--theme-text-large-size);
    font-weight: var(--theme-text-bold-weight);
    margin: 0;
  }

  &__nav {
    display: flex;
    gap: 0.5rem;
    color: var(--amroflix-carousel-nav-color);
  }

  &__live-region {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  &__viewport {
    overflow: hidden;
  }

  &__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    gap: var(--amroflix-carousel-slide-gap);
  }

  &__slide {
    flex: 0 0 var(--amroflix-carousel-slide-width);
    min-width: 0;
  }
}
</style>
