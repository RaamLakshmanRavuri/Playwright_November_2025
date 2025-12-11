import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['allure-playwright'],
    ['html']
  ],
  use: {
  baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  headless: true,
  screenshot: 'on',          // Capture screenshots for each step
  video: 'on',               // Attach video
  trace: 'on',               // Full trace
},
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      viewport: null, // disables default viewport
      launchOptions: {
        args: ['--start-maximized']
      }
    }
  ],
});