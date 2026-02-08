<script setup lang="ts">
import { ref, computed } from 'vue'
import { refDebounced } from '@vueuse/core'
import AmroflixLayout from '@/components/blocks/AmroflixLayout.vue'
import { useSearchShows } from '@/composables/TVMaze/useSearchShows'
import { useShowsInfinite } from '@/composables/TVMaze/useShowsInfiniteQuery'
import AmroflixCard from '@/components/blocks/AmroflixCard.vue'
import { normalizeToShows } from '@/utils/mappers/tvmaze-mapper'

const searchQuery = ref('')
const debouncedQuery = refDebounced(searchQuery, 300)
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
  const flattenedPages = infiniteData.value?.pages.flat() || []
  return normalizeToShows(flattenedPages)
})

const isLoading = computed(() =>
  hasSearchQuery.value ? isSearchLoading.value : isInfiniteLoading.value,
)
const isError = computed(() => (hasSearchQuery.value ? isSearchError.value : isInfiniteError.value))
const error = computed(() => (hasSearchQuery.value ? searchError.value : infiniteError.value))
</script>

<template>
  <AmroflixLayout>
    <template #header__center><div /></template>
    <div class="amroflix-search">
      <div class="amroflix-search__input-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for shows..."
          class="amroflix-search__input"
        />
      </div>

      <div v-if="isLoading" class="amroflix-search__status">Loading...</div>

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
          :content="show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No summary available.'"
          :media="{
            src: show.image?.medium || '',
            alt: show.name,
          }"
        />
      </ul>

      <div v-else-if="hasSearchQuery" class="amroflix-search__status">No results found.</div>
    </div>
  </AmroflixLayout>
</template>

<style lang="scss" scoped>
.amroflix-search {
  /* component tokens */
  --amroflix-search-padding: 1.5rem;
  --amroflix-search-results-gap: 2rem;
  --amroflix-search-input-padding: 0.75rem 1rem;
  --amroflix-search-input-border-radius: var(--brand-input-border-radius);
  --amroflix-search-input-border-color: var(--theme-border-default-color);
  --amroflix-search-input-background-color: var(--theme-background-surface-color);
  --amroflix-search-input-text-color: var(--theme-text-default-color);
  --amroflix-search-input-font-size: var(--theme-text-default-size);
  --amroflix-search-status-padding: 2rem;
  --amroflix-search-status-text-color: var(--theme-text-subtle-color);
  --amroflix-search-error-color: var(--theme-status-error-color);

  padding: var(--amroflix-search-padding);

  &__results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--amroflix-search-results-gap);
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
}

.amroflix-search__input-wrapper {
  margin-bottom: var(--amroflix-search-padding);
}

.amroflix-search__input {
  box-sizing: border-box;
  width: 100%;
  padding: var(--amroflix-search-input-padding);
  border-radius: var(--amroflix-search-input-border-radius);
  border: 1px solid var(--amroflix-search-input-border-color);
  font-size: var(--amroflix-search-input-font-size);
  background: var(--amroflix-search-input-background-color);
  color: var(--amroflix-search-input-text-color);
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
