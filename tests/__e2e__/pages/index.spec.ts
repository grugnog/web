import { test, expect } from '@playwright/test'

test('should navigate to the index page', async ({ page }) => {
  await page.goto('/')
  const title = page.locator('h1')
  await expect(title).toBeTruthy()
})
