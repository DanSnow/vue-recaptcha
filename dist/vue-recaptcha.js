(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueRecaptcha = factory());
}(this, (function () { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
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

    return _extends.apply(this, arguments);
  }

  var defer = function defer() {
    var state = false; // Resolved or not

    var callbacks = [];

    var resolve = function resolve(val) {
      if (state) {
        return;
      }

      state = true;

      for (var i = 0, len = callbacks.length; i < len; i++) {
        callbacks[i](val);
      }
    };

    var then = function then(cb) {
      if (!state) {
        callbacks.push(cb);
        return;
      }

      cb();
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

  var ownProp = Object.prototype.hasOwnProperty;
  function createRecaptcha() {
    var deferred = defer();
    return {
      notify: function notify() {
        deferred.resolve();
      },
      wait: function wait() {
        return deferred.promise;
      },
      render: function render(ele, options, cb) {
        this.wait().then(function () {
          cb(window.grecaptcha.render(ele, options));
        });
      },
      reset: function reset(widgetId) {
        if (typeof widgetId === 'undefined') {
          return;
        }

        this.assertLoaded();
        this.wait().then(function () {
          return window.grecaptcha.reset(widgetId);
        });
      },
      execute: function execute(widgetId) {
        if (typeof widgetId === 'undefined') {
          return;
        }

        this.assertLoaded();
        this.wait().then(function () {
          return window.grecaptcha.execute(widgetId);
        });
      },
      checkRecaptchaLoad: function checkRecaptchaLoad() {
        if (ownProp.call(window, 'grecaptcha') && ownProp.call(window.grecaptcha, 'render')) {
          this.notify();
        }
      },
      assertLoaded: function assertLoaded() {
        if (!deferred.resolved()) {
          throw new Error('ReCAPTCHA has not been loaded');
        }
      }
    };
  }
  var recaptcha = createRecaptcha();

  if (typeof window !== 'undefined') {
    window.vueRecaptchaApiLoaded = recaptcha.notify;
  }

  var VueRecaptcha = {
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
      },
      loadRecaptchaScript: {
        type: Boolean,
        "default": false
      },
      recaptchaScriptId: {
        type: String,
        "default": '__RECAPTCHA_SCRIPT'
      },
      recaptchaHost: {
        type: String,
        "default": 'www.google.com'
      },
      language: {
        type: String,
        "default": ''
      }
    },
    beforeMount: function beforeMount() {
      if (this.loadRecaptchaScript) {
        if (!document.getElementById(this.recaptchaScriptId)) {
          // Note: vueRecaptchaApiLoaded load callback name is per the latest documentation
          var script = document.createElement('script');
          script.id = this.recaptchaScriptId;
          script.src = "https://" + this.recaptchaHost + "/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl=" + this.language;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      recaptcha.checkRecaptchaLoad();

      var opts = _extends({}, this.$props, {
        callback: this.emitVerify,
        'expired-callback': this.emitExpired,
        'error-callback': this.emitError
      });

      var container = this.$slots["default"] ? this.$el.children[0] : this.$el;
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
      },
      emitError: function emitError() {
        this.$emit('error');
      }
    },
    render: function render(h) {
      return h('div', {}, this.$slots["default"]);
    }
  };

  return VueRecaptcha;

})));
