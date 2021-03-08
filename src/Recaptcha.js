import recaptcha from './recaptcha-wrapper'

export default {
  name: 'VueRecaptcha',
  props: {
    sitekey: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
    },
    badge: {
      type: String,
    },
    type: {
      type: String,
    },
    size: {
      type: String,
    },
    tabindex: {
      type: String,
    },
    loadRecaptchaScript: {
      type: Boolean,
      default: false,
    },
    recaptchaScriptId: {
      type: String,
      default: '__RECAPTCHA_SCRIPT',
    },
    recaptchaHost: {
      type: String,
      default: 'www.google.com',
    },
    language: {
      type: String,
      default: '',
    },
  },
  beforeMount() {
    if (this.loadRecaptchaScript) {
      if (!document.getElementById(this.recaptchaScriptId)) {
        // Note: vueRecaptchaApiLoaded load callback name is per the latest documentation
        const script = document.createElement('script')
        script.id = this.recaptchaScriptId
        script.src = `https://${this.recaptchaHost}/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl=${this.language}`
        script.async = true
        script.defer = true

        document.head.appendChild(script)
      }
    }
  },
  mounted() {
    recaptcha.checkRecaptchaLoad()
    const opts = {
      ...this.$props,
      callback: this.emitVerify,
      'expired-callback': this.emitExpired,
      'error-callback': this.emitError,
    }
    const container = this.$slots.default ? this.$el.children[0] : this.$el
    recaptcha.render(container, opts, (id) => {
      this.$widgetId = id
      this.$emit('render', id)
    })
  },
  methods: {
    reset() {
      recaptcha.reset(this.$widgetId)
    },
    execute() {
      recaptcha.execute(this.$widgetId)
    },
    emitVerify(response) {
      this.$emit('verify', response)
    },
    emitExpired() {
      this.$emit('expired')
    },
    emitError() {
      this.$emit('error')
    },
  },
  render(h) {
    return h('div', {}, this.$slots.default)
  },
}
