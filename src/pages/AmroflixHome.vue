<script setup lang="ts">
import { computed } from 'vue'
import AmroflixCarousel from '@/components/blocks/AmroflixCarousel.vue'
import AmroflixLayout from '@/components/blocks/AmroflixLayout.vue'
import { useShowsInfinite } from '@/composables/TVMaze/useShowsInfiniteQuery'

const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useShowsInfinite()

const shows = computed(() => data.value?.pages.flat() || [])

function onReachEnd() {
  if (hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage()
  }
}
</script>

<template>
  <AmroflixLayout>
    <AmroflixCarousel title="Discover Shows" :shows="shows" @reach-end="onReachEnd" />
  </AmroflixLayout>
</template>

<style scoped></style>
