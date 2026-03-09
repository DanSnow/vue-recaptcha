import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  extends: "docus",
  app: {
    baseURL: "/vue-recaptcha/",
  },
  modules: ["@unocss/nuxt", "@vueuse/nuxt", ["vue-recaptcha/nuxt", { _globalComponent: true }]],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    // core options
    shortcuts: [],
    rules: [],
  },
  robots: { robotsTxt: false },
  runtimeConfig: {
    public: {
      recaptcha: {
        v2SiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
        v3SiteKey: "6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs",
      },
    },
  },
});
