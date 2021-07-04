import { defineComponent, ref, onMounted, unref, h } from 'vue';

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

var VueRecaptcha = defineComponent({
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
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var root = ref(null);
    var $widgetId = ref(null);

    var emitVerify = function emitVerify(response) {
      emit('verify', response);
    };

    var emitExpired = function emitExpired() {
      emit('expired');
    };

    var emitError = function emitError() {
      emit('error');
    };

    onMounted(function () {
      recaptcha.checkRecaptchaLoad();

      if (props.loadRecaptchaScript) {
        if (!document.getElementById(props.recaptchaScriptId)) {
          // Note: vueRecaptchaApiLoaded load callback name is per the latest documentation
          var script = document.createElement('script');
          script.id = props.recaptchaScriptId;
          script.src = "https://" + props.recaptchaHost + "/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl=" + props.language;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }
      }

      var opts = _extends({}, props, {
        callback: emitVerify,
        'expired-callback': emitExpired,
        'error-callback': emitError
      });

      var container = slots["default"] ? unref(root).children[0] : unref(root);
      recaptcha.render(container, opts, function (id) {
        $widgetId.value = id;
        emit('render', id);
      });
    });
    return {
      root: root,
      $widgetId: $widgetId,
      reset: function reset() {
        recaptcha.reset(unref($widgetId));
      },
      execute: function execute() {
        recaptcha.execute(unref($widgetId));
      }
    };
  },
  render: function render() {
    return h('div', {
      ref: 'root'
    }, this.$slots["default"]);
  }
});

export default VueRecaptcha;
