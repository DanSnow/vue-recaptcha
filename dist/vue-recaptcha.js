(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueRecaptcha = factory());
}(this, (function () { 'use strict';

/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
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
        var opts = index({}, { sitekey: key }, options);
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
    var opts = index({}, this.options, {
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
