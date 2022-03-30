import { PlaywrightTestConfig } from '@playwright/test'
import path from 'path'

const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'tests/__e2e__'),
  retries: 2,
  webServer: {
    command: 'npm run start',
    port: 3000,
    timeout: 120 * 2000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    trace: 'retry-with-trace',
  },
}

export default config
