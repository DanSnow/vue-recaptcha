/* global Vue: false, VueRecaptcha: false */

// eslint-disable-next-line no-unused-vars
function bootstrap(loadScript) {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#root',
    data: {
      sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
      normalVerified: false,
      bindedVerified: false,
      invisibleVerified: false,
      loadScript,
    },
    components: {
      VueRecaptcha,
    },
    mounted() {
      // If `loadRecaptchaScript` is not set to `true`, we'll need to load it manually
      if (!this.loadScript) {
        const $script = document.createElement('script')
        $script.src = 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit'
        $script.async = true
        $script.defer = true
        document.head.appendChild($script)
      }
    },
    methods: {
      onSubmit: function () {
        this.$refs.invisibleRecaptcha.execute()
      },
      onNormalVerify() {
        this.normalVerified = true
      },
      onBindedVerify() {
        this.bindedVerified = true
      },
      onInvisibleVerify() {
        this.invisibleVerified = true
      },
    },
  })
}
