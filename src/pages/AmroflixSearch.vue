<script setup lang="ts">
import { ref } from 'vue'
import AmroflixLayout from '@/components/blocks/AmroflixLayout.vue'
import { useSearchShows } from '@/composables/TVMaze/useSearchShows'

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

      <div v-if="isLoading" class="amroflix-search__status">Loading...</div>

      <div v-else-if="isError" class="amroflix-search__status amroflix-search__status--error">
        {{ error?.message ?? 'Something went wrong' }}
      </div>

      <ul v-else-if="searchResults?.length" class="amroflix-search__results">
        <li
          v-for="result in searchResults"
          :key="result.show.id"
          class="amroflix-search__result-item"
        >
          <img
            v-if="result.show.image?.medium"
            :src="result.show.image.medium"
            :alt="result.show.name"
            class="amroflix-search__result-image"
          />
          <div class="amroflix-search__result-info">
            <h3>{{ result.show.name }}</h3>
            <p v-if="result.show.genres.length">{{ result.show.genres.join(', ') }}</p>
            <p v-if="result.show.rating.average">Rating: {{ result.show.rating.average }}</p>
          </div>
        </li>
      </ul>

      <div v-else-if="searchQuery.trim().length > 0" class="amroflix-search__status">
        No results found.
      </div>
    </div>
  </AmroflixLayout>
</template>

<style scoped>
.amroflix-search {
  padding: 1.5rem;
}

.amroflix-search__input-wrapper {
  margin-bottom: 1.5rem;
}

.amroflix-search__input {
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

.amroflix-search__results {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.amroflix-search__result-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: var(--color-surface, #fff);
}

.amroflix-search__result-image {
  width: 80px;
  height: auto;
  border-radius: 0.25rem;
  object-fit: cover;
}

.amroflix-search__result-info h3 {
  margin: 0 0 0.25rem;
}

.amroflix-search__result-info p {
  margin: 0;
  color: var(--color-text-secondary, #888);
  font-size: 0.875rem;
}
</style>
