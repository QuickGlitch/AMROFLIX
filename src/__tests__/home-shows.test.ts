import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { createRouter, createMemoryHistory } from 'vue-router'
import AmroflixHome from '../pages/AmroflixHome.vue'
import { ThemeKey } from '../composables/useTheme'
import { mockShow, mockShow2 } from './fixtures/mock-shows'

vi.mock('../utils/services/TVMazeService', () => ({
  getShowsByPage: vi.fn((page?: number) => {
    if (page === 0 || page === undefined) {
      return Promise.resolve([mockShow, mockShow2])
    }
    return Promise.resolve([])
  }),
  getShowById: vi.fn(() => Promise.resolve(mockShow)),
}))

let queryClient: QueryClient
let wrapper: VueWrapper

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: AmroflixHome }],
})

beforeEach(async () => {
  await flushPromises()
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
})

afterEach(() => {
  wrapper?.unmount()
  queryClient.clear()
})

describe('AmroflixHome', () => {
  it('fetches shows and renders carousels grouped by genre', async () => {
    wrapper = mount(AmroflixHome, {
      global: {
        plugins: [router, [VueQueryPlugin, { queryClient }]],
        provide: {
          [ThemeKey as symbol]: {
            theme: ref('dark'),
            toggleTheme: () => {},
          },
        },
      },
    })

    // "Discover Shows" carousel should be rendered
    expect(wrapper.text()).toContain('Discover Shows')

    // Both shows should appear
    expect(wrapper.text()).toContain('Under the Dome')
    expect(wrapper.text()).toContain("Hell's Kitchen")

    const carouselTitles = wrapper.findAll('.amroflix-carousel__title').map((el) => el.text())

    expect(carouselTitles).toContain('Drama')
    expect(carouselTitles).toContain('Science-Fiction')
    expect(carouselTitles).toContain('Thriller')
    expect(carouselTitles).toContain('Food')

    // Genre titles should be sorted alphabetically (after "Discover Shows")
    const genreTitles = carouselTitles.filter((t) => t !== 'Discover Shows')
    expect(genreTitles).toEqual([...genreTitles].sort((a, b) => a.localeCompare(b)))
  })
})
