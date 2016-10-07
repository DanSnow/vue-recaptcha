(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueRecaptcha"] = factory();
	else
		root["VueRecaptcha"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _recaptcha = __webpack_require__(1);

	var _recaptcha2 = _interopRequireDefault(_recaptcha);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _recaptcha2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(2)

	/* template */
	var __vue_template__ = __webpack_require__(4)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _recaptcha = __webpack_require__(3);

	var recaptcha = _interopRequireWildcard(_recaptcha);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var widgetId = null; //
	//
	//
	//

	exports.default = {
	  props: {
	    key: {
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
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getRecaptcha = getRecaptcha;
	exports.checkRecaptchaLoad = checkRecaptchaLoad;
	exports.assertRecaptchaLoad = assertRecaptchaLoad;
	exports.render = render;
	exports.reset = reset;
	var promise = {};
	var recaptcha = null;

	promise.promise = new Promise(function (resolve) {
	  promise.resolve = resolve;
	});

	window.vueRecaptchaApiLoaded = function () {
	  recaptcha = window.grecaptcha;
	  promise.resolve(recaptcha);
	};

	function getRecaptcha() {
	  if (recaptcha !== null) {
	    return Promise.resolve(recaptcha);
	  }

	  return promise.promise;
	}

	function checkRecaptchaLoad() {
	  if (window.hasOwnProperty('grecaptcha')) {
	    window.vueRecaptchaApiLoaded();
	  }
	}

	function assertRecaptchaLoad() {
	  if (recaptcha === null) {
	    throw new Error('ReCAPTCHA has not been loaded');
	  }
	}

	function render(ele, key, options) {
	  return getRecaptcha().then(function (recaptcha) {
	    var opts = Object.assign({}, { sitekey: key }, options);
	    return recaptcha.render(ele, opts);
	  });
	}

	function reset(widgetId) {
	  if (typeof widgetId === 'undefined') {
	    return false;
	  }
	  assertRecaptchaLoad();
	  getRecaptcha().then(function (recaptcha) {
	    recaptcha.reset(widgetId);
	  });
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    ref: "container"
	  })
	}},staticRenderFns: []}

/***/ }
/******/ ])
});
;