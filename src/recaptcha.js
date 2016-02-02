let promise = Promise.defer();
let recaptcha = null;

window.vueRecaptchaApiLoaded = () => {
  recaptcha = window.grecaptcha;
  promise.resolve(recaptcha);
};

export function getRecaptcha() {
  if(recaptcha !== null) {
    return Promise.resolve(recaptcha);
  }

  return promise.promise;
}

export function checkRecaptchaLoad() {
  if(window.hasOwnProperty('grecaptcha')) {
    window.vueRecaptchaApiLoaded();
  }
}

export function assertRecaptchaLoad() {
  if(recaptcha === null) {
    throw new Error('ReCAPTCHA has not been loaded');
  }
}

export function render(ele, key, options) {
  return getRecaptcha().then((recaptcha) => {
    let opts = Object.assign({}, { sitekey: key }, options);
    return recaptcha.render(ele, opts);
  });
}

export function reset(widgetId) {
  let args = [];

  if(arguments.length > 0) {
    if(widgetId === null) {
      return;
    } else {
      args = [widgetId];
    }
  }

  assertRecaptchaLoad();
  getRecaptcha.then((recaptcha) => {
    recaptcha.reset.apply(null, args);
  });
}
