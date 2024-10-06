import Vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'
import {} from 'vitest/config'

export default defineConfig({
  plugins: [Vue()],
  test: {
    exclude: ['playwright/**', 'docs/**', '**/node_modules/**', 'dist/**'],
    environment: 'happy-dom',
    typecheck: {
      checker: 'vue-tsc',
      ignoreSourceErrors: true,
    },
  },
})
