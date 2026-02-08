import { describe, it, expect } from 'vitest'
import { normalizeToShows } from '../utils/mappers/tvmaze-mapper'
import type { TVMazeShow, TVMazeSearchResult } from '../utils/services/TVMazeService'

import { mockShow, mockShow2 } from './fixtures/mock-shows'

describe('normalizeToShows', () => {
  it('should return an empty array when given an empty array', () => {
    expect(normalizeToShows([])).toEqual([])
  })

  it('should return an empty array when given null or undefined', () => {
    const invalidValue = null as unknown as TVMazeShow[] | TVMazeSearchResult[]
    const invalidUndefined = undefined as unknown as TVMazeShow[] | TVMazeSearchResult[]

    expect(normalizeToShows(invalidValue)).toEqual([])
    expect(normalizeToShows(invalidUndefined)).toEqual([])
  })

  it('should handle direct TVMazeShow arrays', () => {
    const shows = [mockShow, mockShow2]
    const result = normalizeToShows(shows)

    expect(result).toEqual(shows)
    expect(result).toHaveLength(2)
    expect(result[0]?.id).toBe(mockShow.id)
    expect(result[1]?.id).toBe(mockShow2.id)
  })

  it('should handle TVMazeSearchResult arrays by extracting the show property', () => {
    const searchResults: TVMazeSearchResult[] = [
      { score: 0.9, show: mockShow },
      { score: 0.8, show: mockShow2 },
    ]

    const result = normalizeToShows(searchResults)

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual(mockShow)
    expect(result[1]).toEqual(mockShow2)
    expect(result[0]?.id).toBe(mockShow.id)
    expect(result[1]?.id).toBe(mockShow2.id)
  })
})
