import { test, expect } from '@playwright/test'

test('should navigate to the pricing page', async ({ page }) => {
  await page.goto('/pricing')
  const title = page.locator('h1')
  await expect(title).toBeTruthy()
})
