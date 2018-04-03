import defer from './defer'

export function createRecaptcha () {
  const deferred = defer()

  return {
    notify () {
      deferred.resolve()
    },

    wait () {
      return deferred.promise
    },

    render (ele, options, cb) {
      this.wait().then(() => {
        cb(window.grecaptcha.render(ele, options))
      })
    },

    reset (widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertLoaded()
      this.wait().then(() => window.grecaptcha.reset(widgetId))
    },

    execute (widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertLoaded()
      this.wait().then(() => window.grecaptcha.execute(widgetId))
    },
	
	loadRecaptcha () {
		let recaptchaDetected = false;
		let recaptchaSrc = 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit';
		let documentScripts = document.getElementsByTagName('script');
		if (documentScripts.length) {
			for (let documentScript of documentScripts) {
				if (documentScript.src === recaptchaSrc) {
					recaptchaDetected = true;
					return;
				}
			}
		}
		if (!recaptchaDetected) {
			var addGoogleRecaptcaScript = document.createElement('script');
			addGoogleRecaptcaScript.type = 'text/javascript';
			addGoogleRecaptcaScript.async = true;
			addGoogleRecaptcaScript.defer = true;
			addGoogleRecaptcaScript.src = recaptchaSrc;
			document.getElementsByTagName('head')[0].appendChild(addGoogleRecaptcaScript);
		}
	},

    checkRecaptchaLoad () {
      if (window.hasOwnProperty('grecaptcha')) {
        this.notify()
      }
    },

    assertLoaded () {
      if (!deferred.resolved()) {
        throw new Error('ReCAPTCHA has not been loaded')
      }
    }
  }
}

const recaptcha = createRecaptcha()

if (typeof window !== 'undefined') {
  window.vueRecaptchaApiLoaded = recaptcha.notify
}

export default recaptcha
