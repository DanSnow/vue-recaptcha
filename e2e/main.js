/* global Vue: false, VueRecaptcha: false, sinon: false */

window.normalVerifyCallback = sinon.spy()
window.bindedVerifyCallback = sinon.spy()
window.invisibleVerifyCallback = sinon.spy()

function resetSpies () {
  window.normalVerifyCallback.reset()
  window.bindedVerifyCallback.reset()
  window.invisibleVerifyCallback.reset()
}

window.resetSpies = resetSpies

new Vue({ // eslint-disable-line no-new
  el: '#root',
  data: {
    sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  },
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  methods: {
    onSubmit: function () {
      this.$refs.invisibleRecaptcha.execute()
    },
    onNormalVerify: window.normalVerifyCallback,
    onBindedVerify: window.bindedVerifyCallback,
    onInvisibleVerify: window.invisibleVerifyCallback
  }
})
