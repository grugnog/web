import { test, expect } from '@playwright/test'

test('should navigate to the testout page', async ({ page }) => {
  await page.goto('/testout')
  const title = page.locator('h1')
  await expect(title).toHaveText('Test out A11yWatch')
})
