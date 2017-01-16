import assign from 'object-assign';

const defer = () => {
  let state = false; // Resolved or not
  let value;
  const callbacks = [];
  const resolve = (val) => {
    if (state) {
      return;
    }

    state = true;
    value = val;
    callbacks.forEach((cb) => {
      cb(val);
    });
  };

  const then = (cb) => {
    if (!state) {
      callbacks.push(cb);
      return;
    }
    cb(value);
  };

  const deferred = {
    resolved() {
      return state;
    },
    resolve,
    promise: {
      then
    }
  };
  return deferred;
};

export function createRecaptcha() {
  const deferred = defer();

  return {
    setRecaptcha(recap) {
      deferred.resolve(recap);
    },

    getRecaptcha() {
      return deferred.promise;
    },

    render(ele, key, options, cb) {
      this.getRecaptcha().then((recap) => {
        const opts = assign({}, { sitekey: key }, options);
        cb(recap.render(ele, opts));
      });
    },

    reset(widgetId) {
      if (typeof widgetId === 'undefined') {
        return;
      }

      this.assertRecaptchaLoad();
      this.getRecaptcha().then((recap) => recap.reset(widgetId));
    },

    checkRecaptchaLoad() {
      if (window.hasOwnProperty('grecaptcha')) {
        this.setRecaptcha(window.grecaptcha);
      }
    },

    assertRecaptchaLoad() {
      if (!deferred.resolved()) {
        throw new Error('ReCAPTCHA has not been loaded');
      }
    }
  };
}

const recaptcha = createRecaptcha();

window.vueRecaptchaApiLoaded = () => {
  recaptcha.setRecaptcha(window.grecaptcha);
};

export default recaptcha;
