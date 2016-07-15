/* global Vue: false, VueRecaptcha: false */
new Vue({ // eslint-disable-line no-new
  el: '#root',
  data: {
    opts: {
      sitekey: '<Your sitekey here>'
    }
  },
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  methods: {
    onVerify: function(response) {
      console.log('Verify: ' + response);
    },
    onExpired: function() {
      console.log('Expired');
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset(); // Direct call reset method
      // this.$broadcast('recaptchaReset'); // Or broadcast event
    }
  }
});
