import Vue from "@vitejs/plugin-vue";

import { defineConfig } from "vite";
// oxlint-disable-next-line import/no-empty-named-blocks, unicorn/require-module-specifiers
import type {} from "vitest/config";

export default defineConfig({
  plugins: [Vue()],
  test: {
    exclude: ["playwright/**", "docs/**", "**/node_modules/**", "dist/**"],
    environment: "happy-dom",
    typecheck: {
      checker: "vue-tsc",
      ignoreSourceErrors: true,
    },
  },
});
