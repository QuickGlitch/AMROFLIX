import { computed, type Ref } from 'vue'
import type { TVMazeShow } from '@/utils/services/TVMazeService'

/**
 * Groups an array of shows by genre.
 * A show can appear in multiple genre groups.
 * Returns a Map<genre, TVMazeShow[]> sorted by genre name.
 */
export function useShowsByGenre(shows: Ref<TVMazeShow[]>) {
  const showsByGenre = computed(() => {
    const genreMap = new Map<string, TVMazeShow[]>()

    for (const show of shows.value) {
      for (const genre of show.genres) {
        const existing = genreMap.get(genre)
        if (existing) {
          existing.push(show)
        } else {
          genreMap.set(genre, [show])
        }
      }
    }

    // Sort each genre's shows by rating (descending), if no rating push to the end
    for (const [, genreShows] of genreMap) {
      genreShows.sort((a, b) => (b.rating?.average ?? -1) - (a.rating?.average ?? -1))
    }

    // Sort by genre name for consistent ordering
    return new Map([...genreMap.entries()].sort(([a], [b]) => a.localeCompare(b)))
  })

  return { showsByGenre }
}
