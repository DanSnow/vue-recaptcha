(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueRecaptcha = factory());
}(this, (function () { 'use strict';

var defer = function defer() {
  var deferred = {};
  deferred.promise = new Promise(function (resolve) {
    deferred.resolve = resolve;
  });
  return deferred;
};

function createRecaptcha() {
  var recaptcha = null;
  var deferred = defer();

  return {
    setRecaptcha: function setRecaptcha(recap) {
      recaptcha = recap;
      deferred.resolve(recap);
    },
    getRecaptcha: function getRecaptcha() {
      if (recaptcha) {
        return Promise.resolve(recaptcha);
      }

      return deferred.promise;
    },
    render: function render(ele, key, options) {
      return this.getRecaptcha().then(function (recap) {
        var opts = Object.assign({}, { sitekey: key }, options);
        return recap.render(ele, opts);
      });
    },
    reset: function reset(widgetId) {
      if (typeof widgetId === 'undefined') {
        return;
      }

      this.assertRecaptchaLoad();
      recaptcha.reset(widgetId);
    },
    checkRecaptchaLoad: function checkRecaptchaLoad() {
      if (window.hasOwnProperty('grecaptcha')) {
        this.setRecaptcha(window.grecaptcha);
      }
    },
    assertRecaptchaLoad: function assertRecaptchaLoad() {
      if (recaptcha === null) {
        throw new Error('ReCAPTCHA has not been loaded');
      }
    }
  };
}

var recaptcha = createRecaptcha();

window.vueRecaptchaApiLoaded = function () {
  recaptcha.setRecaptcha(window.grecaptcha);
};

var widgetId = null;

var VueRecaptcha$1 = {
  props: {
    sitekey: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  created: function created() {
    recaptcha.checkRecaptchaLoad();
  },
  mounted: function mounted() {
    var self = this;
    var opts = Object.assign({}, this.options, {
      callback: this.emitVerify,
      'expired-callback': this.emitExpired
    });
    recaptcha.render(this.$refs.container, this.key, opts).then(function (id) {
      widgetId = id;
      self.$emit('render', widgetId);
    });
  },

  methods: {
    reset: function reset() {
      recaptcha.reset(widgetId);
    },
    emitVerify: function emitVerify(response) {
      this.$emit('verify', response);
    },
    emitExpired: function emitExpired() {
      this.$emit('expired');
    }
  },
  events: {
    recaptchaReset: function recaptchaReset() {
      this.reset();
    }
  },
  render: function render(h) {
    return h(
      'div',
      { ref: 'container' },
      []
    );
  }
};

return VueRecaptcha$1;

})));
