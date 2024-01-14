// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['vue-recaptcha/nuxt'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      recaptcha: {
        v2SiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        v3SiteKey: '6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs',
      },
    },
  },
})
