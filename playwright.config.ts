import { PlaywrightTestConfig, devices } from '@playwright/test'
import path from 'path'

const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'tests/__e2e__'),
  retries: 2,
  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 120 * 2000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    trace: 'retry-with-trace',
  },
  //   projects: [
  //     {
  //       name: 'Desktop Chrome',
  //       use: {
  //         ...devices['Desktop Chrome'],
  //       },
  //     },
  //     {
  //       name: 'Mobile Chrome',
  //       use: {
  //         ...devices['Pixel 5'],
  //       },
  //     },
  //     {
  //       name: 'Mobile Safari',
  //       use: devices['iPhone 12'],
  //     },
  //   ],
}

export default config
