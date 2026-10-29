import { defineConfig, devices } from '@playwright/test'

const viteCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:5178', trace: 'retain-on-failure', screenshot: 'only-on-failure', video: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: { command: `${viteCommand} vite --host 127.0.0.1 --port 5178 --strictPort`, url: 'http://127.0.0.1:5178', reuseExistingServer: !process.env.CI },
})
