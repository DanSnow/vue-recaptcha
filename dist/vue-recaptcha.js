(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueRecaptcha = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var defer = function defer() {
  var state = false; // Resolved or not
  var value = void 0;
  var callbacks = [];
  var resolve = function resolve(val) {
    if (state) {
      return;
    }

    state = true;
    value = val;
    callbacks.forEach(function (cb) {
      cb(val);
    });
  };

  var then = function then(cb) {
    if (!state) {
      callbacks.push(cb);
      return;
    }
    cb(value);
  };

  var deferred = {
    resolved: function resolved() {
      return state;
    },

    resolve: resolve,
    promise: {
      then: then
    }
  };
  return deferred;
};

function createRecaptcha() {
  var deferred = defer();

  return {
    setRecaptcha: function setRecaptcha(recap) {
      deferred.resolve(recap);
    },
    getRecaptcha: function getRecaptcha() {
      return deferred.promise;
    },
    render: function render(ele, key, options, cb) {
      this.getRecaptcha().then(function (recap) {
        var opts = _extends({}, { sitekey: key }, options);
        cb(recap.render(ele, opts));
      });
    },
    reset: function reset(widgetId) {
      if (typeof widgetId === 'undefined') {
        return;
      }

      this.assertRecaptchaLoad();
      this.getRecaptcha().then(function (recap) {
        return recap.reset(widgetId);
      });
    },
    checkRecaptchaLoad: function checkRecaptchaLoad() {
      if (window.hasOwnProperty('grecaptcha')) {
        this.setRecaptcha(window.grecaptcha);
      }
    },
    assertRecaptchaLoad: function assertRecaptchaLoad() {
      if (!deferred.resolved()) {
        throw new Error('ReCAPTCHA has not been loaded');
      }
    }
  };
}

var recaptcha = createRecaptcha();

window.vueRecaptchaApiLoaded = function () {
  recaptcha.setRecaptcha(window.grecaptcha);
};

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
    this.$widgetId = null;
    recaptcha.checkRecaptchaLoad();
  },
  mounted: function mounted() {
    var self = this;
    var opts = _extends({}, this.options, {
      callback: this.emitVerify,
      'expired-callback': this.emitExpired
    });
    recaptcha.render(this.$refs.container, this.sitekey, opts, function (id) {
      self.$widgetId = id;
      self.$emit('render', id);
    });
  },

  methods: {
    reset: function reset() {
      recaptcha.reset(this.$widgetId);
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
