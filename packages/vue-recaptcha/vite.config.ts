import {} from 'vitest/config'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  test: {
    exclude: ['playwright/**', 'docs/**', '**/node_modules/**', 'dist/**'],
    typecheck: {
      checker: 'vue-tsc',
      ignoreSourceErrors: true,
    },
  },
})
