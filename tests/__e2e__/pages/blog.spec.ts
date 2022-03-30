import { test, expect } from '@playwright/test'

test('should navigate to the blog page', async ({ page }) => {
  await page.goto('http://localhost:3000/blog')
  const title = page.locator('h1')
  await expect(title).toHaveText('Web Accessibility News')
})
