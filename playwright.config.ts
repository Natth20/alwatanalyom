import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    locale: "ar-EG",
  },
  projects: [
    {
      name: "Desktop Chrome (Arabic RTL)",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome (RTL)",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "Reduced Motion Mode",
      use: {
        ...devices["Desktop Chrome"],
        reducedMotion: "reduce",
      },
    },
  ],
});

