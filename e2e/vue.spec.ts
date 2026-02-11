/**
 * End-to-end Playwright tests that verify:
 * - The home page renders the Discover and genre carousels, and fetching the next
 *   page of shows occurs after navigating the carousel.
 * - The header search navigates to the search page and returns results for "Futurama".
 *
 * @remarks
 * The `/Futurama/i` regex uses the `i` (case-insensitive) flag so the match succeeds
 * regardless of capitalization (e.g., "Futurama", "futurama", "FUTURAMA").
 */
import { test, expect } from '@playwright/test'

test('navigates to home page and displays carousels with shows, then loads more on scroll', async ({
  page,
}) => {
  test.setTimeout(60000)

  await page.goto('/')

  // Wait for carousels to render with shows
  const discoverHeading = page.getByRole('heading', { name: 'Discover Shows' })
  await expect(discoverHeading).toBeVisible({ timeout: 15000 })

  const discoverCarousel = page.locator('.amroflix-carousel').first()
  const slides = discoverCarousel.locator('.amroflix-carousel__slide')
  await expect(slides.first()).toBeVisible()

  // Assert genre carousels also rendered
  const allCarousels = page.locator('.amroflix-carousel')
  await expect(allCarousels).not.toHaveCount(1)

  // Record initial show count
  const initialCount = await slides.count()
  expect(initialCount).toBeGreaterThan(0)

  // Set up listener for the next page API call BEFORE scrolling
  const nextPageResponse = page.waitForResponse(
    (res) => res.url().includes('api.tvmaze.com/shows?page=1'),
    { timeout: 45000 },
  )

  // Click the next button rapidly to scroll through the carousel until more shows are fetched
  const nextButton = discoverCarousel.locator('.amroflix-carousel__nav_button').last()

  for (let i = 0; i < 100; i++) {
    await nextButton.click()
  }

  await nextPageResponse

  // Wait for the new shows to render in the DOM
  await expect(slides).not.toHaveCount(initialCount, { timeout: 10000 })
  const newCount = await slides.count()
  expect(newCount).toBeGreaterThan(initialCount)
})

test('searches for Futurama from the header and sees results on the search page', async ({
  page,
}) => {
  test.setTimeout(60_000)

  await page.goto('/')

  // Wait for the layout header to render, then find the search input
  const searchInput = page.locator('header input')
  await expect(searchInput).toBeVisible({ timeout: 15000 })

  // Type a query and submit
  await searchInput.click()
  await searchInput.fill('Futurama')
  await searchInput.press('Enter')

  // Assert redirect to search page with query param
  await expect(page).toHaveURL(/\/search\?q=Futurama/)
  await expect(page.getByRole('heading', { name: 'Search Shows' })).toBeVisible()

  // Assert that search results contain Futurama
  const results = page.locator('.amroflix-search__results .amroflix-card')
  await expect(results.first()).toBeVisible({ timeout: 10000 })
  await expect(results.first()).toContainText(/Futurama/i)
})
