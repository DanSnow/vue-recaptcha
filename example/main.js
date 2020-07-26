/* global Vue: false, VueRecaptcha: false */
// eslint-disable-next-line no-new
<<<<<<< HEAD
new Vue({
  el: '#root',
  data: {
    sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  },
=======

const app = Vue.createApp({
  data: () => ({
    sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  }),
>>>>>>> feat!: Support vue v3
  components: {
    'vue-recaptcha': VueRecaptcha,
  },
  methods: {
    onSubmit: function () {
      this.$refs.invisibleRecaptcha.execute()
    },
    onVerify: function (response) {
      console.log('Verify: ' + response)
    },
    onExpired: function () {
      console.log('Expired')
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset() // Direct call reset method
    },
  },
})

app.mount('#root')
