/* global Vue: false, VueRecaptcha: false, sinon: false */

window.verifyCallback = sinon.spy()

new Vue({ // eslint-disable-line no-new
  el: '#root',
  data: {
    opts: {
      sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    }
  },
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  methods: {
    onVerify: function (response) {
      console.log('Verify: ' + response)
      window.verifyCallback()
    },
    onExpired: function () {
      console.log('Expired')
    },
    resetRecaptcha () {
      this.$refs.recaptcha.reset() // Direct call reset method
    }
  }
})
