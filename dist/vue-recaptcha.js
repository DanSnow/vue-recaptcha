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

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(2)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/recaptcha.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(4)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/vue-recaptcha/src/recaptcha.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

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

	var widgetId = null; // <template>
	//   <div v-el:container></div>
	// </template>
	//
	// <script>

	exports.default = {
	  props: {
	    key: {
	      type: String,
	      required: true
	    },
	    options: {
	      type: Object,
	      default: {}
	    }
	  },
	  created: function created() {
	    recaptcha.checkRecaptchaLoad();
	  },
	  compiled: function compiled() {
	    var self = this;
	    recaptcha.render(this.$els.container, this.key, this.options).then(function (id) {
	      widgetId = id;
	      self.$emit('render', widgetId);
	    });
	  },

	  methods: {
	    reset: function reset() {
	      recaptcha.reset(widgetId);
	    }
	  }
	};
	// </script>

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
	  var args = [];

	  if (arguments.length > 0) {
	    if (widgetId === null) {
	      return;
	    } else {
	      args = [widgetId];
	    }
	  }

	  assertRecaptchaLoad();
	  getRecaptcha.then(function (recaptcha) {
	    recaptcha.reset.apply(null, args);
	  });
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "\n<div v-el:container></div>\n";

/***/ }
/******/ ])
});
;