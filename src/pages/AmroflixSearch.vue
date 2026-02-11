<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { refDebounced } from '@vueuse/core'
import AmroflixLayout from '@/components/blocks/AmroflixLayout.vue'
import AmroflixShowDialog from '@/components/blocks/AmroflixShowDialog.vue'
import { useSearchShows } from '@/composables/TVMaze/useSearchShows'
import { useShowsInfinite } from '@/composables/TVMaze/useShowsInfiniteQuery'
import { useShowDialog } from '@/composables/useShowDialog'
import AmroflixCard from '@/components/blocks/AmroflixCard.vue'
import AmroflixInput from '@/components/essentials/AmroflixInput.vue'
import AmroflixSpinner from '@/components/essentials/AmroflixSpinner.vue'
import { normalizeToShows } from '@/utils/mappers/tvmaze-mapper'
import AmroflixTypography from '@/components/essentials/AmroflixTypography.vue'

const route = useRoute()
const searchQuery = ref('')
const debouncedQuery = refDebounced(searchQuery, 300)

onMounted(() => {
  const q = route.query.q
  if (typeof q === 'string' && q.trim()) {
    searchQuery.value = q
  }
})
const hasSearchQuery = computed(() => debouncedQuery.value.trim().length > 0)

const {
  data: searchResults,
  isLoading: isSearchLoading,
  isError: isSearchError,
  error: searchError,
} = useSearchShows(debouncedQuery)
const {
  data: infiniteData,
  isLoading: isInfiniteLoading,
  isError: isInfiniteError,
  error: infiniteError,
} = useShowsInfinite()

const displayShows = computed(() => {
  if (hasSearchQuery.value) {
    return normalizeToShows(searchResults.value || [])
  }
  // Flatten all pages from infinite query and normalize
  // added random sorting to mix up shows
  const flattenedPages =
    infiniteData.value?.pages
      .flat()
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value) || []
  return normalizeToShows(flattenedPages)
})

const isLoading = computed(() =>
  hasSearchQuery.value ? isSearchLoading.value : isInfiniteLoading.value,
)
const isError = computed(() => (hasSearchQuery.value ? isSearchError.value : isInfiniteError.value))
const error = computed(() => (hasSearchQuery.value ? searchError.value : infiniteError.value))

const { selectedShowId, isDialogOpen, openDialog, closeDialog } = useShowDialog()
</script>

<template>
  <AmroflixLayout>
    <template #header__center><div /></template>
    <div class="amroflix-search">
      <AmroflixTypography as="h1" weight="bold" size="large">Search Shows</AmroflixTypography>
      <div class="amroflix-search__input-wrapper">
        <AmroflixInput v-model="searchQuery" type="search" placeholder="Search for shows..." />
      </div>

      <AmroflixSpinner v-if="isLoading" />

      <div v-else-if="isError" class="amroflix-search__status amroflix-search__status--error">
        {{ error?.message ?? 'Something went wrong' }}
      </div>

      <ul v-else-if="displayShows?.length" class="amroflix-search__results">
        <AmroflixCard
          v-for="show in displayShows"
          :key="show.id"
          :as="'li'"
          :title="show.name"
          :subtitle="show.genres.join(', ')"
          :rating="show.rating?.average"
          :content="show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No summary available.'"
          :media="{
            src: show.image?.medium || '',
            alt: show.name,
          }"
          @click="openDialog(show.id)"
        />
      </ul>

      <div v-else-if="hasSearchQuery" class="amroflix-search__status">No results found.</div>
    </div>

    <AmroflixShowDialog :show-id="selectedShowId" :open="isDialogOpen" @close="closeDialog" />
  </AmroflixLayout>
</template>

<style lang="scss" scoped>
@use '@/styles/breakpoints' as *;

.amroflix-search {
  /* component tokens */
  --amroflix-search-padding: 1.5rem;
  --amroflix-search-results-gap: 2rem;
  --amroflix-search-status-padding: 2rem;
  --amroflix-search-status-text-color: var(--theme-text-subtle-color);
  --amroflix-search-error-color: var(--theme-status-error-color);

  padding: var(--amroflix-search-padding);

  h1 {
    display: block;
    margin-bottom: 0.5rem;
  }

  &__results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    @include desktop {
      gap: var(--amroflix-search-results-gap);
    }
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
}

.amroflix-search__input-wrapper {
  margin-bottom: var(--amroflix-search-padding);
  margin-bottom: 2rem;
}

.amroflix-search__status {
  text-align: center;
  padding: var(--amroflix-search-status-padding);
  color: var(--amroflix-search-status-text-color);
}

.amroflix-search__status--error {
  color: var(--amroflix-search-error-color);
}
</style>
