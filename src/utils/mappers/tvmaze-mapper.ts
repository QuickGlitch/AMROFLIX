import type { TVMazeShow, TVMazeSearchResult } from '../services/TVMazeService'

/**
 * Normalizes TVMaze data to a consistent TVMazeShow structure.
 * Handles both search results (which wrap shows) and direct show arrays.
 */
export function normalizeToShows(data: TVMazeSearchResult[] | TVMazeShow[]): TVMazeShow[] {
  if (!data || data.length === 0) return []

  const firstItem = data[0]
  if (firstItem && 'show' in firstItem) {
    return (data as TVMazeSearchResult[]).map((result) => result.show)
  }

  return data as TVMazeShow[]
}
