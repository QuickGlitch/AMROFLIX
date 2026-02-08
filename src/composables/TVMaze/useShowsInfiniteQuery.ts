import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/vue-query'
import { getShowsByPage } from '@/utils/services/TVMazeService'

export const showsInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ['shows', 'infinite'] as const,
    queryFn: ({ pageParam }) => getShowsByPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length > 0 ? lastPageParam + 1 : undefined,
    staleTime: Infinity, // Cache results indefinitely since TVMaze data doesn't change often (24h)
  })

export function useShowsInfinite() {
  return useInfiniteQuery(showsInfiniteQueryOptions())
}
