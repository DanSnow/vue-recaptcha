(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueRecaptcha = factory());
}(this, (function () { 'use strict';

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
    render: function render(ele, options, cb) {
      this.getRecaptcha().then(function (recap) {
        cb(recap.render(ele, options));
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
    execute: function execute(widgetId) {
      if (typeof widgetId === 'undefined') {
        return;
      }

      this.assertRecaptchaLoad();
      this.getRecaptcha().then(function (recap) {
        return recap.execute(widgetId);
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

if (typeof window !== 'undefined') {
  window.vueRecaptchaApiLoaded = function () {
    recaptcha.setRecaptcha(window.grecaptcha);
  };
}

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

var VueRecaptcha$1 = {
  name: 'VueRecaptcha',
  props: {
    sitekey: {
      type: String,
      required: true
    },
    theme: {
      type: String
    },
    badge: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: String
    },
    tabindex: {
      type: String
    }
  },
  created: function created() {
    this.$widgetId = null;
  },
  mounted: function mounted() {
    var _this = this;

    recaptcha.checkRecaptchaLoad();
    var opts = _extends({}, this.$props, {
      callback: this.emitVerify,
      'expired-callback': this.emitExpired
    });
    var container = this.$slots.default ? this.$refs.container.children[0] : this.$refs.container;
    recaptcha.render(container, opts, function (id) {
      _this.$widgetId = id;
      _this.$emit('render', id);
    });
  },

  methods: {
    reset: function reset() {
      recaptcha.reset(this.$widgetId);
    },
    execute: function execute() {
      recaptcha.execute(this.$widgetId);
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
    return h('div', { ref: 'container' }, this.$slots.default);
  }
};

return VueRecaptcha$1;

})));
