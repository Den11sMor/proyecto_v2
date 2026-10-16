import { defineConfig } from '@playwright/test'
import process from 'node:process'

export default defineConfig({
  testDir: './e2e',
  workers: 1,
  timeout: 45000,
  reporter: [['list'], ['html', { outputFolder: 'evidencia/reporte-navegador', open: 'never' }], ['json', { outputFile: 'evidencia/resultados-navegador.json' }]],
  outputDir: 'evidencia/resultados',
  use: {
    baseURL: 'http://127.0.0.1:5180',
    viewport: { width: 1280, height: 900 },
    screenshot: 'on',
    trace: 'retain-on-failure',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  webServer: { command: 'pnpm dev --host 127.0.0.1 --port 5180 --strictPort', url: 'http://127.0.0.1:5180', reuseExistingServer: !process.env.CI },
})
