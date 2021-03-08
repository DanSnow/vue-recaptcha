import defer from './defer'

const ownProp = Object.prototype.hasOwnProperty

export function createRecaptcha() {
  const deferred = defer()

  return {
    notify() {
      deferred.resolve()
    },

    wait() {
      return deferred.promise
    },

    render(ele, options, cb) {
      this.wait().then(() => {
        cb(window.grecaptcha.render(ele, options))
      })
    },

    reset(widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertLoaded()
      this.wait().then(() => window.grecaptcha.reset(widgetId))
    },

    execute(widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertLoaded()
      this.wait().then(() => window.grecaptcha.execute(widgetId))
    },

    checkRecaptchaLoad() {
      if (ownProp.call(window, 'grecaptcha') && ownProp.call(window.grecaptcha, 'render')) {
        this.notify()
      }
    },

    assertLoaded() {
      if (!deferred.resolved()) {
        throw new Error('ReCAPTCHA has not been loaded')
      }
    },
  }
}

const recaptcha = createRecaptcha()

if (typeof window !== 'undefined') {
  window.vueRecaptchaApiLoaded = recaptcha.notify
}

export default recaptcha
