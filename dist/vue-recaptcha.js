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
	var __vue_styles__ = {}

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

	var _recaptcha2 = _interopRequireDefault(_recaptcha);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    _recaptcha2.default.checkRecaptchaLoad();
	  },
	  mounted: function mounted() {
	    var self = this;
	    var opts = Object.assign({}, this.options, {
	      callback: this.emitVerify,
	      'expired-callback': this.emitExpired
	    });
	    _recaptcha2.default.render(this.$refs.container, this.key, opts).then(function (id) {
	      widgetId = id;
	      self.$emit('render', widgetId);
	    });
	  },

	  methods: {
	    reset: function reset() {
	      _recaptcha2.default.reset(widgetId);
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
	exports.createRecaptcha = createRecaptcha;
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

	exports.default = recaptcha;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    ref: "container"
	  })
	},staticRenderFns: []}

/***/ }
/******/ ])
});
;