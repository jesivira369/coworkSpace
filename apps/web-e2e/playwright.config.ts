import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';
import path from 'path';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4000';

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'yarn nx run @coworkspace/web:start',
    url: 'http://localhost:4000',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  globalSetup: './src/test-setup.ts',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
