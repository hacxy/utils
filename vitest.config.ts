import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // outputFile: './test-report/index.html',
    // reporters: ['default', 'html'],
    coverage: {
      enabled: true,
      include: ['src'],
      reporter: ['text-summary', 'html'],
      // reportsDirectory: './coverage'
    },
  }
});
