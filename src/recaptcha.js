const defer = () => {
  const deferred = {};
  deferred.promise = new Promise((resolve) => {
    deferred.resolve = resolve;
  });
  return deferred;
};

export function createRecaptcha() {
  let recaptcha = null;
  const deferred = defer();

  return {
    setRecaptcha(recap) {
      recaptcha = recap;
      deferred.resolve(recap);
    },

    getRecaptcha() {
      if (recaptcha) {
        return Promise.resolve(recaptcha);
      }

      return deferred.promise;
    },

    render(ele, key, options) {
      return this.getRecaptcha().then((recap) => {
        const opts = Object.assign({}, { sitekey: key }, options);
        return recap.render(ele, opts);
      });
    },

    reset(widgetId) {
      if (typeof widgetId === 'undefined') {
        return;
      }

      this.assertRecaptchaLoad();
      recaptcha.reset(widgetId);
    },

    checkRecaptchaLoad() {
      if (window.hasOwnProperty('grecaptcha')) {
        this.setRecaptcha(window.grecaptcha);
      }
    },

    assertRecaptchaLoad() {
      if (recaptcha === null) {
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
