const TVMAZE_BASE_URL = 'https://api.tvmaze.com'
const TVMAZE_SERVICE_ID = 'tvmaze'

import { fetchRequest } from './fetch-wrapper'

export type TVMazeImage = {
  medium: string
  original: string
}

export type TVMazeSchedule = {
  time: string
  days: string[]
}

export type TVMazeRating = {
  average: number | null
}

export type TVMazeCountry = {
  name: string
  code: string
  timezone: string
}

export type TVMazeNetwork = {
  id: number
  name: string
  country: TVMazeCountry | null
  officialSite: string | null
}

export type TVMazeExternals = {
  tvrage: number | null
  thetvdb: number | null
  imdb: string | null
}

export type TVMazeLinks = {
  self: {
    href: string
  }
  previousepisode?: {
    href: string
    name?: string
  }
  nextepisode?: {
    href: string
    name?: string
  }
}

export type TVMazeShow = {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number | null
  averageRuntime: number | null
  premiered: string
  ended: string | null
  officialSite: string | null
  schedule: TVMazeSchedule
  rating: TVMazeRating
  weight: number
  network: TVMazeNetwork | null
  webChannel: TVMazeNetwork | null
  dvdCountry: string | null
  externals: TVMazeExternals
  image: TVMazeImage | null
  summary: string
  updated: number
  _links: TVMazeLinks
}

export type TVMazeSearchResult = {
  score: number
  show: TVMazeShow
}

export async function searchShows(query: string): Promise<TVMazeSearchResult[]> {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    throw new Error('please supply a valid query parameter')
  }

  const url = `${TVMAZE_BASE_URL}/search/shows?q=${encodeURIComponent(trimmedQuery)}`
  return fetchRequest<TVMazeSearchResult[]>(url, undefined, TVMAZE_SERVICE_ID)
}

export async function getShowsByPage(page?: number): Promise<TVMazeShow[]> {
  const hasPage = typeof page === 'number'
  const url = hasPage ? `${TVMAZE_BASE_URL}/shows?page=${page}` : `${TVMAZE_BASE_URL}/shows`

  return fetchRequest<TVMazeShow[]>(url, undefined, TVMAZE_SERVICE_ID)
}

export async function getShowById(id: number): Promise<TVMazeShow> {
  const url = `${TVMAZE_BASE_URL}/shows/${id}`
  return fetchRequest<TVMazeShow>(url, undefined, TVMAZE_SERVICE_ID)
}
