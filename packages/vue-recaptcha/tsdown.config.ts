import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  entry: [
    './src/index.ts',
    './src/unhead.ts',
    './src/nuxt.ts',
    './src/nuxt-plugin.ts',
    './src/nuxt-enterprise-plugin.ts',
  ],
  dts: { vue: true },
  sourcemap: true,
  platform: 'neutral',
  exports: true,
  // Nuxt auto import
  external: ['#imports'],
  plugins: [Vue({ isProduction: true })],
})
