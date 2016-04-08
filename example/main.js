var app = new Vue({
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
    }
  }
});
