import { toValue, type MaybeRefOrGetter } from 'vue'
import { queryOptions, useQuery } from '@tanstack/vue-query'
import { getShowById } from '@/utils/services/TVMazeService'

export const showByIdQueryOptions = (id: MaybeRefOrGetter<number | null>) =>
  queryOptions({
    queryKey: ['shows', 'detail', id] as const,
    queryFn: () => {
      const showId = toValue(id)
      if (showId === null) {
        throw new Error('Show ID is required')
      }
      return getShowById(showId)
    },
    enabled: () => toValue(id) !== null,
  })

export function useShowById(id: MaybeRefOrGetter<number | null>) {
  return useQuery(showByIdQueryOptions(id))
}
