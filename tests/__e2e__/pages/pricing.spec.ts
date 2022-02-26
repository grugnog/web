import { test, expect } from '@playwright/test'

test('should navigate to the blog page', async ({ page }) => {
  await page.goto('/blog')
  const title = page.locator('h1')
  await expect(title).toHaveText(
    'The simplest accessibility solution, for the simplest price.'
  )
})
