<script setup lang="ts">
import { computed } from 'vue'
import AmroflixCarousel from '@/components/blocks/AmroflixCarousel.vue'
import AmroflixLayout from '@/components/blocks/AmroflixLayout.vue'
import AmroflixShowDialog from '@/components/blocks/AmroflixShowDialog.vue'
import { useShowsInfinite } from '@/composables/TVMaze/useShowsInfiniteQuery'
import { useShowsByGenre } from '@/composables/TVMaze/useShowsByGenre'
import { useShowDialog } from '@/composables/useShowDialog'

const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useShowsInfinite()

const shows = computed(() => data.value?.pages.flat() || [])
const { showsByGenre } = useShowsByGenre(shows)

const { selectedShowId, isDialogOpen, openDialog, closeDialog } = useShowDialog()

function onReachEnd() {
  if (hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage()
  }
}
</script>

<template>
  <AmroflixLayout>
    <AmroflixCarousel
      title="Discover Shows"
      :shows="shows"
      :loading="isLoading"
      @reach-end="onReachEnd"
      @show-select="openDialog"
      tabindex="2"
    />
    <AmroflixCarousel
      v-for="[genre, genreShows] in showsByGenre"
      :key="genre"
      :title="genre"
      :shows="genreShows"
      :loading="isLoading"
      @reach-end="onReachEnd"
      @show-select="openDialog"
    />

    <AmroflixShowDialog :show-id="selectedShowId" :open="isDialogOpen" @close="closeDialog" />
  </AmroflixLayout>
</template>

<style scoped></style>
