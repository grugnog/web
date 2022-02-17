import { test, expect } from '@playwright/test'

// basic playwrite test TODO: Switch to ping
test('should navigate to the index page', async ({ page }) => {
  await page.goto('https:/a11ywatch.com')
  const title = page.locator('h1')
  await expect(title).toHaveText('Web Accessibility Automation')
})
