<script setup lang="ts">
import { ref } from 'vue'
import AmroflixLayout from '@/components/blocks/AmroflixLayout.vue'
import { useSearchShows } from '@/composables/TVMaze/useSearchShows'
import AmroflixCard from '@/components/blocks/AmroflixCard.vue'

const searchQuery = ref('')
const { data: searchResults, isLoading, isError, error } = useSearchShows(searchQuery)
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

      <AmroflixCard
        v-if="!searchQuery.trim().length"
        title="Welcome to Amroflix!"
        subtitle="Start typing to search for your favorite TV shows."
      />

      <div v-if="isLoading" class="amroflix-search__status">Loading...</div>

      <div v-else-if="isError" class="amroflix-search__status amroflix-search__status--error">
        {{ error?.message ?? 'Something went wrong' }}
      </div>

      <ul v-else-if="searchResults?.length" class="amroflix-search__results">
        <AmroflixCard
          v-for="result in searchResults"
          :key="result.show.id"
          :as="'li'"
          :title="result.show.name"
          :subtitle="result.show.genres.join(', ')"
          :content="
            result.show.summary
              ? result.show.summary.replace(/<[^>]+>/g, '')
              : 'No summary available.'
          "
          :media="{
            src: result.show.image?.medium || '',
            alt: result.show.name,
          }"
        />
      </ul>

      <div v-else-if="searchQuery.trim().length > 0" class="amroflix-search__status">
        No results found.
      </div>
    </div>
  </AmroflixLayout>
</template>

<style lang="scss" scoped>
.amroflix-search {
  padding: 1.5rem;

  &__results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
}

.amroflix-search__input-wrapper {
  margin-bottom: 1.5rem;
}

.amroflix-search__input {
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border, #ccc);
  font-size: 1rem;
  background: var(--color-surface, #fff);
  color: var(--color-text, #000);
}

.amroflix-search__status {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-secondary, #888);
}

.amroflix-search__status--error {
  color: var(--color-error, #e53935);
}
</style>
