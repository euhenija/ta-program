import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 3,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1920, height: 1080 },
    
  },
  expect: {
    timeout: 10 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        navigationTimeout: 10000 
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        navigationTimeout: 10000
      },
    },
  ],
});
