import { toValue, type MaybeRefOrGetter } from 'vue'
import { queryOptions, useQuery } from '@tanstack/vue-query'
import { searchShows } from '@/utils/services/TVMazeService'

export const searchShowsQueryOptions = (query: MaybeRefOrGetter<string>) =>
  queryOptions({
    queryKey: ['shows', 'search', query] as const,
    queryFn: () => searchShows(toValue(query)),
    enabled: () => toValue(query).trim().length > 0,
  })

export function useSearchShows(query: MaybeRefOrGetter<string>) {
  return useQuery(searchShowsQueryOptions(query))
}
